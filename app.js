// app.js
// ============================================
// APP GOURMET – RECETAS NAVIDEÑAS
// ============================================
"use strict";

// 1) CARGAR RECETAS DESDE recetas.js (const RECETAS)
let TODAS_LAS_RECETAS = [];

try {
  // RECETAS viene de recetas.js (const RECETAS = recetas.map(...))
  if (Array.isArray(RECETAS)) {
    TODAS_LAS_RECETAS = RECETAS;
  } else {
    console.error("❌ RECETAS existe pero no es un array. Revisa recetas.js");
  }
} catch (e) {
  console.error("❌ No se ha encontrado RECETAS. Asegúrate de que recetas.js se carga ANTES que app.js");
  TODAS_LAS_RECETAS = [];
}

// 2) REFERENCIAS AL DOM
const listadoEl = document.getElementById("listado");
const buscarInput = document.getElementById("buscar");
const filtroBtns = document.querySelectorAll(".filtros button[data-filtro]");
const btnFavs = document.getElementById("btn-favs");

// Lista de la compra
const listaCompraEl = document.getElementById("lista-compra");
const btnVaciarLista = document.getElementById("btn-vaciar");

// Modal
const modal = document.getElementById("modal");
const modalFondo = modal.querySelector(".fondo");
const modalDialogo = modal.querySelector(".dialogo");
const modalCerrar = document.getElementById("cerrar");
const modalContenido = document.getElementById("contenido-modal");

// Accesibilidad y contraste
const btnContraste = document.getElementById("btn-contraste");
const btnTexto = document.getElementById("btn-texto");

// 3) ESTADO DE LA APLICACIÓN
let filtroActual = "todas";   // "todas" | "aperitivo" | "primero" | "segundo" | "postre"
let mostrarSoloFavs = false;
let textoBusqueda = "";

// Favoritos (localStorage)
const KEY_FAVS = "recetario_navidad_favs";
let favoritos = new Set(cargarFavoritos());

// Lista de la compra (localStorage)
const KEY_LISTA = "recetario_navidad_lista";
let listaCompra = new Set(cargarListaCompra());

// ============================================
// UTILIDADES DE LOCALSTORAGE
// ============================================
function cargarFavoritos() {
  try {
    const raw = localStorage.getItem(KEY_FAVS);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch {
    return [];
  }
}

function guardarFavoritos() {
  localStorage.setItem(KEY_FAVS, JSON.stringify([...favoritos]));
}

function cargarListaCompra() {
  try {
    const raw = localStorage.getItem(KEY_LISTA);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch {
    return [];
  }
}

function guardarListaCompra() {
  localStorage.setItem(KEY_LISTA, JSON.stringify([...listaCompra]));
}

// ============================================
// FILTRADO DE RECETAS
// ============================================
function recetaPasaFiltro(receta) {
  if (filtroActual !== "todas" && receta.category !== filtroActual) {
    return false;
  }

  if (mostrarSoloFavs && !favoritos.has(receta.id)) {
    return false;
  }

  if (textoBusqueda.trim() !== "") {
    const t = textoBusqueda.toLowerCase();
    const enTitulo = receta.title.toLowerCase().includes(t);
    const enDesc = receta.description.toLowerCase().includes(t);
    return enTitulo || enDesc;
  }

  return true;
}

function obtenerRecetasFiltradas() {
  return TODAS_LAS_RECETAS.filter(recetaPasaFiltro);
}

// ============================================
// PINTAR TARJETAS DE RECETA
// ============================================
function getEtiquetaCategoria(cat) {
  switch (cat) {
    case "aperitivo":
      return "Aperitivo";
    case "primero":
      return "Primer plato";
    case "segundo":
      return "Segundo plato";
    case "postre":
      return "Postre";
    default:
      return "Otros";
  }
}

function getClaseCategoria(cat) {
  switch (cat) {
    case "aperitivo":
      return "card-aperitivo";
    case "primero":
      return "card-primero";
    case "segundo":
      return "card-segundo";
    case "postre":
      return "card-postre";
    default:
      return "card-otros";
  }
}

function pintarRecetas() {
  const recetas = obtenerRecetasFiltradas();

  if (!recetas.length) {
    listadoEl.innerHTML = `
      <p class="sin-resultados">
        No se han encontrado recetas con esos filtros o búsqueda.
      </p>
    `;
    return;
  }

  const html = recetas.map((r) => {
    const esFav = favoritos.has(r.id);
    const claseCat = getClaseCategoria(r.category);
    const etiquetaCat = getEtiquetaCategoria(r.category);

    return `
      <article class="card-receta ${claseCat}" data-id="${r.id}">
        <header class="card-header">
          <span class="badge-categoria">${etiquetaCat}</span>
          <button 
            class="btn-fav-toggle" 
            type="button" 
            aria-label="${esFav ? "Quitar de favoritos" : "Añadir a favoritos"}"
          >
            ${esFav ? "★" : "☆"}
          </button>
        </header>

        <h3 class="card-titulo">${r.title}</h3>
        <p class="card-descripcion">${r.description}</p>

        <div class="card-meta">
          <span>⏱️ ${r.time}</span>
          <span>🎯 ${r.difficulty}</span>
        </div>

        <footer class="card-footer">
          <button class="btn ver-receta" type="button">
            Ver receta
          </button>
        </footer>
      </article>
    `;
  }).join("");

  listadoEl.innerHTML = html;
}

// ============================================
// MODAL – VER RECETA
// ============================================
function abrirModal(recetaId) {
  const receta = TODAS_LAS_RECETAS.find((r) => r.id === recetaId);
  if (!receta) return;

  const esFav = favoritos.has(receta.id);
  const etiquetaCat = getEtiquetaCategoria(receta.category);

  const ingredientesHtml = receta.ingredients
    .map((ing) => `<li>${ing}</li>`)
    .join("");

  const pasosHtml = receta.steps
    .map((p, i) => `<li data-paso="${i}">${p}</li>`)
    .join("");

  modalContenido.innerHTML = `
    <article class="detalle-receta">
      <header>
        <p class="detalle-categoria">${etiquetaCat}</p>
        <h2>${receta.title}</h2>
        <p class="detalle-meta">
          ⏱️ ${receta.time} · 🎯 ${receta.difficulty} · 👥 ${receta.servings} raciones
        </p>
      </header>

      <section>
        <h3>Descripción</h3>
        <p>${receta.description}</p>
      </section>

      <section>
        <h3>Ingredientes</h3>
        <ul class="lista-ingredientes">
          ${ingredientesHtml}
        </ul>
      </section>

      <section>
        <h3>Pasos</h3>
        <ol class="lista-pasos">
          ${pasosHtml}
        </ol>
      </section>

      <footer class="detalle-acciones">
        <button 
          type="button" 
          class="btn btn-primario" 
          id="btn-add-lista"
        >
          Añadir ingredientes a la lista
        </button>

        <button 
          type="button" 
          class="btn ${esFav ? "btn-fav-on" : "btn-fav-off"}" 
          id="btn-fav-detalle"
        >
          ${esFav ? "★ En favoritos" : "☆ Añadir a favoritos"}
        </button>

        <button 
          type="button" 
          class="btn btn-voz" 
          id="btn-voz"
        >
          🎙️ Asistente de voz
        </button>
      </footer>
    </article>
  `;

  modal.classList.add("abierto");
  modalDialogo.focus();

  // Eventos de los botones dentro del modal
  const btnAddLista = document.getElementById("btn-add-lista");
  const btnFavDetalle = document.getElementById("btn-fav-detalle");
  const btnVoz = document.getElementById("btn-voz");

  btnAddLista.addEventListener("click", () => {
    agregarIngredientesALista(receta);
  });

  btnFavDetalle.addEventListener("click", () => {
    toggleFavorito(receta.id);
    abrirModal(receta.id); // repinta estado del modal
    pintarRecetas();       // actualiza tarjetas
    sincronizarUIFiltros(); // por si está activado el filtro de favoritos
  });

  btnVoz.addEventListener("click", () => {
    iniciarAsistenteVoz(receta);
  });
}

function cerrarModal() {
  modal.classList.remove("abierto");
  detenerAsistenteVoz();
}

// ============================================
// LISTA DE LA COMPRA
// ============================================
function agregarIngredientesALista(receta) {
  if (Array.isArray(receta.ingredients)) {
    receta.ingredients.forEach((ing) => {
      if (ing && ing.trim()) {
        listaCompra.add(ing.trim());
      }
    });
  }
  guardarListaCompra();
  pintarListaCompra();
}

function pintarListaCompra() {
  if (!listaCompra.size) {
    listaCompraEl.innerHTML = `<p class="lista-vacia">Tu lista de la compra está vacía.</p>`;
    return;
  }

  const html = [...listaCompra].map((ing) => `
    <li class="item-lista">
      <span>${ing}</span>
      <button 
        type="button" 
        class="btn quitar-ingrediente" 
        data-ingrediente="${ing.replace(/"/g, "&quot;")}"
      >
        ×
      </button>
    </li>
  `).join("");

  listaCompraEl.innerHTML = `<ul class="lista-compra-ul">${html}</ul>`;
}

// Quitar un ingrediente (delegación)
listaCompraEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".quitar-ingrediente");
  if (!btn) return;
  const ing = btn.dataset.ingrediente;
  listaCompra.delete(ing);
  guardarListaCompra();
  pintarListaCompra();
});

// Vaciar lista
btnVaciarLista.addEventListener("click", () => {
  if (!listaCompra.size) return;
  const ok = confirm("¿Seguro que quieres vaciar toda la lista de la compra?");
  if (!ok) return;
  listaCompra.clear();
  guardarListaCompra();
  pintarListaCompra();
});

// ============================================
// FAVORITOS
// ============================================
function toggleFavorito(id) {
  if (favoritos.has(id)) {
    favoritos.delete(id);
  } else {
    favoritos.add(id);
  }
  guardarFavoritos();
}

// ============================================
// SINCRONIZAR UI DE FILTROS/FAVS
// ============================================
function sincronizarUIFiltros() {
  // Filtros de categoría
  filtroBtns.forEach((b) => {
    b.classList.toggle("active", b.dataset.filtro === filtroActual);
  });

  // Botón de favoritos (solo favoritos)
  if (btnFavs) {
    btnFavs.classList.toggle("active", mostrarSoloFavs);
  }
}

// Botón "Solo favoritos"
btnFavs.addEventListener("click", () => {
  mostrarSoloFavs = !mostrarSoloFavs;
  sincronizarUIFiltros();
  pintarRecetas();
});

// Delegación para estrella de fav en tarjetas
listadoEl.addEventListener("click", (e) => {
  const btnFav = e.target.closest(".btn-fav-toggle");
  if (btnFav) {
    const card = btnFav.closest(".card-receta");
    const id = Number(card.dataset.id);
    toggleFavorito(id);
    pintarRecetas();
    sincronizarUIFiltros();
    return;
  }

  const btnVer = e.target.closest(".ver-receta");
  if (btnVer) {
    const card = btnVer.closest(".card-receta");
    const id = Number(card.dataset.id);
    abrirModal(id);
  }
});

// ============================================
// FILTROS Y BÚSQUEDA
// ============================================
filtroBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filtroActual = btn.dataset.filtro;
    sincronizarUIFiltros();
    pintarRecetas();
  });
});

buscarInput.addEventListener("input", () => {
  textoBusqueda = buscarInput.value || "";
  pintarRecetas();
});

// ============================================
// MODAL – CIERRE
// ============================================
modalFondo.addEventListener("click", cerrarModal);
modalCerrar.addEventListener("click", cerrarModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("abierto")) {
    cerrarModal();
  }
});

// ============================================
// CONTRASTE Y TAMAÑO DE TEXTO
// ============================================
btnContraste.addEventListener("click", () => {
  document.body.classList.toggle("alto-contraste");
});

btnTexto.addEventListener("click", () => {
  document.body.classList.toggle("texto-grande");
});

// ============================================
// ASISTENTE DE VOZ
// ============================================
let reconocimiento = null;
let reconocimientoActivo = false;
let recetaEnLectura = null;
let indicePaso = 0;

const tieneSpeechRecognition =
  "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

function crearReconocimiento() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recog = new SR();
  recog.lang = "es-ES";
  recog.continuous = false;
  recog.interimResults = false;
  return recog;
}

function leerTexto(texto) {
  if (!("speechSynthesis" in window)) return;
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
}

function detenerAsistenteVoz() {
  recetaEnLectura = null;
  indicePaso = 0;
  reconocimientoActivo = false;
  if (reconocimiento) {
    try {
      reconocimiento.onresult = null;
      reconocimiento.onend = null;
      reconocimiento.onerror = null;
      reconocimiento.abort();
    } catch (e) {}
  }
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function escucharComando() {
  if (!tieneSpeechRecognition) return;
  if (!reconocimiento) {
    reconocimiento = crearReconocimiento();
  }
  if (reconocimientoActivo) return; // evita InvalidStateError

  reconocimientoActivo = true;

  reconocimiento.onresult = (ev) => {
    const texto = (ev.results[0][0].transcript || "").toLowerCase().trim();
    console.log("🎙️ Comando reconocido:", texto);

    if (!recetaEnLectura) return;

    if (texto.includes("siguiente")) {
      indicePaso++;
      if (indicePaso >= recetaEnLectura.steps.length) {
        leerTexto("Has llegado al final de la receta.");
        detenerAsistenteVoz();
        return;
      }
      leerTexto(`Paso ${indicePaso + 1}: ${recetaEnLectura.steps[indicePaso]}`);
    } else if (texto.includes("repetir") || texto.includes("otra vez")) {
      if (indicePaso < recetaEnLectura.steps.length) {
        leerTexto(`Repito el paso ${indicePaso + 1}: ${recetaEnLectura.steps[indicePaso]}`);
      }
    } else if (texto.includes("parar") || texto.includes("stop") || texto.includes("terminar")) {
      leerTexto("Asistente de voz detenido.");
      detenerAsistenteVoz();
      return;
    } else {
      leerTexto("No he entendido el comando. Puedes decir siguiente, repetir o parar.");
    }
  };

  reconocimiento.onend = () => {
    reconocimientoActivo = false;
    if (recetaEnLectura) {
      setTimeout(() => escucharComando(), 400);
    }
  };

  reconocimiento.onerror = () => {
    reconocimientoActivo = false;
  };

  try {
    reconocimiento.start();
  } catch (e) {
    console.warn("No se pudo iniciar el reconocimiento:", e);
    reconocimientoActivo = false;
  }
}

function iniciarAsistenteVoz(receta) {
  if (!("speechSynthesis" in window)) {
    alert("Tu navegador no soporta síntesis de voz.");
    return;
  }
  if (!tieneSpeechRecognition) {
    alert("Tu navegador no soporta reconocimiento de voz. Puedes escuchar la receta, pero no usar comandos.");
  }

  detenerAsistenteVoz();
  recetaEnLectura = receta;
  indicePaso = 0;

  const intro = `
    Vamos a cocinar la receta: ${receta.title}.
    Tiempo aproximado: ${receta.time}.
    Dificultad: ${receta.difficulty}.
    Empezamos con los ingredientes.
  `;
  leerTexto(intro);

  setTimeout(() => {
    leerTexto("Ingredientes:");
    receta.ingredients.forEach((ing) => {
      leerTexto(ing);
    });

    setTimeout(() => {
      if (!receta.steps.length) {
        leerTexto("Esta receta no tiene pasos detallados.");
        return;
      }
      leerTexto(`Paso 1: ${receta.steps[0]}`);
      if (tieneSpeechRecognition) {
        leerTexto("Cuando quieras pasar al siguiente paso, di: siguiente. También puedes decir repetir o parar.");
        escucharComando();
      }
    }, 1000);
  }, 1500);
}

// ============================================
// INICIALIZACIÓN
// ============================================
function init() {
  // Sincronizar filtros y botón de favoritos con el estado inicial
  sincronizarUIFiltros();
  pintarRecetas();
  pintarListaCompra();
}

document.addEventListener("DOMContentLoaded", init);
