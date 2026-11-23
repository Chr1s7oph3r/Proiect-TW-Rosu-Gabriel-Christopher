import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteFilm, fetchFilm, fetchFilme, updateFilm } from "../api.js";
import { ETICHETE_GEN } from "../constants.js";
import styles from "./FilmDetaliuPage.module.css";

function getGenreClass(gen) {
  const map = {
    "Sci-Fi": "genre-scifi",
    Action: "genre-action",
    Drama: "genre-drama",
    Adventure: "genre-adventure",
    Comedy: "genre-comedy",
    Horror: "genre-horror",
    Thriller: "genre-thriller",
  };
  return map[gen] || "genre-default";
}

export default function FilmDetaliuPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [film, setFilm] = useState(null);
  const [filmeToate, setFilmeToate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const [text, setText] = useState("");
  const [nota, setNota] = useState(0);
  const [hoverNota, setHoverNota] = useState(0);
  const [imgError, setImgError] = useState(false);

  const [editeaza, setEditeaza] = useState(false);
  const [editTitlu, setEditTitlu] = useState("");
  const [editAn, setEditAn] = useState("");
  const [editDurata, setEditDurata] = useState("");
  const [editRegizor, setEditRegizor] = useState("");
  const [editCast, setEditCast] = useState("");
  const [editSinopsis, setEditSinopsis] = useState("");
  const [editEroare, setEditEroare] = useState("");

  useEffect(() => {
    let ignore = false;

    fetchFilm(id)
      .then((data) => {
        if (!ignore) {
          setFilm(data);
          setError(null);
          setText(data.recenzie || "");
          setNota(data.notaTa || 0);
          setImgError(false);
          setEditeaza(false);
          setEditTitlu(data.titlu || "");
          setEditAn(String(data.an || ""));
          setEditDurata(String(data.durata || 120));
          setEditRegizor(data.regizor || "");
          setEditCast(data.cast || "");
          setEditSinopsis(data.sinopsis || "");
        }
      })
      .catch((err) => {
        if (!ignore) {
          setFilm(null);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    fetchFilme()
      .then((lista) => {
        if (!ignore) setFilmeToate(lista);
      })
      .catch(() => {});

    return () => {
      ignore = true;
    };
  }, [id]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleToggle() {
    if (!film) return;
    try {
      const actualizat = await updateFilm(film.id, { vazut: !film.vazut });
      setFilm(actualizat);
      setToast(actualizat.vazut ? "Marcat ca vizionat." : "Mutat la De văzut.");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggleFavorite() {
    if (!film) return;
    try {
      const actualizat = await updateFilm(film.id, { favorit: !film.favorit });
      setFilm(actualizat);
      setToast(actualizat.favorit ? "Adăugat la Favorite." : "Scos de la Favorite.");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete() {
    if (!film) return;
    try {
      await deleteFilm(film.id);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSaveReview(e) {
    e.preventDefault();
    if (!film) return;
    try {
      const actualizat = await updateFilm(film.id, {
        recenzie: text.trim(),
        notaTa: nota,
        vazut: true,
      });
      setFilm(actualizat);
      setToast("Recenzia și nota au fost salvate!");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    if (!film) return;
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
    try {
      const actualizat = await updateFilm(film.id, {
        titlu: editTitlu.trim(),
        an: anNum,
        durata: Number(editDurata) || 120,
        regizor: editRegizor.trim() || "Necunoscut",
        cast: editCast.trim() || "Distribuție nespecificată",
        sinopsis: editSinopsis.trim(),
      });
      setFilm(actualizat);
      setEditeaza(false);
      setToast("Detaliile filmului au fost actualizate.");
    } catch (err) {
      setEditEroare(err.message);
    }
  }

  async function handleLikeReview(reviewId) {
    if (!film) return;
    const recenziiNoi = (film.recenziiComunitate || []).map((r) =>
      r.id === reviewId ? { ...r, likes: r.likes + 1 } : r
    );
    try {
      const actualizat = await updateFilm(film.id, {
        recenziiComunitate: recenziiNoi,
      });
      setFilm(actualizat);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <div className={styles.pageWrap}>
        <p className="info" data-testid="loading">
          Se încarcă detaliile filmului...
        </p>
      </div>
    );
  }

  if (error || !film) {
    return (
      <div className={styles.pageWrap}>
        <section className="panel">
          <p className="error" data-testid="error">
            Filmul nu a putut fi încărcat: {error || "Element inexistent"}
          </p>
          <Link to="/" className={styles.backLink}>
            ← Înapoi la catalog
          </Link>
        </section>
      </div>
    );
  }

  const filmeSimilare = filmeToate
    .filter((f) => f.gen === film.gen && f.id !== film.id)
    .slice(0, 4);
  const recenziiComunitate = film.recenziiComunitate || [];
  const toateNotele = recenziiComunitate.map((r) => r.nota);
  if (film.notaTa > 0) toateNotele.push(film.notaTa);
  const medieCineLog =
    toateNotele.length > 0
      ? (toateNotele.reduce((s, n) => s + n, 0) / toateNotele.length).toFixed(1)
      : "—";

  const stele = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const arePoster = Boolean(film.posterUrl) && !imgError;

  return (
    <div className={styles.pageWrap}>
      <section className={`panel ${styles.detail}`} data-testid="detail">
        {arePoster && (
          <div
            className={styles.backdrop}
            style={{ backgroundImage: `url(${film.posterUrl})` }}
            aria-hidden="true"
          />
        )}

        <div className={styles.contentWrapper}>
          <div className={styles.topBar}>
            <Link to="/" className={styles.backBtn}>
              ← Înapoi la catalog
            </Link>

            <button
              type="button"
              className={styles.editToggle}
              onClick={() => setEditeaza((prev) => !prev)}
            >
              {editeaza ? "✕ Închide editarea" : "✎ Editează detalii"}
            </button>
          </div>

          <div className={styles.layout}>
            <div className={styles.posterArea}>
              {arePoster ? (
                <img
                  src={film.posterUrl}
                  alt={`Poster ${film.titlu}`}
                  className={styles.posterLarge}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className={styles.posterFallback}>
                  <span>🎬</span>
                  <strong>{film.titlu}</strong>
                </div>
              )}
            </div>

            <div className={styles.infoArea}>
              {editeaza ? (
                <form className={styles.editForm} onSubmit={handleSaveEdit}>
                  <h3>Editează informațiile filmului</h3>
                  <label>
                    Titlu
                    <input
                      type="text"
                      value={editTitlu}
                      onChange={(e) => setEditTitlu(e.target.value)}
                    />
                  </label>
                  <div className={styles.editRow}>
                    <label>
                      An
                      <input
                        type="number"
                        value={editAn}
                        onChange={(e) => setEditAn(e.target.value)}
                      />
                    </label>
                    <label>
                      Durată (min)
                      <input
                        type="number"
                        value={editDurata}
                        onChange={(e) => setEditDurata(e.target.value)}
                      />
                    </label>
                  </div>
                  <label>
                    Regizor
                    <input
                      type="text"
                      value={editRegizor}
                      onChange={(e) => setEditRegizor(e.target.value)}
                    />
                  </label>
                  <label>
                    Distribuție
                    <input
                      type="text"
                      value={editCast}
                      onChange={(e) => setEditCast(e.target.value)}
                    />
                  </label>
                  <label>
                    Sinopsis
                    <textarea
                      rows="3"
                      value={editSinopsis}
                      onChange={(e) => setEditSinopsis(e.target.value)}
                    />
                  </label>
                  {editEroare && <p className="error">{editEroare}</p>}
                  <div className={styles.editActions}>
                    <button type="submit" className="btn">
                      Salvează modificările
                    </button>
                    <button
                      type="button"
                      className={styles.cancelBtn}
                      onClick={() => setEditeaza(false)}
                    >
                      Anulează
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className={styles.header}>
                    <div>
                      <div className={styles.titleRow}>
                        <h2
                          className={film.vazut ? styles.doneTitle : undefined}
                          data-testid="detail-title"
                        >
                          {film.titlu}
                        </h2>
                        <span className={styles.year}>({film.an})</span>
                      </div>

                      <div className={styles.metaTags}>
                        <span className={`genre-tag ${getGenreClass(film.gen)}`}>
                          {ETICHETE_GEN[film.gen] || film.gen}
                        </span>
                        {film.durata > 0 && (
                          <span className={styles.metaChip}>⏱ {film.durata} min</span>
                        )}
                        {film.notaTa > 0 && (
                          <span className={`${styles.metaChip} ${styles.metaChipGold}`}>
                            Nota ta: ★ {film.notaTa}/10
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={styles.scoresGroup}>
                      <span className={styles.ratingLarge} title="The Movie Database Rating">
                        TMDB ⭐ {film.ratingDb > 0 ? Number(film.ratingDb).toFixed(1) : "N/A"}
                      </span>
                      <span
                        className={styles.communityScoreLarge}
                        title={`Media calculată din ${toateNotele.length} note`}
                      >
                        CineLog 👥 {medieCineLog}
                      </span>
                    </div>
                  </div>

                  {film.sinopsis && <p className={styles.synopsis}>{film.sinopsis}</p>}

                  <dl className={styles.fields}>
                    <dt>Regizor</dt>
                    <dd>{film.regizor}</dd>
                    <dt>Distribuție</dt>
                    <dd>{film.cast}</dd>
                    <dt>Status</dt>
                    <dd>{film.vazut ? "Vizionat" : "De văzut"}</dd>
                    <dt>ID</dt>
                    <dd>{film.id}</dd>
                  </dl>
                </>
              )}

              <div className={styles.actions}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={film.vazut}
                    onChange={handleToggle}
                  />
                  <span>Marcat ca vizionat</span>
                </label>

                <button
                  type="button"
                  className={
                    film.favorit
                      ? `${styles.favInline} ${styles.favActive}`
                      : styles.favInline
                  }
                  onClick={handleToggleFavorite}
                >
                  {film.favorit ? "❤️ În Favorite" : "🤍 Adaugă la Favorite"}
                </button>

                <button type="button" className="btn-danger" onClick={handleDelete}>
                  🗑️ Șterge filmul
                </button>
              </div>

              <div className={styles.reviewComposer}>
                <h3>Jurnalul tău de vizionare</h3>
                <form onSubmit={handleSaveReview}>
                  <div className={styles.starRow}>
                    <span className={styles.ratingLabel}>Acordă o notă (1–10):</span>
                    <div className={styles.stars}>
                      {stele.map((star) => (
                        <button
                          type="button"
                          key={star}
                          className={
                            star <= (hoverNota || nota)
                              ? `${styles.star} ${styles.starActive}`
                              : styles.star
                          }
                          onMouseEnter={() => setHoverNota(star)}
                          onMouseLeave={() => setHoverNota(0)}
                          onClick={() => setNota(star)}
                          aria-label={`Acordă nota ${star} din 10`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    {nota > 0 && <span className={styles.notaCurenta}>{nota}/10</span>}
                  </div>

                  <textarea
                    className={styles.textarea}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Ce părere ai despre acest film? Scrie recenzia ta aici..."
                    rows="4"
                  />
                  <button type="submit" className="btn">
                    Salvează Recenzia & Nota
                  </button>
                </form>
              </div>

              <div className={styles.sectionBlock}>
                <h3>Recenzii de la comunitate ({recenziiComunitate.length})</h3>
                {recenziiComunitate.length === 0 ? (
                  <p className="empty">
                    Nu există încă recenzii de la comunitate pentru acest film.
                  </p>
                ) : (
                  recenziiComunitate.map((rev) => (
                    <div key={rev.id} className={styles.communityItem}>
                      <div className={styles.communityHeader}>
                        <div className={styles.authorMeta}>
                          {rev.userId ? (
                            <Link
                              to={`/utilizatori/${rev.userId}`}
                              className={styles.authorLink}
                            >
                              {rev.autor}
                            </Link>
                          ) : (
                            <strong>{rev.autor}</strong>
                          )}
                          {rev.data && (
                            <span className={styles.reviewDate}>{rev.data}</span>
                          )}
                        </div>
                        <span className={styles.communityStars}>
                          {"★".repeat(rev.nota)}
                          {"☆".repeat(10 - rev.nota)} ({rev.nota}/10)
                        </span>
                      </div>
                      <p>"{rev.text}"</p>
                      <button
                        type="button"
                        className={styles.likeBtn}
                        onClick={() => handleLikeReview(rev.id)}
                      >
                        👍 Util ({rev.likes})
                      </button>
                    </div>
                  ))
                )}
              </div>

              {filmeSimilare.length > 0 && (
                <div className={styles.sectionBlock}>
                  <h3>Recomandări similare ({ETICHETE_GEN[film.gen] || film.gen})</h3>
                  <div className={styles.similarGrid}>
                    {filmeSimilare.map((sim) => (
                      <Link
                        key={sim.id}
                        to={`/filme/${sim.id}`}
                        className={styles.similarCard}
                        title={`${sim.titlu} (${sim.an})`}
                      >
                        <img src={sim.posterUrl} alt={`Poster ${sim.titlu}`} />
                        <span className={styles.similarCaption}>{sim.titlu}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {toast && (
        <div className="toast-notification" role="status" aria-live="polite">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}