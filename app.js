// app.js
// ===================================================================================
// APP GOURMET NAVIDEÑA – Versión completa con asistente de voz (sin imágenes)
// Requiere que recetas.js defina: const RECETAS = [...]
// ===================================================================================

document.addEventListener("DOMContentLoaded", () => {
  if (!Array.isArray(window.RECETAS)) {
    console.error("❌ No se ha encontrado el array RECETAS. Revisa que recetas.js se carga ANTES que app.js");
    return;
  }

  // ----------------- REFERENCIAS DOM -----------------
  const body = document.body;
  const inputBuscar = document.getElementById("buscar");
  const contenedorListado = document.getElementById("listado");
  const contenedorListaCompra = document.getElementById("lista-compra");
  const btnVaciarLista = document.getElementById("btn-vaciar");
  const btnFavs = document.getElementById("btn-favs");
  const btnContraste = document.getElementById("btn-contraste");
  const btnTexto = document.getElementById("btn-texto");

  const modal = document.getElementById("modal");
  const modalFondo = modal.querySelector(".fondo");
  const modalDialogo = modal.querySelector(".dialogo");
  const btnCerrarModal = document.getElementById("cerrar");
  const contenidoModal = document.getElementById("contenido-modal");

  const botonesFiltro = document.querySelectorAll(".filtros button[data-filtro]");

  // ----------------- ESTADO -----------------
  let filtroActual = "todas";
  let soloFavoritos = false;

  // Favoritos: almacenamos solo ids
  let favoritos = new Set(
    JSON.parse(localStorage.getItem("favoritos-recetas") || "[]")
  );

  // Lista compra: [{texto, checked}]
  let listaCompra = JSON.parse(localStorage.getItem("lista-compra") || "[]");

  // Estado de asistente de voz
  const sintetizador = window.speechSynthesis || null;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  let reconocimiento = null;

  let recetaActual = null;
  let pasoActual = 0;
  let lecturaActiva = false;

  // ----------------- UTILIDADES -----------------
  function guardarFavoritos() {
    localStorage.setItem("favoritos-recetas", JSON.stringify(Array.from(favoritos)));
  }

  function guardarListaCompra() {
    localStorage.setItem("lista-compra", JSON.stringify(listaCompra));
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

  function normalizarTexto(txt) {
    return txt
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // ----------------- RENDER RECETAS -----------------
  function aplicarFiltrosYBusqueda() {
    const termino = normalizarTexto(inputBuscar.value || "");

    let lista = RECETAS.filter((r) => {
      // filtro por categoría
      if (filtroActual !== "todas" && r.category !== filtroActual) return false;

      // filtro solo favoritos
      if (soloFavoritos && !favoritos.has(r.id)) return false;

      // filtro búsqueda
      if (termino) {
        const enTitulo = normalizarTexto(r.title).includes(termino);
        const enDesc = normalizarTexto(r.description || "").includes(termino);
        return enTitulo || enDesc;
      }

      return true;
    });

    renderRecetas(lista);
  }

  function renderRecetas(lista) {
    if (!contenedorListado) return;

    if (!lista.length) {
      contenedorListado.innerHTML = `
        <p class="muted">No se han encontrado recetas con esos filtros.</p>
      `;
      return;
    }

    const html = lista
      .map((r) => {
        const esFav = favoritos.has(r.id);
        return `
          <article class="card-receta" data-id="${r.id}">
            <header>
              <h3>${r.title}</h3>
              <p class="meta">
                <span>${formatearCategoria(r.category)}</span> · 
                <span>${r.time || "Tiempo n/d"}</span> · 
                <span>${r.difficulty || ""}</span>
              </p>
            </header>

            <p class="descripcion">${r.description || ""}</p>

            <div class="acciones">
              <button class="btn btn-peque btn-ver">Ver receta</button>
              <button class="btn btn-peque btn-add-lista">Añadir a la lista</button>
              <button class="btn btn-peque btn-fav ${esFav ? "is-fav" : ""}">
                ${esFav ? "★ Favorito" : "☆ Favorito"}
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    contenedorListado.innerHTML = html;

    // Eventos de los botones dentro de cada tarjeta
    contenedorListado.querySelectorAll(".card-receta").forEach((card) => {
      const id = Number(card.dataset.id);
      const receta = RECETAS.find((r) => r.id === id);
      if (!receta) return;

      const btnVer = card.querySelector(".btn-ver");
      const btnAdd = card.querySelector(".btn-add-lista");
      const btnFav = card.querySelector(".btn-fav");

      btnVer.addEventListener("click", () => abrirModalReceta(receta));
      btnAdd.addEventListener("click", () => {
        agregarIngredientesReceta(receta);
      });
      btnFav.addEventListener("click", () => {
        toggleFavorito(receta.id);
        aplicarFiltrosYBusqueda(); // refresca el texto del botón
      });
    });
  }

  // ----------------- FAVORITOS -----------------
  function toggleFavorito(idReceta) {
    if (favoritos.has(idReceta)) {
      favoritos.delete(idReceta);
    } else {
      favoritos.add(idReceta);
    }
    guardarFavoritos();
  }

  // ----------------- LISTA COMPRA -----------------
  function agregarIngredientesReceta(receta) {
    if (!receta || !Array.isArray(receta.ingredients)) return;

    receta.ingredients.forEach((ing) => {
      const texto = ing.trim();
      if (!texto) return;

      const existe = listaCompra.some((item) => item.texto === texto);
      if (!existe) {
        listaCompra.push({ texto, checked: false });
      }
    });

    guardarListaCompra();
    renderListaCompra();
  }

  function eliminarIngrediente(index) {
    listaCompra.splice(index, 1);
    guardarListaCompra();
    renderListaCompra();
  }

  function toggleCheckIngrediente(index) {
    listaCompra[index].checked = !listaCompra[index].checked;
    guardarListaCompra();
    renderListaCompra();
  }

  function vaciarListaCompra() {
    if (!listaCompra.length) return;
    if (!confirm("¿Seguro que quieres vaciar toda la lista de la compra?")) return;
    listaCompra = [];
    guardarListaCompra();
    renderListaCompra();
  }

  function renderListaCompra() {
    if (!contenedorListaCompra) return;

    if (!listaCompra.length) {
      contenedorListaCompra.innerHTML = `
        <p class="muted">Aún no has añadido ingredientes. Desde cualquier receta puedes añadirlos con “Añadir a la lista”.</p>
      `;
      return;
    }

    const html = `
      <ul class="lista-compra">
        ${listaCompra
          .map(
            (item, index) => `
          <li data-index="${index}">
            <label>
              <input type="checkbox" ${item.checked ? "checked" : ""}>
              <span class="${item.checked ? "tachado" : ""}">${item.texto}</span>
            </label>
            <button class="btn-icono btn-eliminar" aria-label="Eliminar ingrediente">✕</button>
          </li>
        `
          )
          .join("")}
      </ul>
    `;

    contenedorListaCompra.innerHTML = html;

    // Eventos check y eliminar
    contenedorListaCompra
      .querySelectorAll(".lista-compra li")
      .forEach((li) => {
        const index = Number(li.dataset.index);
        const chk = li.querySelector('input[type="checkbox"]');
        const btnDel = li.querySelector(".btn-eliminar");

        chk.addEventListener("change", () => toggleCheckIngrediente(index));
        btnDel.addEventListener("click", () => eliminarIngrediente(index));
      });
  }

  // ----------------- MODAL RECETA -----------------
  function abrirModalReceta(receta) {
    recetaActual = receta;
    pasoActual = 0;
    lecturaActiva = false;
    if (!receta) return;

    const categoria = formatearCategoria(receta.category);
    const ingredientesHTML = (receta.ingredients || [])
      .map((ing) => `<li>${ing}</li>`)
      .join("");
    const pasosHTML = (receta.steps || [])
      .map((p, i) => `<li><strong>Paso ${i + 1}:</strong> ${p}</li>`)
      .join("");

    contenidoModal.innerHTML = `
      <article class="detalle-receta">
        <header>
          <h2>${receta.title}</h2>
          <p class="meta">
            <span>${categoria}</span> ·
            <span>${receta.time || "Tiempo n/d"}</span> ·
            <span>${receta.difficulty || ""}</span>
          </p>
          <p class="descripcion">${receta.description || ""}</p>
        </header>

        <section>
          <h3>Ingredientes</h3>
          <ul class="lista-ingredientes">
            ${ingredientesHTML || "<li>No se han especificado ingredientes.</li>"}
          </ul>
          <button class="btn btn-peque btn-add-todos">Añadir todos a la lista de la compra</button>
        </section>

        <section>
          <h3>Pasos</h3>
          <ol class="lista-pasos">
            ${pasosHTML || "<li>No se han especificado pasos.</li>"}
          </ol>
        </section>

        <section class="voz">
          <h3>Asistente de voz</h3>
          <p class="muted">
            Puedes usar los botones o decir: 
            <em>“leer receta”, “siguiente paso”, “repetir”, “parar”, “continuar”, “ingredientes”.</em>
          </p>
          <div class="botones-voz">
            <button class="btn btn-peque btn-voz-leer">🔊 Leer receta paso a paso</button>
            <button class="btn btn-peque btn-voz-siguiente">⏭ Siguiente paso</button>
            <button class="btn btn-peque btn-voz-repetir">🔁 Repetir paso</button>
            <button class="btn btn-peque btn-voz-parar">⏹ Parar</button>
            <button class="btn btn-peque btn-voz-continuar">▶️ Continuar</button>
            <button class="btn btn-peque btn-voz-escuchar">🎙 Activar reconocimiento de voz</button>
          </div>
          <p id="estado-voz" class="estado-voz muted"></p>
        </section>
      </article>
    `;

    // Botón añadir todos ingredientes
    const btnAddTodos = contenidoModal.querySelector(".btn-add-todos");
    if (btnAddTodos) {
      btnAddTodos.addEventListener("click", () => {
        agregarIngredientesReceta(recetaActual);
      });
    }

    // Botones de voz
    const btnLeer = contenidoModal.querySelector(".btn-voz-leer");
    const btnSig = contenidoModal.querySelector(".btn-voz-siguiente");
    const btnRep = contenidoModal.querySelector(".btn-voz-repetir");
    const btnParar = contenidoModal.querySelector(".btn-voz-parar");
    const btnCont = contenidoModal.querySelector(".btn-voz-continuar");
    const btnEscuchar = contenidoModal.querySelector(".btn-voz-escuchar");

    btnLeer.addEventListener("click", empezarLectura);
    btnSig.addEventListener("click", siguientePaso);
    btnRep.addEventListener("click", repetirPaso);
    btnParar.addEventListener("click", pararLectura);
    btnCont.addEventListener("click", continuarLectura);
    btnEscuchar.addEventListener("click", activarReconocimientoVoz);

    // Mostrar modal
    modal.classList.add("visible");
    modalDialogo.focus();
    body.classList.add("sin-scroll");
  }

  function cerrarModal() {
    pararLectura(); // por si hay algo sonando
    if (reconocimiento) reconocimiento.stop();

    modal.classList.remove("visible");
    body.classList.remove("sin-scroll");
    contenidoModal.innerHTML = "";
    recetaActual = null;
    pasoActual = 0;
    lecturaActiva = false;
  }

  // Cerrar modal por fondo, botón o escape
  modalFondo.addEventListener("click", cerrarModal);
  btnCerrarModal.addEventListener("click", cerrarModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("visible")) {
      cerrarModal();
    }
  });

  // ----------------- ASISTENTE DE VOZ – SÍNTESIS -----------------
  function mostrarEstadoVoz(msg) {
    const p = document.getElementById("estado-voz");
    if (p) p.textContent = msg || "";
  }

  function hablar(texto, onEnd) {
    if (!sintetizador) {
      console.warn("Síntesis de voz no disponible en este navegador.");
      mostrarEstadoVoz("La voz no está disponible en este navegador.");
      return;
    }

    // Cancelar cualquier lectura anterior
    sintetizador.cancel();

    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = "es-ES";
    utter.rate = 1;
    utter.pitch = 1;

    utter.onstart = () => {
      mostrarEstadoVoz("Leyendo...");
    };

    utter.onend = () => {
      mostrarEstadoVoz("");
      if (typeof onEnd === "function") onEnd();
    };

    sintetizador.speak(utter);
  }

  function leerIngredientes() {
    if (!recetaActual || !recetaActual.ingredients || !recetaActual.ingredients.length) {
      hablar("Esta receta no tiene ingredientes definidos.");
      return;
    }
    const texto = `Ingredientes para la receta ${recetaActual.title}: ` +
      recetaActual.ingredients.join(", ");
    hablar(texto);
  }

  function leerPasoActual() {
    if (!recetaActual || !recetaActual.steps || !recetaActual.steps.length) {
      hablar("Esta receta no tiene pasos definidos.");
      lecturaActiva = false;
      return;
    }

    if (pasoActual < 0) pasoActual = 0;
    if (pasoActual >= recetaActual.steps.length) {
      hablar("Ya no hay más pasos. La receta ha terminado.");
      lecturaActiva = false;
      return;
    }

    const pasoTexto = recetaActual.steps[pasoActual];
    const texto = `Paso ${pasoActual + 1}: ${pasoTexto}`;

    hablar(texto, () => {
      // Si estamos en modo lectura continua, pasar al siguiente
      if (lecturaActiva) {
        pasoActual++;
        if (pasoActual < recetaActual.steps.length) {
          leerPasoActual();
        } else {
          hablar("Fin de la receta.");
          lecturaActiva = false;
        }
      }
    });
  }

  function empezarLectura() {
    if (!recetaActual) return;
    lecturaActiva = true;
    pasoActual = 0;
    leerIngredientes();
    // Cuando termine los ingredientes, empezará en paso 1
    setTimeout(() => {
      leerPasoActual();
    }, 800);
  }

  function siguientePaso() {
    if (!recetaActual || !recetaActual.steps || !recetaActual.steps.length) {
      hablar("No hay pasos para esta receta.");
      return;
    }
    if (pasoActual < recetaActual.steps.length - 1) {
      pasoActual++;
      lecturaActiva = false; // solo lee este paso
      leerPasoActual();
    } else {
      hablar("Ya estás en el último paso de la receta.");
    }
  }

  function repetirPaso() {
    if (!recetaActual || !recetaActual.steps || !recetaActual.steps.length) {
      hablar("No hay pasos para repetir.");
      return;
    }
    lecturaActiva = false;
    leerPasoActual();
  }

  function pararLectura() {
    if (sintetizador) sintetizador.cancel();
    lecturaActiva = false;
    mostrarEstadoVoz("Lectura detenida.");
  }

  function continuarLectura() {
    if (!recetaActual || !recetaActual.steps || !recetaActual.steps.length) {
      hablar("No hay pasos para continuar.");
      return;
    }
    if (pasoActual >= recetaActual.steps.length) {
      hablar("La receta ya ha terminado.");
      return;
    }
    lecturaActiva = true;
    leerPasoActual();
  }

  // ----------------- ASISTENTE DE VOZ – RECONOCIMIENTO -----------------
  function inicializarReconocimiento() {
    if (!SpeechRecognition) {
      console.warn("Reconocimiento de voz no disponible.");
      mostrarEstadoVoz("El reconocimiento de voz no está disponible en este navegador.");
      return null;
    }

    const rec = new SpeechRecognition();
    rec.lang = "es-ES";
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => {
      mostrarEstadoVoz("Escuchando... habla ahora.");
    };

    rec.onerror = (e) => {
      console.warn("Error reconocimiento de voz:", e.error);
      mostrarEstadoVoz("Error en reconocimiento de voz.");
    };

    rec.onend = () => {
      mostrarEstadoVoz("Reconocimiento de voz parado.");
    };

    rec.onresult = (event) => {
      if (!event.results || !event.results[0]) return;
      const texto = event.results[0][0].transcript.toLowerCase();
      console.log("Comando de voz detectado:", texto);
      procesarComandoVoz(texto);
    };

    return rec;
  }

  function activarReconocimientoVoz() {
    if (!reconocimiento) reconocimiento = inicializarReconocimiento();
    if (!reconocimiento) return;
    try {
      reconocimiento.start();
    } catch (e) {
      // Si ya estaba en marcha puede lanzar excepción
      console.warn(e);
    }
  }

  function procesarComandoVoz(texto) {
    const t = texto.toLowerCase();

    if (t.includes("siguiente")) {
      siguientePaso();
      return;
    }

    if (t.includes("repite") || t.includes("repetir")) {
      repetirPaso();
      return;
    }

    if (t.includes("para") || t.includes("parar") || t.includes("detén") || t.includes("detener")) {
      pararLectura();
      return;
    }

    if (t.includes("continúa") || t.includes("continuar") || t.includes("sigue") || t.includes("seguir")) {
      continuarLectura();
      return;
    }

    if (t.includes("ingrediente")) {
      leerIngredientes();
      return;
    }

    if (t.includes("leer receta") || t.includes("empieza") || t.includes("empezar")) {
      empezarLectura();
      return;
    }

    hablar("No he entendido el comando. Prueba con: leer receta, siguiente paso, repetir, parar o continuar.");
  }

  // ----------------- FILTROS, BÚSQUEDA Y BOTONES SUPERIORES -----------------
  botonesFiltro.forEach((btn) => {
    btn.addEventListener("click", () => {
      botonesFiltro.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      filtroActual = btn.dataset.filtro || "todas";
      aplicarFiltrosYBusqueda();
    });
  });

  if (inputBuscar) {
    inputBuscar.addEventListener("input", () => {
      aplicarFiltrosYBusqueda();
    });
  }

  if (btnFavs) {
    btnFavs.addEventListener("click", () => {
      soloFavoritos = !soloFavoritos;
      btnFavs.classList.toggle("active", soloFavoritos);
      aplicarFiltrosYBusqueda();
    });
  }

  if (btnVaciarLista) {
    btnVaciarLista.addEventListener("click", vaciarListaCompra);
  }

  // Contraste y tamaño de texto
  if (btnContraste) {
    btnContraste.addEventListener("click", () => {
      body.classList.toggle("alto-contraste");
    });
  }

  if (btnTexto) {
    btnTexto.addEventListener("click", () => {
      body.classList.toggle("texto-grande");
    });
  }

  // ----------------- INICIO -----------------
  renderListaCompra();
  aplicarFiltrosYBusqueda();
});
