import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod";
import { createRecommendationCall } from "../_shared/recommendation-ai.ts";

const MAX_CANDIDATES = 40;
const MAX_MATCHES = 5;

const SAFE_GENERIC_ERROR =
  "The recommendation service is unavailable right now. Please try again later.";
const BLOCKED_MESSAGE =
  "AI recommendations are temporarily unavailable. Please check back later.";

const CandidateSchema = z.object({
  id: z.string().min(1).max(120),
  kind: z.enum(["project", "article"]),
  title: z.string().min(1).max(200),
  category: z.string().max(80),
  summary: z.string().max(600),
  skills: z.array(z.string().min(1).max(60)).max(20).default([]),
});

const BodySchema = z.object({
  interests: z.string().min(3).max(1000),
  candidates: z.array(CandidateSchema).min(1).max(MAX_CANDIDATES),
});

const json = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const clampText = (value: string, max: number) => value.trim().slice(0, max);

/** Best-effort extraction of the AI Gateway status + safe message from an AI SDK error. */
function extractGatewayError(err: unknown): { status: number; message: string } {
  const e = err as {
    statusCode?: number;
    status?: number;
    responseBody?: string;
    message?: string;
  };
  const status =
    typeof e?.statusCode === "number"
      ? e.statusCode
      : typeof e?.status === "number"
        ? e.status
        : 500;
  let message = "";
  try {
    const body =
      typeof e?.responseBody === "string" ? JSON.parse(e.responseBody) : null;
    if (body && typeof body.message === "string") message = body.message;
  } catch {
    // Non-JSON body — fall back to the generic message.
  }
  return { status, message: message || SAFE_GENERIC_ERROR };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    const parsed = BodySchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return json(
        { error: "Please describe your interests (3–1000 characters)." },
        400,
      );
    }
    const { interests, candidates } = parsed.data;

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      console.error("LOVABLE_API_KEY is missing");
      return json({ error: SAFE_GENERIC_ERROR }, 500);
    }

    // Persisted provider-access state (RLS-locked table, service role only).
    const { data: stateRows, error: stateError } = await supabase
      .from("ai_gateway_access_state")
      .select("is_blocked, safe_message")
      .limit(1);
    if (stateError) console.error("Access-state read failed:", stateError.message);
    const state = Array.isArray(stateRows) ? stateRows[0] : null;
    if (state?.is_blocked) {
      return json(
        { error: state.safe_message || BLOCKED_MESSAGE, paused: true },
        403,
      );
    }

    const { result } = createRecommendationCall(req, apiKey, {
      interests,
      candidates,
    });

    // Accumulate the streamed text and parse it ourselves — the SDK's
    // structured-output helper resolves empty with this responses model.
    let text = "";
    try {
      for await (const delta of result.textStream) text += delta;
    } catch (err) {
      const { status, message } = extractGatewayError(err);
      console.error(`Recommendation AI call failed [${status}]: ${message}`);
      if (status === 402 || status === 403) {
        // Provider denial or credit/policy block: persist the paused state so
        // every later request short-circuits until access is restored.
        await supabase
          .from("ai_gateway_access_state")
          .upsert({
            id: 1,
            is_blocked: true,
            safe_message: message,
            updated_at: new Date().toISOString(),
          });
        return json({ error: message, paused: true }, 403);
      }
      if (status === 429 || status >= 500) {
        return json(
          { error: "Too many requests right now — please try again in a moment." },
          429,
        );
      }
      return json({ error: SAFE_GENERIC_ERROR }, 502);
    }

    let output: z.infer<typeof OutputSchema> | null = null;
    try {
      const stripped = text.replace(/^```(?:json)?\s*|\s*```$/g, "");
      const start = stripped.indexOf("{");
      const end = stripped.lastIndexOf("}");
      output = OutputSchema.safeParse(JSON.parse(stripped.slice(start, end + 1))).data ?? null;
    } catch {
      output = null;
    }
    if (!output) {
      console.error(`Recommendation output failed to parse: ${text.slice(0, 200)}`);
      return json({ error: SAFE_GENERIC_ERROR }, 502);
    }

    // Only candidate ids the caller actually sent may come back; the UI joins
    // them against its own trusted local catalog.
    const allowed = new Set(candidates.map((c) => `${c.kind}:${c.id}`));
    const matches = (output?.matches ?? [])
      .filter((m) => allowed.has(`${m.kind}:${m.id}`))
      .slice(0, MAX_MATCHES)
      .map((m) => ({ id: m.id, kind: m.kind, reason: clampText(m.reason, 200) }));

    // Healthy call: clear any persisted blocked state (access restored).
    await supabase
      .from("ai_gateway_access_state")
      .upsert({
        id: 1,
        is_blocked: false,
        safe_message: null,
        updated_at: new Date().toISOString(),
      });

    return json({
      ok: true,
      introduction: clampText(output?.introduction ?? "", 240),
      matches,
    });
  } catch (err) {
    console.error("recommend-portfolio-items failed:", err);
    return json({ error: SAFE_GENERIC_ERROR }, 500);
  }
});
