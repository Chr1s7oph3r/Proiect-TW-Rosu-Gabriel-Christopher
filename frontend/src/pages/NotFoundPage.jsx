import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.wrap}>
      <section className={`panel ${styles.card}`} data-testid="not-found">
        <h2>404 — Pagina nu există</h2>
        <p className="info">Adresa cerută nu duce nicăieri în catalogul CineLog.</p>
        <Link to="/" className="btn">
          Înapoi la filme
        </Link>
      </section>
    </div>
  );
}