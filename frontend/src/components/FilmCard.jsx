export default function FilmCard({ film, onToggle, onDelete }) {
  return (
    <article className={film.vazut ? "movie-card done" : "movie-card"}>
      <div className={`poster-placeholder ${film.posterClass}`}>
        <span className="imdb-rating">⭐ {film.rating}</span>
      </div>
      
      <div className="movie-card-info">
        <span className="genre-tag">{film.gen}</span>
        
       
        <label className="movie-title-toggle">
          <input 
            type="checkbox" 
            checked={film.vazut} 
            onChange={() => onToggle(film.id)} 
          />
          <h3 style={{ textDecoration: film.vazut ? "line-through" : "none", margin: 0 }}>
            {film.titlu}
          </h3>
        </label>
        
        <p className="movie-snippet">{film.snippet}</p>
        
        <div className="card-footer-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <small>Stare: {film.vazut ? "Văzut" : "De văzut"}</small>
         
          <button 
            className="btn-delete-movie" 
            onClick={() => onDelete(film.id)}
            aria-label={`Șterge filmul ${film.titlu}`}
          >
            🗑️ Șterge
          </button>
        </div>
      </div>
    </article>
  );
}