// app.js
// Lógica principal de la App Gourmet Navideña
// Usa el array RECETAS que viene desde recetas.js

// =======================
// Estado global
// =======================
const state = {
  filtro: "todas",
  busqueda: "",
  soloFavs: false,
  recetas: typeof RECETAS !== "undefined" ? RECETAS : [],
  favoritos: new Set(loadFavoritos()),
  listaCompra: loadListaCompra(),
  voz: {
    soportada:
      "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
    pasos: [],
    indice: 0,
    minutosPorPaso: null,
    utterance: null,
  },
};

// =======================
// Utilidades LocalStorage
// =======================
function loadFavoritos() {
  try {
    const data = localStorage.getItem("favoritos-recetas");
    if (!data) return [];
    const arr = JSON.parse(data);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveFavoritos() {
  localStorage.setItem(
    "favoritos-recetas",
    JSON.stringify(Array.from(state.favoritos))
  );
}

function loadListaCompra() {
  try {
    const data = localStorage.getItem("lista-compra");
    if (!data) return [];
    const arr = JSON.parse(data);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveListaCompra() {
  localStorage.setItem("lista-compra", JSON.stringify(state.listaCompra));
}

// =======================
// Referencias DOM
// =======================
const listadoEl = document.getElementById("listado");
const buscarEl = document.getElementById("buscar");
const filtrosNav = document.querySelector(".filtros");
const btnFavs = document.getElementById("btn-favs");
const listaCompraEl = document.getElementById("lista-compra");
const btnVaciarLista = document.getElementById("btn-vaciar");
const btnContraste = document.getElementById("btn-contraste");
const btnTexto = document.getElementById("btn-texto");

const modalEl = document.getElementById("modal");
const modalFondo = modalEl.querySelector(".fondo");
const modalDialogo = modalEl.querySelector(".dialogo");
const modalCerrar = document.getElementById("cerrar");
const contenidoModal = document.getElementById("contenido-modal");

// =======================
// Render listado
// =======================
function filtrarRecetas() {
  const texto = state.busqueda.toLowerCase();

  return state.recetas.filter((r) => {
    // filtro por categoría
    if (state.filtro !== "todas" && r.category !== state.filtro) {
      return false;
    }

    // solo favoritos
    if (state.soloFavs && !state.favoritos.has(r.id)) {
      return false;
    }

    // búsqueda por texto
    if (texto) {
      const t = (r.title || "").toLowerCase();
      const d = (r.description || "").toLowerCase();
      if (!t.includes(texto) && !d.includes(texto)) {
        return false;
      }
    }

    return true;
  });
}

function crearTarjetaHTML(receta) {
  const esFav = state.favoritos.has(receta.id);
  const categoriaLabel = {
    aperitivo: "Aperitivo",
    primero: "Primer plato",
    segundo: "Segundo plato",
    postre: "Postre",
  }[receta.category] || "Otros";

  const imagen =
    receta.image && receta.image.trim() !== ""
      ? `<img src="${receta.image}" alt="Foto de ${receta.title}">`
      : `<div class="img-placeholder" aria-hidden="true">🍽️</div>`;

  return `
    <article class="tarjeta" data-id="${receta.id}">
      <button class="fav ${esFav ? "activo" : ""}" aria-label="${
    esFav ? "Quitar de favoritos" : "Añadir a favoritos"
  }">${esFav ? "★" : "☆"}</button>

      <figure class="tarjeta-img">
        ${imagen}
      </figure>

      <div class="tarjeta-body">
        <h3>${receta.title}</h3>
        <p class="categoria">${categoriaLabel}</p>
        <p class="meta">${receta.time || ""} · ${receta.difficulty || ""}</p>
        <p class="descripcion">${receta.description || ""}</p>

        <div class="tarjeta-acciones">
          <button class="btn ver">Ver receta</button>
          <button class="btn add-lista">Añadir a la lista</button>
        </div>
      </div>
    </article>
  `;
}

function renderListado() {
  const recetasFiltradas = filtrarRecetas();

  if (!recetasFiltradas.length) {
    listadoEl.innerHTML =
      '<p class="mensaje-vacio">No se han encontrado recetas con esos filtros.</p>';
    return;
  }

  listadoEl.innerHTML = recetasFiltradas.map(crearTarjetaHTML).join("");
}

// =======================
// Lista de la compra
// =======================
function renderListaCompra() {
  if (!state.listaCompra.length) {
    listaCompraEl.innerHTML =
      '<p class="mensaje-vacio">La lista está vacía. Añade ingredientes desde una receta.</p>';
    return;
  }

  const html = state.listaCompra
    .map(
      (item, i) => `
    <div class="item-lista ${item.completado ? "hecho" : ""}">
      <label>
        <input type="checkbox" data-index="${i}" ${
        item.completado ? "checked" : ""
      }>
        <span>${item.texto}</span>
      </label>
      <button class="borrar-item" data-index="${i}" aria-label="Eliminar ingrediente">×</button>
    </div>
  `
    )
    .join("");

  listaCompraEl.innerHTML = html;
}

function agregarIngredientesALista(ingredientes) {
  if (!Array.isArray(ingredientes)) return;

  ingredientes.forEach((ing) => {
    const texto = ing.trim();
    if (!texto) return;

    const yaExiste = state.listaCompra.some(
      (item) => item.texto.toLowerCase() === texto.toLowerCase()
    );
    if (!yaExiste) {
      state.listaCompra.push({ texto, completado: false });
    }
  });

  saveListaCompra();
  renderListaCompra();
}

function manejarClickListaCompra(e) {
  const check = e.target.closest('input[type="checkbox"]');
  const btnBorrar = e.target.closest(".borrar-item");

  if (check) {
    const index = Number(check.dataset.index);
    if (!Number.isNaN(index) && state.listaCompra[index]) {
      state.listaCompra[index].completado = check.checked;
      saveListaCompra();
      renderListaCompra();
    }
  }

  if (btnBorrar) {
    const index = Number(btnBorrar.dataset.index);
    if (!Number.isNaN(index)) {
      state.listaCompra.splice(index, 1);
      saveListaCompra();
      renderListaCompra();
    }
  }
}

// =======================
// Modal de receta
// =======================
function abrirModalReceta(id) {
  const receta = state.recetas.find((r) => r.id === id);
  if (!receta) return;

  const ingredientes = receta.ingredients || [];
  const pasos = receta.steps || [];

  const listaIngHTML = ingredientes
    .map(
      (ing, i) => `
    <li>
      <label>
        <input type="checkbox" data-ing-index="${i}">
        <span>${ing}</span>
      </label>
    </li>
  `
    )
    .join("");

  const listaPasosHTML = pasos
    .map((p, i) => `<li><strong>Paso ${i + 1}:</strong> ${p}</li>`)
    .join("");

  const vozDisponible = state.voz.soportada;

  contenidoModal.innerHTML = `
    <header class="modal-header">
      <h2>${receta.title}</h2>
      <p class="meta">${receta.time || ""} · ${
    receta.difficulty || ""
  } · Raciones: 4</p>
    </header>

    <section class="modal-section">
      <h3>Descripción</h3>
      <p>${receta.description || ""}</p>
    </section>

    <section class="modal-section">
      <div class="modal-section-header">
        <h3>Ingredientes</h3>
        <button class="btn small" id="btn-add-ingredientes">
          Añadir todos a la lista
        </button>
      </div>
      <ul class="lista-ingredientes">
        ${listaIngHTML || "<li>No hay ingredientes definidos.</li>"}
      </ul>
    </section>

    <section class="modal-section">
      <div class="modal-section-header">
        <h3>Cocina guiada</h3>
        ${
          vozDisponible
            ? `
          <div class="controles-voz">
            <button class="btn small" id="voz-iniciar">Leer desde el principio</button>
            <button class="btn small" id="voz-siguiente">Siguiente paso</button>
            <button class="btn small" id="voz-repetir">Repetir paso</button>
            <button class="btn small" id="voz-parar">Parar voz</button>
          </div>
        `
            : `<p class="mensaje-vacio">
                 El asistente de voz no está disponible en este navegador.
               </p>`
        }
      </div>

      <ol class="lista-pasos">
        ${listaPasosHTML || "<li>No hay pasos definidos.</li>"}
      </ol>
    </section>
  `;

  // configurar voz para esta receta
  prepararVozParaReceta(receta);

  // eventos dentro del modal
  const btnAddIngredientes = contenidoModal.querySelector(
    "#btn-add-ingredientes"
  );
  if (btnAddIngredientes) {
    btnAddIngredientes.addEventListener("click", () =>
      agregarIngredientesALista(ingredientes)
    );
  }

  const listaIngEl = contenidoModal.querySelector(".lista-ingredientes");
  if (listaIngEl) {
    listaIngEl.addEventListener("change", (e) => {
      const check = e.target.closest('input[type="checkbox"]');
      if (!check) return;
      const index = Number(check.dataset.ingIndex);
      if (!Number.isNaN(index) && ingredientes[index]) {
        agregarIngredientesALista([ingredientes[index]]);
      }
    });
  }

  if (vozDisponible) {
    const btnVozIniciar = contenidoModal.querySelector("#voz-iniciar");
    const btnVozSiguiente = contenidoModal.querySelector("#voz-siguiente");
    const btnVozRepetir = contenidoModal.querySelector("#voz-repetir");
    const btnVozParar = contenidoModal.querySelector("#voz-parar");

    btnVozIniciar?.addEventListener("click", () =>
      vozLeerDesdePrincipio()
    );
    btnVozSiguiente?.addEventListener("click", () => vozSiguientePaso());
    btnVozRepetir?.addEventListener("click", () => vozRepetirPaso());
    btnVozParar?.addEventListener("click", () => vozParar());
  }

  modalEl.classList.add("abierto");
  modalDialogo.setAttribute("aria-modal", "true");
  modalDialogo.setAttribute("role", "dialog");
  modalDialogo.focus();

  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  modalEl.classList.remove("abierto");
  modalDialogo.removeAttribute("aria-modal");
  modalDialogo.removeAttribute("role");
  document.body.style.overflow = "";
  vozParar();
}

// =======================
// Voz – cocina guiada
// =======================
function parseMinutosDeTexto(timeText) {
  if (!timeText) return null;
  const m = String(timeText).match(/(\d+)\s*min/i);
  if (!m) return null;
  const num = parseInt(m[1], 10);
  return Number.isNaN(num) ? null : num;
}

function prepararVozParaReceta(receta) {
  if (!state.voz.soportada) return;

  const pasos = receta.steps || [];
  const totalMin = parseMinutosDeTexto(receta.time);
  let minutosPorPaso = null;

  if (totalMin && pasos.length) {
    minutosPorPaso = Math.max(1, Math.round(totalMin / pasos.length));
  }

  state.voz.pasos = pasos;
  state.voz.indice = 0;
  state.voz.minutosPorPaso = minutosPorPaso;
  state.voz.utterance = null;
}

function vozParar() {
  if (!state.voz.soportada) return;
  window.speechSynthesis.cancel();
  state.voz.utterance = null;
}

function vozHablarPasoActual() {
  if (!state.voz.soportada) return;
  const pasos = state.voz.pasos;
  const i = state.voz.indice;
  if (!pasos.length || !pasos[i]) return;

  vozParar();

  let texto = `Paso ${i + 1} de ${pasos.length}. ${pasos[i]}.`;
  if (state.voz.minutosPorPaso) {
    texto += ` Tiempo aproximado para este paso: ${state.voz.minutosPorPaso} minutos. Cuando termines, puedes pedir el siguiente paso.`;
  }

  const utt = new SpeechSynthesisUtterance(texto);
  utt.lang = "es-ES";
  utt.rate = 0.95;

  utt.onend = () => {
    // aquí podríamos avanzar automático, pero para personas ciegas
    // es más seguro que ellas pulsen “Siguiente paso”
  };

  state.voz.utterance = utt;
  window.speechSynthesis.speak(utt);
}

function vozLeerDesdePrincipio() {
  if (!state.voz.soportada) return;
  state.voz.indice = 0;
  vozHablarPasoActual();
}

function vozSiguientePaso() {
  if (!state.voz.soportada) return;
  if (!state.voz.pasos.length) return;

  if (state.voz.indice < state.voz.pasos.length - 1) {
    state.voz.indice++;
    vozHablarPasoActual();
  } else {
    vozParar();
    const fin = new SpeechSynthesisUtterance(
      "Has llegado al final de la receta. ¡Buen provecho!"
    );
    fin.lang = "es-ES";
    window.speechSynthesis.speak(fin);
  }
}

function vozRepetirPaso() {
  if (!state.voz.soportada) return;
  if (!state.voz.pasos.length) return;
  vozHablarPasoActual();
}

// =======================
// Eventos principales
// =======================
function manejarClickListado(e) {
  const tarjeta = e.target.closest(".tarjeta");
  if (!tarjeta) return;
  const id = Number(tarjeta.dataset.id);
  if (Number.isNaN(id)) return;

  if (e.target.closest(".fav")) {
    // toggle favorito
    if (state.favoritos.has(id)) {
      state.favoritos.delete(id);
    } else {
      state.favoritos.add(id);
    }
    saveFavoritos();
    renderListado();
    return;
  }

  if (e.target.closest(".ver")) {
    abrirModalReceta(id);
    return;
  }

  if (e.target.closest(".add-lista")) {
    const receta = state.recetas.find((r) => r.id === id);
    if (!receta) return;
    agregarIngredientesALista(receta.ingredients || []);
    return;
  }
}

function manejarFiltros(e) {
  const btn = e.target.closest("button[data-filtro]");
  if (!btn) return;

  const filtro = btn.dataset.filtro;
  state.filtro = filtro;

  // marcar activo
  filtrosNav.querySelectorAll("button[data-filtro]").forEach((b) => {
    b.classList.toggle("active", b === btn);
  });

  state.soloFavs = false;
  btnFavs.classList.remove("active");

  renderListado();
}

function manejarFavsClick() {
  state.soloFavs = !state.soloFavs;
  btnFavs.classList.toggle("active", state.soloFavs);
  renderListado();
}

function manejarBusqueda(e) {
  state.busqueda = e.target.value || "";
  renderListado();
}

// =======================
// Accesibilidad visual
// =======================
let textoGrandeActivado = false;

function toggleContraste() {
  document.body.classList.toggle("alto-contraste");
}

function toggleTamanoTexto() {
  textoGrandeActivado = !textoGrandeActivado;
  document.body.classList.toggle("texto-grande", textoGrandeActivado);
  btnTexto.textContent = textoGrandeActivado ? "Texto grande ON" : "Texto normal";
}

// =======================
// Init
// =======================
function init() {
  // Render inicial
  renderListado();
  renderListaCompra();

  // Eventos
  listadoEl.addEventListener("click", manejarClickListado);
  filtrosNav.addEventListener("click", manejarFiltros);
  btnFavs.addEventListener("click", manejarFavsClick);
  buscarEl.addEventListener("input", manejarBusqueda);

  listaCompraEl.addEventListener("click", manejarClickListaCompra);

  btnVaciarLista.addEventListener("click", () => {
    state.listaCompra = [];
    saveListaCompra();
    renderListaCompra();
  });

  modalCerrar.addEventListener("click", cerrarModal);
  modalFondo.addEventListener("click", cerrarModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl.classList.contains("abierto")) {
      cerrarModal();
    }
  });

  btnContraste.addEventListener("click", toggleContraste);
  btnTexto.addEventListener("click", toggleTamanoTexto);
}

document.addEventListener("DOMContentLoaded", init);
