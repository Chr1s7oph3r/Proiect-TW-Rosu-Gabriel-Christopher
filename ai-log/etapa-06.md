# Stage 6: AI log

## Tools
Gemini

## Conversations
<https://share.gemini.google/hylZM8AFouIw> (Stage 6: json-server setup, api.js wrapper, and async loading states)

## Key requests
### 1. Centralizing HTTP calls in `api.js`
Asked: How to structure `frontend/src/api.js` with `VITE_API_URL` and connect `json-server` on port 3001.
Got: A shared `request()` helper checking `res.ok`, handling `204 No Content`, and exposing `fetchFilme`, `createFilm`, `updateFilm`, and `deleteFilm`.
Changed or rejected: Added `.env.example` and expanded `db.json` with rich movie metadata (runtime, synopsis, favorites, community reviews).

### 2. Handling loading, error, and cleanup in `useEffect`
Asked: How to safely fetch movies on mount and display clear loading and error feedback when `json-server` is stopped.
Got: An async `useEffect` with an `ignore` cleanup flag, skeleton loader cards, and explicit error banner referencing `npm run api`.
Changed or rejected: Kept both `data-testid="loading"` and `data-testid="error"` visible during their respective states for automated verification.

## What I learned / what did not work
Learned that `npm run api` and `npm run dev` must run concurrently in two separate terminals inside `frontend/` (initially tried running `npm run api` from the repository root, causing an `ENOENT` error for `package.json`).