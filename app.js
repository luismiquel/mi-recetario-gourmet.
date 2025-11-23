// app.js
// ==========================================================
//  LÓGICA PRINCIPAL DE LA APP DE RECETAS NAVIDEÑAS
//  - Usa el array global RECETAS definido en recetas.js
//  - Sin imágenes, solo texto claro
//  - Modal + lista de la compra + favoritos + asistente de voz
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  // ------------------ COMPROBACIÓN DE DATOS ------------------
  if (typeof RECETAS === "undefined" || !Array.isArray(RECETAS)) {
    console.error(
      "❌ No se ha encontrado el array RECETAS. Asegúrate de que recetas.js se carga ANTES que app.js"
    );
    return;
  }

  // ------------------ REFERENCIAS AL DOM ---------------------
  const body = document.body;
  const inputBuscar = document.getElementById("buscar");
  const contenedorListado = document.getElementById("listado");
  const contenedorListaCompra = document.getElementById("lista-compra");
  const btnVaciarLista = document.getElementById("btn-vaciar");
  const btnFavs = document.getElementById("btn-favs");
  const filtros = document.querySelectorAll(".filtros button[data-filtro]");
  const btnContraste = document.getElementById("btn-contraste");
  const btnTexto = document.getElementById("btn-texto");

  const modal = document.getElementById("modal");
  const modalFondo = modal.querySelector(".fondo");
  const modalDialogo = modal.querySelector(".dialogo");
  const modalCerrar = document.getElementById("cerrar");
  const modalContenido = document.getElementById("contenido-modal");

  // ------------------ ESTADO DE LA APP -----------------------
  let filtroActual = "todas";
  let mostrarSoloFavoritos = false;
  let textoBusqueda = "";

  // Favoritos en localStorage
  const FAVORITOS_KEY = "navidad-favoritos";
  let favoritos = new Set(
    JSON.parse(localStorage.getItem(FAVORITOS_KEY) || "[]")
  );

  // Lista de la compra en localStorage
  const LISTA_KEY = "navidad-lista-compra";
  let listaCompra = JSON.parse(localStorage.getItem(LISTA_KEY) || "[]");

  // Estado del modal / voz
  let recetaActual = null;
  let pasoActualIndex = 0;

  // TTS (texto → voz)
  const tieneVoz = "speechSynthesis" in window;
  // Reconocimiento de voz
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition || null;
  let reconocimiento = null;
  let reconocimientoActivo = false;

  // ==========================================================
  //  UTILIDADES
  // ==========================================================

  function guardarFavoritos() {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify([...favoritos]));
  }

  function guardarListaCompra() {
    localStorage.setItem(LISTA_KEY, JSON.stringify(listaCompra));
  }

  function normalizarTexto(t) {
    return t
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function categoriaLegible(cat) {
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
        return cat;
    }
  }

  function crearBadgeCategoria(cat) {
    const span = document.createElement("span");
    span.className = "badge categoria " + cat;
    span.textContent = categoriaLegible(cat);
    return span;
  }

  function crearBadgeDificultad(dif) {
    const span = document.createElement("span");
    span.className = "badge dificultad";
    span.textContent = dif || "";
    return span;
  }

  function crearBadgeTiempo(tiempo) {
    const span = document.createElement("span");
    span.className = "badge tiempo";
    span.textContent = tiempo || "";
    return span;
  }

  // ==========================================================
  //  RENDER LISTA DE LA COMPRA
  // ==========================================================

  function renderListaCompra() {
    contenedorListaCompra.innerHTML = "";

    if (!listaCompra.length) {
      const p = document.createElement("p");
      p.textContent = "Tu lista está vacía. Añade ingredientes desde una receta.";
      p.className = "texto-suave";
      contenedorListaCompra.appendChild(p);
      return;
    }

    const ul = document.createElement("ul");
    ul.className = "lista-compra-ul";

    listaCompra.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "item-compra";

      const span = document.createElement("span");
      span.textContent = item;

      const btnEliminar = document.createElement("button");
      btnEliminar.className = "btn small danger";
      btnEliminar.textContent = "×";
      btnEliminar.title = "Eliminar";
      btnEliminar.addEventListener("click", () => {
        listaCompra.splice(index, 1);
        guardarListaCompra();
        renderListaCompra();
      });

      li.appendChild(span);
      li.appendChild(btnEliminar);
      ul.appendChild(li);
    });

    contenedorListaCompra.appendChild(ul);
  }

  function anadirIngredientesLista(ingredientes) {
    ingredientes.forEach((ing) => {
      if (!listaCompra.includes(ing)) {
        listaCompra.push(ing);
      }
    });
    guardarListaCompra();
    renderListaCompra();
  }

  // ==========================================================
  //  RENDER LISTADO DE RECETAS
  // ==========================================================

  function pasaFiltros(r) {
    if (filtroActual !== "todas" && r.category !== filtroActual) return false;

    if (mostrarSoloFavoritos && !favoritos.has(r.id)) return false;

    if (textoBusqueda) {
      const term = normalizarTexto(textoBusqueda);
      const titulo = normalizarTexto(r.title || "");
      const desc = normalizarTexto(r.description || "");
      if (!titulo.includes(term) && !desc.includes(term)) return false;
    }

    return true;
  }

  function renderListado() {
    contenedorListado.innerHTML = "";

    const recetasMostradas = RECETAS.filter(pasaFiltros);

    if (!recetasMostradas.length) {
      const p = document.createElement("p");
      p.textContent = "No hay recetas que coincidan con el filtro actual.";
      p.className = "texto-suave";
      contenedorListado.appendChild(p);
      return;
    }

    recetasMostradas.forEach((receta) => {
      const card = document.createElement("article");
      card.className = "card-receta";

      const header = document.createElement("div");
      header.className = "card-header";

      const titulo = document.createElement("h3");
      titulo.textContent = receta.title;

      const meta = document.createElement("div");
      meta.className = "card-meta";
      meta.appendChild(crearBadgeCategoria(receta.category));
      if (receta.time) meta.appendChild(crearBadgeTiempo(receta.time));
      if (receta.difficulty)
        meta.appendChild(crearBadgeDificultad(receta.difficulty));

      header.appendChild(titulo);
      header.appendChild(meta);

      const desc = document.createElement("p");
      desc.className = "card-desc";
      desc.textContent = receta.description || "";

      const acciones = document.createElement("div");
      acciones.className = "card-acciones";

      const btnVer = document.createElement("button");
      btnVer.className = "btn";
      btnVer.textContent = "Ver receta";
      btnVer.addEventListener("click", () => abrirModalReceta(receta));

      const btnFav = document.createElement("button");
      btnFav.className = "btn secondary";
      const esFav = favoritos.has(receta.id);
      btnFav.textContent = esFav ? "★ Favorito" : "☆ Favorito";
      btnFav.title = "Marcar como favorito";
      btnFav.addEventListener("click", () => {
        if (favoritos.has(receta.id)) {
          favoritos.delete(receta.id);
        } else {
          favoritos.add(receta.id);
        }
        guardarFavoritos();
        renderListado();
      });

      const btnLista = document.createElement("button");
      btnLista.className = "btn secondary";
      btnLista.textContent = "Añadir ingredientes";
      btnLista.addEventListener("click", () => {
        anadirIngredientesLista(receta.ingredients || []);
      });

      acciones.appendChild(btnVer);
      acciones.appendChild(btnFav);
      acciones.appendChild(btnLista);

      card.appendChild(header);
      card.appendChild(desc);
      card.appendChild(acciones);

      contenedorListado.appendChild(card);
    });
  }

  // ==========================================================
  //  MODAL DE RECETA
  // ==========================================================

  function abrirModalReceta(receta) {
    recetaActual = receta;
    pasoActualIndex = 0;

    // Limpiar contenido
    modalContenido.innerHTML = "";

    const titulo = document.createElement("h2");
    titulo.textContent = receta.title;

    const meta = document.createElement("div");
    meta.className = "modal-meta";
    meta.appendChild(crearBadgeCategoria(receta.category));
    if (receta.time) meta.appendChild(crearBadgeTiempo(receta.time));
    if (receta.difficulty)
      meta.appendChild(crearBadgeDificultad(receta.difficulty));

    const desc = document.createElement("p");
    desc.className = "modal-desc";
    desc.textContent = receta.description || "";

    // Ingredientes
    const hIng = document.createElement("h3");
    hIng.textContent = "Ingredientes";

    const ulIng = document.createElement("ul");
    ulIng.className = "lista-ingredientes";
    (receta.ingredients || []).forEach((ing) => {
      const li = document.createElement("li");
      li.textContent = ing;
      ulIng.appendChild(li);
    });

    // Pasos
    const hPasos = document.createElement("h3");
    hPasos.textContent = "Pasos";

    const olPasos = document.createElement("ol");
    olPasos.className = "lista-pasos";
    (receta.steps || []).forEach((p) => {
      const li = document.createElement("li");
      li.textContent = p;
      olPasos.appendChild(li);
    });

    // Acciones en el modal
    const accionesModal = document.createElement("div");
    accionesModal.className = "modal-acciones";

    const btnListaTodo = document.createElement("button");
    btnListaTodo.className = "btn secondary";
    btnListaTodo.textContent = "Añadir todos los ingredientes a la lista";
    btnListaTodo.addEventListener("click", () => {
      anadirIngredientesLista(receta.ingredients || []);
    });

    const btnLeer = document.createElement("button");
    btnLeer.className = "btn";
    btnLeer.textContent = "Leer receta";
    btnLeer.addEventListener("click", () => {
      iniciarLecturaReceta();
    });

    const btnAsistente = document.createElement("button");
    btnAsistente.className = "btn secondary";
    btnAsistente.textContent = "Asistente de voz";
    btnAsistente.addEventListener("click", () => {
      iniciarAsistenteVoz();
    });

    accionesModal.appendChild(btnListaTodo);
    accionesModal.appendChild(btnLeer);
    accionesModal.appendChild(btnAsistente);

    // Montar en el modal
    modalContenido.appendChild(titulo);
    modalContenido.appendChild(meta);
    modalContenido.appendChild(desc);
    modalContenido.appendChild(hIng);
    modalContenido.appendChild(ulIng);
    modalContenido.appendChild(hPasos);
    modalContenido.appendChild(olPasos);
    modalContenido.appendChild(accionesModal);

    // Mostrar modal
    modal.classList.add("abierto");
    modalDialogo.focus();
  }

  function cerrarModal() {
    detenerHabla();
    detenerReconocimiento();
    modal.classList.remove("abierto");
    recetaActual = null;
    pasoActualIndex = 0;
  }

  modalCerrar.addEventListener("click", cerrarModal);
  modalFondo.addEventListener("click", cerrarModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("abierto")) {
      cerrarModal();
    }
  });

  // ==========================================================
  //  TEXTO → VOZ (LECTOR)
  // ==========================================================

  function detenerHabla() {
    if (tieneVoz) {
      window.speechSynthesis.cancel();
    }
  }

  function hablar(texto, finCallback) {
    if (!tieneVoz) {
      console.warn("Este navegador no soporta speechSynthesis");
      return;
    }
    if (!texto) return;

    detenerHabla();

    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = "es-ES";
    utter.rate = 1;
    utter.pitch = 1;

    if (typeof finCallback === "function") {
      utter.onend = finCallback;
    }

    window.speechSynthesis.speak(utter);
  }

  function iniciarLecturaReceta() {
    if (!recetaActual) return;

    detenerHabla();

    let texto =
      "Receta: " +
      recetaActual.title +
      ". " +
      (recetaActual.description || "") +
      ". Ingredientes: ";

    (recetaActual.ingredients || []).forEach((ing) => {
      texto += ing + ". ";
    });

    texto += "Pasos: ";

    (recetaActual.steps || []).forEach((p, i) => {
      texto += "Paso " + (i + 1) + ": " + p + ". ";
    });

    hablar(texto);
  }

  // ==========================================================
  //  ASISTENTE DE VOZ (RECONOCIMIENTO DE COMANDOS)
  // ==========================================================

  function detenerReconocimiento() {
    if (reconocimiento && reconocimientoActivo) {
      try {
        reconocimiento.stop();
      } catch (e) {
        console.warn("Error al detener reconocimiento", e);
      }
      reconocimientoActivo = false;
    }
  }

  function iniciarAsistenteVoz() {
    if (!recetaActual) return;

    if (!SpeechRecognition) {
      hablar(
        "Lo siento, tu navegador no soporta reconocimiento de voz. Solo puedo leer la receta."
      );
      return;
    }

    detenerReconocimiento();
    detenerHabla();

    if (!reconocimiento) {
      reconocimiento = new SpeechRecognition();
      reconocimiento.lang = "es-ES";
      reconocimiento.continuous = true;
      reconocimiento.interimResults = false;

      reconocimiento.onresult = (event) => {
        const last = event.results[event.results.length - 1];
        if (!last || !last.isFinal) return;
        const texto = last[0].transcript.toLowerCase().trim();
        console.log("🎙️ Comando reconocido:", texto);
        procesarComandoVoz(texto);
      };

      reconocimiento.onerror = (e) => {
        console.warn("Error en reconocimiento de voz:", e.error);
      };

      reconocimiento.onend = () => {
        reconocimientoActivo = false;
      };
    }

    try {
      reconocimiento.start();
      reconocimientoActivo = true;
      pasoActualIndex = 0;
      hablar(
        "Asistente de voz activado. Di: siguiente, anterior, repetir, ingredientes, parar o cerrar receta. Empezamos por el paso 1."
      );
      leerPasoActual();
    } catch (e) {
      console.warn("No se pudo iniciar el reconocimiento:", e);
    }
  }

  function leerPasoActual() {
    if (!recetaActual || !recetaActual.steps || !recetaActual.steps.length) {
      hablar("Esta receta no tiene pasos definidos.");
      return;
    }
    if (pasoActualIndex < 0) pasoActualIndex = 0;
    if (pasoActualIndex >= recetaActual.steps.length)
      pasoActualIndex = recetaActual.steps.length - 1;

    const paso = recetaActual.steps[pasoActualIndex];
    const texto =
      "Paso " + (pasoActualIndex + 1) + " de " + recetaActual.steps.length + ": " + paso;
    hablar(texto);
  }

  function procesarComandoVoz(texto) {
    if (!recetaActual) return;

    const t = texto;

    if (t.includes("siguiente")) {
      pasoActualIndex++;
      leerPasoActual();
      return;
    }

    if (t.includes("anterior") || t.includes("atrás") || t.includes("atras")) {
      pasoActualIndex--;
      leerPasoActual();
      return;
    }

    if (t.includes("repetir") || t.includes("otra vez")) {
      leerPasoActual();
      return;
    }

    if (t.includes("ingrediente") || t.includes("lista")) {
      let txt = "Ingredientes de la receta: ";
      (recetaActual.ingredients || []).forEach((ing) => {
        txt += ing + ". ";
      });
      hablar(txt);
      return;
    }

    if (t.includes("parar") || t.includes("detener")) {
      detenerHabla();
      detenerReconocimiento();
      hablar("He parado la lectura y el asistente de voz.");
      return;
    }

    if (t.includes("cerrar")) {
      hablar("Cierro la receta.");
      detenerReconocimiento();
      cerrarModal();
      return;
    }

    // Si llega aquí, comando no reconocido
    hablar(
      "No he entendido el comando. Puedes decir: siguiente, anterior, repetir, ingredientes, parar o cerrar receta."
    );
  }

  // ==========================================================
  //  MANEJO DE FILTROS Y BUSCADOR
  // ==========================================================

  filtros.forEach((btn) => {
    btn.addEventListener("click", () => {
      filtros.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filtroActual = btn.dataset.filtro || "todas";
      renderListado();
    });
  });

  btnFavs.addEventListener("click", () => {
    mostrarSoloFavoritos = !mostrarSoloFavoritos;
    btnFavs.classList.toggle("active", mostrarSoloFavoritos);
    renderListado();
  });

  inputBuscar.addEventListener("input", (e) => {
    textoBusqueda = e.target.value || "";
    renderListado();
  });

  // ==========================================================
  //  CONTRASTE Y TAMAÑO DE TEXTO
  // ==========================================================

  btnContraste.addEventListener("click", () => {
    body.classList.toggle("alto-contraste");
  });

  btnTexto.addEventListener("click", () => {
    body.classList.toggle("texto-grande");
  });

  // ==========================================================
  //  BOTÓN VACIAR LISTA
  // ==========================================================

  btnVaciarLista.addEventListener("click", () => {
    if (!listaCompra.length) return;
    const confirmar = confirm("¿Seguro que quieres vaciar toda la lista?");
    if (!confirmar) return;
    listaCompra = [];
    guardarListaCompra();
    renderListaCompra();
  });

  // ==========================================================
  //  INICIO
  // ==========================================================

  renderListaCompra();
  renderListado();
});
