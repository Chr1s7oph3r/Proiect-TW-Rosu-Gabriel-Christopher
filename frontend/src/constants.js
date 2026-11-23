// Valorile fixe și etichetele lor, într-un singur loc.
export const GENURI = [
  { value: "Action", label: "Acțiune" },
  { value: "Drama", label: "Dramă" },
  { value: "Sci-Fi", label: "Sci-Fi" },
  { value: "Comedy", label: "Comedie" },
  { value: "Adventure", label: "Aventură" },
  { value: "Horror", label: "Horror" },
  { value: "Thriller", label: "Thriller" },
];

export const ETICHETE_GEN = Object.fromEntries(
  GENURI.map((g) => [g.value, g.label])
);