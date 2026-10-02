# Project Architecture Rules

- Fetch public GitHub profile data client-side through GitHub's public REST API and cache it with TanStack Query, because the page needs only public data and no visitor authentication.