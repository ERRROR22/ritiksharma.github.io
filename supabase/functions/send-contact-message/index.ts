import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const OWNER_EMAIL = "ritiksharma4451@gmail.com";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

const b64 = (s: string) =>
  btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(""));
const header = (v: string) => (/^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`);

const buildRaw = (subject: string, body: string) => {
  const email = [
    `To: ${OWNER_EMAIL}`,
    `Subject: ${header(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ].join("\r\n");
  return b64(email).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const str = (v: unknown, max: number) =>
  typeof v === "string" && v.trim().length > 0 && v.trim().length <= max ? v.trim() : null;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (payload: unknown, status = 200) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const payload = await req.json().catch(() => ({}));
    const name = str(payload.name, 120);
    const email = str(payload.email, 200);
    const subject = str(payload.subject, 200);
    const message = str(payload.message, 5000);

    if (!name || !email || !isEmail(email) || !subject || !message) {
      return json({ error: "Please fill in a valid name, email, subject and message." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: row, error: insertError } = await supabase
      .from("contact_messages")
      .insert({ name, email, subject, message })
      .select("id")
      .single();

    if (insertError) {
      console.error("Failed to store contact message:", insertError.message);
      return json({ error: "Could not save your message. Please try again." }, 500);
    }

    const lovableKey = Deno.env.get("LOVABLE_API_KEY");
    const gmailKey = Deno.env.get("GOOGLE_MAIL_API_KEY");

    if (!lovableKey || !gmailKey) {
      console.warn("Gmail connector not linked — message stored without email notification.");
      await supabase
        .from("contact_messages")
        .update({ error: "email_not_configured" })
        .eq("id", row.id);
      return json({ ok: true, emailed: false });
    }

    const body = [
      `New portfolio contact message`,
      ``,
      `From: ${name} <${email}>`,
      `Subject: ${subject}`,
      ``,
      message,
    ].join("\n");

    const response = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gmailKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw: buildRaw(`[Portfolio] ${subject}`, body) }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error(`Gmail send failed [${response.status}]: ${details}`);
      await supabase
        .from("contact_messages")
        .update({ error: `gmail_${response.status}` })
        .eq("id", row.id);
      return json({ ok: true, emailed: false, status: response.status, details });
    }

    await supabase.from("contact_messages").update({ email_sent: true }).eq("id", row.id);
    return json({ ok: true, emailed: true });
  } catch (err) {
    console.error("send-contact-message failed:", err);
    return json({ error: err instanceof Error ? err.message : "Unexpected error" }, 500);
  }
});
