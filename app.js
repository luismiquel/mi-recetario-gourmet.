// app.js
// ===============================================
// LÓGICA PRINCIPAL DE LA APP GOURMET NAVIDEÑA
// - Render de tarjetas
// - Filtros, búsqueda, favoritos
// - Lista de la compra avanzada
// - Modal de receta
// - Cocina guiada por voz + comandos
// ===============================================

// ---- ESTADO GLOBAL ---------------------------------
const estado = {
  filtro: "todas",            // todas | aperitivo | primero | segundo | postre | favoritos
  busqueda: "",
  favoritos: new Set(),
  listaCompra: [],            // [{ clave, texto, cantidad }]
  recetasSeleccionadas: new Set(), // ids para generar lista automática
  textoGrande: false,
  altoContraste: false,
  recetaActual: null,         // receta activa en modal
  pasoActual: 0,
  reconocimientoActivo: false,
};

const LS_KEYS = {
  favs: "gourmet_favs_v1",
  lista: "gourmet_lista_v1",
  acces: "gourmet_acces_v1",
  seleccion: "gourmet_recetas_sel_v1",
};

// ---- UTILIDADES ------------------------------------
function normalizarTexto(t) {
  return (t || "").toString().toLowerCase().trim();
}

function capitalize(t) {
  t = (t || "").toString().trim();
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1);
}

// ---- LOCALSTORAGE ----------------------------------
function cargarEstadoLocal() {
  try {
    const favs = JSON.parse(localStorage.getItem(LS_KEYS.favs) || "[]");
    estado.favoritos = new Set(favs.map(Number));

    const lista = JSON.parse(localStorage.getItem(LS_KEYS.lista) || "[]");
    if (Array.isArray(lista)) estado.listaCompra = lista;

    const sel = JSON.parse(localStorage.getItem(LS_KEYS.seleccion) || "[]");
    estado.recetasSeleccionadas = new Set(sel.map(Number));

    const acces = JSON.parse(localStorage.getItem(LS_KEYS.acces) || "{}");
    if (acces && typeof acces === "object") {
      estado.textoGrande = !!acces.textoGrande;
      estado.altoContraste = !!acces.altoContraste;
    }
  } catch (e) {
    console.warn("No se pudo cargar el estado guardado:", e);
  }
}

function guardarFavoritos() {
  localStorage.setItem(LS_KEYS.favs, JSON.stringify([...estado.favoritos]));
}

function guardarLista() {
  localStorage.setItem(LS_KEYS.lista, JSON.stringify(estado.listaCompra));
}

function guardarSeleccion() {
  localStorage.setItem(LS_KEYS.seleccion, JSON.stringify([...estado.recetasSeleccionadas]));
}

function guardarAccesibilidad() {
  localStorage.setItem(
    LS_KEYS.acces,
    JSON.stringify({
      textoGrande: estado.textoGrande,
      altoContraste: estado.altoContraste,
    })
  );
}

// ---- VOZ (LECTURA) ---------------------------------
const sintetizador = "speechSynthesis" in window ? window.speechSynthesis : null;

function hablar(texto) {
  if (!sintetizador) return;
  if (!texto) return;

  try {
    if (sintetizador.speaking) sintetizador.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-ES";
    u.rate = 0.95;
    u.pitch = 1;
    sintetizador.speak(u);
  } catch (e) {
    console.warn("Error en síntesis de voz:", e);
  }
}

function pararVoz() {
  if (sintetizador && sintetizador.speaking) {
    sintetizador.cancel();
  }
}

// ---- RECONOCIMIENTO DE VOZ (COMANDOS) --------------
let reconocimiento = null;

(function initReconocimiento() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  reconocimiento = new SR();
  reconocimiento.lang = "es-ES";
  reconocimiento.interimResults = false;
  reconocimiento.continuous = false;

  reconocimiento.onresult = (event) => {
    const texto = event.results[0][0].transcript.toLowerCase();
    manejarComandoVoz(texto);
  };

  reconocimiento.onend = () => {
    // Si sigue activo, reanudamos
    if (estado.reconocimientoActivo) {
      try {
        reconocimiento.start();
      } catch (e) {
        console.warn("No se pudo reanudar reconocimiento:", e);
      }
    }
  };
})();

function toggleReconocimiento() {
  if (!reconocimiento) {
    alert("Tu navegador no soporta comandos por voz.");
    return;
  }

  estado.reconocimientoActivo = !estado.reconocimientoActivo;

  if (estado.reconocimientoActivo) {
    try {
      reconocimiento.start();
    } catch (e) {
      console.warn("Error al iniciar reconocimiento:", e);
    }
    hablar(
      "Comandos de voz activados. Puedes decir: siguiente, atrás, repetir, ingredientes, tiempo, empezar, cerrar receta o parar."
    );
  } else {
    reconocimiento.stop();
    hablar("Comandos de voz desactivados.");
  }

  const btn = document.getElementById("btn-voz-comandos");
  if (btn) {
    btn.textContent =
      "Comandos por voz: " + (estado.reconocimientoActivo ? "ON" : "OFF");
  }
}

function manejarComandoVoz(frase) {
  if (!frase) return;
  const t = frase.toLowerCase();

  if (t.includes("siguiente")) {
    siguientePaso();
  } else if (t.includes("atrás") || t.includes("atras") || t.includes("anterior")) {
    pasoAnterior();
  } else if (t.includes("repetir")) {
    repetirPaso();
  } else if (t.includes("ingrediente")) {
    leerIngredientes();
  } else if (t.includes("tiempo") || t.includes("minuto")) {
    const r = estado.recetaActual;
    if (r && r.time) {
      hablar("El tiempo aproximado para esta receta es " + r.time);
    } else {
      hablar("El tiempo de esta receta no está indicado.");
    }
  } else if (t.includes("empezar") || t.includes("iniciar")) {
    empezarPasos();
  } else if (t.includes("cerrar") || t.includes("salir")) {
    cerrarModal();
  } else if (t.includes("parar") || t.includes("silencio")) {
    pararVoz();
  } else {
    hablar("No he entendido el comando.");
  }
}

// ---- DOM PRINCIPAL ---------------------------------
let listadoEl,
  filtrosEl,
  buscarEl,
  modalEl,
  modalContenidoEl,
  modalCerrarEl,
  listaCompraEl,
  btnVaciar,
  btnContraste,
  btnTexto;

document.addEventListener("DOMContentLoaded", () => {
  // Cargar estado previo
  cargarEstadoLocal();

  // Cache de nodos
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

  // Botón "Generar lista final" (lo creamos por JS arriba de la lista)
  const panelLista = document.querySelector(".lista-superior");
  if (panelLista) {
    const btnGenerar = document.createElement("button");
    btnGenerar.id = "btn-generar-lista";
    btnGenerar.className = "btn";
    btnGenerar.textContent = "Generar lista final";
    panelLista.insertBefore(btnGenerar, btnVaciar);
    btnGenerar.addEventListener("click", generarListaDesdeRecetas);
  }

  // Aplicar accesibilidad guardada
  if (estado.textoGrande) document.body.classList.add("texto-grande");
  if (estado.altoContraste) document.body.classList.add("alto-contraste");

  // Eventos de filtros
  if (filtrosEl) {
    filtrosEl.addEventListener("click", onClickFiltros);
  }

  // Búsqueda
  if (buscarEl) {
    buscarEl.addEventListener("input", (e) => {
      estado.busqueda = e.target.value;
      renderRecetas();
    });
  }

  // Listado (delegación eventos)
  if (listadoEl) {
    listadoEl.addEventListener("click", onClickListado);
    listadoEl.addEventListener("change", onChangeListado);
  }

  // Modal
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

  // Clicks dentro del contenido del modal
  if (modalContenidoEl) {
    modalContenidoEl.addEventListener("click", onClickModalContenido);
  }

  // Lista de la compra
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      estado.listaCompra = [];
      guardarLista();
      renderListaCompra();
    });
  }

  // Accesibilidad botones header
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

  // Render inicial
  renderRecetas();
  renderListaCompra();
});

// ---- RENDER DE RECETAS -----------------------------
function filtrarRecetasBase() {
  let lista = Array.isArray(RECETAS) ? [...RECETAS] : [];

  // Filtro categoría / favoritos
  if (estado.filtro === "favoritos") {
    lista = lista.filter((r) => estado.favoritos.has(r.id));
  } else if (
    ["aperitivo", "primero", "segundo", "postre"].includes(estado.filtro)
  ) {
    lista = lista.filter((r) => r.category === estado.filtro);
  }

  // Búsqueda
  const q = normalizarTexto(estado.busqueda);
  if (q) {
    lista = lista.filter((r) => {
      const enTitulo = normalizarTexto(r.title).includes(q);
      const enDesc = normalizarTexto(r.description).includes(q);
      const enIng = Array.isArray(r.ingredients)
        ? normalizarTexto(r.ingredients.join(" ")).includes(q)
        : false;
      return enTitulo || enDesc || enIng;
    });
  }

  return lista;
}

function textoCategoria(cat) {
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

function renderRecetas() {
  if (!listadoEl) return;

  const recetasFiltradas = filtrarRecetasBase();

  if (!recetasFiltradas.length) {
    listadoEl.innerHTML =
      '<p class="empty">No hay recetas que coincidan con la búsqueda o filtro.</p>';
    return;
  }

  const html = recetasFiltradas
    .map((r) => {
      const esFav = estado.favoritos.has(r.id);
      const seleccionada = estado.recetasSeleccionadas.has(r.id);

      return `
      <article class="card" data-id="${r.id}">
        <button class="fav ${esFav ? "on" : ""}" aria-label="${
        esFav ? "Quitar de favoritos" : "Añadir a favoritos"
      }">
          ★
        </button>
        <div class="card-img" aria-hidden="true">
          ${
            r.image
              ? `<img src="${r.image}" alt="Foto del plato ${r.title}">`
              : `<div class="img-placeholder">🍽️</div>`
          }
        </div>
        <h3>${r.title}</h3>
        <p class="meta">
          <span>${textoCategoria(r.category)}</span> ·
          <span>${r.time || "Tiempo no indicado"}</span> ·
          <span>${r.difficulty || "Dificultad media"}</span>
        </p>
        <p class="desc">${r.description || ""}</p>
        <div class="card-actions">
          <label class="chk-receta-label">
            <input type="checkbox" class="chk-receta" data-id="${r.id}" ${
        seleccionada ? "checked" : ""
      }>
            Añadir a lista
          </label>
          <button class="btn ver" data-accion="abrir">Ver receta</button>
        </div>
      </article>
    `;
    })
    .join("");

  listadoEl.innerHTML = html;
}

// ---- EVENTOS LISTADO --------------------------------
function onClickListado(e) {
  const card = e.target.closest(".card");
  if (!card) return;
  const id = Number(card.dataset.id);
  if (!id) return;

  if (e.target.classList.contains("fav")) {
    toggleFavorito(id);
    renderRecetas();
    return;
  }

  if (e.target.dataset.accion === "abrir") {
    abrirModalReceta(id);
  }
}

function onChangeListado(e) {
  if (e.target.classList.contains("chk-receta")) {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.checked) {
      estado.recetasSeleccionadas.add(id);
    } else {
      estado.recetasSeleccionadas.delete(id);
    }
    guardarSeleccion();
  }
}

// ---- FAVORITOS --------------------------------------
function toggleFavorito(id) {
  if (estado.favoritos.has(id)) {
    estado.favoritos.delete(id);
  } else {
    estado.favoritos.add(id);
  }
  guardarFavoritos();
}

// ---- FILTROS ----------------------------------------
function onClickFiltros(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.id === "btn-favs") {
    estado.filtro = "favoritos";
  } else {
    const filtro = btn.dataset.filtro;
    if (!filtro) return;
    estado.filtro = filtro;
  }

  // marcar activo
  const todosBtns = filtrosEl.querySelectorAll("button");
  todosBtns.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  renderRecetas();
}

// ---- MODAL RECETA -----------------------------------
function abrirModalReceta(id) {
  const receta = RECETAS.find((r) => r.id === id);
  if (!receta || !modalEl || !modalContenidoEl) return;

  estado.recetaActual = receta;
  estado.pasoActual = 0;

  const ingHTML = Array.isArray(receta.ingredients)
    ? receta.ingredients
        .map(
          (ing) => `
      <li>
        <button type="button" class="link-ingrediente">
          ${ing}
        </button>
      </li>`
        )
        .join("")
    : "<li>No especificados</li>";

  const pasosHTML = Array.isArray(receta.steps)
    ? receta.steps
        .map((p, i) => `<li data-paso="${i}">${p}</li>`)
        .join("")
    : "<li>Ver instrucciones en la descripción.</li>";

  const esFav = estado.favoritos.has(receta.id);

  modalContenidoEl.innerHTML = `
    <h2>${receta.title}</h2>
    <p class="modal-meta">
      <span>${textoCategoria(receta.category)}</span> ·
      <span>${receta.time || "Tiempo no indicado"}</span> ·
      <span>${receta.difficulty || "Dificultad media"}</span>
    </p>

    <div class="modal-body">
      <section>
        <h3>Ingredientes</h3>
        <ul class="lista-ingredientes">
          ${ingHTML}
        </ul>
        <button class="btn small" id="btn-add-receta-lista">
          Añadir todos los ingredientes a la lista
        </button>
      </section>

      <section class="pasos">
        <h3>Pasos</h3>
        <ol class="lista-pasos">
          ${pasosHTML}
        </ol>
      </section>

      <section class="voz">
        <h3>Cocina guiada por voz</h3>
        <div class="voz-botones">
          <button class="btn small" id="btn-voz-ingredientes">Leer ingredientes</button>
          <button class="btn small" id="btn-voz-empezar">Empezar pasos</button>
          <button class="btn small" id="btn-voz-siguiente">Siguiente paso</button>
          <button class="btn small" id="btn-voz-repetir">Repetir paso</button>
          <button class="btn small" id="btn-voz-parar">Parar voz</button>
          <button class="btn small" id="btn-voz-comandos">
            Comandos por voz: ${estado.reconocimientoActivo ? "ON" : "OFF"}
          </button>
        </div>
        <p class="ayuda-voz">
          Puedes decir: “siguiente”, “atrás”, “repetir”, “ingredientes”, “tiempo”, “empezar”, “cerrar receta”, “parar”.
        </p>
      </section>

      <section>
        <button class="btn secondary" id="btn-fav-modal">
          ${esFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        </button>
      </section>
    </div>
  `;

  modalEl.classList.add("visible");
  document.body.classList.add("sin-scroll");
  const dialogo = modalEl.querySelector(".dialogo");
  if (dialogo) dialogo.focus();
}

function cerrarModal() {
  if (!modalEl) return;
  modalEl.classList.remove("visible");
  document.body.classList.remove("sin-scroll");
  estado.recetaActual = null;
  estado.pasoActual = 0;
  pararVoz();
}

// Clicks dentro del modal
function onClickModalContenido(e) {
  const id = e.target.id;

  if (id === "btn-add-receta-lista") {
    agregarTodosIngredientesRecetaActual();
    return;
  }

  if (id === "btn-fav-modal") {
    if (estado.recetaActual) {
      toggleFavorito(estado.recetaActual.id);
      abrirModalReceta(estado.recetaActual.id); // refrescar texto botón
    }
    return;
  }

  if (id === "btn-voz-ingredientes") {
    leerIngredientes();
    return;
  }
  if (id === "btn-voz-empezar") {
    empezarPasos();
    return;
  }
  if (id === "btn-voz-siguiente") {
    siguientePaso();
    return;
  }
  if (id === "btn-voz-repetir") {
    repetirPaso();
    return;
  }
  if (id === "btn-voz-parar") {
    pararVoz();
    return;
  }
  if (id === "btn-voz-comandos") {
    toggleReconocimiento();
    return;
  }

  if (e.target.classList.contains("link-ingrediente")) {
    const texto = e.target.textContent.trim();
    if (texto) {
      agregarIngredienteALista(texto);
    }
  }
}

// ---- COCINA GUIADA POR VOZ -------------------------
function leerIngredientes() {
  const r = estado.recetaActual;
  if (!r) return;
  if (!Array.isArray(r.ingredients) || !r.ingredients.length) {
    hablar("Esta receta no tiene lista de ingredientes detallada.");
    return;
  }
  hablar("Ingredientes para " + r.title + ": " + r.ingredients.join(", "));
}

function resaltarPasoActual() {
  if (!modalContenidoEl) return;
  const lista = modalContenidoEl.querySelectorAll(".lista-pasos li");
  lista.forEach((li) => li.classList.remove("activo"));
  if (lista[estado.pasoActual]) {
    lista[estado.pasoActual].classList.add("activo");
  }
}

function empezarPasos() {
  const r = estado.recetaActual;
  if (!r) return;

  if (!Array.isArray(r.steps) || !r.steps.length) {
    hablar("Esta receta no tiene pasos detallados. Consulta la descripción en pantalla.");
    return;
  }

  estado.pasoActual = 0;
  resaltarPasoActual();
  hablar(
    `Vamos a cocinar ${r.title}. Tiempo estimado: ${
      r.time || "no indicado"
    }. Paso 1: ${r.steps[0]}`
  );
}

function siguientePaso() {
  const r = estado.recetaActual;
  if (!r || !Array.isArray(r.steps) || !r.steps.length) return;

  if (estado.pasoActual < r.steps.length - 1) {
    estado.pasoActual++;
    resaltarPasoActual();
    hablar(`Paso ${estado.pasoActual + 1}: ${r.steps[estado.pasoActual]}`);
  } else {
    resaltarPasoActual();
    hablar("Has llegado al último paso de la receta.");
  }
}

function pasoAnterior() {
  const r = estado.recetaActual;
  if (!r || !Array.isArray(r.steps) || !r.steps.length) return;

  if (estado.pasoActual > 0) {
    estado.pasoActual--;
    resaltarPasoActual();
    hablar(`Paso ${estado.pasoActual + 1}: ${r.steps[estado.pasoActual]}`);
  } else {
    hablar("Ya estás en el primer paso.");
  }
}

function repetirPaso() {
  const r = estado.recetaActual;
  if (!r || !Array.isArray(r.steps) || !r.steps.length) return;

  resaltarPasoActual();
  hablar(`Repito el paso ${estado.pasoActual + 1}: ${r.steps[estado.pasoActual]}`);
}

// ---- LISTA DE LA COMPRA ----------------------------
function agregarIngredienteALista(texto) {
  const clave = normalizarTexto(texto);
  if (!clave) return;

  let item = estado.listaCompra.find((i) => i.clave === clave);
  if (item) {
    item.cantidad += 1;
  } else {
    item = { clave, texto: capitalize(texto), cantidad: 1 };
    estado.listaCompra.push(item);
  }

  guardarLista();
  renderListaCompra();
}

function agregarTodosIngredientesRecetaActual() {
  const r = estado.recetaActual;
  if (!r || !Array.isArray(r.ingredients)) return;

  r.ingredients.forEach((ing) => agregarIngredienteALista(ing));
  hablar("He añadido todos los ingredientes de esta receta a la lista de la compra.");
}

function generarListaDesdeRecetas() {
  const ids = [...estado.recetasSeleccionadas];
  if (!ids.length) {
    alert('Marca al menos una receta con "Añadir a lista".');
    return;
  }

  const mapa = new Map(); // clave -> { clave, texto, cantidad }

  ids.forEach((id) => {
    const r = RECETAS.find((rec) => rec.id === id);
    if (!r || !Array.isArray(r.ingredients)) return;

    r.ingredients.forEach((ing) => {
      const clave = normalizarTexto(ing);
      if (!clave) return;
      const texto = capitalize(ing);
      if (!mapa.has(clave)) {
        mapa.set(clave, { clave, texto, cantidad: 1 });
      } else {
        mapa.get(clave).cantidad += 1;
      }
    });
  });

  estado.listaCompra = [...mapa.values()];
  guardarLista();
  renderListaCompra();
  hablar(
    `He generado la lista de la compra combinando ${ids.length} recetas seleccionadas.`
  );
}

function renderListaCompra() {
  if (!listaCompraEl) return;

  if (!estado.listaCompra.length) {
    listaCompraEl.innerHTML =
      '<p class="empty">No hay ingredientes en la lista. Marca recetas y pulsa "Generar lista final", o añade desde una receta.</p>';
    return;
  }

  const html = `
    <ul class="lista-compra-ul">
      ${estado.listaCompra
        .map(
          (item) => `
        <li>
          <span>${item.texto}${
            item.cantidad > 1 ? ` (x${item.cantidad})` : ""
          }</span>
          <button class="btn small quitar-item" data-clave="${item.clave}">
            Quitar
          </button>
        </li>`
        )
        .join("")}
    </ul>
  `;

  listaCompraEl.innerHTML = html;

  // Delegación para quitar items
  listaCompraEl.querySelectorAll(".quitar-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const clave = btn.dataset.clave;
      if (!clave) return;
      estado.listaCompra = estado.listaCompra.filter((i) => i.clave !== clave);
      guardarLista();
      renderListaCompra();
    });
  });
}
