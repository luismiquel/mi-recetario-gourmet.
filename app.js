// ================================
// App Gourmet – Lógica principal
// Asume que existe RECETAS (creado en recetas.js)
// ================================

// ---------- Estado global ----------
let filtroActual = "todas";
let textoBusqueda = "";
let verSoloFavoritos = false;

const lsFavoritosKey = "gourmet_favoritos";
const lsListaKey = "gourmet_lista_compra";
const lsPreferenciasKey = "gourmet_preferencias";

// favoritos: Set de IDs
let favoritos = new Set(
  JSON.parse(localStorage.getItem(lsFavoritosKey) || "[]")
);

// lista de la compra: array de textos de ingredientes
let listaCompra = JSON.parse(localStorage.getItem(lsListaKey) || "[]");

// preferencias de accesibilidad
let preferencias = JSON.parse(
  localStorage.getItem(lsPreferenciasKey) ||
    JSON.stringify({
      altoContraste: false,
      textoGrande: false,
    })
);

// ---------- Referencias al DOM ----------
const listado = document.getElementById("listado");
const buscarInput = document.getElementById("buscar");
const filtrosNav = document.querySelector(".filtros");
const btnFavs = document.getElementById("btn-favs");

const modal = document.getElementById("modal");
const modalFondo = modal.querySelector(".fondo");
const modalDialogo = modal.querySelector(".dialogo");
const modalCerrar = document.getElementById("cerrar");
const contenidoModal = document.getElementById("contenido-modal");

const listaCompraDiv = document.getElementById("lista-compra");
const btnVaciarLista = document.getElementById("btn-vaciar");

const btnContraste = document.getElementById("btn-contraste");
const btnTexto = document.getElementById("btn-texto");

// ---------- Utilidades almacenamiento ----------
function guardarFavoritos() {
  localStorage.setItem(lsFavoritosKey, JSON.stringify([...favoritos]));
}

function guardarLista() {
  localStorage.setItem(lsListaKey, JSON.stringify(listaCompra));
}

function guardarPreferencias() {
  localStorage.setItem(lsPreferenciasKey, JSON.stringify(preferencias));
}

// ---------- Render de recetas ----------
function filtrarRecetas() {
  return RECETAS.filter((r) => {
    // filtro por categoría
    if (filtroActual !== "todas" && r.category !== filtroActual) return false;

    // filtro por texto (en título y descripción)
    if (textoBusqueda) {
      const t = textoBusqueda.toLowerCase();
      if (
        !r.title.toLowerCase().includes(t) &&
        !r.description.toLowerCase().includes(t)
      ) {
        return false;
      }
    }

    // solo favoritos
    if (verSoloFavoritos && !favoritos.has(r.id)) return false;

    return true;
  });
}

function crearTarjetaReceta(receta) {
  const card = document.createElement("article");
  card.className = "card-receta";
  card.dataset.id = receta.id;

  // Imagen: si no hay, ponemos una de “relleno”
  const imageSrc =
    receta.image && receta.image.trim() !== ""
      ? receta.image
      : "plato.jpg"; // si no tienes plato.jpg, simplemente crea cualquier imagen con ese nombre

  card.innerHTML = `
    <figure class="card-img-wrapper">
      <img src="${imageSrc}" alt="${receta.title}" loading="lazy">
    </figure>

    <div class="card-body">
      <h3>${receta.title}</h3>
      <p class="card-desc">${receta.description}</p>

      <div class="card-tags">
        <span class="tag">${receta.category}</span>
        <span class="tag">${receta.time}</span>
        <span class="tag">${receta.difficulty}</span>
      </div>

      <div class="card-actions">
        <button class="btn primaria btn-ver">Ver receta</button>
        <button class="btn secundaria btn-add-lista">Añadir a la lista</button>
        <button class="btn icono btn-fav" aria-pressed="${
          favoritos.has(receta.id) ? "true" : "false"
        }">
          ${favoritos.has(receta.id) ? "★" : "☆"}
        </button>
      </div>
    </div>
  `;

  return card;
}

function renderRecetas() {
  const recetasFiltradas = filtrarRecetas();
  listado.innerHTML = "";

  if (recetasFiltradas.length === 0) {
    listado.innerHTML =
      '<p class="sin-resultados">No hay recetas que coincidan con la búsqueda.</p>';
    return;
  }

  recetasFiltradas.forEach((r) => {
    listado.appendChild(crearTarjetaReceta(r));
  });
}

// ---------- Lista de la compra ----------
function renderListaCompra() {
  listaCompraDiv.innerHTML = "";

  if (listaCompra.length === 0) {
    listaCompraDiv.innerHTML =
      '<p class="lista-vacia">Tu lista de la compra está vacía.</p>';
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "lista-ul";

  listaCompra.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "lista-item";
    li.innerHTML = `
      <span>${item}</span>
      <button class="btn small btn-eliminar-item" data-index="${index}">
        Quitar
      </button>
    `;
    ul.appendChild(li);
  });

  listaCompraDiv.appendChild(ul);
}

function agregarRecetaALista(receta) {
  // añadimos todos los ingredientes de la receta a la lista
  receta.ingredients.forEach((ing) => {
    const texto = `${receta.title}: ${ing}`;
    if (!listaCompra.includes(texto)) {
      listaCompra.push(texto);
    }
  });

  guardarLista();
  renderListaCompra();
}

function eliminarItemLista(index) {
  listaCompra.splice(index, 1);
  guardarLista();
  renderListaCompra();
}

function vaciarLista() {
  listaCompra = [];
  guardarLista();
  renderListaCompra();
}

// ---------- Modal de receta ----------
let vozSynth = window.speechSynthesis || null;
let vozUtterance = null;
let indicePasoActual = 0;
let pasosActuales = [];

function cerrarVoz() {
  if (vozSynth && vozSynth.speaking) {
    vozSynth.cancel();
  }
  vozUtterance = null;
  pasosActuales = [];
  indicePasoActual = 0;
}

function leerPasoActual() {
  if (!vozSynth || !pasosActuales.length) return;

  const texto = `Paso ${indicePasoActual + 1}: ${pasosActuales[indicePasoActual]}`;
  vozUtterance = new SpeechSynthesisUtterance(texto);
  vozSynth.cancel();
  vozSynth.speak(vozUtterance);
}

function abrirModal(receta) {
  cerrarVoz();

  pasosActuales = receta.steps || [];
  indicePasoActual = 0;

  const imageSrc =
    receta.image && receta.image.trim() !== ""
      ? receta.image
      : "plato.jpg";

  contenidoModal.innerHTML = `
    <h2>${receta.title}</h2>
    <p class="modal-desc">${receta.description}</p>

    <figure class="modal-img-wrapper">
      <img src="${imageSrc}" alt="${receta.title}">
    </figure>

    <p><strong>Tiempo:</strong> ${receta.time}</p>
    <p><strong>Dificultad:</strong> ${receta.difficulty}</p>
    <p><strong>Raciones:</strong> ${receta.servings}</p>

    <h3>Ingredientes</h3>
    <ul class="lista-ingredientes">
      ${receta.ingredients.map((i) => `<li>${i}</li>`).join("")}
    </ul>

    <h3>Preparación paso a paso</h3>
    <ol class="lista-pasos">
      ${pasosActuales.map((p) => `<li>${p}</li>`).join("")}
    </ol>

    <div class="voz-controles">
      <button class="btn small" id="voz-iniciar">▶ Leer pasos</button>
      <button class="btn small" id="voz-siguiente">Paso siguiente</button>
      <button class="btn small" id="voz-anterior">Paso anterior</button>
      <button class="btn small" id="voz-parar">■ Parar</button>
    </div>
  `;

  modal.classList.add("abierto");
  modalDialogo.focus();
}

function cerrarModal() {
  modal.classList.remove("abierto");
  cerrarVoz();
}

// ---------- Favoritos ----------
function toggleFavorito(id) {
  if (favoritos.has(id)) {
    favoritos.delete(id);
  } else {
    favoritos.add(id);
  }
  guardarFavoritos();
  renderRecetas();
}

// ---------- Accesibilidad: contraste y tamaño de texto ----------
function aplicarPreferencias() {
  document.body.classList.toggle("alto-contraste", preferencias.altoContraste);
  document.body.classList.toggle("texto-grande", preferencias.textoGrande);

  btnContraste.textContent = preferencias.altoContraste
    ? "Contraste normal"
    : "Contraste alto";

  btnTexto.textContent = preferencias.textoGrande
    ? "Texto normal"
    : "Texto grande";
}

// ---------- Listeners ----------

// Filtros por categoría
filtrosNav.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-filtro]");
  if (!btn) return;

  filtroActual = btn.dataset.filtro;

  // Activar botón seleccionado
  filtrosNav.querySelectorAll("button[data-filtro]").forEach((b) => {
    b.classList.toggle("active", b === btn);
  });

  renderRecetas();
});

// Botón “Favoritos”
btnFavs.addEventListener("click", () => {
  verSoloFavoritos = !verSoloFavoritos;
  btnFavs.classList.toggle("active", verSoloFavoritos);
  renderRecetas();
});

// Búsqueda
buscarInput.addEventListener("input", (e) => {
  textoBusqueda = e.target.value.trim();
  renderRecetas();
});

// Click en tarjetas (delegación)
listado.addEventListener("click", (e) => {
  const card = e.target.closest(".card-receta");
  if (!card) return;

  const id = Number(card.dataset.id);
  const receta = RECETAS.find((r) => r.id === id);
  if (!receta) return;

  if (e.target.classList.contains("btn-ver")) {
    abrirModal(receta);
  } else if (e.target.classList.contains("btn-add-lista")) {
    agregarRecetaALista(receta);
  } else if (e.target.classList.contains("btn-fav")) {
    toggleFavorito(id);
  }
});

// Cerrar modal
modalFondo.addEventListener("click", cerrarModal);
modalCerrar.addEventListener("click", cerrarModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("abierto")) {
    cerrarModal();
  }
});

// Controles de voz dentro del modal (delegación)
contenidoModal.addEventListener("click", (e) => {
  const id = e.target.id;
  if (!id) return;

  if (id === "voz-iniciar") {
    if (!pasosActuales.length) return;
    leerPasoActual();
  } else if (id === "voz-siguiente") {
    if (!pasosActuales.length) return;
    indicePasoActual = Math.min(
      pasosActuales.length - 1,
      indicePasoActual + 1
    );
    leerPasoActual();
  } else if (id === "voz-anterior") {
    if (!pasosActuales.length) return;
    indicePasoActual = Math.max(0, indicePasoActual - 1);
    leerPasoActual();
  } else if (id === "voz-parar") {
    cerrarVoz();
  }
});

// Lista de la compra: vaciar
btnVaciarLista.addEventListener("click", vaciarLista);

// Lista de la compra: quitar un solo item (delegación)
listaCompraDiv.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-eliminar-item");
  if (!btn) return;
  const index = Number(btn.dataset.index);
  if (!Number.isNaN(index)) {
    eliminarItemLista(index);
  }
});

// Botones de accesibilidad
btnContraste.addEventListener("click", () => {
  preferencias.altoContraste = !preferencias.altoContraste;
  guardarPreferencias();
  aplicarPreferencias();
});

btnTexto.addEventListener("click", () => {
  preferencias.textoGrande = !preferencias.textoGrande;
  guardarPreferencias();
  aplicarPreferencias();
});

// ---------- Inicialización ----------
aplicarPreferencias();
renderRecetas();
renderListaCompra();
