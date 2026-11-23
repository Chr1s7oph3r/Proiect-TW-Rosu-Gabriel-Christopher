import FilmCard from "./FilmCard.jsx";
import styles from "./FilmList.module.css";

export default function FilmList({
  filme,
  totalFilme,
  onToggle,
  onDelete,
  onToggleFavorite,
  onResetFilters,
}) {
  if (totalFilme === 0) {
    return (
      <p className="empty" data-testid="empty">
        Lista de filme este goală. Adaugă primul film din formularul din stânga.
      </p>
    );
  }

  if (filme.length === 0) {
    return (
      <div className={styles.emptyFiltered}>
        <p className="empty">Niciun film nu corespunde căutării sau filtrelor selectate.</p>
        <button type="button" className={styles.resetBtn} onClick={onResetFilters}>
          Resetează filtrele
        </button>
      </div>
    );
  }

  return (
    <ul className={styles.grid}>
      {filme.map((film) => (
        <FilmCard
          key={film.id}
          film={film}
          onToggle={onToggle}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  );
}