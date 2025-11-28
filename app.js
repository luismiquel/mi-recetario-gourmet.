/**
 * =============================================================
 * app.js: VERSIÓN FINAL "SEMÁFORO ANTI-ECO"
 * Solución: Evita que el asistente se escuche a sí mismo y rompe bucles.
 * =============================================================
 */

"use strict";

// =============================================================
// 1. DATOS (TUS 160 RECETAS)
// =============================================================

const recetas = [
  // ... (Aquí van tus 160 recetas. Por brevedad muestro el principio y el final, 
  // PERO EL CÓDIGO ASUME QUE ESTÁN TODAS. Si borraste el archivo anterior, 
  // asegúrate de tener tus datos aquí) ...
  {
    id: 1,
    titulo: 'Tartaletas de salmón y eneldo',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Deliciosas tartaletas rellenas de una suave crema de queso y salmón ahumado.',
    ingredientes: 'Tartaletas pequeñas, queso crema, salmón ahumado, eneldo fresco, zumo de limón, pimienta.',
    instrucciones: 'Mezcla el queso crema con eneldo picado, zumo de limón y pimienta. Rellena las tartaletas y coloca un trozo de salmón ahumado encima.',
    tiempo: '15 min',
    dificultad: 'Fácil'
  },
  {
    id: 2,
    titulo: 'Mini volovanes de champiñones al Jerez',
    categoria: 'aperitivos',
    img: 'placeholder.jpg',
    descripcion: 'Pequeños volovanes de hojaldre rellenos de una bechamel cremosa con champiñones.',
    ingredientes: 'Mini volovanes, champiñones, cebolla, harina, leche, Jerez, aceite de oliva, sal.',
    instrucciones: 'Saltea la cebolla y los champiñones. Prepara una bechamel con leche y harina, añade el Jerez y el salteado. Rellena los volovanes y hornea brevemente.',
    tiempo: '25 min',
    dificultad: 'Media'
  },
  // ... (Del 3 al 159 van aquí) ...
  {
    id: 160,
    titulo: 'Tiramisú de cacao amargo',
    categoria: 'postre',
    img: 'placeholder.jpg',
    descripcion: 'Versión intensa del tiramisú con mucho cacao amargo en polvo.',
    ingredientes: 'Queso Mascarpone, huevos, azúcar, bizcochos, café, licor, cacao amargo.',
    instrucciones: 'Prepara la crema y monta el tiramisú por capas. Utiliza una cantidad generosa de cacao amargo para espolvorear.',
    tiempo: '30 min (+ refrigeración)',
    dificultad: 'Media'
  }
];

// 🔁 ADAPTADOR DE DATOS
function mapCategoria(cat) {
  switch (cat) {
    case "aperitivos": return "aperitivo";
    case "primer-plato": return "primero";
    case "segundo-plato": return "segundo";
    case "postre": return "postre";
    default: return "otros";
  }
}

const RECETAS = recetas.map((r) => {
  const ingredientesArray = r.ingredientes ? r.ingredientes.split(",").map(t => t.trim()).filter(Boolean) : [];
  const pasosArray = r.instrucciones ? r.instrucciones.split(".").map(t => t.trim()).filter(Boolean) : [];
  return {
    id: r.id,
    title: r.titulo,
    category: mapCategoria(r.categoria),
    image: r.img && r.img !== "placeholder.jpg" ? r.img : "",
    description: r.descripcion,
    time: r.tiempo,
    difficulty: r.dificultad,
    servings: 4,
    ingredients: ingredientesArray,
    steps: pasosArray,
  };
});

// =============================================================
// 2. LÓGICA DE LA APLICACIÓN
// =============================================================
let TODAS_LAS_RECETAS = RECETAS;

// Referencias DOM
const listadoEl = document.getElementById("listado");
const buscarInput = document.getElementById("buscar");
const filtroBtns = document.querySelectorAll(".filtros button[data-filtro]");
const btnFavs = document.getElementById("btn-favs");
const listaCompraEl = document.getElementById("lista-compra");
const btnVaciarLista = document.getElementById("btn-vaciar");
const modal = document.getElementById("modal");
const modalFondo = modal.querySelector(".fondo");
const modalDialogo = modal.querySelector(".dialogo");
const modalCerrar = document.getElementById("cerrar");
const modalContenido = document.getElementById("contenido-modal");
const btnContraste = document.getElementById("btn-contraste");
const btnTexto = document.getElementById("btn-texto");

// Estado
let filtroActual = "todas";
let mostrarSoloFavs = false;
let textoBusqueda = "";
let elementoQueAbrioModal = null;
let favoritos = new Set(JSON.parse(localStorage.getItem("recetario_favs") || "[]"));
let listaCompra = new Set(JSON.parse(localStorage.getItem("recetario_lista") || "[]"));

// Estado Voz
let recetaEnLectura = null;
let indicePaso = 0;
let enPausa = false;
let reconocimiento = null;
let reconocimientoActivo = false;
let feedbackVozEl = null;
let modalFooter = null;

// SEMÁFORO DE VOZ (Anti-Eco)
let hablando = false; 

// Soporte APIs
const tieneSpeechRecognition = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
const tieneSpeechSynthesis = "speechSynthesis" in window;
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioContext = (tieneSpeechRecognition && AudioContextClass) ? new AudioContextClass() : null;


// --- FUNCIONES PRINCIPALES UI ---

function pintarRecetas() {
  const filtradas = TODAS_LAS_RECETAS.filter(r => {
    if (filtroActual !== "todas" && r.category !== filtroActual) return false;
    if (mostrarSoloFavs && !favoritos.has(r.id)) return false;
    if (textoBusqueda && !r.title.toLowerCase().includes(textoBusqueda.toLowerCase())) return false;
    return true;
  });

  listadoEl.innerHTML = "";
  if (!filtradas.length) {
    listadoEl.innerHTML = `<p class="sin-resultados">No hay recetas.</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  filtradas.forEach(r => {
    const esFav = favoritos.has(r.id);
    const div = document.createElement("article");
    div.className = `receta-card cat-${r.category}`;
    div.innerHTML = `
      <header class="card-header">
        <span class="badge-categoria">${r.category.toUpperCase()}</span>
        <button class="btn-fav-toggle">${esFav ? "★" : "☆"}</button>
      </header>
      <h3 class="card-titulo">${r.title}</h3>
      <p class="card-descripcion">${r.description}</p>
      <div class="card-meta"><span>⏱️ ${r.time}</span><span>🎯 ${r.difficulty}</span></div>
      <footer class="card-footer"><button class="btn ver-receta">Ver receta</button></footer>
    `;
    
    div.querySelector(".btn-fav-toggle").onclick = (e) => {
      e.stopPropagation();
      toggleFavorito(r.id);
    };
    div.querySelector(".ver-receta").onclick = () => abrirModal(r.id);
    fragment.appendChild(div);
  });
  listadoEl.appendChild(fragment);
}

function toggleFavorito(id) {
  if (favoritos.has(id)) favoritos.delete(id);
  else favoritos.add(id);
  localStorage.setItem("recetario_favs", JSON.stringify([...favoritos]));
  pintarRecetas();
}

// --- MODAL ---

function abrirModal(id) {
  const r = TODAS_LAS_RECETAS.find(x => x.id === id);
  if (!r) return;

  detenerAsistenteVoz(); 
  recetaEnLectura = r;

  modalDialogo.className = `dialogo modal-${r.category}`;
  
  const ings = r.ingredients.map(i => `<li>${i}</li>`).join("");
  const pasos = r.steps.map((p, i) => `<li data-paso="${i}">${p}</li>`).join("");

  modalContenido.innerHTML = `
    <article class="detalle-receta">
      <header class="modal-header"><h2>${r.title}</h2></header>
      <section><h3>Ingredientes</h3><ul class="lista-ingredientes">${ings}</ul></section>
      <section><h3>Pasos</h3><ol class="lista-pasos" id="lista-pasos-lectura">${pasos}</ol></section>
      <footer class="detalle-acciones">
         <button class="btn btn-primario" onclick="agregarIngredientes('${r.id}')">Añadir Ingredientes</button>
         <button class="btn btn-voz" id="btn-iniciar-voz">🎙️ Iniciar Voz</button>
      </footer>
    </article>
  `;

  modalContenido.querySelector("#btn-iniciar-voz").onclick = () => iniciarAsistenteVoz(r);

  modalFooter = modalDialogo.querySelector(".detalle-acciones");
  modal.classList.add("abierto");
  document.body.classList.add("modal-abierto");
  modalDialogo.focus();
}

function cerrarModal() {
  detenerAsistenteVoz();
  modal.classList.remove("abierto");
  document.body.classList.remove("modal-abierto");
}

// =============================================================
// ASISTENTE DE VOZ (ESTABILIZADO CON SEMÁFORO)
// =============================================================

function crearReconocimiento() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const r = new SR();
  r.lang = "es-ES";
  r.continuous = false; 
  r.interimResults = false;
  return r;
}

function emitirFeedbackAuditivo() {
  if (!audioContext) return;
  if (audioContext.state === 'suspended') audioContext.resume();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.frequency.setValueAtTime(440, audioContext.currentTime);
  gain.gain.setValueAtTime(0.1, audioContext.currentTime);
  osc.start();
  osc.stop(audioContext.currentTime + 0.2);
}

function actualizarFeedbackVoz(estado) {
  if (!modalFooter) return;
  if (!feedbackVozEl) {
    feedbackVozEl = document.createElement("div");
    feedbackVozEl.id = "feedback-voz-estado";
    feedbackVozEl.style.cssText = "margin-top:10px;font-weight:bold;text-align:center;padding:5px;border-radius:5px;";
    modalFooter.appendChild(feedbackVozEl);
  }
  
  if (estado === "escuchando") {
    feedbackVozEl.textContent = "🎙️ ESCUCHANDO... Di: Siguiente, Repetir, Salir";
    feedbackVozEl.style.background = "#ffc107";
    feedbackVozEl.style.color = "#333";
  } else if (estado === "hablando") {
    feedbackVozEl.textContent = "🔊 LEYENDO (Micro apagado)...";
    feedbackVozEl.style.background = "#17a2b8";
    feedbackVozEl.style.color = "#fff";
  } else if (estado === "pausado") {
    feedbackVozEl.textContent = "⏸️ PAUSADO";
    feedbackVozEl.style.background = "#dc3545";
    feedbackVozEl.style.color = "#fff";
  } else {
    feedbackVozEl.textContent = "Asistente inactivo. Pulsa el botón para iniciar.";
    feedbackVozEl.style.background = "transparent";
    feedbackVozEl.style.color = "inherit";
  }
}

function detenerEscuchaFisica() {
    // Mata el reconocimiento inmediatamente
    if (reconocimiento) {
        try { reconocimiento.abort(); } catch(e) {}
    }
    reconocimientoActivo = false;
}

function leerTexto(texto, callback) {
    if (!tieneSpeechSynthesis) return;
    
    // 🔴 SEMÁFORO ROJO: Empieza a hablar, prohibido escuchar
    hablando = true;
    detenerEscuchaFisica(); 
    actualizarFeedbackVoz("hablando");

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-ES";
    u.rate = 0.9;
    
    u.onend = () => {
        // 🟢 SEMÁFORO VERDE con RETRASO ANTI-ECO
        // Esperamos 1000ms (1 seg) para que el sonido desaparezca de la habitación
        setTimeout(() => {
            hablando = false; 
            if (callback) callback();
        }, 1000);
    };
    
    u.onerror = () => { hablando = false; };

    if (!enPausa) window.speechSynthesis.speak(u);
    else setTimeout(() => { hablando = false; if(callback) callback(); }, 100);
}

function escucharComando() {
    // Si el semáforo está rojo (hablando), NO INICIAMOS
    if (hablando) return;

    if (!tieneSpeechRecognition || !recetaEnLectura || enPausa) {
        reconocimientoActivo = false;
        actualizarFeedbackVoz("inactivo");
        return;
    }

    // Destruir instancia previa siempre para limpiar memoria del navegador
    if (reconocimiento) {
        try { reconocimiento.abort(); } catch(e) {}
        reconocimiento = null;
    }
    reconocimiento = crearReconocimiento();

    reconocimientoActivo = true;
    actualizarFeedbackVoz("escuchando");
    emitirFeedbackAuditivo();

    reconocimiento.onresult = (ev) => {
        reconocimientoActivo = false;
        if (!ev.results || !ev.results[0] || !ev.results[0][0]) {
            actualizarFeedbackVoz("inactivo");
            return;
        }
        const comando = ev.results[0][0].transcript.toLowerCase();
        console.log("Comando:", comando);
        
        // Filtro anti-eco: Si el comando es larguísimo, es probable que sea la receta
        if (comando.length > 60) {
            console.warn("Posible eco detectado. Ignorando.");
            actualizarFeedbackVoz("inactivo");
            return;
        }
        
        procesarComando(comando);
    };

    reconocimiento.onend = () => {
        // Si se apaga el micro y se supone que debíamos seguir escuchando (y no estamos hablando)
        if (reconocimientoActivo && !hablando && !enPausa) {
             setTimeout(escucharComando, 500);
        } else {
             if (!hablando) actualizarFeedbackVoz("inactivo");
        }
    };

    reconocimiento.onerror = (ev) => {
        console.warn("ASR Error:", ev.error);
        reconocimientoActivo = false;
        
        // En caso de error, PARAMOS y pedimos pulsación manual. 
        // Cero riesgos de bucle.
        if (ev.error === 'no-speech') {
             leerTexto("No te he oído. Pulsa el botón para intentarlo.");
        } else {
             actualizarFeedbackVoz("inactivo");
        }
    };

    try {
        // Pequeño delay de seguridad antes de start
        setTimeout(() => {
            if (!hablando && reconocimiento) reconocimiento.start();
        }, 200);
    } catch (e) {
        console.error("Start error:", e);
        reconocimientoActivo = false;
        actualizarFeedbackVoz("inactivo");
    }
}

function procesarComando(cmd) {
    if (hablando) return; 

    if (cmd.includes("siguiente")) {
        indicePaso++;
        leerPaso();
    } else if (cmd.includes("repetir")) {
        leerPaso();
    } else if (cmd.includes("anterior")) {
        if (indicePaso > 0) indicePaso--;
        leerPaso();
    } else if (cmd.includes("salir") || cmd.includes("cerrar")) {
        cerrarModal();
    } else if (cmd.includes("pausar")) {
        enPausa = true;
        actualizarFeedbackVoz("pausado");
        leerTexto("Pausado. Di reanudar.");
    } else if (cmd.includes("reanudar")) {
        enPausa = false;
        leerPaso();
    } else {
        leerTexto("No entendí. Pulsa y repite.", () => actualizarFeedbackVoz("inactivo"));
    }
}

function leerPaso() {
    if (indicePaso >= recetaEnLectura.steps.length) {
        leerTexto("Fin de la receta. ¡Buen provecho!", () => detenerAsistenteVoz());
        return;
    }
    
    document.querySelectorAll("#lista-pasos-lectura li").forEach((li, i) => {
        li.classList.toggle("paso-activo", i === indicePaso);
        if (i === indicePaso) li.scrollIntoView({behavior: "smooth", block: "center"});
    });

    const texto = `Paso ${indicePaso + 1}. ${recetaEnLectura.steps[indicePaso]}`;
    // Callback: Solo escuchar CUANDO termine de hablar y pase el tiempo de seguridad
    leerTexto(texto, () => {
        if (!enPausa) escucharComando();
    });
}

function iniciarAsistenteVoz(receta) {
    if (!receta) receta = recetaEnLectura;
    
    if (!tieneSpeechSynthesis) {
        alert("Tu navegador no soporta síntesis de voz.");
        return;
    }
  
    detenerAsistenteVoz(); 
    recetaEnLectura = receta; 
    indicePaso = 0;
    enPausa = false;
    hablando = false;

    if (modalDialogo) modalDialogo.className = `dialogo modal-${receta.category}`;

    const intro = `Receta: ${receta.title}.`;
    leerTexto(intro, () => {
         if (!receta.steps.length) return;
         leerPaso(); 
    });
}

function detenerAsistenteVoz() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    hablando = false;
    reconocimientoActivo = false;
    if (reconocimiento) {
        try { reconocimiento.abort(); } catch(e){}
        reconocimiento = null;
    }
    actualizarFeedbackVoz("inactivo");
}

// --- INICIALIZACIÓN ---
function agregarIngredientes(id) {
    const r = TODAS_LAS_RECETAS.find(x => x.id == id);
    if(r) {
        r.ingredients.forEach(i => listaCompra.add(i));
        localStorage.setItem("recetario_lista", JSON.stringify([...listaCompra]));
        pintarListaCompra();
    }
}
function pintarListaCompra() {
    listaCompraEl.innerHTML = [...listaCompra].map(i => `<li>${i} <button onclick="borrarItem('${i}')">x</button></li>`).join("");
}
window.borrarItem = (i) => {
    listaCompra.delete(i);
    localStorage.setItem("recetario_lista", JSON.stringify([...listaCompra]));
    pintarListaCompra();
}

document.addEventListener("DOMContentLoaded", () => {
    pintarRecetas();
    pintarListaCompra();
    
    filtroBtns.forEach(btn => {
        btn.onclick = () => {
            filtroActual = btn.dataset.filtro;
            document.querySelector(".filtros .active")?.classList.remove("active");
            btn.classList.add("active");
            pintarRecetas();
        }
    });
    
    buscarInput.addEventListener("input", () => {
        textoBusqueda = buscarInput.value;
        pintarRecetas();
    });

    modalFondo.addEventListener("click", cerrarModal);
    modalCerrar.addEventListener("click", cerrarModal);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("abierto")) cerrarModal();
    });

    btnContraste.addEventListener("click", () => document.body.classList.toggle("alto-contraste"));
    btnTexto.addEventListener("click", () => document.body.classList.toggle("texto-grande"));
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').catch(console.error);
    }
});
