import FilmCard from "./FilmCard.jsx";

export default function FilmList({ filme }) {
  // 1. Randare condiționată pentru lista goală
  if (filme.length === 0) {
    return <p className="empty" style={{ padding: "1rem" }}>Lista de filme este goală.</p>;
  }

  // 2. Maparea array-ului
  return (
    <div className="movies-grid-container">
      {filme.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
}