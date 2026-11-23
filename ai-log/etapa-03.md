# Stage 3: AI log

## Tools
Gemini

## Conversations
<https://share.gemini.google/hylZM8AFouIw> (Stage 3: migrating static mockup to Vite + React)

## Key requests
### 1. Setting up the Vite React project inside `frontend/`
Asked: How to initialize the Vite project and convert the static HTML/CSS mockup into JSX.
Got: Step-by-step Vite setup commands and JSX conversion rules (`className`, self-closing tags, module imports).
Changed or rejected: Kept the `mockup/` folder intact as an archive of Stages 1–2 and placed the entire React app inside `frontend/`.

## What I learned / what did not work
Learned how Vite bundles assets, how JSX differs from plain HTML, and why `node_modules/` and `dist/` must stay out of Git.