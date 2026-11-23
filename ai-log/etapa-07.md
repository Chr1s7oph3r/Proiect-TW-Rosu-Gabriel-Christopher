# Stage 7: AI log

## Tools
Gemini

## Conversations
<https://share.gemini.google/hylZM8AFouIw> (Stage 7: controlled form, validation, server-first CRUD, and tw.json)

## Key requests
### 1. Controlled form with client-side validation and error recovery
Asked: How to build `FilmForm.jsx` so empty submissions are blocked, the submit button disables during `POST`, and inputs only reset on success.
Got: Controlled inputs (`value` + `onChange`), `noValidate` with custom validation messages, `try/catch/finally` disabling state, and server-first state updates in the parent.
Changed or rejected: Redesigned the form into a compact horizontal "Propose a missing movie" bar below the catalog (matching TMDB's community model) while keeping all required `data-testid` attributes.

### 2. Automated testing alignment (`tw.json` and `data-testid`)
Asked: What exact `tw.json` placement and `data-testid` attributes are needed for Stage 7 verification.
Got: Moved `tw.json` from `frontend/` to the repository root (`CineLog/tw.json`) and aligned `form`, `form-title`, `form-an`, `form-gen`, `form-error`, `form-submit`, `item`, `item-toggle`, `item-delete`, and `empty`.
Changed or rejected: Simplified `tw.json`'s `sample` object to match the visible fields (`an`, `gen`) in the compact form.

## What I learned / what did not work
Learned why server-first updates prevent UI/database desynchronization when the API fails, and caught that `tw.json` had initially been placed inside `frontend/` instead of the repository root.