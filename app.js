"use strict";

// =============================
// Datos base de la app
// =============================
const recetas = [
  {
    id: "aper-01",
    titulo: "Tartaletas de salmón y eneldo",
    categoria: "aperitivo",
    tiempo: "15 min",
    dificultad: "Fácil",
    descripcion: "Bocados fríos con crema de queso, salmón ahumado y un toque cítrico.",
    ingredientes: [
      "12 tartaletas crujientes",
      "120 g de queso crema",
      "80 g de salmón ahumado en tiras",
      "Eneldo fresco picado",
      "Zumo de limón",
      "Pimienta negra"
    ],
    pasos: [
      "Mezcla el queso crema con eneldo, unas gotas de limón y pimienta.",
      "Rellena cada tartaleta con una cucharadita de la crema.",
      "Corona con una tira de salmón ahumado y refrigera hasta servir."
    ]
  },
  {
    id: "aper-02",
    titulo: "Brochetas de langostino y piña",
    categoria: "aperitivo",
    tiempo: "12 min",
    dificultad: "Fácil",
    descripcion: "Contraste dulce y salado en un pincho listo en minutos.",
    ingredientes: [
      "16 langostinos cocidos y pelados",
      "16 dados de piña natural",
      "Salsa rosa para mojar",
      "Palillos de brocheta"
    ],
    pasos: [
      "Corta la piña en dados del tamaño del langostino.",
      "En cada palillo intercala piña y langostino.",
      "Sirve frío con salsa rosa al lado."
    ]
  },
  {
    id: "prim-01",
    titulo: "Crema de calabaza asada",
    categoria: "primero",
    tiempo: "35 min",
    dificultad: "Fácil",
    descripcion: "Textura sedosa con calabaza al horno y toque de nuez moscada.",
    ingredientes: [
      "800 g de calabaza en dados",
      "1 cebolla dulce",
      "700 ml de caldo de verduras",
      "Aceite de oliva",
      "Nuez moscada y sal",
      "Pipas tostadas para servir"
    ],
    pasos: [
      "Hornea la calabaza con aceite y sal a 200 ºC durante 20 minutos.",
      "Pocha la cebolla en una olla con aceite hasta que quede tierna.",
      "Añade la calabaza asada, el caldo y una pizca de nuez moscada; hierve 10 minutos y tritura."
    ]
  },
  {
    id: "prim-02",
    titulo: "Ensalada templada de setas",
    categoria: "primero",
    tiempo: "20 min",
    dificultad: "Media",
    descripcion: "Hojas verdes con setas salteadas, frutos secos y vinagreta de miel.",
    ingredientes: [
      "250 g de setas variadas",
      "100 g de mezcla de brotes tiernos",
      "30 g de nueces",
      "Aceite de oliva, miel y vinagre balsámico",
      "Sal y pimienta"
    ],
    pasos: [
      "Saltea las setas con aceite hasta dorar y salpimienta.",
      "Mezcla los brotes con las nueces en un bol amplio.",
      "Añade las setas calientes y aliña con una vinagreta de miel, aceite y balsámico."
    ]
  },
  {
    id: "seg-01",
    titulo: "Merluza al horno con limón",
    categoria: "segundo",
    tiempo: "25 min",
    dificultad: "Fácil",
    descripcion: "Pescado jugoso con aceite de perejil y rodajas de limón.",
    ingredientes: [
      "4 lomos de merluza",
      "1 limón en rodajas",
      "2 dientes de ajo",
      "Perejil fresco",
      "Aceite de oliva, sal y pimienta"
    ],
    pasos: [
      "Precalienta el horno a 190 ºC y coloca la merluza en una fuente.",
      "Mezcla aceite con ajo y perejil picados; pincela el pescado.",
      "Cubre con rodajas de limón y hornea 15 minutos hasta que quede tierno."
    ]
  },
  {
    id: "seg-02",
    titulo: "Solomillo con salsa de frutos rojos",
    categoria: "segundo",
    tiempo: "30 min",
    dificultad: "Media",
    descripcion: "Carne sellada a la plancha con salsa rápida y brillante.",
    ingredientes: [
      "600 g de solomillo de cerdo en medallones",
      "200 g de frutos rojos congelados",
      "80 ml de vino tinto",
      "1 cucharada de azúcar moreno",
      "Aceite, sal y pimienta"
    ],
    pasos: [
      "Dora los medallones de solomillo en sartén caliente con aceite; reserva.",
      "En la misma sartén añade frutos rojos, vino y azúcar; reduce 5 minutos.",
      "Devuelve la carne, baña con la salsa y cocina 2 minutos más."
    ]
  },
  {
    id: "seg-03",
    titulo: "Lasaña de espinacas y ricotta",
    categoria: "segundo",
    tiempo: "45 min",
    dificultad: "Media",
    descripcion: "Capas ligeras con espinacas salteadas, ricotta cremosa y gratinado dorado.",
    ingredientes: [
      "12 placas de lasaña precocida",
      "400 g de espinacas frescas",
      "300 g de ricotta",
      "300 ml de salsa de tomate",
      "Queso rallado para gratinar",
      "Ajo, aceite, sal y pimienta"
    ],
    pasos: [
      "Saltea las espinacas con ajo y escurre el exceso de agua.",
      "Mezcla la ricotta con las espinacas y salpimienta.",
      "Monta capas alternando pasta, salsa de tomate y ricotta; termina con queso y hornea 25 minutos."
    ]
  },
  {
    id: "seg-04",
    titulo: "Pollo glaseado con miel y mostaza",
    categoria: "segundo",
    tiempo: "35 min",
    dificultad: "Fácil",
    descripcion: "Muslos al horno con glaseado dulce y aromático.",
    ingredientes: [
      "6 muslos de pollo",
      "2 cucharadas de miel",
      "2 cucharadas de mostaza antigua",
      "1 diente de ajo",
      "Aceite, sal y pimienta"
    ],
    pasos: [
      "Precalienta el horno a 200 ºC y coloca el pollo en bandeja.",
      "Mezcla miel, mostaza, ajo picado y aceite; unta los muslos.",
      "Hornea 30 minutos, pintando a mitad de cocción para un glaseado brillante."
    ]
  },
  {
    id: "post-01",
    titulo: "Crumble de manzana y canela",
    categoria: "postre",
    tiempo: "40 min",
    dificultad: "Fácil",
    descripcion: "Manzana templada con cobertura crujiente y aroma especiado.",
    ingredientes: [
      "4 manzanas en dados",
      "80 g de azúcar moreno",
      "1 cucharadita de canela",
      "120 g de harina",
      "90 g de mantequilla fría",
      "Helado de vainilla para servir"
    ],
    pasos: [
      "Mezcla la manzana con parte del azúcar y la canela; coloca en una fuente.",
      "Aparte, desmiga harina, mantequilla y resto de azúcar hasta lograr arena gruesa.",
      "Cubre la fruta con el crumble y hornea 30 minutos hasta dorar."
    ]
  },
  {
    id: "post-02",
    titulo: "Mousse rápida de chocolate",
    categoria: "postre",
    tiempo: "20 min",
    dificultad: "Fácil",
    descripcion: "Textura ligera sin huevos crudos, lista tras un breve reposo en frío.",
    ingredientes: [
      "200 g de chocolate negro",
      "300 ml de nata para montar",
      "2 cucharadas de azúcar glas",
      "Ralladura de naranja (opcional)"
    ],
    pasos: [
      "Funde el chocolate y deja templar.",
      "Monta la nata fría con el azúcar hasta picos suaves.",
      "Integra el chocolate con movimientos envolventes y refrigera al menos 1 hora."
    ]
  },
  {
    id: "post-03",
    titulo: "Peras al vino especiado",
    categoria: "postre",
    tiempo: "35 min",
    dificultad: "Media",
    descripcion: "Peras enteras cocidas en vino tinto con canela y cítricos.",
    ingredientes: [
      "4 peras conferencia peladas",
      "500 ml de vino tinto",
      "120 g de azúcar",
      "1 rama de canela y piel de naranja",
      "Zumo de medio limón"
    ],
    pasos: [
      "Coloca peras, vino, azúcar y especias en un cazo; hierve suave 25 minutos.",
      "Gira las peras de vez en cuando para que se tiñan de manera uniforme.",
      "Retira las peras, reduce el líquido hasta espesar y sirve con la salsa."
    ]
  },
  {
    id: "post-04",
    titulo: "Tarta fría de queso y frutos rojos",
    categoria: "postre",
    tiempo: "4 h (reposo)",
    dificultad: "Media",
    descripcion: "Base de galleta, crema suave sin horno y cobertura brillante de frutos rojos.",
    ingredientes: [
      "200 g de galletas tipo digestive",
      "90 g de mantequilla",
      "400 g de queso crema",
      "200 ml de nata",
      "120 g de azúcar",
      "Mermelada o coulis de frutos rojos"
    ],
    pasos: [
      "Tritura las galletas con la mantequilla derretida y presiona en un molde.",
      "Bate queso, nata y azúcar hasta crema; vierte sobre la base.",
      "Refrigera 4 horas y cubre con el coulis antes de servir."
    ]
  }
];

// =============================
// Estado global y referencias
// =============================
const estado = {
  filtro: "todas",
  mostrarFavoritos: false,
  textoBusqueda: "",
  favoritos: new Set(JSON.parse(localStorage.getItem("favoritos") || "[]")),
  listaCompra: JSON.parse(localStorage.getItem("lista-compra") || "[]"),
  recetaActual: null,
  pasoActual: 0,
  ultimoEnfoque: null
};

const elementos = {
  listado: document.getElementById("listado"),
  filtros: document.querySelector(".filtros"),
  buscador: document.getElementById("buscar"),
  favoritosToggle: document.getElementById("btn-favs"),
  listaCompra: document.getElementById("lista-compra"),
  btnVaciar: document.getElementById("btn-vaciar"),
  modal: document.getElementById("modal"),
  fondoModal: document.querySelector("#modal .fondo"),
  dialogo: document.querySelector("#modal .dialogo"),
  cerrarModalBtn: document.getElementById("cerrar"),
  contenidoModal: document.getElementById("contenido-modal"),
  live: document.getElementById("aria-live"),
  contraste: document.getElementById("btn-contraste"),
  texto: document.getElementById("btn-texto")
};

// =============================
// Renderizado de recetas
// =============================
function normalizarTexto(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function obtenerRecetasFiltradas() {
  const termino = normalizarTexto(estado.textoBusqueda);
  return recetas.filter((receta) => {
    const coincideFiltro =
      estado.filtro === "todas" || receta.categoria === estado.filtro;
    const coincideFavorito = !estado.mostrarFavoritos || estado.favoritos.has(receta.id);
    const coincideBusqueda = normalizarTexto(receta.titulo).includes(termino);
    return coincideFiltro && coincideFavorito && coincideBusqueda;
  });
}

function renderizarRecetas() {
  elementos.listado.innerHTML = "";
  const data = obtenerRecetasFiltradas();

  if (!data.length) {
    elementos.listado.innerHTML = `<p class="alerta" role="status">No hay recetas para este criterio.</p>`;
    return;
  }

  data.forEach((receta) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = `receta-card cat-${receta.categoria}`;
    const esFavorita = estado.favoritos.has(receta.id);

    tarjeta.innerHTML = `
      <div class="receta-header">
        <div>
          <p class="pill">${receta.categoria}</p>
          <h3>${receta.titulo}</h3>
          <p class="meta">${receta.tiempo} · ${receta.dificultad}</p>
        </div>
        <button class="btn-fav" aria-pressed="${esFavorita}" aria-label="${esFavorita ? "Quitar de favoritos" : "Añadir a favoritos"}" data-id="${receta.id}">
          ${esFavorita ? "★" : "☆"}
        </button>
      </div>
      <p>${receta.descripcion}</p>
      <div class="card-acciones">
        <button class="btn secondary" data-ver="${receta.id}">Ver receta</button>
        <button class="btn" data-agregar="${receta.id}">Añadir ingredientes</button>
      </div>
    `;

    elementos.listado.appendChild(tarjeta);
  });
}

// =============================
// Favoritos
// =============================
function guardarFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(Array.from(estado.favoritos)));
}

function alternarFavorito(id) {
  if (estado.favoritos.has(id)) {
    estado.favoritos.delete(id);
    anunciar("Receta eliminada de favoritos");
  } else {
    estado.favoritos.add(id);
    anunciar("Receta añadida a favoritos");
  }
  guardarFavoritos();
  renderizarRecetas();
}

// =============================
// Lista de la compra
// =============================
function guardarListaCompra() {
  localStorage.setItem("lista-compra", JSON.stringify(estado.listaCompra));
}

function renderizarListaCompra() {
  if (!estado.listaCompra.length) {
    elementos.listaCompra.innerHTML = `<p class="meta" role="status">Tu lista está vacía.</p>`;
    return;
  }

  const items = estado.listaCompra
    .map(
      (item, idx) => `
      <li>
        <input id="item-${idx}" type="checkbox" ${item.completado ? "checked" : ""} data-accion="toggle" data-indice="${idx}">
        <label for="item-${idx}">${item.texto}</label>
        <button class="btn small secondary" data-accion="eliminar" data-indice="${idx}">Eliminar</button>
      </li>`
    )
    .join("");

  elementos.listaCompra.innerHTML = `<ul class="lista-compra">${items}</ul>`;
}

function agregarIngredientes(idReceta) {
  const receta = recetas.find((r) => r.id === idReceta);
  if (!receta) return;

  receta.ingredientes.forEach((texto) => {
    const existe = estado.listaCompra.some((item) => normalizarTexto(item.texto) === normalizarTexto(texto));
    if (!existe) {
      estado.listaCompra.push({ texto, completado: false });
    }
  });

  guardarListaCompra();
  renderizarListaCompra();
  anunciar("Ingredientes añadidos a la lista de la compra");
}

function gestionarListaCompra(evento) {
  const boton = evento.target.closest("button[data-accion]");
  const checkbox = evento.target.closest("input[data-accion]");

  if (boton) {
    const indice = Number(boton.dataset.indice);
    if (boton.dataset.accion === "eliminar") {
      estado.listaCompra.splice(indice, 1);
      guardarListaCompra();
      renderizarListaCompra();
      anunciar("Ingrediente eliminado");
    }
  }

  if (checkbox) {
    const indice = Number(checkbox.dataset.indice);
    estado.listaCompra[indice].completado = checkbox.checked;
    guardarListaCompra();
    anunciar(`Ingrediente ${checkbox.checked ? "marcado" : "desmarcado"}`);
  }
}

// =============================
// Modal y lectura guiada
// =============================
function abrirModal(receta) {
  estado.recetaActual = receta;
  estado.pasoActual = 0;
  estado.ultimoEnfoque = document.activeElement;
  construirContenidoModal(receta);
  elementos.modal.classList.add("abierto");
  elementos.dialogo.className = `dialogo modal-${receta.categoria}`;
  document.body.classList.add("modal-abierto");
  elementos.dialogo.setAttribute("role", "dialog");
  elementos.dialogo.setAttribute("aria-modal", "true");
  elementos.dialogo.focus();
  anunciar(`Receta ${receta.titulo} abierta`);
}

function cerrarModal() {
  detenerVoz();
  elementos.modal.classList.remove("abierto");
  elementos.dialogo.className = "dialogo";
  document.body.classList.remove("modal-abierto");
  elementos.dialogo.removeAttribute("role");
  elementos.dialogo.removeAttribute("aria-modal");
  elementos.contenidoModal.innerHTML = "";
  if (estado.ultimoEnfoque) {
    estado.ultimoEnfoque.focus();
  }
  estado.recetaActual = null;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && elementos.modal.classList.contains("abierto")) {
    cerrarModal();
  }
});

function construirContenidoModal(receta) {
  const pasos = receta.pasos
    .map((paso, idx) => `<li class="${idx === estado.pasoActual ? "paso-activo" : ""}">Paso ${idx + 1}: ${paso}</li>`)
    .join("");

  elementos.contenidoModal.innerHTML = `
    <header class="modal-header">
      <h2>${receta.titulo}</h2>
      <p class="meta">${receta.tiempo} · ${receta.dificultad}</p>
    </header>
    <section>
      <h3>Ingredientes</h3>
      <ul class="lista-ingredientes">${receta.ingredientes.map((i) => `<li>${i}</li>`).join("")}</ul>
    </section>
    <section>
      <div class="detalle-acciones">
        <button class="btn btn-voz" data-voz="leer">Leer paso</button>
        <button class="btn small secondary" data-voz="anterior">Anterior</button>
        <button class="btn small secondary" data-voz="siguiente">Siguiente</button>
        <button class="btn small" data-voz="pausar">Pausar</button>
        <button class="btn small" data-voz="reanudar">Reanudar</button>
        <p class="voz-ayuda" id="estado-paso">Paso ${estado.pasoActual + 1} de ${receta.pasos.length}</p>
      </div>
      <ol id="lista-pasos" class="lista-pasos">${pasos}</ol>
    </section>
    <div class="modal-acciones">
      <button class="btn" data-agregar="${receta.id}">Añadir ingredientes</button>
      <button class="btn secondary" id="cerrar-modal">Cerrar</button>
    </div>
  `;

  elementos.contenidoModal
    .querySelectorAll("[data-voz]")
    .forEach((btn) => btn.addEventListener("click", gestionarVoz));
  elementos.contenidoModal
    .querySelector("#cerrar-modal")
    .addEventListener("click", cerrarModal);
  elementos.contenidoModal
    .querySelector("[data-agregar]")
    .addEventListener("click", (e) => {
      agregarIngredientes(e.target.dataset.agregar);
    });
}

function actualizarPasos() {
  if (!estado.recetaActual) return;
  const pasos = elementos.contenidoModal.querySelectorAll("#lista-pasos li");
  pasos.forEach((li, idx) => {
    li.classList.toggle("paso-activo", idx === estado.pasoActual);
  });
  const estadoPaso = elementos.contenidoModal.querySelector("#estado-paso");
  estadoPaso.textContent = `Paso ${estado.pasoActual + 1} de ${estado.recetaActual.pasos.length}`;
}

// =============================
// Voz (Speech Synthesis)
// =============================
function detenerVoz() {
  if ("speechSynthesis" in window && speechSynthesis.speaking) speechSynthesis.cancel();
}

function leerPaso() {
  if (!estado.recetaActual || !("speechSynthesis" in window)) return;
  detenerVoz();
  const paso = estado.recetaActual.pasos[estado.pasoActual];
  const utter = new SpeechSynthesisUtterance(paso);
  utter.lang = "es-ES";
  speechSynthesis.speak(utter);
}

function siguientePaso() {
  if (!estado.recetaActual) return;
  if (estado.pasoActual < estado.recetaActual.pasos.length - 1) {
    estado.pasoActual += 1;
    actualizarPasos();
    leerPaso();
  }
}

function pasoAnterior() {
  if (!estado.recetaActual) return;
  if (estado.pasoActual > 0) {
    estado.pasoActual -= 1;
    actualizarPasos();
    leerPaso();
  }
}

function pausarVoz() {
  if ("speechSynthesis" in window && speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
  }
}

function reanudarVoz() {
  if ("speechSynthesis" in window && speechSynthesis.paused) {
    speechSynthesis.resume();
  }
}

function gestionarVoz(evento) {
  const accion = evento.target.dataset.voz;
  switch (accion) {
    case "leer":
      leerPaso();
      break;
    case "anterior":
      pasoAnterior();
      break;
    case "siguiente":
      siguientePaso();
      break;
    case "pausar":
      pausarVoz();
      break;
    case "reanudar":
      reanudarVoz();
      break;
    default:
      break;
  }
}

// =============================
// Accesibilidad y utilidades
// =============================
function anunciar(mensaje) {
  if (!elementos.live) return;
  elementos.live.textContent = "";
  window.setTimeout(() => {
    elementos.live.textContent = mensaje;
  }, 10);
}

function alternarContraste() {
  document.body.classList.toggle("alto-contraste");
  elementos.contraste.textContent = document.body.classList.contains("alto-contraste")
    ? "Contraste activo"
    : "Contraste";
}

function alternarTamanoTexto() {
  document.body.classList.toggle("texto-grande");
  elementos.texto.textContent = document.body.classList.contains("texto-grande")
    ? "Texto grande"
    : "Texto normal";
}

// =============================
// Eventos principales
// =============================
function inicializarEventos() {
  elementos.filtros.addEventListener("click", (e) => {
    const filtro = e.target.dataset.filtro;
    if (filtro) {
      estado.filtro = filtro;
      estado.mostrarFavoritos = false;
      elementos.favoritosToggle.classList.remove("active");
      elementos.filtros.querySelectorAll("button[data-filtro]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filtro === filtro);
      });
      renderizarRecetas();
    }
  });

  elementos.favoritosToggle.addEventListener("click", () => {
    estado.mostrarFavoritos = !estado.mostrarFavoritos;
    elementos.favoritosToggle.classList.toggle("active", estado.mostrarFavoritos);
    renderizarRecetas();
  });

  elementos.buscador.addEventListener("input", (e) => {
    estado.textoBusqueda = e.target.value;
    renderizarRecetas();
  });

  elementos.listado.addEventListener("click", (e) => {
    const btnFav = e.target.closest(".btn-fav");
    const btnVer = e.target.closest("[data-ver]");
    const btnAgregar = e.target.closest("[data-agregar]");

    if (btnFav) {
      alternarFavorito(btnFav.dataset.id);
    }
    if (btnVer) {
      const receta = recetas.find((r) => r.id === btnVer.dataset.ver);
      if (receta) abrirModal(receta);
    }
    if (btnAgregar) {
      agregarIngredientes(btnAgregar.dataset.agregar);
    }
  });

  elementos.listaCompra.addEventListener("click", gestionarListaCompra);
  elementos.listaCompra.addEventListener("change", gestionarListaCompra);
  elementos.btnVaciar.addEventListener("click", () => {
    estado.listaCompra = [];
    guardarListaCompra();
    renderizarListaCompra();
    anunciar("Lista vaciada");
  });

  elementos.fondoModal.addEventListener("click", cerrarModal);
  elementos.cerrarModalBtn.addEventListener("click", cerrarModal);
  elementos.contraste.addEventListener("click", alternarContraste);
  elementos.texto.addEventListener("click", alternarTamanoTexto);
}

function init() {
  inicializarEventos();
  renderizarRecetas();
  renderizarListaCompra();
}

init();
