import { useState } from "react";

export default function FilmDetails({ film, filmeToate, onBack, onToggle, onDelete, onSaveReview, onSelectFilm }) {
  const [text, setText] = useState(film.recenzie || "");
  const [nota, setNota] = useState(film.notaTa || 0);
  const [hoverNota, setHoverNota] = useState(0);

  function handleSave(e) {
    e.preventDefault();
    onSaveReview(film.id, text, nota);
  }

  const filmeSimilare = filmeToate
    .filter((f) => f.gen === film.gen && f.id !== film.id)
    .slice(0, 4);

  // Array cu numere de la 1 la 10 pentru steluțe
  const stele = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <section className="panel film-details-panel">
      <button className="btn-back" onClick={onBack}>
        ⬅ Înapoi la colecție
      </button>

      <div className="details-layout">
        <div className="details-poster-area">
          <img src={film.posterUrl} alt={`Poster ${film.titlu}`} className="details-poster-large" />
        </div>

        <div className="details-info-area">
          <div className="details-header">
            <h2>{film.titlu} <span className="film-year">({film.an})</span></h2>
            <div className="rating-box">
              <span className="imdb-rating-large" title="The Movie Database Rating">TMDB ⭐ {film.ratingDb}</span>
            </div>
          </div>
          
          <div className="meta-tags">
            <span className="genre-tag">{film.gen}</span>
          </div>

          <div className="crew-info">
            <p><strong>Regizor:</strong> {film.regizor}</p>
            <p><strong>Distribuție:</strong> {film.cast}</p>
          </div>

          <div className="details-actions">
            <label className="movie-title-toggle">
              <input 
                type="checkbox" 
                checked={film.vazut} 
                onChange={() => onToggle(film.id)} 
              />
              <span>Marcat ca vizionat</span>
            </label>
            <button className="btn-delete-movie" onClick={() => onDelete(film.id)}>
              🗑️ Șterge filmul
            </button>
          </div>

          {/* JURNALUL TĂU */}
          <div className="review-composer">
            <h3>Jurnalul tău de vizionare</h3>
            <form onSubmit={handleSave}>
              <div className="star-rating-container">
                <span className="rating-label">Acordă o notă (1-10):</span>
                <div className="stars">
                  {stele.map((star) => (
                    <span 
                      key={star}
                      className={`star ${star <= (hoverNota || nota) ? "active" : ""}`}
                      onMouseEnter={() => setHoverNota(star)}
                      onMouseLeave={() => setHoverNota(0)}
                      onClick={() => setNota(star)}
                      title={`Nota ${star}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {nota > 0 && <span className="nota-curenta">{nota}/10</span>}
              </div>
              
              <textarea 
                className="review-textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ce părere ai despre acest film? Scrie recenzia ta aici..."
                rows="4"
              />
              <button type="submit" className="btn-save-review">Salvează Recenzia & Nota</button>
            </form>
          </div>

          <div className="community-reviews">
            <h3>Recenzii de la comunitate</h3>
            <div className="community-review-item">
              <div className="community-review-header">
                <strong>@cinefil_ro</strong> <span className="community-stars">★★★★★★★★☆☆</span>
              </div>
              <p>"O experiență de neuitat. Scenografia este uluitoare, deși ritmul e puțin cam lent pe alocuri."</p>
            </div>
            <div className="community-review-item">
              <div className="community-review-header">
                <strong>@alex_movies</strong> <span className="community-stars">★★★★★★★★★★</span>
              </div>
              <p>"Așteptam de mult să îl văd și nu m-a dezamăgit absolut deloc. Recomand!"</p>
            </div>
          </div>

          {filmeSimilare.length > 0 && (
            <div className="similar-films-section">
              <h3>Filme similare</h3>
              <div className="similar-grid">
                {filmeSimilare.map((sim) => (
                  <div key={sim.id} className="similar-card" onClick={() => onSelectFilm(sim.id)}>
                    <img src={sim.posterUrl} alt={`Poster ${sim.titlu}`} title={sim.titlu} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}