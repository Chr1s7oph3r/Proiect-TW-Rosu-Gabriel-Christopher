import FilmCard from "./FilmCard.jsx";

export default function FilmList({ filme, onToggle, onDelete }) {
  if (filme.length === 0) {
    return <p className="empty" style={{ padding: "1rem" }}>Lista de filme este goală.</p>;
  }

  return (
    <div className="movies-grid-container">
      {filme.map((film) => (
        <FilmCard 
          key={film.id} 
          film={film} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}