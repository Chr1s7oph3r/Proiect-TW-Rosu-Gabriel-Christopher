import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
  }, [tema]);

  function handleTema() {
    setTema((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} title="Înapoi la catalog">
            <span className={styles.logoBadge}>C</span>
            <span className={styles.logoText}>CINELOG</span>
          </Link>

          <div className={styles.rightArea}>
            <nav className={styles.nav} data-testid="nav">
              <NavLink to="/" end className={navClass}>
                Filme
              </NavLink>
              <NavLink to="/despre" className={navClass}>
                Despre
              </NavLink>
            </nav>

            <button
              type="button"
              className={styles.themeToggle}
              onClick={handleTema}
              aria-pressed={tema === "dark"}
            >
              {tema === "dark" ? "☀️ Mod luminos" : "🌙 Mod întunecat"}
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        Proiect Tehnologii Web — CineLog
      </footer>
    </div>
  );
}