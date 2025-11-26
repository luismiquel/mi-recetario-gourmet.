// app.js
// ============================================
// APP GOURMET – RECETAS NAVIDEÑAS
// ============================================
"use strict";

// 1) CARGAR RECETAS DESDE recetas.js (const RECETAS)
let TODAS_LAS_RECETAS = [];

try {
  if (typeof RECETAS !== 'undefined' && Array.isArray(RECETAS)) {
    // 🌟 MEJORA: Normalización de datos al cargar (Asegurar arrays para pasos/ingredientes)
    TODAS_LAS_RECETAS = RECETAS.map(receta => ({
        ...receta,
        ingredients: Array.isArray(receta.ingredients) ? receta.ingredients : [],
        steps: Array.isArray(receta.steps) ? receta.steps : [],
    }));
  } else {
    console.error("❌ RECETAS no está definido o no es un array. Asegúrate de que recetas.js se carga ANTES que app.js");
  }
} catch (e) {
  console.error("❌ Error al acceder a RECETAS. Detalles:", e);
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
let filtroActual = "todas"; 	// "todas" | "aperitivo" | "primero" | "segundo" | "postre"
let mostrarSoloFavs = false;
let textoBusqueda = "";

// Para gestionar el foco de accesibilidad
let elementoQueAbrioModal = null; 

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
// PINTAR TARJETAS DE RECETA (OPTIMIZADO CON DocumentFragment)
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

  // Optimización: Limpiar y usar DocumentFragment para mejor rendimiento
  listadoEl.innerHTML = '';
  const fragment = document.createDocumentFragment();

  recetas.forEach((r) => {
    const esFav = favoritos.has(r.id);
    const claseCat = getClaseCategoria(r.category);
    const etiquetaCat = getEtiquetaCategoria(r.category);

    // Añadimos el data-id a los botones para que la delegación de eventos funcione
    const htmlString = `
      <article class="card-receta ${claseCat}" data-id="${r.id}">
        <header class="card-header">
          <span class="badge-categoria">${etiquetaCat}</span>
          <button 
            class="btn-fav-toggle" 
            type="button" 
            aria-label="${esFav ? "Quitar de favoritos" : "Añadir a favoritos"}"
            data-id="${r.id}"
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
          <button class="btn ver-receta" type="button" data-id="${r.id}">
            Ver receta
          </button>
        </footer>
      </article>
    `;

    // Crear el nodo y añadirlo al fragmento
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString.trim();
    fragment.appendChild(tempDiv.firstChild);
  });
  
  // Inserción única al DOM
  listadoEl.appendChild(fragment);
}

// ============================================
// MODAL – VER RECETA
// ============================================
// Variable global para el footer del modal (Se inicializa a null)
let modalFooter = null;

function abrirModal(recetaId) {
  const receta = TODAS_LAS_RECETAS.find((r) => r.id === recetaId);
  if (!receta) return;

  // Detenemos el asistente si ya estaba activo para una receta anterior
  detenerAsistenteVoz();

  const esFav = favoritos.has(receta.id);
  const etiquetaCat = getEtiquetaCategoria(receta.category);

  // NOTA: ingredients y steps se asumen como arrays gracias a la normalización
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
          data-id="${receta.id}"
        >
          Añadir ingredientes a la lista
        </button>

        <button 
          type="button" 
          class="btn ${esFav ? "btn-fav-on" : "btn-fav-off"}" 
          id="btn-fav-detalle"
          data-id="${receta.id}"
        >
          ${esFav ? "★ En favoritos" : "☆ Añadir a favoritos"}
        </button>

        <button 
          type="button" 
          class="btn btn-voz" 
          id="btn-voz"
          data-id="${receta.id}"
        >
          🎙️ Asistente de voz
        </button>
      </footer>
    </article>
  `;

  modal.classList.add("abierto");
  // 🌟 CORRECCIÓN SCROLL: Añadir clase para bloquear scroll de fondo del body
  document.body.classList.add('modal-abierto'); 
  
  // Obtener la referencia al modalFooter
  modalFooter = modalDialogo.querySelector(".detalle-acciones"); 
  
  // Establecer la receta en lectura (CRÍTICO: disponible para el asistente)
  recetaEnLectura = receta; 

  // Foco para accesibilidad: establecer tabindex y enfocar
  modalDialogo.setAttribute('tabindex', '-1'); 
  modalDialogo.focus();

  // Es crucial llamar a esta función aquí para que el feedback visual se inicialice
  actualizarFeedbackVoz("inactivo"); 
}

function cerrarModal() {
  modal.classList.remove("abierto");
  // 🌟 CORRECCIÓN SCROLL: Quitar clase para desbloquear scroll de fondo del body
  document.body.classList.remove('modal-abierto'); 
  
  detenerAsistenteVoz();
  
  // Accesibilidad: devolver el foco al elemento que abrió el modal
  if (elementoQueAbrioModal) {
    elementoQueAbrioModal.focus();
    elementoQueAbrioModal = null; 
  }
  // Limpiar la referencia de la receta al cerrar el modal
  recetaEnLectura = null;
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

// ============================================
// DELEGACIÓN DE EVENTOS
// ============================================

// Delegación para estrella de fav y "Ver Receta" en tarjetas
listadoEl.addEventListener("click", (e) => {
  const btnFav = e.target.closest(".btn-fav-toggle");
  if (btnFav) {
    const id = Number(btnFav.dataset.id); // Usar data-id del botón
    toggleFavorito(id);
    pintarRecetas();
    sincronizarUIFiltros();
    return;
  }

  const btnVer = e.target.closest(".ver-receta");
  if (btnVer) {
    const id = Number(btnVer.dataset.id); // Usar data-id del botón
    // Accesibilidad: Guardar el elemento que abrió el modal
    elementoQueAbrioModal = btnVer; 
    abrirModal(id);
  }
});

// Delegación de eventos para botones DENTRO del Modal
modalDialogo.addEventListener("click", (e) => {
    const target = e.target;
    // Si no tenemos recetaEnLectura, no hacemos nada (seguridad)
    if (!recetaEnLectura) return; 

    // Utilizamos la recetaEnLectura ya cargada para las acciones
    const recetaId = recetaEnLectura.id;

    if (target.id === "btn-add-lista") {
        agregarIngredientesALista(recetaEnLectura);
        return;
    }
    
    if (target.id === "btn-fav-detalle") {
        toggleFavorito(recetaId);
        abrirModal(recetaId); // repinta estado del modal
        pintarRecetas();
        sincronizarUIFiltros();
        return;
    }
    
    if (target.id === "btn-voz") {
        iniciarAsistenteVoz(recetaEnLectura);
        return;
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
// ASISTENTE DE VOZ (VERSIÓN FINAL Y ESTABLE)
// ============================================
let reconocimiento = null;
let reconocimientoActivo = false;
let recetaEnLectura = null; 
let indicePaso = 0;
let enPausa = false;

// Comprobación de APIs
const tieneSpeechRecognition =
    "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
const tieneSpeechSynthesis = "speechSynthesis" in window;

// Elemento para el feedback visual
let feedbackVozEl = null; 

// 🌟 INICIALIZACIÓN PWA: REGISTRO DEL SERVICE WORKER 🌟
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // 🌟 REGISTRO DEL SERVICE WORKER 🌟
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registrado con éxito:', registration.scope);
      })
      .catch(error => {
        console.log('Fallo el registro de ServiceWorker:', error);
      });
  });
}

// 🌟 Feedback Auditivo: Creación del Contexto de Audio
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioContext = tieneSpeechRecognition && AudioContextClass ? new AudioContextClass() : null;


function crearReconocimiento() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SR();
    recog.lang = "es-ES";
    recog.continuous = false; // Queremos un solo comando por activación
    recog.interimResults = false;
    return recog;
}

// ------------------------------------------------------------
// CONTROL DE VOZ
// ------------------------------------------------------------

/** 🌟 MEJORA: Genera un 'ding' auditivo para feedback de escucha */
function emitirFeedbackAuditivo() {
    if (!audioContext) return;
    
    // Si el contexto está suspendido (por las reglas de autoplay del navegador), lo reanuda
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine'; // Tono simple
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // 440 Hz (A4)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05); // Subir volumen rápido
    
    oscillator.start(audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3); // Bajar volumen rápido
    oscillator.stop(audioContext.currentTime + 0.3);
}

function leerTexto(texto, onEnd) {
    if (!tieneSpeechSynthesis) {
        if (onEnd) onEnd();
        return;
    }
    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = "es-ES";
    msg.rate = 0.95; // Un poco más lento para mejor comprensión
    
    if (onEnd) {
        msg.onend = onEnd;
    }
    
    // Si estamos en pausa, la lectura se detiene.
    if (!enPausa) {
        // Detener la escucha ANTES de hablar (previene el auto-stop del ASR)
        if (reconocimientoActivo && reconocimiento) {
            try {
                reconocimiento.abort();
                reconocimientoActivo = false;
            } catch(e) {}
        }
        window.speechSynthesis.speak(msg);
    } else if (onEnd) {
        // Si estamos en pausa, simular el end si hay callback
        setTimeout(onEnd, 100); 
    }
}

function detenerAsistenteVoz() {
    indicePaso = 0;
    enPausa = false;
    reconocimientoActivo = false;

    if (reconocimiento) {
        try {
            reconocimiento.abort();
            reconocimiento.onresult = null;
            reconocimiento.onend = null;
            reconocimiento.onerror = null;
        } catch (e) {
             console.warn("Error al intentar abortar reconocimiento:", e);
        }
    }
    if (tieneSpeechSynthesis) {
        window.speechSynthesis.cancel();
    }
    actualizarFeedbackVoz("inactivo");
}

function actualizarFeedbackVoz(estado) {
    // Verifica si modalFooter es null ANTES de usarlo
    if (!modalFooter) return; 

    // 1. Asegurarse de que el elemento existe en el modal
    if (!feedbackVozEl) {
        feedbackVozEl = document.createElement("div");
        feedbackVozEl.id = "feedback-voz-estado";
        feedbackVozEl.style.cssText = "margin-top: 10px; font-weight: bold; padding: 5px; border-radius: 5px; text-align: center;";
        
        // Esto solo se ejecuta la primera vez que se abre el modal
        modalFooter.appendChild(feedbackVozEl); 
    }
    
    // 2. Actualizar el contenido según el estado
    switch (estado) {
        case "escuchando":
            feedbackVozEl.textContent = "🎙️ ESCUCHANDO... Di un comando.";
            feedbackVozEl.style.backgroundColor = "#ffc107"; // Amarillo
            feedbackVozEl.style.color = "#333";
            break;
        case "procesando":
            feedbackVozEl.textContent = "⚙️ PROCESANDO...";
            feedbackVozEl.style.backgroundColor = "#17a2b8"; // Azul
            feedbackVozEl.style.color = "#fff";
            break;
        case "inactivo":
            feedbackVozEl.textContent = "Asistente inactivo. Pulsa 🎙️ para empezar.";
            feedbackVozEl.style.backgroundColor = "transparent";
            feedbackVozEl.style.color = "#888";
            break;
        case "pausado":
             feedbackVozEl.textContent = "⏸️ Asistente en PAUSA. Di reanudar para continuar.";
             feedbackVozEl.style.backgroundColor = "#dc3545"; // Rojo
             feedbackVozEl.style.color = "#fff";
            break;
        default:
            break;
    }
}

// ------------------------------------------------------------
// NAVEGACIÓN DE PASOS
// ------------------------------------------------------------

function leerPasoActual() {
    if (!recetaEnLectura || enPausa) return;
    
    const totalPasos = recetaEnLectura.steps.length;

    // 🌟 MEJORA: Limpiar clase del paso anterior
    document.querySelectorAll('.lista-pasos li').forEach(li => li.classList.remove('paso-activo'));
    
    // Caso: Final de la receta
    if (indicePaso >= totalPasos) {
        leerTexto("Has llegado al final de la receta. ¡Buen trabajo! Asistente detenido.", () => {
            detenerAsistenteVoz();
        });
        return;
    }

    // 🌟 MEJORA: Marcar paso actual en el DOM
    const pasoActualEl = modalDialogo.querySelector(`[data-paso="${indicePaso}"]`);
    if (pasoActualEl) {
        pasoActualEl.classList.add('paso-activo');
    }

    // Caso: Lectura de paso normal
    const textoPaso = recetaEnLectura.steps[indicePaso];
    const textoAlerter = totalPasos > 1
        ? `Paso ${indicePaso + 1} de ${totalPasos}: `
        : "Instrucción única: ";
    
    // Lectura del paso
    leerTexto(textoAlerter + textoPaso, () => {
        if (!enPausa && tieneSpeechRecognition) {
            // Instrucciones de control (solo después de un paso para recordarlas)
            if (indicePaso === 0) {
                 leerTexto("Puedes decir: siguiente, anterior, repetir, ayuda o parar.", () => {
                     escucharComando();
                 });
            } else {
                 escucharComando(); // Continuar la escucha
            }
        }
    });
}

// ------------------------------------------------------------
// MANEJO DE COMANDOS
// ------------------------------------------------------------

function manejarComando(comando) {
    actualizarFeedbackVoz("procesando");
    
    // Cancelar cualquier lectura de voz pendiente para reaccionar al comando
    if (window.speechSynthesis.speaking) {
         window.speechSynthesis.cancel();
    }

    const t = comando; // El comando ya viene en minúsculas y limpio

    if (t.includes("siguiente")) {
        indicePaso++;
        leerPasoActual();

    } else if (t.includes("anterior") || t.includes("atrás")) {
        if (indicePaso > 0) {
            indicePaso--;
            leerPasoActual();
        } else {
            leerTexto("Ya estás en el primer paso. Di siguiente para avanzar.", () => {
                escucharComando();
            });
        }

    } else if (t.includes("repetir") || t.includes("otra vez")) {
        leerPasoActual(); // Se mantiene el índice

    } else if (t.includes("pausar") || t.includes("descanso")) {
        enPausa = true;
        leerTexto("Asistente pausado. Di reanudar para continuar.", () => {
            actualizarFeedbackVoz("pausado");
        });

    } else if (t.includes("reanudar") || t.includes("continuar")) {
        if (enPausa) {
            enPausa = false;
            leerTexto("Reanudando. Paso actual:", () => {
                 leerPasoActual(); // Continúa desde donde se quedó
            });
        } else {
            leerTexto("El asistente no estaba pausado.", () => {
                 escucharComando();
            });
        }

    } else if (t.includes("ayuda") || t.includes("qué puedo decir")) {
        leerTexto("Puedes decir: siguiente, anterior, repetir, pausar, reanudar o parar.", () => {
            escucharComando();
        });

    } else if (t.includes("parar") || t.includes("stop") || t.includes("terminar")) {
        leerTexto("Asistente de voz detenido. ¡Adiós!");
        detenerAsistenteVoz();
        return;

    } else {
        leerTexto("No he entendido el comando. Di ayuda para conocer las opciones.", () => {
            escucharComando();
        });
    }
}


function escucharComando() {
    if (!tieneSpeechRecognition || !recetaEnLectura || enPausa) {
        reconocimientoActivo = false;
        return;
    }
    
    // Reiniciar reconocimiento para evitar estados previos (máxima limpieza)
    if (reconocimiento) {
        try {
            reconocimiento.abort();
        } catch(e) {}
    }

    if (!reconocimiento) {
        reconocimiento = crearReconocimiento();
    }
    
    reconocimientoActivo = true;
    actualizarFeedbackVoz("escuchando");
    
    // 🌟 MEJORA: Emitir feedback auditivo justo antes de empezar a escuchar
    emitirFeedbackAuditivo();

    // Limpiar y re-asignar listeners
    reconocimiento.onresult = null;
    reconocimiento.onend = null;
    reconocimiento.onerror = null;

    reconocimiento.onresult = (ev) => {
        const comando = (ev.results[0][0].transcript || "").toLowerCase().trim();
        console.log("🎙️ Comando reconocido:", comando);
        manejarComando(comando);
    };

    reconocimiento.onend = () => {
        reconocimientoActivo = false;
        // Si no fue un stop intencional, intentamos reanudar la escucha
        if (recetaEnLectura && !enPausa) {
            escucharComando();
        }
    };

    reconocimiento.onerror = (ev) => {
        console.error("Error en reconocimiento:", ev.error);
        reconocimientoActivo = false;
        actualizarFeedbackVoz("inactivo");

        if (ev.error === "no-speech" || ev.error === "audio-capture") {
            // Reintentar la escucha si fue por falta de voz o error de audio
            escucharComando(); 
        } else {
             leerTexto("Ha ocurrido un error grave en el micrófono. Por favor, revisa los permisos del navegador.");
        }
    };

    try {
        reconocimiento.start();
    } catch (e) {
        console.warn("No se pudo iniciar el reconocimiento (probablemente ya activo):", e);
        reconocimientoActivo = false;
        actualizarFeedbackVoz("inactivo");
    }
}

// ------------------------------------------------------------
// INICIO DEL ASISTENTE
// ------------------------------------------------------------

function iniciarAsistenteVoz(receta) {
    if (!tieneSpeechSynthesis) {
        alert("Tu navegador no soporta síntesis de voz. No se puede usar el Asistente.");
        return;
    }
    if (!tieneSpeechRecognition) {
        alert("Tu navegador no soporta reconocimiento de voz. Puedes escuchar la receta, pero tendrás que pulsar Siguiente/Anterior en pantalla.");
    }

    detenerAsistenteVoz();
    // recetaEnLectura ya está cargada en abrirModal()

    const intro = `
      Vamos a cocinar la receta: ${receta.title}.
      Tiempo estimado: ${receta.time}.
      Dificultad: ${receta.difficulty}.
    `;

    const textoIngredientes = receta.ingredients && receta.ingredients.length
        ? "Ingredientes que necesitarás: " + receta.ingredients.join(". ")
        : "Esta receta no tiene ingredientes detallados.";

    // Cadena de lectura: intro -> ingredientes -> Paso 1
    leerTexto(intro, () => {
        leerTexto(textoIngredientes, () => {
            if (!receta.steps.length) {
                leerTexto("Esta receta no tiene pasos detallados.");
                detenerAsistenteVoz();
                return;
            }
            // Llama a leerPasoActual que se encarga de leer el paso 0
            leerPasoActual();
        });
    });
}
// ============================================
// FIN ASISTENTE DE VOZ
// ============================================


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
