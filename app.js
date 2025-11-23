// =============================================================
// App Gourmet – Lógica principal
// Depende de RECETAS definido en recetas.js
// =============================================================

(function () {
  // Comprobamos que RECETAS existe
  if (!Array.isArray(window.RECETAS)) {
    console.error("❌ No se ha encontrado el array RECETAS. Revisa que recetas.js se carga ANTES que app.js");
    return;
  }

  // -----------------------------
  // ESTADO GLOBAL
  // -----------------------------
  let filtroActual = "todas";
  let textoBusqueda = "";
  let mostrarFavoritosSolo = false;

  let recetaActual = null;
  let pasoActualIndex = 0;

  const LS_FAVS_KEY = "navidad_favoritos";
  const LS_LISTA_KEY = "navidad_lista_compra";

  let favoritos = new Set(cargarFavoritos());
  let listaCompra = cargarListaCompra();

  // Voz
  const synth = window.speechSynthesis || null;
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition || null;
  let reconocimiento = null;
  let reconocimientoActivo = false;

  // -----------------------------
  // UTILIDADES LOCALSTORAGE
  // -----------------------------
  function cargarFavoritos() {
    try {
      const data = localStorage.getItem(LS_FAVS_KEY);
      if (!data) return [];
      const arr = JSON.parse(data);
      if (Array.isArray(arr)) return arr;
      return [];
    } catch (e) {
      console.warn("No se pudieron cargar favoritos:", e);
      return [];
    }
  }

  function guardarFavoritos() {
    try {
      localStorage.setItem(LS_FAVS_KEY, JSON.stringify(Array.from(favoritos)));
    } catch (e) {
      console.warn("No se pudieron guardar favoritos:", e);
    }
  }

  function cargarListaCompra() {
    try {
      const data = localStorage.getItem(LS_LISTA_KEY);
      if (!data) return [];
      const arr = JSON.parse(data);
      if (Array.isArray(arr)) return arr;
      return [];
    } catch (e) {
      console.warn("No se pudo cargar lista de la compra:", e);
      return [];
    }
  }

  function guardarListaCompra() {
    try {
      localStorage.setItem(LS_LISTA_KEY, JSON.stringify(listaCompra));
    } catch (e) {
      console.warn("No se pudo guardar lista de la compra:", e);
    }
  }

  // -----------------------------
  // DOM READY
  // -----------------------------
  document.addEventListener("DOMContentLoaded", () => {
    const listadoEl = document.getElementById("listado");
    const buscarEl = document.getElementById("buscar");
    const navFiltros = document.querySelector(".filtros");
    const btnFavs = document.getElementById("btn-favs");
    const listaCompraEl = document.getElementById("lista-compra");
    const btnVaciarLista = document.getElementById("btn-vaciar");

    const btnContraste = document.getElementById("btn-contraste");
    const btnTexto = document.getElementById("btn-texto");

    const modalEl = document.getElementById("modal");
    const modalFondo = modalEl.querySelector(".fondo");
    const modalCerrar = document.getElementById("cerrar");
    const contenidoModal = document.getElementById("contenido-modal");

    if (!listadoEl || !buscarEl || !navFiltros || !btnFavs || !listaCompraEl) {
      console.error("❌ Faltan elementos clave en el HTML");
      return;
    }

    // --------- Eventos básicos ---------
    buscarEl.addEventListener("input", (e) => {
      textoBusqueda = e.target.value.toLowerCase().trim();
      renderListado();
    });

    navFiltros.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filtro]");
      if (!btn) return;
      filtroActual = btn.getAttribute("data-filtro");
      navFiltros.querySelectorAll("button[data-filtro]").forEach((b) =>
        b.classList.remove("active")
      );
      btn.classList.add("active");
      renderListado();
    });

    btnFavs.addEventListener("click", () => {
      mostrarFavoritosSolo = !mostrarFavoritosSolo;
      btnFavs.classList.toggle("active", mostrarFavoritosSolo);
      renderListado();
    });

    btnVaciarLista.addEventListener("click", () => {
      if (!confirm("¿Vaciar la lista de la compra?")) return;
      listaCompra = [];
      guardarListaCompra();
      renderListaCompra();
    });

    // Contraste y tamaño de texto (muy sencillo)
    btnContraste.addEventListener("click", () => {
      document.body.classList.toggle("alto-contraste");
    });

    btnTexto.addEventListener("click", () => {
      document.body.classList.toggle("texto-grande");
    });

    // Modal
    modalFondo.addEventListener("click", cerrarModal);
    modalCerrar.addEventListener("click", cerrarModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrarModal();
    });

    // Render inicial
    renderListado();
    renderListaCompra();

    // -----------------------------
    // RENDER LISTADO DE RECETAS
    // -----------------------------
    function filtrarRecetas() {
      return window.RECETAS.filter((r) => {
        if (mostrarFavoritosSolo && !favoritos.has(r.id)) return false;

        if (filtroActual !== "todas" && r.category !== filtroActual) {
          return false;
        }

        if (textoBusqueda) {
          const t = textoBusqueda;
          const enTitulo = r.title.toLowerCase().includes(t);
          const enDesc = r.description.toLowerCase().includes(t);
          return enTitulo || enDesc;
        }

        return true;
      });
    }

    function renderListado() {
      const recetasFiltradas = filtrarRecetas();
      listadoEl.innerHTML = "";

      if (!recetasFiltradas.length) {
        listadoEl.innerHTML = `<p>No se han encontrado recetas.</p>`;
        return;
      }

      recetasFiltradas.forEach((r) => {
        const card = document.createElement("article");
        card.className = "receta-card";

        // Clase por categoría para colorear con CSS
        // cat-aperitivo, cat-primero, cat-segundo, cat-postre
        card.classList.add(`cat-${r.category}`);

        const esFav = favoritos.has(r.id);

        card.innerHTML = `
          <header class="receta-header">
            <h3>${r.title}</h3>
            <button class="btn-fav" data-id="${r.id}" aria-label="Marcar como favorito">
              ${esFav ? "★" : "☆"}
            </button>
          </header>
          <p class="receta-meta">
            <span>${mapCatLabel(r.category)}</span> · 
            <span>${r.time}</span> · 
            <span>${r.difficulty}</span>
          </p>
          <p class="receta-descripcion">${r.description}</p>
          <button class="btn ver-receta" data-id="${r.id}">Ver receta</button>
        `;

        listadoEl.appendChild(card);
      });

      // Eventos de botones dentro del listado
      listadoEl.querySelectorAll(".btn-fav").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = Number(btn.getAttribute("data-id"));
          toggleFavorito(id);
          renderListado();
        });
      });

      listadoEl.querySelectorAll(".ver-receta").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = Number(btn.getAttribute("data-id"));
          const rec = window.RECETAS.find((x) => x.id === id);
          if (rec) {
            abrirModal(rec);
          }
        });
      });
    }

    function mapCatLabel(cat) {
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

    function toggleFavorito(id) {
      if (favoritos.has(id)) {
        favoritos.delete(id);
      } else {
        favoritos.add(id);
      }
      guardarFavoritos();
    }

    // -----------------------------
    // MODAL Y DETALLE DE RECETA
    // -----------------------------
    function abrirModal(receta) {
      recetaActual = receta;
      pasoActualIndex = 0;

      const esFav = favoritos.has(receta.id);

      const ingredientesHTML = receta.ingredients
        .map(
          (ing) => `
          <li>
            <button class="btn-ingrediente" data-ingrediente="${ing.replace(
              /"/g,
              "&quot;"
            )}">
              ${ing}
            </button>
          </li>`
        )
        .join("");

      const pasosHTML = receta.steps
        .map(
          (p, i) => `
          <li data-paso="${i}">
            <strong>Paso ${i + 1}:</strong> ${p}
          </li>`
        )
        .join("");

      contenidoModal.innerHTML = `
        <header class="modal-header">
          <div>
            <h2>${receta.title}</h2>
            <p class="receta-meta">
              <span>${mapCatLabel(receta.category)}</span> · 
              <span>${receta.time}</span> · 
              <span>${receta.difficulty}</span> · 
              <span>${receta.servings} raciones</span>
            </p>
          </div>
          <button class="btn-fav" id="modal-fav" data-id="${receta.id}">
            ${esFav ? "★ Favorito" : "☆ Favorito"}
          </button>
        </header>

        <section>
          <h3>Ingredientes</h3>
          <p>Pulsa en un ingrediente para añadirlo a la lista de la compra.</p>
          <ul class="lista-ingredientes">
            ${ingredientesHTML}
          </ul>
        </section>

        <section>
          <h3>Pasos</h3>
          <ol class="lista-pasos">
            ${pasosHTML}
          </ol>
        </section>

        <section class="voz-controles">
          <h3>Asistente de voz</h3>
          <p>Botones:</p>
          <div class="voz-botones">
            <button id="btn-leer" class="btn">Leer receta</button>
            <button id="btn-asistente" class="btn secondary">Asistente de voz</button>
            <button id="btn-parar-voz" class="btn danger">Parar voz</button>
          </div>
          <p class="voz-ayuda">
            Comandos por voz: <strong>siguiente</strong>, 
            <strong>anterior</strong>, <strong>repetir</strong>, 
            <strong>ingredientes</strong>, <strong>parar</strong>, 
            <strong>cerrar</strong>.
          </p>
        </section>
      `;

      // Eventos dentro del modal
      const modalFav = document.getElementById("modal-fav");
      if (modalFav) {
        modalFav.addEventListener("click", () => {
          toggleFavorito(receta.id);
          abrirModal(receta); // recargar contenido para actualizar texto
          renderListado(); // actualizar iconos en listado
        });
      }

      contenidoModal
        .querySelectorAll(".btn-ingrediente")
        .forEach((btnIng) => {
          btnIng.addEventListener("click", () => {
            const ing = btnIng.getAttribute("data-ingrediente");
            agregarIngredienteLista(ing);
          });
        });

      const btnLeer = document.getElementById("btn-leer");
      const btnAsistente = document.getElementById("btn-asistente");
      const btnPararVoz = document.getElementById("btn-parar-voz");

      btnLeer?.addEventListener("click", () => {
        leerRecetaCompleta();
      });

      btnAsistente?.addEventListener("click", () => {
        iniciarAsistenteVoz();
      });

      btnPararVoz?.addEventListener("click", () => {
        detenerHabla();
        detenerReconocimiento();
      });

      modalEl.classList.add("abierto");
      document.body.classList.add("modal-abierto");
      modalEl.querySelector(".dialogo")?.focus();
    }

    function cerrarModal() {
      detenerHabla();
      detenerReconocimiento();
      modalEl.classList.remove("abierto");
      document.body.classList.remove("modal-abierto");
      recetaActual = null;
    }

    // -----------------------------
    // LISTA DE LA COMPRA
    // -----------------------------
    function agregarIngredienteLista(nombre) {
      if (!nombre) return;
      const existente = listaCompra.find(
        (item) => item.nombre.toLowerCase() === nombre.toLowerCase()
      );
      if (existente) {
        existente.cantidad += 1;
      } else {
        listaCompra.push({ nombre, cantidad: 1 });
      }
      guardarListaCompra();
      renderListaCompra();
    }

    function eliminarIngredienteLista(nombre) {
      listaCompra = listaCompra.filter(
        (item) => item.nombre.toLowerCase() !== nombre.toLowerCase()
      );
      guardarListaCompra();
      renderListaCompra();
    }

    function cambiarCantidadIngrediente(nombre, delta) {
      const item = listaCompra.find(
        (i) => i.nombre.toLowerCase() === nombre.toLowerCase()
      );
      if (!item) return;
      item.cantidad += delta;
      if (item.cantidad <= 0) {
        eliminarIngredienteLista(nombre);
      } else {
        guardarListaCompra();
        renderListaCompra();
      }
    }

    function renderListaCompra() {
      listaCompraEl.innerHTML = "";
      if (!listaCompra.length) {
        listaCompraEl.innerHTML = "<p>Tu lista está vacía.</p>";
        return;
      }

      const ul = document.createElement("ul");
      ul.className = "lista-compra";

      listaCompra.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="nombre">${item.nombre}</span>
          <div class="controles">
            <button class="menos" data-nombre="${item.nombre}">-</button>
            <span class="cantidad">${item.cantidad}</span>
            <button class="mas" data-nombre="${item.nombre}">+</button>
            <button class="eliminar" data-nombre="${item.nombre}">×</button>
          </div>
        `;
        ul.appendChild(li);
      });

      listaCompraEl.appendChild(ul);

      listaCompraEl.querySelectorAll(".menos").forEach((btn) => {
        btn.addEventListener("click", () => {
          const n = btn.getAttribute("data-nombre");
          cambiarCantidadIngrediente(n, -1);
        });
      });

      listaCompraEl.querySelectorAll(".mas").forEach((btn) => {
        btn.addEventListener("click", () => {
          const n = btn.getAttribute("data-nombre");
          cambiarCantidadIngrediente(n, +1);
        });
      });

      listaCompraEl.querySelectorAll(".eliminar").forEach((btn) => {
        btn.addEventListener("click", () => {
          const n = btn.getAttribute("data-nombre");
          eliminarIngredienteLista(n);
        });
      });
    }

    // -----------------------------
    // VOZ: TEXT-TO-SPEECH
    // -----------------------------
    function hablar(texto) {
      if (!synth) {
        console.log("🔊", texto);
        return;
      }
      const utter = new SpeechSynthesisUtterance(texto);
      utter.lang = "es-ES";
      utter.rate = 1;
      synth.speak(utter);
    }

    function detenerHabla() {
      if (synth && synth.speaking) {
        synth.cancel();
      }
    }

    function leerRecetaCompleta() {
      if (!recetaActual) return;
      detenerHabla();

      let texto = `Receta: ${recetaActual.title}. `;
      texto += `Tipo: ${mapCatLabel(recetaActual.category)}. `;
      texto += `Tiempo aproximado: ${recetaActual.time}. `;
      texto += `Dificultad: ${recetaActual.difficulty}. `;
      texto += "Ingredientes: ";
      texto += recetaActual.ingredients.join(", ") + ". ";
      texto += "Pasos: ";
      recetaActual.steps.forEach((p, i) => {
        texto += `Paso ${i + 1}: ${p}. `;
      });

      hablar(texto);
    }

    function leerIngredientes() {
      if (!recetaActual) return;
      detenerHabla();
      const texto =
        "Ingredientes: " + recetaActual.ingredients.join(", ") + ".";
      hablar(texto);
    }

    function leerPasoActual() {
      if (!recetaActual) return;
      const total = recetaActual.steps.length;
      if (total === 0) {
        hablar("Esta receta no tiene pasos detallados.");
        return;
      }
      if (pasoActualIndex < 0) pasoActualIndex = 0;
      if (pasoActualIndex >= total) pasoActualIndex = total - 1;

      const paso = recetaActual.steps[pasoActualIndex];
      hablar(
        `Paso ${pasoActualIndex + 1} de ${total}: ${paso}. Di siguiente, anterior, repetir, ingredientes, parar o cerrar.`
      );
    }

    // -----------------------------
    // VOZ: RECONOCIMIENTO DE COMANDOS
    // -----------------------------
    function detenerReconocimiento() {
      if (reconocimiento) {
        try {
          reconocimiento.stop();
        } catch (e) {
          console.warn("Error al detener reconocimiento", e);
        }
      }
      reconocimientoActivo = false;
    }

    function iniciarAsistenteVoz() {
      if (!recetaActual) return;

      if (!SpeechRecognition) {
        hablar(
          "Lo siento, tu navegador no soporta reconocimiento de voz. Solo puedo leer la receta."
        );
        return;
      }

      // Evitar el error de start cuando ya está iniciado
      if (reconocimientoActivo) {
        hablar(
          "El asistente de voz ya está activo. Di: siguiente, anterior, repetir, ingredientes, parar o cerrar receta."
        );
        return;
      }

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
          "Asistente de voz activado. Empezamos por el paso uno. Puedes decir: siguiente, anterior, repetir, ingredientes, parar o cerrar receta."
        );
        leerPasoActual();
      } catch (e) {
        console.warn("No se pudo iniciar el reconocimiento:", e);
      }
    }

    function procesarComandoVoz(texto) {
      // Solo miramos palabras clave, ignoramos el resto de la frase
      const t = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // quitar tildes

      if (t.includes("siguiente")) {
        pasoActualIndex++;
        leerPasoActual();
        return;
      }

      if (t.includes("anterior") || t.includes("atras")) {
        pasoActualIndex--;
        leerPasoActual();
        return;
      }

      if (t.includes("repetir") || t.includes("otra vez")) {
        leerPasoActual();
        return;
      }

      if (t.includes("ingrediente")) {
        leerIngredientes();
        return;
      }

      if (t.includes("parar") || t.includes("detener")) {
        hablar("Paro el asistente de voz.");
        detenerHabla();
        detenerReconocimiento();
        return;
      }

      if (t.includes("cerrar") || t.includes("salir")) {
        hablar("Cierro la receta.");
        cerrarModal();
        return;
      }

      // Si no reconoce nada útil:
      hablar(
        "No he entendido el comando. Recuerda que puedes decir: siguiente, anterior, repetir, ingredientes, parar o cerrar."
      );
    }
  });
})();
