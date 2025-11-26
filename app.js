/**
 * =============================================================
 * app.js: LÓGICA COMPLETA DEL RECETARIO GOURMET (VERSIÓN FINAL)
 * Incluye: Datos, Renderizado, Filtros, Modal, Service Worker y Asistente de Voz.
 * =============================================================
 */

// =============================================================
// 1. DATA (RECETAS Y ESTADO GLOBAL)
// =============================================================

/**
 * 🚨 IMPORTANTE: PEGA AQUÍ TUS 160 RECETAS
 * Este array debe contener todas tus recetas, ya que fusionamos
 * el contenido de recetas.js en este archivo.
 * * Ejemplo de estructura:
 * [{
 * id: 1,
 * name: "Entrante de Navidad Rápido",
 * category: "aperitivo", // CRÍTICO: Debe ser 'aperitivo', 'primero', 'segundo' o 'postre'
 * difficulty: "Fácil",
 * time: "15 min",
 * ingredients: ["Queso de cabra", "Miel", "Nueces"],
 * steps: ["Cortar el queso...", "Bañar con miel...", "Servir."]
 * }, ...]
 */
const TODAS_LAS_LAS_RECETAS = [
    // ----------------------------------------------------------------------
    // PEGA AQUÍ EL ARRAY COMPLETO DE TUS 160 OBJETOS DE RECETAS
    // ----------------------------------------------------------------------
];


let recetasVisibles = [...TODAS_LAS_LAS_RECETAS];
let estadoActualVoz = {
    lecturaActiva: false,
    pasoActual: -1,
    idReceta: null,
    pasos: []
};

// =============================================================
// 2. CONSTANTES DEL DOM
// =============================================================

const GRID_RECETAS = document.getElementById('grid-recetas');
const BUSCADOR = document.getElementById('buscador');
const CONTENEDOR_FILTROS = document.getElementById('filtros-container');
const BTN_ACCESIBILIDAD_CONTR = document.getElementById('btn-contraste');
const BTN_ACCESIBILIDAD_TEXTO = document.getElementById('btn-texto-grande');

// Modal
const MODAL = document.getElementById('modal-receta');
const MODAL_DIALOGO = document.querySelector('.modal .dialogo');
const MODAL_CONTENIDO = document.getElementById('modal-contenido');
const BTN_VOZ_PARAR = document.getElementById('btn-voz-parar');

// =============================================================
// 3. FUNCIONES DE UTILIDAD (RENDERING)
// =============================================================

/**
 * Devuelve la clase CSS para el borde de la tarjeta según la categoría.
 */
function getClaseCategoria(category) {
    return `cat-${category.toLowerCase()}`;
}

/**
 * Renderiza el HTML para una sola tarjeta de receta.
 */
function crearRecetaCard(receta) {
    const card = document.createElement('article');
    card.className = `receta-card ${getClaseCategoria(receta.category)}`;
    card.setAttribute('tabindex', '0'); // Hacemos la tarjeta accesible por teclado
    card.setAttribute('data-id', receta.id);
    
    // Contenido de la tarjeta (adaptado a tu estructura)
    card.innerHTML = `
        <div class="receta-header">
            <h3>${receta.name}</h3>
        </div>
        <div class="receta-meta">
            <p><strong>Dificultad:</strong> ${receta.difficulty}</p>
            <p><strong>Tiempo:</strong> ${receta.time}</p>
        </div>
        <button class="btn small secondary" onclick="abrirModal(${receta.id})" aria-label="Ver detalles y pasos de ${receta.name}">
            Ver Receta
        </button>
    `;

    // Event listener para abrir el modal al hacer clic o presionar ENTER
    card.addEventListener('click', () => abrirModal(receta.id));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            abrirModal(receta.id);
        }
    });

    return card;
}

/**
 * Renderiza todas las recetas en el GRID.
 */
function renderizarRecetas(recetas) {
    GRID_RECETAS.innerHTML = '';
    if (recetas.length === 0) {
        GRID_RECETAS.innerHTML = '<p class="panel">No se encontraron recetas que coincidan con los filtros o búsqueda.</p>';
        return;
    }
    recetas.forEach(receta => {
        GRID_RECETAS.appendChild(crearRecetaCard(receta));
    });
}

// =============================================================
// 4. FUNCIONES DE FILTRO Y BÚSQUEDA
// =============================================================

let filtroCategoria = 'todos';

function filtrarRecetas() {
    const textoBusqueda = BUSCADOR.value.toLowerCase();
    
    let resultados = TODAS_LAS_LAS_RECETAS.filter(receta => {
        const coincideCategoria = filtroCategoria === 'todos' || receta.category.toLowerCase() === filtroCategoria;
        const coincideBusqueda = 
            receta.name.toLowerCase().includes(textoBusqueda) ||
            receta.ingredients.join(', ').toLowerCase().includes(textoBusqueda);
            
        return coincideCategoria && coincideBusqueda;
    });

    recetasVisibles = resultados;
    renderizarRecetas(recetasVisibles);
}

function cambiarFiltro(nuevaCategoria, boton) {
    // 1. Actualizar el estado del filtro
    filtroCategoria = nuevaCategoria;
    
    // 2. Actualizar el estilo de los botones
    document.querySelectorAll('.filtros button').forEach(btn => {
        btn.classList.remove('active');
    });
    boton.classList.add('active');
    
    // 3. Refiltrar y renderizar
    filtrarRecetas();
}


// =============================================================
// 5. LÓGICA DEL MODAL (CRÍTICA)
// =============================================================

/**
 * Abre el modal con los detalles de la receta y lo prepara para la voz.
 */
function abrirModal(recetaId) {
    detenerLecturaVoz(); // Aseguramos que se detiene cualquier lectura previa
    const receta = TODAS_LAS_LAS_RECETAS.find((r) => r.id === recetaId);
    if (!receta) return;

    // -------------------------------------------------------------
    // 🚨 NUEVA LÓGICA DE COLOR DE MODAL POR CATEGORÍA 🚨
    // -------------------------------------------------------------
    const claseModal = `modal-${receta.category.toLowerCase()}`; 
    
    // Limpiar clases de categoría anteriores para evitar conflictos
    MODAL_DIALOGO.className = MODAL_DIALOGO.className
        .replace(/modal-(aperitivo|primero|segundo|postre|otros)/g, '')
        .trim();
        
    // Aplicar la nueva clase de color
    MODAL_DIALOGO.classList.add(claseModal); 
    
    // -------------------------------------------------------------

    // Rellenar el contenido del modal
    const ingredientesHTML = receta.ingredients.map(ing => `<li>${ing}</li>`).join('');
    const pasosHTML = receta.steps.map((paso, index) => `<li id="paso-${index}">${paso}</li>`).join('');

    MODAL_CONTENIDO.innerHTML = `
        <div class="modal-header">
            <h2 id="modal-titulo">${receta.name}</h2>
            <p class="receta-meta">⏱ ${receta.time} | Dificultad: ${receta.difficulty} | Categoría: ${receta.category}</p>
        </div>
        
        <h3>Ingredientes</h3>
        <ul class="lista-ingredientes">
            ${ingredientesHTML}
        </ul>

        <h3>Instrucciones</h3>
        <ol class="lista-pasos" id="lista-pasos-lectura">
            ${pasosHTML}
        </ol>

        <div class="detalle-acciones">
            <button id="btn-voz-iniciar" class="btn btn-voz" onclick="iniciarLecturaVoz()">
                🎙️ Iniciar Lectura
            </button>
            <button id="btn-voz-siguiente" class="btn btn-voz secondary" disabled onclick="manejarComandoVoz('siguiente')">
                Siguiente Paso
            </button>
            <button id="btn-voz-repetir" class="btn btn-voz secondary" disabled onclick="manejarComandoVoz('repetir')">
                Repetir
            </button>
            <button class="btn danger small" onclick="cerrarModal()">
                Cerrar
            </button>
        </div>
        <p class="voz-ayuda">Comandos de voz: "siguiente", "repetir", "parar", "salir".</p>
    `;

    // 2. Actualizar estado y mostrar
    estadoActualVoz.idReceta = recetaId;
    estadoActualVoz.pasos = receta.steps;
    estadoActualVoz.pasoActual = -1; // -1 significa que está en la introducción
    
    MODAL.classList.add('abierto');
    document.body.classList.add('modal-abierto');
    MODAL_DIALOGO.scrollTop = 0; // Asegurar que empieza arriba
    
    // Enfocar el diálogo para accesibilidad
    MODAL_DIALOGO.focus(); 
}

/**
 * Cierra el modal y detiene la voz.
 */
function cerrarModal() {
    detenerLecturaVoz();
    MODAL.classList.remove('abierto');
    document.body.classList.remove('modal-abierto');
    
    // Limpiar clases de color
    MODAL_DIALOGO.className = MODAL_DIALOGO.className
        .replace(/modal-(aperitivo|primero|segundo|postre|otros)/g, '')
        .trim();
}


// =============================================================
// 6. LÓGICA DEL ASISTENTE DE VOZ
// =============================================================

const SPEECH = window.speechSynthesis;
let ASISTENTE_VOZ = null; // El objeto de reconocimiento de voz

/**
 * Inicia el asistente de voz al cargar la aplicación.
 */
function iniciarAsistenteVoz() {
    // Verificar soporte de la API de reconocimiento de voz
    if (window.webkitSpeechRecognition) {
        ASISTENTE_VOZ = new window.webkitSpeechRecognition();
        ASISTENTE_VOZ.lang = 'es-ES';
        ASISTENTE_VOZ.continuous = true;
        ASISTENTE_VOZ.interimResults = false;

        ASISTENTE_VOZ.onresult = (event) => {
            const resultado = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
            console.log('🎙️ Comando reconocido:', resultado);
            
            if (estadoActualVoz.lecturaActiva) {
                // Si la lectura está activa, manejar comandos específicos
                manejarComandoVoz(resultado);
            }
        };

        ASISTENTE_VOZ.onerror = (event) => {
            if (event.error !== 'no-speech') {
                console.error('Error en reconocimiento de voz:', event.error);
            }
        };

        ASISTENTE_VOZ.onend = () => {
            // Reiniciar la escucha solo si la lectura está activa (o en el modal)
            if (MODAL.classList.contains('abierto')) {
                ASISTENTE_VOZ.start();
            }
        };

        try {
            ASISTENTE_VOZ.start();
            console.log('Asistente de Voz inicializado y escuchando.');
        } catch (e) {
            // Manejar el error si ya está escuchando
            if (e.name !== 'InvalidStateError') {
                console.error('Error al iniciar asistente:', e);
            }
        }
        
    } else {
        console.warn('El API de Web Speech Recognition no es compatible con este navegador.');
    }
}

/**
 * Maneja los comandos de voz durante la lectura de la receta.
 */
function manejarComandoVoz(comando) {
    comando = comando.toLowerCase();

    if (comando.includes('siguiente') || comando.includes('próximo')) {
        leerSiguientePaso();
    } else if (comando.includes('repetir')) {
        leerPasoActual();
    } else if (comando.includes('parar') || comando.includes('pausa')) {
        detenerLecturaVoz();
        alert('Lectura en pausa. Di "continuar" para seguir o haz clic en "Iniciar Lectura"');
    } else if (comando.includes('salir') || comando.includes('cerrar')) {
        cerrarModal();
    } else if (comando.includes('continuar')) {
        if (!estadoActualVoz.lecturaActiva) {
            // Si estaba en pausa, reanudar
            iniciarLecturaVoz();
        }
    }
}

/**
 * Inicia la lectura de la receta, comenzando desde el principio o reanudando.
 */
function iniciarLecturaVoz() {
    if (!estadoActualVoz.idReceta) return;

    estadoActualVoz.lecturaActiva = true;
    
    // Habilitar botones de navegación por voz
    document.getElementById('btn-voz-siguiente').disabled = false;
    document.getElementById('btn-voz-repetir').disabled = false;
    document.getElementById('btn-voz-iniciar').textContent = '🎙️ Pausar';
    document.getElementById('btn-voz-iniciar').onclick = detenerLecturaVoz;
    
    // Si ya leyó la introducción, lee el paso actual, sino, empieza
    if (estadoActualVoz.pasoActual === -1) {
        leerSiguientePaso();
    } else {
        leerPasoActual(); // Si estaba en pausa, reanuda la lectura
    }
}

/**
 * Lee el paso actual (o reanuda la lectura si estaba en pausa).
 */
function leerPasoActual() {
    if (estadoActualVoz.pasoActual >= 0) {
        const pasoTexto = estadoActualVoz.pasos[estadoActualVoz.pasoActual];
        marcarPasoActivo(estadoActualVoz.pasoActual);
        leerTexto(pasoTexto);
    }
}

/**
 * Avanza al siguiente paso y lo lee.
 */
function leerSiguientePaso() {
    const siguientePaso = estadoActualVoz.pasoActual + 1;
    
    if (siguientePaso < estadoActualVoz.pasos.length) {
        estadoActualVoz.pasoActual = siguientePaso;
        const pasoTexto = estadoActualVoz.pasos[siguientePaso];
        marcarPasoActivo(siguientePaso);
        leerTexto(pasoTexto);
    } else {
        leerTexto('Has completado la receta. Di salir para cerrar.');
        detenerLecturaVoz();
    }
}


/**
 * Detiene la lectura de voz y actualiza el estado.
 */
function detenerLecturaVoz() {
    if (SPEECH.speaking) {
        SPEECH.cancel();
    }
    estadoActualVoz.lecturaActiva = false;
    
    // Actualizar botones a estado "pausado"
    const btnIniciar = document.getElementById('btn-voz-iniciar');
    if (btnIniciar) {
        btnIniciar.textContent = '🎙️ Continuar Lectura';
        btnIniciar.onclick = iniciarLecturaVoz;
    }
}


/**
 * Utilidad para sintetizar texto.
 */
function leerTexto(texto) {
    if (SPEECH.speaking) {
        SPEECH.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-ES';
    SPEECH.speak(utterance);
}

/**
 * Marca visualmente el paso actual en el modal.
 */
function marcarPasoActivo(index) {
    document.querySelectorAll('#lista-pasos-lectura li').forEach((li, i) => {
        li.classList.remove('paso-activo');
        if (i === index) {
            li.classList.add('paso-activo');
            // Desplazar la vista del modal hacia el paso activo
            li.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// =============================================================
// 7. FUNCIONES DE ACCESIBILIDAD
// =============================================================

function alternarModoContraste() {
    document.body.classList.toggle('alto-contraste');
    BTN_ACCESIBILIDAD_CONTR.textContent = document.body.classList.contains('alto-contraste') 
        ? 'Contraste Normal' 
        : 'Alto Contraste';
}

function alternarModoTextoGrande() {
    document.body.classList.toggle('texto-grande');
    BTN_ACCESIBILIDAD_TEXTO.textContent = document.body.classList.contains('texto-grande')
        ? 'Texto Normal'
        : 'Texto Grande';
}


// =============================================================
// 8. INICIALIZACIÓN Y EVENT LISTENERS
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Renderizado inicial de recetas
    renderizarRecetas(TODAS_LAS_LAS_RECETAS);
    
    // 2. Event Listeners para Filtros y Búsqueda
    BUSCADOR.addEventListener('input', filtrarRecetas);

    // 3. Crear botones de filtro dinámicamente
    const categoriasUnicas = ['todos', 'aperitivo', 'primero', 'segundo', 'postre'];
    categoriasUnicas.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.classList.add('btn', 'small');
        if (cat === 'todos') {
            btn.classList.add('active');
        }
        btn.onclick = () => cambiarFiltro(cat, btn);
        CONTENEDOR_FILTROS.appendChild(btn);
    });

    // 4. Listeners para Accesibilidad
    BTN_ACCESIBILIDAD_CONTR.addEventListener('click', alternarModoContraste);
    BTN_ACCESIBILIDAD_TEXTO.addEventListener('click', alternarModoTextoGrande);
    
    // 5. Listener para cerrar el modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && MODAL.classList.contains('abierto')) {
            cerrarModal();
        }
    });
    
    // 6. Inicializar Asistente de Voz
    iniciarAsistenteVoz();

    // 7. Registro del Service Worker (PWA)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registrado con éxito:', registration.scope);
                })
                .catch(error => {
                    console.error('Fallo el registro del ServiceWorker:', error);
                });
        });
    }
});
