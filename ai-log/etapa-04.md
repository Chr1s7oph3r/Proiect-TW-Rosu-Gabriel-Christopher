# Stage 4: AI log

## Tools
Gemini

## Conversations
<https://share.gemini.google/hylZM8AFouIw> (Stage 4: splitting UI into data-driven React components)

## Key requests
### 1. Decomposing the catalog into reusable components
Asked: How to break `App.jsx` into `FilmList`, `FilmCard`, and `FilmDetails` components receiving props.
Got: Component hierarchy with clean prop passing and `.map()` rendering using unique `film.id` keys.
Changed or rejected: Added genre tags, TMDB rating badges, and a similar movies strip inside the detail view.

## What I learned / what did not work
Learned how unidirectional data flow (props down) keeps components focused and why stable IDs are required as React list keys instead of array indexes.