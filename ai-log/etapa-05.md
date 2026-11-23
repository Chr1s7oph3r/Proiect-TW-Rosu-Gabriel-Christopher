# Stage 5: AI log

## Tools
Gemini

## Conversations
<https://share.gemini.google/hylZM8AFouIw> (Stage 5: local state, events, dark/light theme, and interactive ratings)

## Key requests
### 1. Managing interactive state for watched status, reviews, and theme
Asked: How to update movie items immutably in React state and sync a dark/light theme toggle with CSS variables.
Got: Immutable `.map()` and `.filter()` state updates, callback props (`onToggle`, `onDelete`, `onSaveReview`), and a `data-theme` attribute toggle on `document.documentElement`.
Changed or rejected: Built a custom 1–10 interactive star rating selector with hover preview and browser history integration (`popstate`).

## What I learned / what did not work
Understood why React state must never be mutated directly and how lifting state up to a parent component keeps the list and detail views synchronized.