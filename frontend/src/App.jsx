import "./App.css";
import FilmList from "./components/FilmList.jsx";

// Am îmbogățit datele cu detaliile vizuale din Etapa 1
const filme = [
  { 
    id: 1, 
    titlu: "Interstellar", 
    vazut: true, 
    gen: "Sci-Fi / Adventure", 
    rating: 8.6,
    snippet: '"O călătorie vizuală extraordinară dincolo de galaxii..."',
    posterClass: "poster-interstellar"
  },
  { 
    id: 2, 
    titlu: "Inception", 
    vazut: false, 
    gen: "Action / Sci-Fi", 
    rating: 8.8,
    snippet: '"Un concept genial despre lumea viselor regizat de Nolan."',
    posterClass: "poster-inception"
  },
  { 
    id: 3, 
    titlu: "Dune: Part Two", 
    vazut: false, 
    gen: "Adventure / Drama", 
    rating: 8.5,
    snippet: '"Imens, epic, o capodoperă a cinematografiei moderne."',
    posterClass: "poster-dune"
  }
];

export default function App() {
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
            <a href="#" className="nav-link">Movies</a>
            <a href="#" className="nav-link">Reviews</a>
            <a href="#" className="nav-link">Marathons</a>
          </nav>
        </div>
      </header>

      <section className="hero-search-section">
        <div className="hero-content">
          <h1>Bine ai venit în universul filmelor</h1>
          {/* Am combinat textul tău original cu datele calculate */}
          <p>
            Explorează baza de date, descoperă recenzii și gestionează-ți maratoanele cinematografice. <br/>
            <small style={{ color: "var(--accent-cyan)", fontWeight: "600" }}>
              Ai {filme.length} filme în bază, dintre care {filmeDeVazut} de văzut.
            </small>
          </p>
          <form className="search-bar-form">
            <input type="text" placeholder="Caută după titlu, gen, actor sau regizor..." aria-label="Caută filme" />
            <button type="submit">Caută în DB</button>
          </form>
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
            {/* Am adus înapoi datele lipsă */}
            <li className="stat-item">
              <span className="stat-label">Utilizatori</span>
              <span className="stat-value">--</span>
            </li>
            <li className="stat-item">
              <span className="stat-label">Maratoane Active</span>
              <span className="stat-value">--</span>
            </li>
          </ul>
          <div className="quick-actions">
            <h3>Acțiuni Rapide</h3>
            <a href="#" className="action-btn">Adaugă Film Nou</a>
            <a href="#" className="action-btn">Creează Maraton</a>
          </div>
        </aside>

        <section className="panel content-panel">
          <div className="section-heading">
            <h2>Filme Populare & Recenzii Recente</h2>
            <span className="sub-info">Din tabelele Movies & Reviews</span>
          </div>
          
          <FilmList filme={filme} />
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 Movie App &bull; Proiect Tehnologii Web &bull; Conectat la Baza de Date SQLite</p>
      </footer>
    </>
  );
}