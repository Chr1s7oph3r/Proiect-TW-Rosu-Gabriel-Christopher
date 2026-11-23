// Toate cererile HTTP stau aici; componentele nu apelează fetch direct.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Funcție comună: trimite JSON și aruncă eroare dacă răspunsul nu este 2xx
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }

  // 204 No Content nu are corp
  return res.status === 204 ? null : res.json();
}

export function fetchFilme() {
  return request("/filme");
}

export function fetchFilm(id) {
  return request(`/filme/${id}`);
}

export function createFilm(film) {
  return request("/filme", {
    method: "POST",
    body: JSON.stringify(film),
  });
}

export function updateFilm(id, changes) {
  return request(`/filme/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteFilm(id) {
  return request(`/filme/${id}`, {
    method: "DELETE",
  });
}

export function fetchUtilizatori() {
  return request("/utilizatori");
}

export function fetchUtilizator(id) {
  return request(`/utilizatori/${id}`);
}