import FilmCard from "./FilmCard.jsx";

export default function FilmList({ filme, onToggle, onDelete, onSelectFilm }) {
  if (filme.length === 0) {
    return <p className="empty" style={{ padding: "1rem" }}>Lista de filme este goală.</p>;
  }

  return (
    <div className="movies-grid-container">
      {filme.map((film) => (
        <div key={film.id} onClick={() => onSelectFilm(film.id)} style={{ cursor: 'pointer' }}>
          <FilmCard 
            film={film} 
            onToggle={onToggle} 
            onDelete={onDelete} 
          />
        </div>
      ))}
    </div>
  );
}