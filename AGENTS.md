# Project Architecture Rules

- Fetch public GitHub profile data client-side through GitHub's public REST API and cache it with TanStack Query, because the page needs only public data and no visitor authentication.
- The interest matcher calls Lovable AI Gateway only from the `recommend-portfolio-items` edge function; validate all input with Zod, allowlist model-returned match IDs against the candidates the client actually sent, and resolve display data only from trusted local sources (`src/data/recommendationProjects.ts`, `usePosts`). The SDK's structured-output helper returns empty for this responses model, so the function accumulates `result.textStream` and parses JSON itself.
