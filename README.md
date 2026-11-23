# CineLog — Movie Catalog & Community Cinema Journal

**Author:** Roșu Gabriel-Christopher  
**Course:** Web Technologies (Tehnologii Web)

CineLog is a community-driven movie catalog and personal cinema journal inspired by IMDb and Letterboxd. Users can browse movies, track watched titles, rate and review films, filter and sort the catalog, propose missing titles, and explore community reviews alongside individual user profiles and thematic lists.

## Data model

| Field | Type | Notes |
|-------|------|-------|
| `titlu` | text | required, max 100 chars |
| `vazut` | boolean | toggled from the list or detail page, default `false` |
| `gen` | fixed values | `Action`, `Drama`, `Sci-Fi`, `Comedy`, `Adventure`, `Horror`, `Thriller` |
| `an` | number | release year, between 1900 and current year |
| `category` | relation | genre/collection category (from stage 10) |
| `user` | relation | owner of the item (from stage 11) |

Additional domain fields stored per movie: `durata`, `favorit`, `ratingDb`, `recenzie`, `notaTa`, `posterUrl`, `regizor`, `cast`, `sinopsis`, and `recenziiComunitate`. Community user profiles (`utilizatori`) store `handle`, `nume`, `bio`, `genPreferat`, `filmeVazuteIds`, and thematic `liste`.

## Project structure

- `mockup/` — Static HTML, CSS, and vanilla JS prototype (Stages 1–2).
- `frontend/` — React + Vite application, CSS Modules, and `json-server` mock database (Stages 3–8).
- `ai-log/` — Per-stage AI usage logs (`etapa-01.md` – `etapa-08.md`).
- `tw.json` — Automated grading metadata for the main resource (`filme`).

## How to run

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher.git
cd Proiect-TW-Rosu-Gabriel-Christopher/frontend
npm install
```

2. Start the mock API and the React app in **two separate terminals** (both inside `frontend/`):

```bash
# Terminal 1 — mock API (http://localhost:3001)
npm run api
```

```bash
# Terminal 2 — frontend dev server (http://localhost:5173)
npm run dev
```

3. Open `http://localhost:5173` in the browser.

## AI usage

| Tool | Used for |
|------|----------|
| Gemini | Debugging, CRUD API architecture, form validation, React Router & CSS Modules refactoring, UI polish |

Details per stage: see the `ai-log/` folder.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [x] Stage 6: data from a mock API
- [x] Stage 7: form and validation
- [x] Stage 8: routing and detail page
- [ ] Stage 9: own backend with Express

## Stage summaries

### Stage 1: static mockup
Created the initial static HTML and CSS mockup in `mockup/`, establishing the movie card layout, color palette, and cinema journal theme.

### Stage 2: data logic in JavaScript
Added vanilla JavaScript logic in `mockup/` to manage the movie dataset, dynamically render entries, and handle basic UI interactions.

### Stage 3: Vite and React project
Initialized the React application with Vite inside `frontend/` and migrated the static mockup structure into React JSX and CSS custom properties.

### Stage 4: components rendered from data
Split the UI into reusable React components (`FilmList`, `FilmCard`, `FilmDetails`) receiving movie data through props and rendering lists dynamically with keys.

### Stage 5: local state and events
Added interactive state management (`useState`, `useEffect`) for toggling watched status, deleting movies, rating with 1–10 stars, writing personal reviews, and switching between Dark and Light mode.

### Stage 6: data from a mock API
Moved all movie data out of React into `frontend/db.json` served by `json-server` (`npm run api`). Centralized all HTTP calls in `frontend/src/api.js` using `VITE_API_URL` (documented in `.env.example`), with loading, empty, and error states.

### Stage 7: form and validation
Implemented `FilmForm.jsx` as a controlled form with client-side validation, loading/disabled submit state, and server-first persistence (`POST`, `PATCH`, `DELETE`). Added `tw.json` at the repository root and all required `data-testid` attributes.

### Stage 8: routing and detail page
Migrated the app to React Router behind a shared `Layout` (`NavLink` header, theme toggle, `<Outlet/>`, footer) with routes for the catalog (`/`), movie details (`/filme/:id` with `useParams` and 404 error handling), community user profiles (`/utilizatori/:id`), about (`/despre`), and a 404 page (`*`). Split all component and page styles into CSS Modules (`*.module.css`), keeping only theme variables and shared utility classes in `index.css`. Expanded the catalog to 16 movies and 12 community users with calculated community averages and latest reviews.

## Verification Checklists

### Stage 6: data from a mock API

| ID | Requirement | Where (permalink) | How to check |
|----|-------------|-------------------|--------------|
| S6-R1 | `npm run api` starts, route shows JSON | [package.json](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/package.json#L6-L12), [db.json](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/db.json#L1-L17) | open `localhost:3001/filme` |
| S6-R2 | data no longer in React code | [FilmePage.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/pages/FilmePage.jsx#L16-L44) | read |
| S6-R3 | loading message while waiting | [FilmePage.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/pages/FilmePage.jsx#L319-L334) | run API with `--delay 4000` |
| S6-R4 | error message when API is down | [FilmePage.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/pages/FilmePage.jsx#L336-L340) | stop `npm run api`, refresh |
| S6-R5 | `fetch` only in `api.js`, URL from env | [api.js](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/api.js#L1-L20), [.env.example](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/.env.example#L1-L2) | search for `fetch` |
| S6-R6 | README Stage 6 section + AI log | [README.md](LINK), [etapa-06.md](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/main/ai-log/etapa-06.md?plain=1) | read |
| S6-R7 | commit "Stage 6" pushed | [commit Stage 6](2a503104a329b824f9649948bb2eb187aa78f525)(https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/tree/2a503104a329b824f9649948bb2eb187aa78f525) | commit history |

### Stage 7: form and validation

| ID | Requirement | Where (permalink) | How to check |
|----|-------------|-------------------|--------------|
| S7-R1 | controlled form: `value` + `onChange` on every field | [FilmForm.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/components/FilmForm.jsx#L72-L141) | read |
| S7-R2 | empty title shows an error, nothing is sent | [FilmForm.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/components/FilmForm.jsx#L17-L38   ) | submit empty, watch Network |
| S7-R3 | added item shows in the list and survives refresh | [FilmePage.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/pages/FilmePage.jsx#L56-L60), [api.js](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/api.js#L30-L35) | add, refresh |
| S7-R4 | toggle and delete survive refresh | [FilmePage.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/pages/FilmePage.jsx#L62-L106), [api.js](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/api.js#L37-L48) | toggle/delete, refresh |
| S7-R5 | button disabled while sending, form cleared only on success | [FilmForm.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/components/FilmForm.jsx#L40-L70) | `--delay 3000`; stop API and submit |
| S7-R6 | `tw.json` and `data-testid` attributes | [tw.json](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/tw.json#L1-L9), [FilmCard.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/components/FilmCard.jsx#L32-L145), [FilmForm.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/components/FilmForm.jsx#L73-L140), [FilmList.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/components/FilmList.jsx#L12-L18) | `querySelectorAll` in console |
| S7-R7 | README Stage 7 section + AI log | [README.md](LINK), [etapa-07.md](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/main/ai-log/etapa-07.md) | read |
| S7-R8 | commit "Stage 7" pushed | [commit Stage 7](43c8f99af16b5e8363f821eb61d086f67d789c08)(https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/tree/43c8f99af16b5e8363f821eb61d086f67d789c08) | commit history |

### Stage 8: routing and detail page

| ID | Requirement | Where (permalink) | How to check |
|----|-------------|-------------------|--------------|
| S8-R1 | header navigation changes page without reload | [App.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/App.jsx#L9-L21), [Layout.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/components/Layout.jsx#L34-L57) | click links, watch Network |
| S8-R2 | click on an item opens its detail page | [FilmCard.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/components/FilmCard.jsx#L106-L112), [FilmDetaliuPage.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/pages/FilmDetaliuPage.jsx#L20-L83  ) | click a title |
| S8-R3 | refresh on detail URL works; missing id shows an error | [FilmDetaliuPage.jsx](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher/blob/4dbbd672f0cc1f1e83e3b6f8e48d470cace3e264/frontend/src/pages/FilmDetaliuPage.jsx#L196-L209  ) | refresh `/filme/1`, open `/filme/999` |
| S8-R4 | unknown URL shows the app 404 page | [App.jsx](LINK), [NotFoundPage.jsx](LINK) | open `/ceva` |
| S8-R5 | each component has its `.module.css`; `index.css` only shared styles | [components](LINK), [pages](LINK), [index.css](LINK) | read |
| S8-R6 | `data-testid` attributes; detail route `/filme/:id` | [Layout.jsx](LINK), [FilmCard.jsx](LINK), [FilmDetaliuPage.jsx](LINK), [NotFoundPage.jsx](LINK) | `querySelector` in console |
| S8-R7 | README Stage 8 section + AI log | [README.md](LINK), [etapa-08.md](LINK) | read |
| S8-R8 | commit "Stage 8" pushed | [commit Stage 8](LINK) | commit history |