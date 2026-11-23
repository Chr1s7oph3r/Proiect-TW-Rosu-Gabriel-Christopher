import { useState } from "react";
import { GENURI } from "../constants.js";
import styles from "./FilmForm.module.css";

const TITLU_MAX = 100;
const AN_CURENT = new Date().getFullYear();

export default function FilmForm({ onAdd }) {
  const [titlu, setTitlu] = useState("");
  const [an, setAn] = useState("");
  const [gen, setGen] = useState("Action");
  const [posterUrl, setPosterUrl] = useState("");

  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  function valideaza() {
    const t = titlu.trim();
    if (t === "") return "Titlul este obligatoriu.";
    if (t.length > TITLU_MAX) {
      return `Titlul are maximum ${TITLU_MAX} de caractere.`;
    }

    const anNum = Number(an);
    if (!an || Number.isNaN(anNum) || anNum < 1900 || anNum > AN_CURENT) {
      return `Anul trebuie să fie un număr valid între 1900 și ${AN_CURENT}.`;
    }

    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const mesaj = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      return;
    }

    setEroare("");
    setTrimite(true);

    try {
      await onAdd({
        titlu: titlu.trim(),
        an: Number(an),
        durata: 120,
        gen,
        regizor: "Necunoscut",
        cast: "Distribuție nespecificată",
        posterUrl: posterUrl.trim(),
        sinopsis: "Titlu propus de comunitate. Poți completa detaliile din pagina filmului.",
        vazut: false,
        favorit: false,
        ratingDb: 0,
        recenzie: "",
        notaTa: 0,
        recenziiComunitate: [],
      });

      setTitlu("");
      setAn("");
      setGen("Action");
      setPosterUrl("");
    } catch (err) {
      setEroare(err.message);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate data-testid="form">
      <div className={styles.fieldsRow}>
        <label className={styles.fieldTitle}>
          Titlu film *
          <input
            type="text"
            value={titlu}
            onChange={(e) => setTitlu(e.target.value)}
            placeholder="Ex: Arrival"
            maxLength={TITLU_MAX}
            aria-invalid={Boolean(eroare && eroare.includes("Titlul"))}
            data-testid="form-title"
          />
        </label>

        <label className={styles.fieldYear}>
          An *
          <input
            type="number"
            value={an}
            onChange={(e) => setAn(e.target.value)}
            placeholder="2016"
            aria-invalid={Boolean(eroare && eroare.includes("Anul"))}
            data-testid="form-an"
          />
        </label>

        <label className={styles.fieldGenre}>
          Gen
          <select
            value={gen}
            onChange={(e) => setGen(e.target.value)}
            data-testid="form-gen"
          >
            {GENURI.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.fieldPoster}>
          Poster URL (opțional)
          <input
            type="url"
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            placeholder="https://image.tmdb.org/..."
          />
        </label>

        <button
          type="submit"
          className={`btn ${styles.submit}`}
          disabled={trimite}
          data-testid="form-submit"
        >
          {trimite ? "Se trimite..." : "+ Propune filmul"}
        </button>
      </div>

      {eroare && (
        <p className="error" data-testid="form-error">
          {eroare}
        </p>
      )}
    </form>
  );
}