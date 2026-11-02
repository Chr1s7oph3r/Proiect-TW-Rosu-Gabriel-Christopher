import { useState, useEffect } from "react";
import "./App.css";
import FilmList from "./components/FilmList.jsx";
import FilmDetails from "./components/FilmDetails.jsx";

const FILME_INITIALE = [
  { id: 1, titlu: "Interstellar", an: 2014, vazut: false, gen: "Sci-Fi", ratingDb: 8.6, recenzie: "", notaTa: 0, posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", regizor: "Christopher Nolan", cast: "Matthew McConaughey, Anne Hathaway" },
  { id: 2, titlu: "Inception", an: 2010, vazut: false, gen: "Sci-Fi", ratingDb: 8.8, recenzie: "", notaTa: 0, posterUrl: "https://www.movieposters.com/cdn/shop/products/7dfddd911b8040729896c5be83f8e139_6e2f4149-8cb4-414c-a33b-9e0065c55af3.jpg?v=1762491665&width=1680", regizor: "Christopher Nolan", cast: "Leonardo DiCaprio, Joseph Gordon-Levitt" },
  { id: 3, titlu: "Dune: Part Two", an: 2024, vazut: false, gen: "Adventure", ratingDb: 8.5, recenzie: "", notaTa: 0, posterUrl: "https://www.movieposters.com/cdn/shop/files/dune-part-two_tidfhvjl.jpg?v=1762975408&width=1680", regizor: "Denis Villeneuve", cast: "Timothée Chalamet, Zendaya" },
  { id: 4, titlu: "The Matrix", an: 1999, vazut: false, gen: "Sci-Fi", ratingDb: 8.7, recenzie: "", notaTa: 0, posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", regizor: "Lana Wachowski, Lilly Wachowski", cast: "Keanu Reeves, Laurence Fishburne" },
  { id: 5, titlu: "The Dark Knight", an: 2008, vazut: false, gen: "Action", ratingDb: 9.0, recenzie: "", notaTa: 0, posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", regizor: "Christopher Nolan", cast: "Christian Bale, Heath Ledger" },
  { id: 6, titlu: "Oppenheimer", an: 2023, vazut: false, gen: "Drama", ratingDb: 8.4, recenzie: "", notaTa: 0, posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", regizor: "Christopher Nolan", cast: "Cillian Murphy, Emily Blunt" },
  { id: 7, titlu: "La La Land", an: 2016, vazut: false, gen: "Drama", ratingDb: 8.0, recenzie: "", notaTa: 0, posterUrl: "https://www.movieposters.com/cdn/shop/files/LaLaLand.24x36.jpg?v=1762975415&width=1680", regizor: "Damien Chazelle", cast: "Ryan Gosling, Emma Stone" },
  { id: 8, titlu: "Fight Club", an: 1999, vazut: false, gen: "Drama", ratingDb: 8.8, recenzie: "", notaTa: 0, posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", regizor: "David Fincher", cast: "Brad Pitt, Edward Norton" }
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [filme, setFilme] = useState(FILME_INITIALE);
  const [tema, setTema] = useState(temaInitiala);
  const [filmSelectatId, setFilmSelectatId] = useState(null);

  const filmSelectat = filme.find(f => f.id === filmSelectatId);

  // FIX PENTRU BUTONUL "BACK" DIN BROWSER
  useEffect(() => {
    function handlePopState(e) {
      if (e.state && e.state.filmId) {
        setFilmSelectatId(e.state.filmId);
      } else {
        setFilmSelectatId(null);
      }
    }
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function deschideFilm(id) {
    setFilmSelectatId(id);
    // Împingem un nou "state" în istoricul browserului
    window.history.pushState({ filmId: id }, "", `/?film=${id}`);
  }

  function inchideFilm() {
    setFilmSelectatId(null);
    // Când dăm înapoi din butonul site-ului, revenim la url curat
    window.history.pushState(null, "", "/");
  }

  function handleToggle(id) {
    setFilme((prev) => prev.map((f) => (f.id === id ? { ...f, vazut: !f.vazut } : f)));
  }

  function handleDelete(id) {
    setFilme((prev) => prev.filter((f) => f.id !== id));
    if (filmSelectatId === id) inchideFilm();
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  function handleSaveReview(id, textRecenzie, notaTa) {
    setFilme((prev) => prev.map((f) => (f.id === id ? { ...f, recenzie: textRecenzie, notaTa: notaTa, vazut: true } : f)));
    inchideFilm(); // Te întoarce la pagina principală
  }

  const filmeDeVazut = filme.filter((f) => !f.vazut).length;

  return (
    <>
      <header className="site-header">
        <div className="nav-container">
          <div className="logo-area" onClick={inchideFilm} style={{ cursor: "pointer" }} title="Înapoi la Grilă">
            <span className="logo-badge">M</span>
            <span className="logo-text">MOVIE APP</span>
          </div>
          <nav className="main-navigation">
            <button className="theme-toggle" onClick={handleTema} aria-pressed={tema === "dark"}>
              {tema === "dark" ? "☀️ Mod luminos" : "🌙 Mod întunecat"}
            </button>
          </nav>
        </div>
      </header>

      {filmSelectat ? (
        <FilmDetails 
          film={filmSelectat} 
          filmeToate={filme} 
          onBack={inchideFilm} 
          onToggle={handleToggle}
          onDelete={handleDelete}
          onSaveReview={handleSaveReview}
          onSelectFilm={deschideFilm}
        />
      ) : (
        <>
          <section className="hero-search-section">
            <div className="hero-content">
              <h1>Colecția ta de filme</h1>
              <p>
                Apasă pe orice poster pentru a scrie o recenzie și a vedea detaliile.
                <br/> Ai {filme.length} filme adăugate, dintre care {filmeDeVazut} de văzut.
              </p>
            </div>
          </section>

          <main className="main-dashboard-grid">
            <FilmList 
              filme={filme} 
              onToggle={handleToggle} 
              onDelete={handleDelete} 
              onSelectFilm={deschideFilm} 
            />
          </main>
        </>
      )}
    </>
  );
}