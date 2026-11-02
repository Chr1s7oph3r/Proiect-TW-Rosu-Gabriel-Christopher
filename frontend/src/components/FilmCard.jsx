export default function FilmCard({ film, onToggle, onDelete }) {
  return (
    <article className={film.vazut ? "movie-card done" : "movie-card"}>
      <div className="poster-container">
        <img src={film.posterUrl} alt={`Poster ${film.titlu}`} className="movie-poster" />
        {/* Nota prestabilită TMDB */}
        <span className="imdb-rating" title="The Movie Database Rating">
          TMDB ⭐ {film.ratingDb}
        </span>
      </div>
      
      <div className="movie-card-info">
        <span className="genre-tag">{film.gen}</span>
        
        <label className="movie-title-toggle" onClick={(e) => e.stopPropagation()}>
          <input 
            type="checkbox" 
            checked={film.vazut} 
            onChange={() => onToggle(film.id)} 
          />
          <h3 style={{ textDecoration: film.vazut ? "line-through" : "none", margin: 0 }}>
            {film.titlu}
          </h3>
        </label>
        
        <div className="review-box">
          <div className="review-box-header">
            <strong>Părerea ta:</strong>
            {/* Nota acordată de tine apare aici doar dacă e mai mare ca 0 */}
            {film.notaTa > 0 && (
              <span className="user-rating-badge">🌟 {film.notaTa}/10</span>
            )}
          </div>
          <p className="movie-snippet">
            {film.recenzie ? `"${film.recenzie}"` : "Nu ai scris nicio recenzie încă."}
          </p>
        </div>
        
        <div className="card-footer-info" onClick={(e) => e.stopPropagation()}>
          <small>Stare: {film.vazut ? "Vizionat" : "De văzut"}</small>
          
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