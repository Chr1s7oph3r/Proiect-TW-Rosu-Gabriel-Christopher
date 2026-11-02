# 🎬 Movie App (Sistem pentru Gestiunea Recenziilor și Clasamentelor de Filme)

Proiect realizat pentru disciplina **Tehnologii Web**. Această aplicație este o platformă inspirată din Letterboxd, destinată pasionaților de film care vor să-și gestioneze jurnalele de vizionare, să acorde note și recenzii personale și să descopere filme similare.

---

## 👥 Autor
* **Roșu Gabriel-Christopher**

---

## 🛠️ Tehnologii Utilizate
* **HTML5 & CSS3** (Design modern, custom properties, suport pentru Dark/Light Mode)
* **JavaScript (ES6+)**
* **React.js (Vite)** – Componente, State Management (`useState`, `useEffect`), Randare Condiționată
* **Git & GitHub** – Controlul versiunilor

---

## 📂 Structura Proiectului
Proiectul este organizat în mod modular, urmărind etapele de dezvoltare:
* `/mockup` - Arhiva primelor etape (Etapele 1-2: pagini statice HTML, CSS și scripturi de bază).
* `/frontend` - Aplicația modernă de React (Etapele 3-5: componentizare, interactivitate, randare dinamică).

---

## 🚀 Funcționalități Implementate (Etapele 1-5)
1. **Catalog de Filme:** Listă completă de filme populare cu postere reale pre luate de pe TMDB.
2. **Sistem de Detalii & Recenzii:** Pagină dedicată fiecărui film (accesibilă prin apăsarea pe poster), unde utilizatorul poate citi informații despre regizor, distribuție și gen.
3. **Jurnal Personal:** Posibilitatea de a bifa filmele vizionate, de a scrie recenzii proprii și de a acorda note personalizate de la 1 la 10 prin intermediul unui sistem interactiv de steluțe.
4. **Comunitate & Filme Similare:** Secțiune de recenzii mock de la alți utilizatori și filtrare automată a filmelor similare în funcție de gen.
5. **Comutator Temă (Dark / Light Mode):** Suport nativ pentru alternarea între modul întunecat și cel luminos.
6. **Navigare Optimizată:** Integrare cu istoricul browserului (`window.history`) pentru a permite utilizarea corectă a butonului „Back”.

*Notă privind persistența datelor:* Conform cerințelor pentru Etapele 1-5, datele și recenziile introduse sunt stocate temporar în memoria aplicației (state local) și se resetează la reîncărcarea paginii. Persistența permanentă a datelor și conectarea la o bază de date vor fi implementate în etapele ulterioare (Etapa 10).

---

## ⚙️ Cum se rulează aplicația local

1. Clonează repository-ul:
   ```bash
   git clone [https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher.git](https://github.com/Chr1s7oph3r/Proiect-TW-Rosu-Gabriel-Christopher.git)
