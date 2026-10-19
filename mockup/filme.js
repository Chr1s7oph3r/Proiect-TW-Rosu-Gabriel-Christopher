
const filme = [
  { id: 1, titlu: "Interstellar", vazut: true, gen: "Sci-Fi" },
  { id: 2, titlu: "Inception", vazut: false, gen: "Action" },
  { id: 3, titlu: "Dune: Part Two", vazut: false, gen: "Adventure" }
];

const GENURI = ["Sci-Fi", "Action", "Adventure", "Drama", "Comedy"];

function listeazaTitluri(lista) {
  return lista.map((f) => f.titlu);
}


function numaraDeVazut(lista) {
  return lista.filter((f) => !f.vazut).length;
}


function cautaDupaTitlu(lista, text) {
  return lista.filter((f) => f.titlu.toLowerCase().includes(text.toLowerCase()));
}

function nextId(lista) {
  return lista.reduce((max, f) => Math.max(max, f.id), 0) + 1;
}

function adaugaFilm(lista, titlu, gen = "Action") {
  const titluCurat = titlu.trim();
  
  if (titluCurat === "") {
    console.log("Titlul nu poate fi gol.");
    return lista;
  }
  
  if (!GENURI.includes(gen)) {
    console.log(`Gen invalid: ${gen}`);
    return lista;
  }
  
  const filmNou = {
    id: nextId(lista),
    titlu: titluCurat,
    vazut: false,
    gen: gen
  };
 
  return [...lista, filmNou];
}


function comutaVazut(lista, id) {
  return lista.map((f) => 
    f.id === id ? { ...f, vazut: !f.vazut } : f
  );
}

function stergeFilm(lista, id) {
  return lista.filter((f) => f.id !== id);
}


console.log("--- Citire ---");
console.log("Titluri:", listeazaTitluri(filme).join(", "));
console.log("De văzut:", numaraDeVazut(filme));
console.log("Căutare 'in':", listeazaTitluri(cautaDupaTitlu(filme, "in")).join(", "));

console.log("--- Adăugare ---");
let lista = adaugaFilm(filme, "The Matrix", "Sci-Fi");
console.log("Lista nouă:", lista.length, "filme");
console.log("Originalul a rămas cu:", filme.length, "filme");

console.log("--- Modificare și ștergere ---");
lista = comutaVazut(lista, 2);
console.log("După vizionarea id 2, de văzut:", numaraDeVazut(lista));
lista = stergeFilm(lista, 3);
console.log("După ștergerea id 3:", listeazaTitluri(lista).join(", "));

console.log("--- Validare ---");
adaugaFilm(lista, "   ", "Drama"); 
adaugaFilm(lista, "Batman", "Horror"); 