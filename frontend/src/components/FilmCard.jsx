export default function FilmCard({ film }) {
  return (
    <article className={film.vazut ? "movie-card done" : "movie-card"}>
      {/* Folosim clasa de CSS specifică fiecărui poster, adusă din date */}
      <div className={`poster-placeholder ${film.posterClass}`}>
        <span className="imdb-rating">⭐ {film.rating}</span>
      </div>
      
      <div className="movie-card-info">
        <span className="genre-tag">{film.gen}</span>
        
        {/* Dacă e văzut, tăiem titlul */}
        <h3 style={{ textDecoration: film.vazut ? "line-through" : "none" }}>
          {film.titlu}
        </h3>
        
        {/* Aici aducem înapoi descrierea scurtă a filmului */}
        <p className="movie-snippet">{film.snippet}</p>
        
        <div className="card-footer-info">
          <small>Stare: {film.vazut ? "Văzut" : "De văzut"}</small>
          <a href="#" className="details-link">Detalii</a>
        </div>
      </div>
    </article>
  );
}