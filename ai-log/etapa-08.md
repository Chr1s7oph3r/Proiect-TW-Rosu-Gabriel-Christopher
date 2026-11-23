# Stage 8: AI log

## Tools
Gemini

## Conversations
<https://share.gemini.google/hylZM8AFouIw> (Stage 8: React Router, detail page, CSS Modules refactoring, and community profiles)

## Key requests
### 1. Migrating to React Router and shared Layout
Asked: How to split the app into pages (`/`, `/filme/:id`, `/despre`, `*`) with a shared header and dark/light theme toggle.
Got: `BrowserRouter` in `main.jsx`, route definitions in `App.jsx`, and `Layout.jsx` using `NavLink` (with `end` on `/`) and `<Outlet />`.
Changed or rejected: Kept the theme toggle in `Layout` and added a `/utilizatori/:id` route so clicking any review author opens their profile, average rating, reviews, and thematic lists.

### 2. Detail page by URL ID and CSS Modules refactoring
Asked: How to fetch a single movie via `useParams()`, handle missing IDs, and split `App.css` into CSS Modules.
Got: `fetchFilm(id)` in `api.js`, `FilmDetaliuPage.jsx` refetching on `[id]` changes with 404 handling, `index.css` for shared variables/classes, and `.module.css` files alongside every component and page.
Changed or rejected: Kept `data-testid="detail-title"` strictly on the movie title (separate from the release year) and expanded `db.json` to 16 movies and 12 community users with calculated community rating averages.

## What I learned / what did not work
Learned how client-side routing works without full page reloads, why CSS Modules scope styles per component, and how to debug console checks (initially ran `document.querySelectorAll` in PowerShell instead of browser DevTools and checked `detail-title` on `/` instead of `/filme/1`). Also verified clean `npm run lint` and `npm run build` outputs.