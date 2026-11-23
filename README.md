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
   git clone [https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher.git](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher.git)
   cd Proiect-TW-Rosu-Gabriel-Christopher/frontend
   npm install

   Start the mock API and the React app in two separate terminals (both inside frontend/):
   Bash
   # Terminal 1 — mock API (http://localhost:3001)
    npm run api

   Bash
   # Terminal 2 — frontend dev server (http://localhost:5173)
    npm run dev

    Open http://localhost:5173 in the browser.
    
    AI usage
    Tool:Gemini
    Used for: Debugging, CRUD API architecture, form validation, React Router & CSS Modules refactoring, UI polish
    
    Details per stage: see the ai-log/ folder.
    
    Status
    [x] Stage 1: static mockup
    [x] Stage 2: data logic in JavaScript
    [x] Stage 3: Vite and React project
    [x] Stage 4: components rendered from data
    [x] Stage 5: local state and events
    [x] Stage 6: data from a mock API
    [x] Stage 7: form and validation
    [x] Stage 8: routing and detail page
    [ ] Stage 9: own backend with Express

    Stage summaries
    
    Stage 1: static mockupCreated the initial static HTML and CSS mockup in mockup/, establishing the movie card layout, color palette, and cinema journal theme.

    Stage 2: data logic in JavaScriptAdded vanilla JavaScript logic in mockup/ to manage the movie dataset, dynamically render entries, and handle basic UI interactions.

    Stage 3: Vite and React projectInitialized the React application with Vite inside frontend/ and migrated the static mockup structure into React JSX and CSS custom properties.
    
    Stage 4: components rendered from dataSplit the UI into reusable React components (FilmList, FilmCard, FilmDetails) receiving movie data through props and rendering lists dynamically with keys.
    
    Stage 5: local state and eventsAdded interactive state management (useState, useEffect) for toggling watched status, deleting movies, rating with 1–10 stars, writing personal reviews, and switching between Dark and Light mode.
    
    Stage 6: data from a mock APIMoved all movie data out of React into frontend/db.json served by json-server (npm run api). Centralized all HTTP calls in frontend/src/api.js using VITE_API_URL (documented in .env.example), with loading, empty, and error states.
    
    Stage 7: form and validationImplemented FilmForm.jsx as a controlled form with client-side validation, loading/disabled submit state, and server-first persistence (POST, PATCH, DELETE). Added tw.json at the repository root and all required data-testid attributes.
    
    Stage 8: routing and detail pageMigrated the app to React Router behind a shared Layout (NavLink header, theme toggle, <Outlet />, footer) with routes for the catalog (/), movie details (/filme/:id with useParams and 404 error handling), community user profiles (/utilizatori/:id), about (/despre), and a 404 page (*). Split all component and page styles into CSS Modules (*.module.css), keeping only theme variables and shared utility classes in index.css. Expanded the catalog to 16 movies and 12 community users with calculated community averages and latest reviews.