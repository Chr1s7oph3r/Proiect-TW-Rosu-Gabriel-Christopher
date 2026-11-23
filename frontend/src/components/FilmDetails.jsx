import { useState } from "react";

export default function FilmDetails({
  film,
  filmeToate,
  onBack,
  onToggle,
  onToggleFavorite,
  onDelete,
  onSaveReview,
  onUpdateFilm,
  onLikeReview,
  onSelectFilm,
}) {
  const [text, setText] = useState(film.recenzie || "");
  const [nota, setNota] = useState(film.notaTa || 0);
  const [hoverNota, setHoverNota] = useState(0);
  const [imgError, setImgError] = useState(false);

  // Mod editare detalii film
  const [editeaza, setEditeaza] = useState(false);
  const [editTitlu, setEditTitlu] = useState(film.titlu);
  const [editAn, setEditAn] = useState(String(film.an));
  const [editDurata, setEditDurata] = useState(String(film.durata || 120));
  const [editRegizor, setEditRegizor] = useState(film.regizor || "");
  const [editCast, setEditCast] = useState(film.cast || "");
  const [editSinopsis, setEditSinopsis] = useState(film.sinopsis || "");
  const [editEroare, setEditEroare] = useState("");

  function handleSave(e) {
    e.preventDefault();
    onSaveReview(film.id, text.trim(), nota);
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    if (editTitlu.trim() === "") {
      setEditEroare("Titlul nu poate fi gol.");
      return;
    }
    const anNum = Number(editAn);
    const anCurent = new Date().getFullYear();
    if (!anNum || anNum < 1900 || anNum > anCurent) {
      setEditEroare(`Anul trebuie să fie între 1900 și ${anCurent}.`);
      return;
    }

    setEditEroare("");
    await onUpdateFilm(film.id, {
      titlu: editTitlu.trim(),
      an: anNum,
      durata: Number(editDurata) || 120,
      regizor: editRegizor.trim() || "Necunoscut",
      cast: editCast.trim() || "Distribuție nespecificată",
      sinopsis: editSinopsis.trim(),
    });
    setEditeaza(false);
  }

  const filmeSimilare = filmeToate
    .filter((f) => f.gen === film.gen && f.id !== film.id)
    .slice(0, 4);

  const recenziiComunitate = film.recenziiComunitate || [];
  const stele = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const arePoster = Boolean(film.posterUrl) && !imgError;

  return (
    <section className="panel film-details-panel">
      {arePoster && (
        <div
          className="details-backdrop"
          style={{ backgroundImage: `url(${film.posterUrl})` }}
          aria-hidden="true"
        />
      )}

      <div className="details-content-wrapper">
        <div className="details-top-bar">
          <button type="button" className="btn-back" onClick={onBack}>
            ← Înapoi la catalog
          </button>

          <button
            type="button"
            className="btn-edit-toggle"
            onClick={() => setEditeaza((prev) => !prev)}
          >
            {editeaza ? "✕ Închide editarea" : "✎ Editează detalii"}
          </button>
        </div>

        <div className="details-layout">
          <div className="details-poster-area">
            {arePoster ? (
              <img
                src={film.posterUrl}
                alt={`Poster ${film.titlu}`}
                className="details-poster-large"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="poster-fallback details-poster-fallback">
                <span className="poster-fallback-icon">🎬</span>
                <span className="poster-fallback-title">{film.titlu}</span>
              </div>
            )}
          </div>

          <div className="details-info-area">
            {editeaza ? (
              <form className="edit-details-form" onSubmit={handleSaveEdit}>
                <h3>Editează informațiile filmului</h3>
                <div className="form-group">
                  <label>
                    Titlu
                    <input
                      type="text"
                      value={editTitlu}
                      onChange={(e) => setEditTitlu(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-group-row">
                  <label className="half-width">
                    An
                    <input
                      type="number"
                      value={editAn}
                      onChange={(e) => setEditAn(e.target.value)}
                    />
                  </label>
                  <label className="half-width">
                    Durată (min)
                    <input
                      type="number"
                      value={editDurata}
                      onChange={(e) => setEditDurata(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Regizor
                    <input
                      type="text"
                      value={editRegizor}
                      onChange={(e) => setEditRegizor(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Distribuție
                    <input
                      type="text"
                      value={editCast}
                      onChange={(e) => setEditCast(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    Sinopsis
                    <textarea
                      rows="3"
                      value={editSinopsis}
                      onChange={(e) => setEditSinopsis(e.target.value)}
                    />
                  </label>
                </div>
                {editEroare && <p className="error">{editEroare}</p>}
                <div className="edit-form-actions">
                  <button type="submit" className="btn-save-review">
                    Salvează modificările
                  </button>
                  <button
                    type="button"
                    className="btn-cancel-edit"
                    onClick={() => setEditeaza(false)}
                  >
                    Anulează
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="details-header">
                  <div>
                    <h2>
                      {film.titlu} <span className="film-year">({film.an})</span>
                    </h2>
                    <div className="meta-tags">
                      <span className="genre-tag genre-default">{film.gen}</span>
                      {film.durata > 0 && <span className="meta-chip">⏱ {film.durata} min</span>}
                      {film.notaTa > 0 && <span className="meta-chip meta-chip-gold">Nota ta: ★ {film.notaTa}/10</span>}
                    </div>
                  </div>
                  <div className="rating-box">
                    <span className="imdb-rating-large" title="The Movie Database Rating">
                      TMDB ⭐ {film.ratingDb > 0 ? Number(film.ratingDb).toFixed(1) : "N/A"}
                    </span>
                  </div>
                </div>

                {film.sinopsis && <p className="details-synopsis">{film.sinopsis}</p>}

                <div className="crew-info">
                  <p>
                    <strong>Regizor:</strong> {film.regizor}
                  </p>
                  <p>
                    <strong>Distribuție:</strong> {film.cast}
                  </p>
                </div>
              </>
            )}

            <div className="details-actions">
              <label className="movie-title-toggle details-checkbox-label">
                <input
                  type="checkbox"
                  checked={film.vazut}
                  onChange={() => onToggle(film.id)}
                />
                <span>Marcat ca vizionat</span>
              </label>

              <button
                type="button"
                className={film.favorit ? "btn-fav-inline active" : "btn-fav-inline"}
                onClick={() => onToggleFavorite(film.id)}
              >
                {film.favorit ? "❤️ În Favorite" : "🤍 Adaugă la Favorite"}
              </button>

              <button
                type="button"
                className="btn-delete-movie"
                onClick={() => onDelete(film.id)}
              >
                🗑️ Șterge filmul
              </button>
            </div>

            <div className="review-composer">
              <h3>Jurnalul tău de vizionare</h3>
              <form onSubmit={handleSave}>
                <div className="star-rating-container">
                  <span className="rating-label">Acordă o notă (1–10):</span>
                  <div className="stars">
                    {stele.map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={`star ${star <= (hoverNota || nota) ? "active" : ""}`}
                        onMouseEnter={() => setHoverNota(star)}
                        onMouseLeave={() => setHoverNota(0)}
                        onClick={() => setNota(star)}
                        aria-label={`Acordă nota ${star} din 10`}
                        title={`Nota ${star}`}
                      >
                        ★
                      </button>
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
                <button type="submit" className="btn-save-review">
                  Salvează Recenzia & Nota
                </button>
              </form>
            </div>

            <div className="community-reviews">
              <h3>Recenzii de la comunitate ({recenziiComunitate.length})</h3>
              {recenziiComunitate.length === 0 ? (
                <p className="empty">Nu există încă recenzii de la comunitate pentru acest film.</p>
              ) : (
                recenziiComunitate.map((rev) => (
                  <div key={rev.id} className="community-review-item">
                    <div className="community-review-header">
                      <strong>{rev.autor}</strong>
                      <span className="community-stars">
                        {"★".repeat(rev.nota)}
                        {"☆".repeat(10 - rev.nota)} ({rev.nota}/10)
                      </span>
                    </div>
                    <p>"{rev.text}"</p>
                    <button
                      type="button"
                      className="btn-like-review"
                      onClick={() => onLikeReview(film.id, rev.id)}
                    >
                      👍 Util ({rev.likes})
                    </button>
                  </div>
                ))
              )}
            </div>

            {filmeSimilare.length > 0 && (
              <div className="similar-films-section">
                <h3>Recomandări similare ({film.gen})</h3>
                <div className="similar-grid">
                  {filmeSimilare.map((sim) => (
                    <button
                      type="button"
                      key={sim.id}
                      className="similar-card"
                      onClick={() => onSelectFilm(sim.id)}
                      title={`${sim.titlu} (${sim.an})`}
                    >
                      <img src={sim.posterUrl} alt={`Poster ${sim.titlu}`} />
                      <span className="similar-card-caption">{sim.titlu}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}