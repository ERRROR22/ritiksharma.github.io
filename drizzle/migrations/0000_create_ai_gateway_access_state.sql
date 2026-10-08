CREATE TABLE public.ai_gateway_access_state (
  id smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  is_blocked boolean NOT NULL DEFAULT false,
  safe_message text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.ai_gateway_access_state TO service_role;
ALTER TABLE public.ai_gateway_access_state ENABLE ROW LEVEL SECURITY;