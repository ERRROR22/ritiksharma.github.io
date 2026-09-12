import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const ADMIN_EMAIL = "ritiksharma4451@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (payload: unknown, status = 200) =>
    new Response(JSON.stringify(payload), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const password = Deno.env.get("ADMIN_INITIAL_PASSWORD");
    if (!password) return json({ error: "ADMIN_INITIAL_PASSWORD is not set" }, 500);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    let userId: string | null = null;

    const { data: created, error: createError } = await admin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password,
      email_confirm: true,
    });

    if (created?.user) {
      userId = created.user.id;
    } else {
      console.warn("createUser failed, looking up existing user:", createError?.message);
      const { data: list, error: listError } = await admin.auth.admin.listUsers({ perPage: 200 });
      if (listError) return json({ error: listError.message }, 500);
      const existing = list.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);
      if (!existing) return json({ error: createError?.message ?? "Could not create user" }, 500);
      userId = existing.id;
      const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
        password,
        email_confirm: true,
      });
      if (updateError) return json({ error: updateError.message }, 500);
    }

    const { error: roleError } = await admin
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

    if (roleError) return json({ error: roleError.message }, 500);

    return json({ ok: true, user_id: userId, email: ADMIN_EMAIL });
  } catch (err) {
    console.error("create-admin failed:", err);
    return json({ error: err instanceof Error ? err.message : "Unexpected error" }, 500);
  }
});
