import { useState } from "react";
import { Link } from "react-router-dom";
import { ETICHETE_GEN } from "../constants.js";
import styles from "./FilmCard.module.css";

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

function getMedieComunitate(film) {
  const note = (film.recenziiComunitate || []).map((r) => r.nota);
  if (film.notaTa > 0) note.push(film.notaTa);
  if (note.length === 0) return null;
  return (note.reduce((s, n) => s + n, 0) / note.length).toFixed(1);
}

export default function FilmCard({ film, onToggle, onDelete, onToggleFavorite }) {
  const [imgError, setImgError] = useState(false);
  const arePoster = Boolean(film.posterUrl) && !imgError;
  const medieCineLog = getMedieComunitate(film);

  return (
    <li
      className={film.vazut ? `${styles.card} ${styles.done}` : styles.card}
      data-testid="item"
      data-id={film.id}
    >
      <div className={styles.posterContainer}>
        <Link to={`/filme/${film.id}`} className={styles.posterLink} tabIndex={-1}>
          {arePoster ? (
            <img
              src={film.posterUrl}
              alt={`Poster ${film.titlu}`}
              className={styles.poster}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.posterFallback}>
              <span className={styles.fallbackIcon}>🎬</span>
              <span className={styles.fallbackTitle}>{film.titlu}</span>
            </div>
          )}

          <div className={styles.posterOverlay}>
            <span className={styles.overlayCta}>Vezi detalii & recenzii →</span>
          </div>
        </Link>

        <button
          type="button"
          className={styles.btnFav}
          onClick={() => onToggleFavorite(film.id)}
          aria-label={
            film.favorit
              ? `Scoate ${film.titlu} de la favorite`
              : `Adaugă ${film.titlu} la favorite`
          }
          title={film.favorit ? "La favorite" : "Adaugă la favorite"}
        >
          {film.favorit ? "❤️" : "🤍"}
        </button>

        <div className={styles.ratingStack}>
          {film.ratingDb > 0 && (
            <span className={styles.imdbRating} title="Scor TMDB">
              ⭐ {Number(film.ratingDb).toFixed(1)}
            </span>
          )}
          {medieCineLog && (
            <span className={styles.communityRating} title="Media comunității CineLog">
              👥 {medieCineLog}
            </span>
          )}
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.metaRow}>
          <span className={`genre-tag ${getGenreClass(film.gen)}`}>
            {ETICHETE_GEN[film.gen] || film.gen}
          </span>
          <span className={styles.yearMeta}>
            {film.an}
            {film.durata ? ` • ${film.durata}m` : ""}
          </span>
        </div>

        <div className={styles.titleRow}>
          <input
            type="checkbox"
            checked={film.vazut}
            onChange={() => onToggle(film.id)}
            aria-label={`Marchează ${film.titlu} ca vizionat`}
            data-testid="item-toggle"
          />
          <Link
            to={`/filme/${film.id}`}
            className={styles.title}
            data-testid="item-link"
          >
            {film.titlu}
          </Link>
        </div>

        <div className={styles.reviewBox}>
          <div className={styles.reviewHeader}>
            <strong>Jurnalul tău</strong>
            {film.notaTa > 0 && (
              <span className={styles.userRating}>★ {film.notaTa}/10</span>
            )}
          </div>
          <p className={styles.snippet}>
            {film.recenzie
              ? `"${film.recenzie}"`
              : `${(film.recenziiComunitate || []).length} recenzii în comunitate.`}
          </p>
        </div>

        <div className={styles.footer}>
          <span className={film.vazut ? styles.statusWatched : styles.statusWatchlist}>
            {film.vazut ? "✓ Vizionat" : "◷ De văzut"}
          </span>

          <button
            type="button"
            className="btn-danger"
            onClick={() => onDelete(film.id)}
            aria-label={`Șterge filmul ${film.titlu}`}
            data-testid="item-delete"
          >
            🗑️ Șterge
          </button>
        </div>
      </div>
    </li>
  );
}