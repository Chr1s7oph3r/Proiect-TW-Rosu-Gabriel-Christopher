import { useState } from "react";
import "./App.css";
import FilmList from "./components/FilmList.jsx";

const FILME_INITIALE = [
  { id: 1, titlu: "Interstellar", vazut: true, gen: "Sci-Fi / Adventure", rating: 8.6, snippet: '"O călătorie vizuală..."', posterClass: "poster-interstellar" },
  { id: 2, titlu: "Inception", vazut: false, gen: "Action / Sci-Fi", rating: 8.8, snippet: '"Un concept genial..."', posterClass: "poster-inception" },
  { id: 3, titlu: "Dune: Part Two", vazut: false, gen: "Adventure / Drama", rating: 8.5, snippet: '"Imens, epic, o capodoperă..."', posterClass: "poster-dune" }
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
 
  const [filme, setFilme] = useState(FILME_INITIALE);
  const [tema, setTema] = useState(temaInitiala);


  function handleToggle(id) {
    setFilme((prev) =>
      prev.map((f) => (f.id === id ? { ...f, vazut: !f.vazut } : f))
    );
  }

  function handleDelete(id) {
    setFilme((prev) => prev.filter((f) => f.id !== id));
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  
  const filmeDeVazut = filme.filter((f) => !f.vazut).length;

  return (
    <>
      <header className="site-header">
        <div className="nav-container">
          <div className="logo-area">
            <span className="logo-badge">M</span>
            <span className="logo-text">MOVIE APP</span>
          </div>
          <nav className="main-navigation">
            <a href="#" className="nav-link active">Dashboard</a>
            <a href="#" className="nav-link">Search</a>
            {/* Butonul pentru temă */}
            <button className="theme-toggle" onClick={handleTema} aria-pressed={tema === "dark"}>
              {tema === "dark" ? "☀️ Mod luminos" : "🌙 Mod întunecat"}
            </button>
          </nav>
        </div>
      </header>

      <section className="hero-search-section">
        <div className="hero-content">
          <h1>Bine ai venit în universul filmelor</h1>
          <p>
            Explorează baza de date, descoperă recenzii și gestionează-ți maratoanele cinematografice. <br/>
            <small style={{ color: "var(--accent-cyan)", fontWeight: "600" }}>
              Ai {filme.length} filme în bază, dintre care {filmeDeVazut} de văzut.
            </small>
          </p>
        </div>
      </section>

      <main className="main-dashboard-grid">
        <aside className="panel stats-sidebar">
          <h2>Statistici Platformă</h2>
          <ul className="stats-list">
            <li className="stat-item">
              <span className="stat-label">Filme în DB</span>
              <span className="stat-value">{filme.length}</span>
            </li>
            <li className="stat-item">
              <span className="stat-label">De văzut</span>
              <span className="stat-value">{filmeDeVazut}</span>
            </li>
          </ul>
        </aside>

        <section className="panel content-panel">
          <div className="section-heading">
            <h2>Filme Populare & Recenzii Recente</h2>
          </div>
          
          <FilmList filme={filme} onToggle={handleToggle} onDelete={handleDelete} />
        </section>
      </main>
    </>
  );
}