import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilmList from "../components/FilmList.jsx";
import FilmForm from "../components/FilmForm.jsx";
import { createFilm, deleteFilm, fetchFilme, updateFilm } from "../api.js";
import styles from "./FilmePage.module.css";

function getMedieNumerica(film) {
  const note = (film.recenziiComunitate || []).map((r) => r.nota);
  if (film.notaTa > 0) note.push(film.notaTa);
  if (note.length === 0) return 0;
  return note.reduce((s, n) => s + n, 0) / note.length;
}

export default function FilmePage() {
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cautare, setCautare] = useState("");
  const [filtruGen, setFiltruGen] = useState("Toate");
  const [filtruStatus, setFiltruStatus] = useState("Toate");
  const [sortare, setSortare] = useState("implicit");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchFilme();
        if (!ignore) setFilme(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  function arataToast(mesaj) {
    setToast(mesaj);
  }

  async function handleAdd(film) {
    const creat = await createFilm(film);
    setFilme((prev) => [...prev, creat]);
    arataToast(`„${creat.titlu}” a fost adăugat în catalog.`);
  }

  async function handleToggle(id) {
    const film = filme.find((f) => f.id === id);
    if (!film) return;
    try {
      const actualizat = await updateFilm(id, { vazut: !film.vazut });
      setFilme((prev) => prev.map((f) => (f.id === id ? actualizat : f)));
      setError(null);
      arataToast(
        actualizat.vazut
          ? `„${actualizat.titlu}” marcat ca vizionat.`
          : `„${actualizat.titlu}” mutat la De văzut.`
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggleFavorite(id) {
    const film = filme.find((f) => f.id === id);
    if (!film) return;
    try {
      const actualizat = await updateFilm(id, { favorit: !film.favorit });
      setFilme((prev) => prev.map((f) => (f.id === id ? actualizat : f)));
      setError(null);
      arataToast(
        actualizat.favorit
          ? `„${actualizat.titlu}” adăugat la Favorite.`
          : `„${actualizat.titlu}” scos de la Favorite.`
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    const film = filme.find((f) => f.id === id);
    try {
      await deleteFilm(id);
      setFilme((prev) => prev.filter((f) => f.id !== id));
      setError(null);
      if (film) arataToast(`„${film.titlu}” a fost șters din catalog.`);
    } catch (err) {
      setError(err.message);
    }
  }

  function resetFilters() {
    setCautare("");
    setFiltruGen("Toate");
    setFiltruStatus("Toate");
    setSortare("implicit");
  }

  // Statistici derivate
  const filmeVazute = filme.filter((f) => f.vazut);
  const filmeDeVazut = filme.length - filmeVazute.length;
  const filmeFavorite = filme.filter((f) => f.favorit).length;
  const procentVazut =
    filme.length > 0 ? Math.round((filmeVazute.length / filme.length) * 100) : 0;

  const filmeNotate = filme.filter((f) => f.notaTa > 0);
  const mediaTa =
    filmeNotate.length > 0
      ? (filmeNotate.reduce((acc, f) => acc + f.notaTa, 0) / filmeNotate.length).toFixed(1)
      : "—";

  const minuteVazute = filmeVazute.reduce(
    (acc, f) => acc + (Number(f.durata) || 0),
    0
  );
  const oreVazute = Math.floor(minuteVazute / 60);
  const restMinute = minuteVazute % 60;

  // Recomandarea zilei
  const candidatiSpotlight = filme.filter((f) => !f.vazut);
  const listaSpotlight = candidatiSpotlight.length > 0 ? candidatiSpotlight : filme;
  const filmRecomandat =
    listaSpotlight.length > 0
      ? [...listaSpotlight].sort((a, b) => (b.ratingDb || 0) - (a.ratingDb || 0))[0]
      : null;

  const genuriDisponibile = ["Toate", ...new Set(filme.map((f) => f.gen))];

  const filmeFiltrate = filme
    .filter((f) => {
      const q = cautare.trim().toLowerCase();
      if (q) {
        const matchTitlu = f.titlu.toLowerCase().includes(q);
        const matchRegizor = (f.regizor || "").toLowerCase().includes(q);
        const matchCast = (f.cast || "").toLowerCase().includes(q);
        if (!matchTitlu && !matchRegizor && !matchCast) return false;
      }
      if (filtruGen !== "Toate" && f.gen !== filtruGen) return false;
      if (filtruStatus === "De văzut" && f.vazut) return false;
      if (filtruStatus === "Vizionate" && !f.vazut) return false;
      if (filtruStatus === "Favorite" && !f.favorit) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortare === "tmdb") return (b.ratingDb || 0) - (a.ratingDb || 0);
      if (sortare === "comunitate") return getMedieNumerica(b) - getMedieNumerica(a);
      if (sortare === "notaTa") return (b.notaTa || 0) - (a.notaTa || 0);
      if (sortare === "an") return (b.an || 0) - (a.an || 0);
      if (sortare === "titlu") return a.titlu.localeCompare(b.titlu);
      return 0;
    });

  // Ultimele 6 recenzii din comunitate (ordonate după dată descrescător)
  const ultimeleRecenzii = filme
    .flatMap((film) =>
      (film.recenziiComunitate || []).map((r) => ({
        ...r,
        filmId: film.id,
        filmTitlu: film.titlu,
        filmAn: film.an,
        filmPoster: film.posterUrl,
      }))
    )
    .sort((a, b) => (b.data || "").localeCompare(a.data || ""))
    .slice(0, 6);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1>Descoperă, notează și discută filme</h1>
            <p>
              Explorează catalogul CineLog, compară scorul TMDB cu media comunității și
              descoperă listele altor cinefili.
            </p>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Progres vizionare</span>
                <strong className={styles.statValue}>
                  {filmeVazute.length}/{filme.length} ({procentVazut}%)
                </strong>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${procentVazut}%` }}
                  />
                </div>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Media notelor tale</span>
                <strong className={styles.statValue}>★ {mediaTa}</strong>
                <small className={styles.statSub}>{filmeNotate.length} filme notate</small>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Timp vizionat</span>
                <strong className={styles.statValue}>
                  {oreVazute}h {restMinute}m
                </strong>
                <small className={styles.statSub}>❤️ {filmeFavorite} favorite</small>
              </div>
            </div>
          </div>

          {filmRecomandat && !loading && (
            <div className={styles.spotlightCard}>
              <span className={styles.spotlightEyebrow}>✨ Recomandarea zilei</span>
              <h3>
                {filmRecomandat.titlu} <span>({filmRecomandat.an})</span>
              </h3>
              <p className={styles.spotlightMeta}>
                {filmRecomandat.gen} • ⭐ {Number(filmRecomandat.ratingDb).toFixed(1)} TMDB
                {filmRecomandat.durata ? ` • ${filmRecomandat.durata} min` : ""}
              </p>
              <p className={styles.spotlightSynopsis}>
                {filmRecomandat.sinopsis || `Regizat de ${filmRecomandat.regizor}.`}
              </p>
              <Link
                to={`/filme/${filmRecomandat.id}`}
                className={styles.btnSpotlight}
              >
                Vezi detalii & recenzii →
              </Link>
            </div>
          )}
        </div>
      </section>

      <div className={styles.contentWrap}>
        <section className="panel">
          <div className={styles.catalogHeader}>
            <div>
              <h2>Catalogul de filme</h2>
              <p className={styles.summary}>
                {filme.length} filme, dintre care {filmeDeVazut} de văzut • afișate{" "}
                {filmeFiltrate.length}
              </p>
            </div>

            <div className={styles.controls}>
              <input
                type="search"
                className={styles.searchInput}
                value={cautare}
                onChange={(e) => setCautare(e.target.value)}
                placeholder="Caută titlu, regizor, actor..."
                aria-label="Caută filme"
              />

              <select
                className={styles.sortSelect}
                value={sortare}
                onChange={(e) => setSortare(e.target.value)}
                aria-label="Sortează filmele"
              >
                <option value="implicit">Sortare: Implicită</option>
                <option value="tmdb">Notă TMDB (mare → mică)</option>
                <option value="comunitate">Media CineLog (mare → mică)</option>
                <option value="notaTa">Nota ta (mare → mică)</option>
                <option value="an">An (cele mai noi)</option>
                <option value="titlu">Titlu (A → Z)</option>
              </select>
            </div>
          </div>

          <div className={styles.filtersBar}>
            <div className={styles.filterGroup} role="group" aria-label="Filtrare după status">
              {["Toate", "De văzut", "Vizionate", "Favorite"].map((st) => (
                <button
                  type="button"
                  key={st}
                  className={
                    filtruStatus === st
                      ? `${styles.filterPill} ${styles.pillActive}`
                      : styles.filterPill
                  }
                  onClick={() => setFiltruStatus(st)}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className={styles.filterGroup} role="group" aria-label="Filtrare după gen">
              {genuriDisponibile.map((g) => (
                <button
                  type="button"
                  key={g}
                  className={
                    filtruGen === g
                      ? `${styles.filterPill} ${styles.pillGenreActive}`
                      : styles.filterPill
                  }
                  onClick={() => setFiltruGen(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div>
              <p className="info" data-testid="loading">
                Se încarcă lista de filme...
              </p>
              <div className={styles.skeletonGrid} aria-hidden="true">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className={styles.skeletonCard}>
                    <div className={styles.skeletonPoster} />
                    <div className={styles.skeletonLine} />
                    <div className={`${styles.skeletonLine} ${styles.short}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="error" data-testid="error">
              Nu am putut încărca datele: {error}. Rulează <code>npm run api</code>?
            </p>
          )}

          {!loading && (
            <FilmList
              filme={filmeFiltrate}
              totalFilme={filme.length}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
              onResetFilters={resetFilters}
            />
          )}
        </section>

        {!loading && ultimeleRecenzii.length > 0 && (
          <section className="panel">
            <div className={styles.sectionHeading}>
              <h2>Ultimele recenzii din comunitate</h2>
              <p className={styles.summary}>
                Apasă pe numele oricărui autor pentru a-i vedea profilul, media notelor și
                listele de filme.
              </p>
            </div>

            <div className={styles.recentReviewsGrid}>
              {ultimeleRecenzii.map((rev) => (
                <article key={`${rev.filmId}-${rev.id}`} className={styles.recentCard}>
                  <Link to={`/filme/${rev.filmId}`} className={styles.recentPoster}>
                    <img src={rev.filmPoster} alt={`Poster ${rev.filmTitlu}`} />
                  </Link>

                  <div className={styles.recentBody}>
                    <div className={styles.recentTop}>
                      {rev.userId ? (
                        <Link
                          to={`/utilizatori/${rev.userId}`}
                          className={styles.authorLink}
                        >
                          {rev.autor}
                        </Link>
                      ) : (
                        <span className={styles.authorLink}>{rev.autor}</span>
                      )}
                      <span className={styles.recentScore}>★ {rev.nota}/10</span>
                    </div>

                    <Link to={`/filme/${rev.filmId}`} className={styles.recentMovieLink}>
                      {rev.filmTitlu} ({rev.filmAn})
                    </Link>

                    <p className={styles.recentQuote}>"{rev.text}"</p>
                    <span className={styles.recentDate}>{rev.data}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className={`panel ${styles.proposePanel}`}>
          <div className={styles.proposeHeader}>
            <h2>Nu găsești un film? Propune-l comunității</h2>
            <p className={styles.summary}>
              La fel ca pe TMDB, poți trimite un titlu care lipsește din baza noastră de
              date.
            </p>
          </div>
          <FilmForm onAdd={handleAdd} />
        </section>
      </div>

      {toast && (
        <div className="toast-notification" role="status" aria-live="polite">
          ✓ {toast}
        </div>
      )}
    </>
  );
}