/**
 * Lógica principal del Recetario Gourmet Navideño
 * Maneja la carga de datos, el renderizado y las funciones de voz/favoritos.
 */

// --- 1. CONFIGURACIÓN GLOBAL Y VOZ ---
const sintetizador = window.speechSynthesis;
let recetasDatos = []; // Almacenará los datos cargados del JSON

/**
 * Función para activar la guía por voz de una receta.
 * Detiene la lectura si ya está hablando.
 * @param {number} id - ID de la receta a leer.
 */
const leerReceta = (id) => {
    if (!sintetizador) {
        alert('Lo siento, tu navegador no soporta la síntesis de voz.');
        return;
    }

    // Si ya está hablando, lo cancelamos (funciona como un botón de Stop)
    if (sintetizador.speaking) {
        sintetizador.cancel();
        return;
    }

    const receta = recetasDatos.find(r => r.id === id);
    if (!receta) return;

    // Mensaje que se narrará
    const textoCompleto = `
        ¡Comencemos a cocinar! Título: ${receta.titulo}. 
        Ingredientes: ${receta.ingredientes}. 
        Instrucciones de preparación: ${receta.preparacion}.
        Recuerda, pulsa el botón para detener la narración.
    `;
    
    const voz = new SpeechSynthesisUtterance(textoCompleto);
    voz.lang = 'es-ES'; 
    voz.rate = 0.9;     
    
    sintetizador.speak(voz);
};

// --- 2. FUNCIONALIDAD DE FAVORITOS Y LISTA DE LA COMPRA ---

/**
 * Obtiene los IDs de las recetas favoritas almacenadas en localStorage.
 * @returns {Array<number>} IDs de las recetas favoritas.
 */
const obtenerFavoritos = () => {
    const favoritosJSON = localStorage.getItem('recetasFavoritas');
    return favoritosJSON ? JSON.parse(favoritosJSON) : [];
};

/**
 * Alterna el estado de Favorito de una receta.
 * @param {number} id - ID de la receta.
 * @param {HTMLElement} boton - El elemento botón que fue clickeado.
 */
const toggleFavorito = (id, boton) => {
    let favoritos = obtenerFavoritos();
    const esFavorito = favoritos.includes(id);

    if (esFavorito) {
        // Quitar de favoritos
        favoritos = favoritos.filter(favId => favId !== id);
        boton.setAttribute('data-favorito', 'false');
        boton.textContent = '⭐ Añadir a Favoritos';
    } else {
        // Añadir a favoritos
        favoritos.push(id);
        boton.setAttribute('data-favorito', 'true');
        boton.textContent = '🌟 En Favoritos';
    }

    // Guardar los nuevos favoritos
    localStorage.setItem('recetasFavoritas', JSON.stringify(favoritos));
};

/**
 * Genera la lista de la compra a partir de las recetas favoritas.
 */
const generarListaCompra = () => {
    const favoritosIDs = obtenerFavoritos();
    if (favoritosIDs.length === 0) {
        alert('No has marcado ninguna receta como favorita. ¡Selecciona algunas para crear tu lista de la compra!');
        return;
    }

    // Filtramos las recetas favoritas a partir de los datos completos
    const recetasFavoritas = recetasDatos.filter(r => favoritosIDs.includes(r.id));
    
    let lista = '🛒 **LISTA DE LA COMPRA para tus Recetas Favoritas**\n\n';
    const ingredientesTotales = {};

    recetasFavoritas.forEach(receta => {
        // Suponemos que los ingredientes están separados por coma y tienen un número (ej: 1. Ingrediente A, 2. Ingrediente B)
        receta.ingredientes.split(',').forEach(item => {
            const limpio = item.trim().replace(/^\d+\.\s*/, '');
            if (limpio) {
                // Aquí podríamos sumar cantidades si el formato fuera más estricto
                // Por ahora, solo listamos el ingrediente
                ingredientesTotales[limpio] = (ingredientesTotales[limpio] || 0) + 1; 
            }
        });
    });
    
    // Formatear la lista para el usuario
    const listaFinal = Object.keys(ingredientesTotales).map(ing => `* ${ing}`).join('\n');
    lista += listaFinal;

    alert(lista);
};

// --- 3. RENDERIZADO DE RECETAS ---

/**
 * Crea el elemento HTML para una única receta.
 * @param {Object} r - Objeto de la receta.
 * @returns {HTMLElement} El div de la receta.
 */
const crearTarjetaReceta = (r) => {
    const div = document.createElement('div');
    div.className = 'receta';
    
    const esFavorito = obtenerFavoritos().includes(r.id);
    const textoBotonFav = esFavorito ? '🌟 En Favoritos' : '⭐ Añadir a Favoritos';

    div.innerHTML = `
        <img src="${r.img}" alt="${r.titulo}" loading="lazy">
        <div class="contenido-receta">
            <h3>${r.titulo}</h3>
            
            <div class="meta">
              <span class="tiempo">⏱ ${r.tiempo}</span>
              <span class="dificultad">🔥 Dificultad: ${r.dificultad}</span>
            </div>
            
            <div class="contenido-receta-detalle">
              <h4>Ingredientes:</h4>
              <p>${r.ingredientes}</p>
              <h4>Preparación:</h4>
              <p>${r.preparacion}</p>
              
              <div class="acciones">
                <button class="btn-voz" onclick="leerReceta(${r.id})">🎤 Instrucciones por Voz</button>
                <button class="btn-favorito" data-favorito="${esFavorito}" onclick="toggleFavorito(${r.id}, this)">${textoBotonFav}</button>
              </div>
            </div>
        </div>
    `;
    return div;
};

/**
 * Carga las recetas del JSON y las renderiza en la página.
 */
const renderizarRecetas = () => {
    const contenedores = {
        'aperitivos': document.getElementById('contenedor-aperitivos'),
        'primeros': document.getElementById('contenedor-primeros'),
        'segundos': document.getElementById('contenedor-segundos'),
        'postres': document.getElementById('contenedor-postres')
    };

    recetasDatos.forEach(r => {
        const tarjeta = crearTarjetaReceta(r);
        contenedores[r.categoria].appendChild(tarjeta);
    });
};

/**
 * Inicializa la aplicación: Carga los datos y renderiza.
 */
const init = async () => {
    try {
        // Usamos fetch para cargar el archivo JSON de forma asíncrona
        const response = await fetch('recetas.json');
        if (!response.ok) {
            throw new Error(`Error al cargar recetas.json: ${response.statusText}`);
        }
        recetasDatos = await response.json();
        
        renderizarRecetas();
        
        // Conectar el botón de la lista de la compra
        document.getElementById('btn-lista-compra').addEventListener('click', generarListaCompra);

    } catch (error) {
        console.error('Fallo al inicializar la aplicación:', error);
        alert('Error al cargar las recetas. Asegúrate de que el archivo recetas.json exista.');
    }
};

// Iniciar la aplicación al cargar el documento
document.addEventListener('DOMContentLoaded', init);
