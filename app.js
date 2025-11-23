// ============================================================
// ESTADO GLOBAL
// ============================================================
const estado = {
  filtro: "todas",
  busqueda: "",
  verSoloFavoritos: false,
  favoritos: [],
  listaCompra: [],
  textoGrande: false,
  altoContraste: false,
  vozActiva: false,
  pasoActual: null // { recetaId, indice }
};

// Claves de localStorage
const LS_FAVORITOS = "gourmet_favoritos";
const LS_LISTA = "gourmet_lista";
const LS_ACCES = "gourmet_accesibilidad";

// Referencias al DOM
let listadoEl;
let filtrosEl;
let buscarEl;
let modalEl;
let modalContenidoEl;
let modalCerrarEl;
let listaCompraEl;
let btnVaciar;
let btnContraste;
let btnTexto;

// Voz
let synth;
let vozDisponible = false;

// ============================================================
// UTILIDADES LOCALSTORAGE
// ============================================================
function cargarEstadoLocal() {
  try {
    const favs = JSON.parse(localStorage.getItem(LS_FAVORITOS));
    if (Array.isArray(favs)) estado.favoritos = favs;

    const lista = JSON.parse(localStorage.getItem(LS_LISTA));
    if (Array.isArray(lista)) estado.listaCompra = lista;

    const acces = JSON.parse(localStorage.getItem(LS_ACCES));
    if (acces && typeof acces === "object") {
      estado.textoGrande = !!acces.textoGrande;
      estado.altoContraste = !!acces.altoContraste;
    }
  } catch (e) {
    console.warn("No se pudo cargar localStorage:", e);
  }
}

function guardarFavoritos() {
  localStorage.setItem(LS_FAVORITOS, JSON.stringify(estado.favoritos));
}

function guardarLista() {
  localStorage.setItem(LS_LISTA, JSON.stringify(estado.listaCompra));
}

function guardarAccesibilidad() {
  localStorage.setItem(
    LS_ACCES,
    JSON.stringify({
      textoGrande: estado.textoGrande,
      altoContraste: estado.altoContraste
    })
  );
}

// ============================================================
// FILTRADO Y BÚSQUEDA
// ============================================================
function filtrarRecetas() {
  let data = Array.isArray(RECETAS) ? RECETAS.slice() : [];

  if (estado.filtro !== "todas") {
    data = data.filter((r) => r.category === estado.filtro);
  }

  if (estado.verSoloFavoritos) {
    data = data.filter((r) => estado.favoritos.includes(r.id));
  }

  if (estado.busqueda.trim() !== "") {
    const q = estado.busqueda.toLowerCase();
    data = data.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q))
    );
  }

  return data;
}

// ============================================================
// RENDER LISTADO DE RECETAS
// ============================================================
function renderRecetas() {
  if (!listadoEl) return;

  const recetasFiltradas = filtrarRecetas();

  if (!recetasFiltradas.length) {
    listadoEl.innerHTML =
      '<p class="mensaje-vacio">No se han encontrado recetas con esos criterios.</p>';
    return;
  }

  const html = recetasFiltradas
    .map((r) => {
      const esFav = estado.favoritos.includes(r.id);
      const catTexto =
        r.category === "aperitivo"
          ? "Aperitivo"
          : r.category === "primero"
          ? "Primer plato"
          : r.category === "segundo"
          ? "Segundo plato"
          : r.category === "postre"
          ? "Postre"
          : "Otros";

      const imgSrc = r.image && r.image.trim() !== "" ? r.image : "plato.jpg";
      const altText = `Foto del plato: ${r.title}`;

      return `
        <article class="card" data-id="${r.id}">
          <button class="card-imgBtn" data-accion="ver">
            <img src="${imgSrc}" alt="${altText}" loading="lazy">
          </button>

          <div class="card-body">
            <h3>${r.title}</h3>
            <p class="card-meta">${catTexto} · ⏱ ${r.time} · ${r.difficulty}</p>
            <p class="card-desc">${r.description || ""}</p>

            <div class="card-actions">
              <button class="btn primary" data-accion="ver">Ver receta</button>
              <button class="btn" data-accion="lista">Añadir a lista</button>
              <button class="btn icono ${esFav ? "fav" : ""}" data-accion="fav" aria-pressed="${esFav}">
                ${esFav ? "★ Favorito" : "☆ Favorito"}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  listadoEl.innerHTML = html;
}

// ============================================================
// LISTA DE LA COMPRA
// ============================================================
function normalizarIngrediente(txt) {
  return txt.trim();
}

function agregarIngredientesDeReceta(receta) {
  if (!receta || !Array.isArray(receta.ingredients)) return;

  receta.ingredients.forEach((ing) => {
    const limpio = normalizarIngrediente(ing);
    if (!limpio) return;
    if (!estado.listaCompra.includes(limpio)) {
      estado.listaCompra.push(limpio);
    }
  });

  guardarLista();
  renderListaCompra();
}

function renderListaCompra() {
  if (!listaCompraEl) return;

  if (!estado.listaCompra.length) {
    listaCompraEl.innerHTML =
      '<p class="mensaje-vacio">No hay ingredientes en la lista.</p>';
    return;
  }

  const html = `
    <ul class="lista-compra-ul">
      ${estado.listaCompra
        .map(
          (item, idx) => `
        <li data-idx="${idx}">
          <label>
            <input type="checkbox">
            <span>${item}</span>
          </label>
          <button class="btn tiny" data-accion="quitar-item">Quitar</button>
        </li>
      `
        )
        .join("")}
    </ul>
  `;

  listaCompraEl.innerHTML = html;
}

function generarListaDesdeRecetas() {
  // Ahora mismo simplemente avisa; se podría complicar más (contar repeticiones, etc.)
  alert(
    "Para generar la lista completa, ve añadiendo las recetas que quieras con “Añadir a lista”."
  );
}

// ============================================================
// MODAL RECETA
// ============================================================
function encontrarRecetaPorId(id) {
  return RECETAS.find((r) => r.id === id);
}

function abrirModal(recetaId) {
  const receta = encontrarRecetaPorId(recetaId);
  if (!receta || !modalEl || !modalContenidoEl) return;

  const esFav = estado.favoritos.includes(receta.id);
  const totalPasos = Array.isArray(receta.steps) ? receta.steps.length : 0;

  const imgSrc = receta.image && receta.image.trim() !== "" ? receta.image : "plato.jpg";
  const altText = `Foto del plato: ${receta.title}`;

  const html = `
    <header class="modal-header">
      <div>
        <h2>${receta.title}</h2>
        <p class="card-meta">
          ⏱ ${receta.time} · Dificultad: ${receta.difficulty} · Raciones: ${
    receta.servings || 4
  }
        </p>
      </div>
      <button class="btn icono ${esFav ? "fav" : ""}" data-accion="fav-modal" data-id="${
    receta.id
  }">
        ${esFav ? "★ Favorito" : "☆ Favorito"}
      </button>
    </header>

    <div class="modal-content-grid">
      <div class="modal-img">
        <img src="${imgSrc}" alt="${altText}">
      </div>

      <div class="modal-info">
        <section>
          <h3>Descripción</h3>
          <p>${receta.description || ""}</p>
        </section>

        <section>
          <h3>Ingredientes</h3>
          <ul class="lista-ingredientes">
            ${receta.ingredients
              .map(
                (ing, idx) => `
              <li data-idx="${idx}">
                <span>${ing}</span>
                <button class="btn tiny" data-accion="add-ingrediente">
                  Añadir a la lista
                </button>
              </li>
            `
              )
              .join("")}
          </ul>
          <button class="btn" data-accion="add-todos-ingredientes">
            Añadir TODOS a la lista de la compra
          </button>
        </section>

        <section>
          <h3>Pasos de la receta</h3>
          <ol class="lista-pasos">
            ${receta.steps
              .map(
                (paso, i) => `
              <li data-step="${i + 1}">${paso}</li>
            `
              )
              .join("")}
          </ol>

          <div class="voz-controles">
            <h4>Cocina guiada por voz</h4>
            <p class="nota-voz">
              La voz leerá <strong>un paso cada vez</strong> y te dirá el número de paso.
            </p>
            <button class="btn" data-accion="iniciar-voz" data-id="${receta.id}">
              Iniciar desde el paso 1
            </button>
            <button class="btn secondary" data-accion="siguiente-paso" disabled>
              Siguiente paso
            </button>
            <button class="btn danger" data-accion="parar-voz" disabled>
              Parar voz
            </button>
            <p class="estado-voz" aria-live="polite"></p>
          </div>
        </section>
      </div>
    </div>
  `;

  modalContenidoEl.innerHTML = html;
  modalEl.classList.add("visible");
  modalEl.querySelector(".dialogo").focus();

  estado.pasoActual = null;
  detenerVoz();
}

function cerrarModal() {
  if (!modalEl) return;
  detenerVoz();
  modalEl.classList.remove("visible");
}

// ============================================================
// VOZ
// ============================================================
function inicializarVoz() {
  if ("speechSynthesis" in window) {
    synth = window.speechSynthesis;
    vozDisponible = true;
  } else {
    vozDisponible = false;
  }
}

function hablar(texto, lang = "es-ES") {
  if (!vozDisponible || !texto) return;
  detenerVoz();
  const utter = new SpeechSynthesisUtterance(texto);
  utter.lang = lang;
  synth.speak(utter);
}

function detenerVoz() {
  if (!vozDisponible || !synth) return;
  if (synth.speaking || synth.pending) {
    synth.cancel();
  }
}

// Cocina guiada: un paso cada vez
function iniciarCocinaGuiada(recetaId) {
  const receta = encontrarRecetaPorId(recetaId);
  if (!receta || !Array.isArray(receta.steps) || !receta.steps.length) return;

  estado.pasoActual = {
    recetaId,
    indice: 0
  };

  const total = receta.steps.length;
  const pasoTexto = receta.steps[0];
  const mensaje = `Paso 1 de ${total}. ${pasoTexto}`;
  hablar(mensaje);

  actualizarControlesVoz(true, false, `Leyendo paso 1 de ${total}.`);
}

function siguientePaso() {
  if (!estado.pasoActual) return;
  const { recetaId, indice } = estado.pasoActual;
  const receta = encontrarRecetaPorId(recetaId);
  if (!receta || !receta.steps || !receta.steps.length) return;

  const total = receta.steps.length;
  const nuevoIndice = indice + 1;

  if (nuevoIndice >= total) {
    hablar("Has terminado la receta. ¡Buen provecho!");
    estado.pasoActual = null;
    actualizarControlesVoz(false, false, "Receta terminada.");
    return;
  }

  estado.pasoActual.indice = nuevoIndice;
  const pasoTexto = receta.steps[nuevoIndice];
  const mensaje = `Paso ${nuevoIndice + 1} de ${total}. ${pasoTexto}`;
  hablar(mensaje);
  actualizarControlesVoz(true, true, `Leyendo paso ${nuevoIndice + 1} de ${total}.`);
}

function pararCocinaGuiada() {
  detenerVoz();
  estado.pasoActual = null;
  actualizarControlesVoz(false, false, "Voz detenida.");
}

// Actualiza botones y texto de estado dentro del modal
function actualizarControlesVoz(hayPaso, puedeSiguiente, mensaje) {
  if (!modalContenidoEl) return;
  const btnIniciar = modalContenidoEl.querySelector('button[data-accion="iniciar-voz"]');
  const btnSiguiente = modalContenidoEl.querySelector(
    'button[data-accion="siguiente-paso"]'
  );
  const btnParar = modalContenidoEl.querySelector('button[data-accion="parar-voz"]');
  const estadoVoz = modalContenidoEl.querySelector(".estado-voz");

  if (btnIniciar) btnIniciar.disabled = !!hayPaso;
  if (btnSiguiente) btnSiguiente.disabled = !puedeSiguiente && !hayPaso;
  if (btnParar) btnParar.disabled = !hayPaso;

  if (estadoVoz && mensaje) {
    estadoVoz.textContent = mensaje;
  }
}

// ============================================================
// EVENTOS LISTADO
// ============================================================
function onClickListado(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const accion = btn.dataset.accion;
  if (!accion) return;

  const card = btn.closest(".card");
  if (!card) return;

  const id = parseInt(card.dataset.id, 10);
  const receta = encontrarRecetaPorId(id);

  if (!receta) return;

  switch (accion) {
    case "ver":
      abrirModal(id);
      break;
    case "fav":
      toggleFavorito(id);
      break;
    case "lista":
      agregarIngredientesDeReceta(receta);
      break;
  }
}

function toggleFavorito(id) {
  const idx = estado.favoritos.indexOf(id);
  if (idx === -1) {
    estado.favoritos.push(id);
  } else {
    estado.favoritos.splice(idx, 1);
  }
  guardarFavoritos();
  renderRecetas();
}

// ============================================================
// EVENTOS MODAL
// ============================================================
function onClickModalContenido(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const accion = btn.dataset.accion;

  // Favorito desde modal
  if (accion === "fav-modal") {
    const id = parseInt(btn.dataset.id, 10);
    toggleFavorito(id);
    abrirModal(id); // Re-render modal para actualizar el texto del botón
    return;
  }

  // Añadir un ingrediente concreto
  if (accion === "add-ingrediente") {
    const li = btn.closest("li");
    if (!li) return;
    const span = li.querySelector("span");
    if (!span) return;
    const texto = normalizarIngrediente(span.textContent);
    if (texto && !estado.listaCompra.includes(texto)) {
      estado.listaCompra.push(texto);
      guardarLista();
      renderListaCompra();
    }
    return;
  }

  // Añadir TODOS los ingredientes de la receta
  if (accion === "add-todos-ingredientes") {
    const encabezado = modalContenidoEl.querySelector(".modal-header h2");
    if (!encabezado) return;
    const titulo = encabezado.textContent.trim();
    const receta = RECETAS.find((r) => r.title === titulo);
    if (!receta) return;
    agregarIngredientesDeReceta(receta);
    return;
  }

  // Voz: iniciar, siguiente, parar
  if (accion === "iniciar-voz") {
    const id = parseInt(btn.dataset.id, 10);
    if (!vozDisponible) {
      alert("Tu navegador no soporta síntesis de voz.");
      return;
    }
    iniciarCocinaGuiada(id);
    return;
  }

  if (accion === "siguiente-paso") {
    if (!vozDisponible) return;
    siguientePaso();
    return;
  }

  if (accion === "parar-voz") {
    if (!vozDisponible) return;
    pararCocinaGuiada();
    return;
  }
}

// ============================================================
// EVENTOS FILTROS + BÚSQUEDA
// ============================================================
function onClickFiltros(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  const filtro = btn.dataset.filtro;
  const esFavs = btn.id === "btn-favs";

  if (esFavs) {
    estado.verSoloFavoritos = !estado.verSoloFavoritos;
    btn.classList.toggle("active", estado.verSoloFavoritos);
  } else if (filtro) {
    estado.filtro = filtro;

    const todosBotones = filtrosEl.querySelectorAll("button[data-filtro]");
    todosBotones.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }

  renderRecetas();
}

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Estado previo
  cargarEstadoLocal();
  inicializarVoz();

  // 2. Cache de nodos
  listadoEl = document.getElementById("listado");
  filtrosEl = document.querySelector(".filtros");
  buscarEl = document.getElementById("buscar");
  modalEl = document.getElementById("modal");
  modalContenidoEl = document.getElementById("contenido-modal");
  modalCerrarEl = document.getElementById("cerrar");
  listaCompraEl = document.getElementById("lista-compra");
  btnVaciar = document.getElementById("btn-vaciar");
  btnContraste = document.getElementById("btn-contraste");
  btnTexto = document.getElementById("btn-texto");

  // 3. Botón "Generar lista final"
  const panelLista = document.querySelector(".lista-superior");
  if (panelLista) {
    const btnGenerar = document.createElement("button");
    btnGenerar.id = "btn-generar-lista";
    btnGenerar.className = "btn";
    btnGenerar.textContent = "Generar lista final";

    if (btnVaciar && btnVaciar.parentNode === panelLista) {
      panelLista.insertBefore(btnGenerar, btnVaciar);
    } else {
      panelLista.appendChild(btnGenerar);
    }

    btnGenerar.addEventListener("click", generarListaDesdeRecetas);
  }

  // 4. Accesibilidad guardada
  if (estado.textoGrande) document.body.classList.add("texto-grande");
  if (estado.altoContraste) document.body.classList.add("alto-contraste");

  // 5. Eventos de filtros
  if (filtrosEl) {
    filtrosEl.addEventListener("click", onClickFiltros);
  }

  // 6. Búsqueda
  if (buscarEl) {
    buscarEl.addEventListener("input", (e) => {
      estado.busqueda = e.target.value;
      renderRecetas();
    });
  }

  // 7. Listado (delegación)
  if (listadoEl) {
    listadoEl.addEventListener("click", onClickListado);
  }

  // 8. Modal
  if (modalCerrarEl) {
    modalCerrarEl.addEventListener("click", cerrarModal);
  }
  if (modalEl) {
    modalEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fondo")) {
        cerrarModal();
      }
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl && modalEl.classList.contains("visible")) {
      cerrarModal();
    }
  });

  if (modalContenidoEl) {
    modalContenidoEl.addEventListener("click", onClickModalContenido);
  }

  // 9. Lista de la compra
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      estado.listaCompra = [];
      guardarLista();
      renderListaCompra();
    });
  }

  // 10. Accesibilidad (botones header)
  if (btnContraste) {
    btnContraste.addEventListener("click", () => {
      estado.altoContraste = !estado.altoContraste;
      document.body.classList.toggle("alto-contraste", estado.altoContraste);
      guardarAccesibilidad();
    });
  }

  if (btnTexto) {
    btnTexto.addEventListener("click", () => {
      estado.textoGrande = !estado.textoGrande;
      document.body.classList.toggle("texto-grande", estado.textoGrande);
      guardarAccesibilidad();
    });
  }

  // 11. Render inicial
  renderRecetas();
  renderListaCompra();
});
