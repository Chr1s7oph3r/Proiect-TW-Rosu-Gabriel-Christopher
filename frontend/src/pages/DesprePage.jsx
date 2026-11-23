import { Link } from "react-router-dom";
import styles from "./DesprePage.module.css";

export default function DesprePage() {
  return (
    <div className={styles.wrap}>
      <section className={`panel ${styles.card}`}>
        <h2>Despre CineLog</h2>
        <p>
          <strong>CineLog</strong> este o aplicație web de tip jurnal cinematic (inspirată de
          Letterboxd și IMDb), construită pas cu pas în cadrul proiectului de Tehnologii Web.
        </p>
        <p>
          Permite gestionarea catalogului personal de filme, filtrarea și sortarea titlurilor,
          acordarea de note și recenzii, marcarea filmelor vizionate sau favorite și explorarea
          detaliilor și recomandărilor similare.
        </p>
        <p className={styles.stack}>
          <strong>Stack:</strong> React, Vite, React Router, CSS Modules, JSON Server (etapele
          6–8), Node.js, Express, MariaDB, Docker (etapele următoare).
        </p>
        <Link to="/" className={styles.backLink}>
          ← Înapoi la catalogul de filme
        </Link>
      </section>
    </div>
  );
}