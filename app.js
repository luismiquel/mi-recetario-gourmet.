// ============================================================
// ESTADO GLOBAL
// ============================================================
let recetasFiltradas = [];
let filtroActual = "todas";
let terminoBusqueda = "";
let favoritos = new Set(JSON.parse(localStorage.getItem("favoritos") || "[]"));
let listaCompra = JSON.parse(localStorage.getItem("listaCompra") || "[]");
let modoTextoGrande = false;
let modoContrasteAlto = false;

// Voz
let reconocimiento = null;
let recetaEnVoz = null;
let pasoActual = 0;
let escuchando = false;

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  // Referencias DOM
  const listado = document.getElementById("listado");
  const buscarInput = document.getElementById("buscar");
  const filtros = document.querySelector(".filtros");
  const btnFavs = document.getElementById("btn-favs");
  const contListaCompra = document.getElementById("lista-compra");
  const btnVaciar = document.getElementById("btn-vaciar");
  const btnContraste = document.getElementById("btn-contraste");
  const btnTexto = document.getElementById("btn-texto");
  const modal = document.getElementById("modal");
  const fondoModal = modal.querySelector(".fondo");
  const btnCerrarModal = document.getElementById("cerrar");
  const contenidoModal = document.getElementById("contenido-modal");

  if (!window.RECETAS) {
    console.error("No se encuentra RECETAS. Revisa recetas.js");
    return;
  }

  recetasFiltradas = [...RECETAS];

  // ================= LISTADO INICIAL =================
  renderRecetas(listado);
  renderListaCompra(contListaCompra);
  aplicarPreferenciasAccesibilidad();

  // ================= BUSCADOR =================
  buscarInput.addEventListener("input", (e) => {
    terminoBusqueda = e.target.value.toLowerCase();
    actualizarFiltroYBusqueda(listado);
  });

  // ================= FILTROS =================
  filtros.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filtro]");
    if (!btn) return;

    filtros.querySelectorAll("button[data-filtro]").forEach((b) =>
      b.classList.remove("active")
    );
    btn.classList.add("active");

    filtroActual = btn.getAttribute("data-filtro");
    actualizarFiltroYBusqueda(listado);
  });

  // ================= FAVORITOS =================
  btnFavs.addEventListener("click", () => {
    if (btnFavs.classList.contains("activo-favs")) {
      btnFavs.classList.remove("activo-favs");
      actualizarFiltroYBusqueda(listado);
    } else {
      btnFavs.classList.add("activo-favs");
      const soloFavs = RECETAS.filter((r) => favoritos.has(r.id));
      renderRecetas(listado, soloFavs);
    }
  });

  // ================= LISTA DE LA COMPRA =================
  btnVaciar.addEventListener("click", () => {
    if (!confirm("¿Vaciar toda la lista de la compra?")) return;
    listaCompra = [];
    guardarListaCompra();
    renderListaCompra(contListaCompra);
  });

  // ================= ACCESIBILIDAD (BOTONES) =================
  btnContraste.addEventListener("click", () => {
    modoContrasteAlto = !modoContrasteAlto;
    guardarAccesibilidad();
    aplicarPreferenciasAccesibilidad();
  });

  btnTexto.addEventListener("click", () => {
    modoTextoGrande = !modoTextoGrande;
    guardarAccesibilidad();
    aplicarPreferenciasAccesibilidad();
    btnTexto.textContent = modoTextoGrande ? "Texto grande" : "Texto normal";
  });

  // ================= MODAL =================
  fondoModal.addEventListener("click", cerrarModal);
  btnCerrarModal.addEventListener("click", cerrarModal);

  // Guardamos referencias globales del modal
  window._ui = {
    modal,
    contenidoModal,
    listado,
    contListaCompra,
  };

  // Configurar reconocimiento de voz
  inicializarReconocimientoVoz();
});

// ============================================================
// RENDER DE RECETAS
// ============================================================
function actualizarFiltroYBusqueda(contenedor) {
  let datos = RECETAS;

  // Filtrar por categoría
  if (filtroActual !== "todas") {
    datos = datos.filter((r) => r.category === filtroActual);
  }

  // Buscar por texto
  if (terminoBusqueda.trim() !== "") {
    const t = terminoBusqueda;
    datos = datos.filter(
      (r) =>
        r.title.toLowerCase().includes(t) ||
        r.description.toLowerCase().includes(t)
    );
  }

  recetasFiltradas = datos;
  renderRecetas(contenedor);
}

function renderRecetas(contenedor, datosManual) {
  const datos = datosManual || recetasFiltradas;
  contenedor.innerHTML = "";

  if (!datos || datos.length === 0) {
    contenedor.innerHTML =
      '<p class="sin-resultados">No hay recetas para este filtro o búsqueda.</p>';
    return;
  }

  datos.forEach((receta) => {
    const card = document.createElement("article");
    card.className = "card-receta";

    const esFavorita = favoritos.has(receta.id);

    card.innerHTML = `
      <div class="card-body">
        <h3>${receta.title}</h3>
        <p class="meta">
          <span>${formatearCategoria(receta.category)}</span> ·
          <span>${receta.time}</span> ·
          <span>${receta.difficulty}</span>
        </p>
        <p class="desc">${receta.description}</p>
      </div>
      <div class="card-acciones">
        <button class="btn primary btn-ver" data-id="${receta.id}">
          Ver receta
        </button>
        <button class="btn secondary btn-add-lista" data-id="${receta.id}">
          Añadir a la lista
        </button>
        <button class="btn icono btn-fav" data-id="${receta.id}">
          ${esFavorita ? "★ Favorito" : "☆ Favorito"}
        </button>
      </div>
    `;

    contenedor.appendChild(card);
  });

  // Eventos de los botones
  contenedor.querySelectorAll(".btn-ver").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"), 10);
      const receta = RECETAS.find((r) => r.id === id);
      if (receta) abrirModal(receta);
    });
  });

  contenedor.querySelectorAll(".btn-add-lista").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"), 10);
      const receta = RECETAS.find((r) => r.id === id);
      if (receta) {
        agregarRecetaALista(receta);
      }
    });
  });

  contenedor.querySelectorAll(".btn-fav").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-id"), 10);
      toggleFavorito(id, btn);
    });
  });
}

function formatearCategoria(cat) {
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

// ============================================================
// FAVORITOS
// ============================================================
function toggleFavorito(id, btn) {
  if (favoritos.has(id)) {
    favoritos.delete(id);
  } else {
    favoritos.add(id);
  }
  localStorage.setItem("favoritos", JSON.stringify([...favoritos]));

  if (btn) {
    btn.textContent = favoritos.has(id) ? "★ Favorito" : "☆ Favorito";
  }
}

// ============================================================
// LISTA DE LA COMPRA
// ============================================================
function agregarRecetaALista(receta) {
  if (!receta.ingredients || receta.ingredients.length === 0) return;

  const nuevos = receta.ingredients.map((i) => i.trim()).filter(Boolean);
  listaCompra = [...listaCompra, ...nuevos];
  // Quitar duplicados
  listaCompra = [...new Set(listaCompra)];
  guardarListaCompra();
  if (window._ui) {
    renderListaCompra(window._ui.contListaCompra);
  }
}

function guardarListaCompra() {
  localStorage.setItem("listaCompra", JSON.stringify(listaCompra));
}

function renderListaCompra(contenedor) {
  contenedor.innerHTML = "";
  if (!listaCompra || listaCompra.length === 0) {
    contenedor.innerHTML =
      '<p class="sin-resultados">Tu lista de la compra está vacía.</p>';
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "lista-compra-ul";

  listaCompra.forEach((item, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item}</span>
      <button class="btn small danger" data-idx="${idx}">Quitar</button>
    `;
    ul.appendChild(li);
  });

  contenedor.appendChild(ul);

  ul.querySelectorAll("button[data-idx]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-idx"), 10);
      listaCompra.splice(index, 1);
      guardarListaCompra();
      renderListaCompra(contenedor);
    });
  });
}

// ============================================================
// MODAL DE RECETA
// ============================================================
function abrirModal(receta) {
  const { modal, contenidoModal } = window._ui;

  const pasos = receta.steps && receta.steps.length > 0 ? receta.steps : [];
  const ingredientes = receta.ingredients || [];

  contenidoModal.innerHTML = `
    <h2>${receta.title}</h2>
    <p class="meta">
      <span>${formatearCategoria(receta.category)}</span> ·
      <span>${receta.time}</span> ·
      <span>${receta.difficulty}</span>
    </p>
    <p>${receta.description}</p>

    <h3>Ingredientes</h3>
    <ul class="lista-ingredientes">
      ${ingredientes.map((i) => `<li>${i}</li>`).join("")}
    </ul>

    <h3>Pasos</h3>
    <ol class="lista-pasos">
      ${pasos.map((p, idx) => `<li data-paso="${idx}">${p}</li>`).join("")}
    </ol>

    <div class="zona-voz">
      <h3>Cocina guiada por voz</h3>
      <p class="ayuda-voz">
        Pulsa “Iniciar cocina guiada” y luego puedes decir:<br>
        <strong>“siguiente”</strong>, <strong>“anterior”</strong>, 
        <strong>“repetir”</strong>, <strong>“parar”</strong> o <strong>“cerrar”</strong>.
      </p>
      <div class="botones-voz">
        <button id="btn-voz-iniciar" class="btn primary">Iniciar cocina guiada</button>
        <button id="btn-voz-parar" class="btn secondary">Parar voz</button>
      </div>
      <p id="estado-voz" class="estado-voz" aria-live="polite"></p>
    </div>
  `;

  modal.classList.add("abierto");
  document.body.classList.add("no-scroll");
  modal.querySelector(".dialogo").focus();

  // Configurar botones de voz de este modal
  const btnIniciarVoz = document.getElementById("btn-voz-iniciar");
  const btnPararVoz = document.getElementById("btn-voz-parar");

  btnIniciarVoz.addEventListener("click", () => {
    iniciarCocinaGuiada(receta);
  });

  btnPararVoz.addEventListener("click", () => {
    detenerCocinaGuiada(true);
  });
}

function cerrarModal() {
  const { modal } = window._ui;
  modal.classList.remove("abierto");
  document.body.classList.remove("no-scroll");
  detenerCocinaGuiada(false);
}

// ============================================================
// ACCESIBILIDAD GENERAL
// ============================================================
function guardarAccesibilidad() {
  const data = {
    textoGrande: modoTextoGrande,
    contraste: modoContrasteAlto,
  };
  localStorage.setItem("accesibilidadRecetario", JSON.stringify(data));
}

function aplicarPreferenciasAccesibilidad() {
  const guardado = JSON.parse(
    localStorage.getItem("accesibilidadRecetario") || "null"
  );
  if (guardado) {
    modoTextoGrande = !!guardado.textoGrande;
    modoContrasteAlto = !!guardado.contraste;
  }

  if (modoTextoGrande) {
    document.body.classList.add("texto-grande");
  } else {
    document.body.classList.remove("texto-grande");
  }

  if (modoContrasteAlto) {
    document.body.classList.add("alto-contraste");
  } else {
    document.body.classList.remove("alto-contraste");
  }
}

// ============================================================
// VOZ: RECONOCIMIENTO Y LECTURA
// ============================================================
function inicializarReconocimientoVoz() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Reconocimiento de voz no soportado en este navegador.");
    return;
  }

  reconocimiento = new SpeechRecognition();
  reconocimiento.lang = "es-ES";
  reconocimiento.continuous = true; // seguir escuchando
  reconocimiento.interimResults = false;

  reconocimiento.onresult = (event) => {
    const lastIndex = event.results.length - 1;
    const texto = event.results[lastIndex][0].transcript.toLowerCase().trim();
    console.log("Comando voz:", texto);
    procesarComandoVoz(texto);
  };

  reconocimiento.onerror = (event) => {
    console.warn("Error reconocimiento voz:", event.error);
    actualizarEstadoVoz("Error de reconocimiento de voz.");
  };

  reconocimiento.onend = () => {
    // Si seguimos en modo cocina guiada, reanudar
    if (escuchando && reconocimiento) {
      reconocimiento.start();
    }
  };
}

function hablar(texto) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "es-ES";
  window.speechSynthesis.speak(u);
}

function iniciarCocinaGuiada(receta) {
  if (!receta.steps || receta.steps.length === 0) {
    actualizarEstadoVoz("Esta receta no tiene pasos definidos.");
    return;
  }
  recetaEnVoz = receta;
  pasoActual = 0;
  escuchando = true;

  const total = receta.steps.length;
  const intro = `Vamos a cocinar ${receta.title}. Tiene ${total} pasos. Di "siguiente" para pasar al siguiente paso.`;
  actualizarEstadoVoz("Cocina guiada iniciada. Escuchando comandos…");
  hablar(intro + " Primer paso: " + receta.steps[0]);

  resaltarPaso(pasoActual);

  if (reconocimiento) {
    try {
      reconocimiento.start();
    } catch (e) {
      // a veces lanza error si ya está iniciado
      console.log("Reconocimiento ya iniciado.");
    }
  }
}

function detenerCocinaGuiada(hablarFin) {
  escuchando = false;
  if (reconocimiento) {
    try {
      reconocimiento.stop();
    } catch (e) {}
  }
  if (hablarFin) {
    hablar("He parado la cocina guiada.");
  }
  actualizarEstadoVoz("");
  limpiarResaltadoPasos();
  recetaEnVoz = null;
}

function actualizarEstadoVoz(texto) {
  const el = document.getElementById("estado-voz");
  if (el) el.textContent = texto || "";
}

function procesarComandoVoz(texto) {
  if (!recetaEnVoz || !recetaEnVoz.steps || recetaEnVoz.steps.length === 0) {
    actualizarEstadoVoz("No hay una receta activa para la cocina guiada.");
    return;
  }

  if (texto.includes("siguiente")) {
    siguientePaso();
  } else if (texto.includes("anterior") || texto.includes("atrás")) {
    pasoAnterior();
  } else if (texto.includes("repetir") || texto.includes("otra vez")) {
    repetirPaso();
  } else if (
    texto.includes("parar") ||
    texto.includes("detener") ||
    texto.includes("cerrar") ||
    texto.includes("salir")
  ) {
    detenerCocinaGuiada(true);
  } else {
    // Comando no reconocido, no hace falta hablar siempre
    actualizarEstadoVoz(
      'No he entendido el comando. Prueba con "siguiente", "anterior", "repetir" o "parar".'
    );
  }
}

function siguientePaso() {
  if (!recetaEnVoz) return;
  if (pasoActual < recetaEnVoz.steps.length - 1) {
    pasoActual++;
    const t = `Paso ${pasoActual + 1} de ${recetaEnVoz.steps.length}: ${
      recetaEnVoz.steps[pasoActual]
    }`;
    actualizarEstadoVoz(`Leyendo paso ${pasoActual + 1}…`);
    hablar(t);
    resaltarPaso(pasoActual);
  } else {
    hablar("Ya estamos en el último paso. La receta está casi lista. ¡Buen provecho!");
    actualizarEstadoVoz("Último paso alcanzado.");
  }
}

function pasoAnterior() {
  if (!recetaEnVoz) return;
  if (pasoActual > 0) {
    pasoActual--;
    const t = `Paso ${pasoActual + 1} de ${recetaEnVoz.steps.length}: ${
      recetaEnVoz.steps[pasoActual]
    }`;
    actualizarEstadoVoz(`Volviendo al paso ${pasoActual + 1}…`);
    hablar(t);
    resaltarPaso(pasoActual);
  } else {
    hablar("Ya estás en el primer paso.");
    actualizarEstadoVoz("Primer paso.");
  }
}

function repetirPaso() {
  if (!recetaEnVoz) return;
  const t = `Repito el paso ${pasoActual + 1}: ${
    recetaEnVoz.steps[pasoActual]
  }`;
  actualizarEstadoVoz(`Repitiendo paso ${pasoActual + 1}…`);
  hablar(t);
  resaltarPaso(pasoActual);
}

function resaltarPaso(idx) {
  const lista = document.querySelectorAll(".lista-pasos li");
  lista.forEach((li) => li.classList.remove("paso-activo"));
  const liActivo = document.querySelector(`.lista-pasos li[data-paso="${idx}"]`);
  if (liActivo) {
    liActivo.classList.add("paso-activo");
    liActivo.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function limpiarResaltadoPasos() {
  document
    .querySelectorAll(".lista-pasos li")
    .forEach((li) => li.classList.remove("paso-activo"));
}
