import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFilme, fetchUtilizator } from "../api.js";
import styles from "./UtilizatorPage.module.css";

function getInitiale(nume) {
  return nume
    .split(" ")
    .map((c) => c[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function UtilizatorPage() {
  const { id } = useParams();
  const [utilizator, setUtilizator] = useState(null);
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    Promise.all([fetchUtilizator(id), fetchFilme()])
      .then(([userData, filmeData]) => {
        if (!ignore) {
          setUtilizator(userData);
          setFilme(filmeData);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setUtilizator(null);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className={styles.wrap}>
        <p className="info" data-testid="loading">
          Se încarcă profilul utilizatorului...
        </p>
      </div>
    );
  }

  if (error || !utilizator) {
    return (
      <div className={styles.wrap}>
        <section className="panel">
          <p className="error" data-testid="error">
            Profilul nu a putut fi încărcat: {error || "Utilizator inexistent"}
          </p>
          <Link to="/" className={styles.backLink}>
            ← Înapoi la catalog
          </Link>
        </section>
      </div>
    );
  }

  const filmeMap = Object.fromEntries(filme.map((f) => [f.id, f]));

  // Extragem toate recenziile scrise de acest utilizator din întreaga listă de filme
  const recenziiUser = filme
    .flatMap((film) =>
      (film.recenziiComunitate || [])
        .filter((r) => Number(r.userId) === Number(utilizator.id))
        .map((r) => ({
          ...r,
          filmId: film.id,
          filmTitlu: film.titlu,
          filmAn: film.an,
          filmPoster: film.posterUrl,
        }))
    )
    .sort((a, b) => (b.data || "").localeCompare(a.data || ""));

  const mediaNotelor =
    recenziiUser.length > 0
      ? (
          recenziiUser.reduce((sum, r) => sum + r.nota, 0) / recenziiUser.length
        ).toFixed(1)
      : "—";

  const liste = utilizator.liste || [];
  const filmeVazuteCount = (utilizator.filmeVazuteIds || []).length;

  return (
    <div className={styles.wrap}>
      <Link to="/" className={styles.backBtn}>
        ← Înapoi la catalog
      </Link>

      <section className={`panel ${styles.profileHeader}`}>
        <div
          className={styles.avatar}
          style={{ backgroundColor: utilizator.avatarCuloare || "var(--accent-cyan)" }}
        >
          {getInitiale(utilizator.nume)}
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.nameRow}>
            <h2>{utilizator.nume}</h2>
            <span className={styles.handle}>{utilizator.handle}</span>
            <span className="genre-tag genre-default">
              Fan {utilizator.genPreferat}
            </span>
          </div>
          <p className={styles.bio}>{utilizator.bio}</p>

          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Media notelor date</span>
              <strong className={styles.statGold}>★ {mediaNotelor} / 10</strong>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Filme vizionate</span>
              <strong>{filmeVazuteCount}</strong>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Recenzii scrise</span>
              <strong>{recenziiUser.length}</strong>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Liste create</span>
              <strong>{liste.length}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={`panel ${styles.section}`}>
        <h3>Listele lui {utilizator.nume} ({liste.length})</h3>
        {liste.length === 0 ? (
          <p className="empty">Acest utilizator nu are încă liste publice.</p>
        ) : (
          <div className={styles.listsGrid}>
            {liste.map((lista) => (
              <div key={lista.id} className={styles.listCard}>
                <div className={styles.listCardHeader}>
                  <h4>{lista.titlu}</h4>
                  <span className={styles.listCount}>
                    {lista.filmIds.length} filme
                  </span>
                </div>
                <p className={styles.listDesc}>{lista.descriere}</p>
                <div className={styles.postersRow}>
                  {lista.filmIds.map((fid) => {
                    const film = filmeMap[fid];
                    if (!film) return null;
                    return (
                      <Link
                        key={fid}
                        to={`/filme/${film.id}`}
                        className={styles.miniPosterLink}
                        title={`${film.titlu} (${film.an})`}
                      >
                        <img src={film.posterUrl} alt={`Poster ${film.titlu}`} />
                        <span>{film.titlu}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={`panel ${styles.section}`}>
        <h3>Recenziile lui {utilizator.nume} ({recenziiUser.length})</h3>
        {recenziiUser.length === 0 ? (
          <p className="empty">Nu există încă recenzii scrise de acest utilizator.</p>
        ) : (
          <div className={styles.reviewsList}>
            {recenziiUser.map((rev) => (
              <article key={rev.id} className={styles.reviewItem}>
                <Link to={`/filme/${rev.filmId}`} className={styles.reviewPoster}>
                  <img src={rev.filmPoster} alt={`Poster ${rev.filmTitlu}`} />
                </Link>
                <div className={styles.reviewBody}>
                  <div className={styles.reviewTop}>
                    <Link to={`/filme/${rev.filmId}`} className={styles.reviewMovieTitle}>
                      {rev.filmTitlu} <span>({rev.filmAn})</span>
                    </Link>
                    <span className={styles.reviewScore}>★ {rev.nota}/10</span>
                  </div>
                  <p className={styles.reviewText}>"{rev.text}"</p>
                  <div className={styles.reviewMeta}>
                    <span>{rev.data}</span>
                    <span>👍 {rev.likes} aprecieri</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}