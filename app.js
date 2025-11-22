// Usa el array global RECETAS definido en recetas.js

// ====== ESTADO GLOBAL ======
const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600";

const FAV_KEY = "gourmet_favoritos";
const SHOP_KEY = "gourmet_compra";

let favorites = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
let shoppingList = JSON.parse(localStorage.getItem(SHOP_KEY) || "[]");

let currentFilter = "todas";
let showOnlyFavs = false;
let searchTerm = "";

let currentRecipeId = null;
let currentStepIndex = 0;

// Voz síntesis
let currentUtterance = null;
let helpSpoken = false; // si ya se han dicho las instrucciones de ayuda

// Voz reconocimiento (comandos)
let recognition = null;
let voiceControlActive = false;

// Tamaño texto
let textSizeState = 0; // 0 normal, 1 grande, 2 muy grande

// Referencias DOM
const listEl = document.getElementById("listado");
const compraEl = document.getElementById("lista-compra");
const btnVaciar = document.getElementById("btn-vaciar");
const filtroFavsBtn = document.getElementById("btn-favs");
const filtroBtns = document.querySelectorAll(".filtros button[data-filtro]");
const buscadorEl = document.getElementById("buscar");
const contrasteBtn = document.getElementById("btn-contraste");
const textoBtn = document.getElementById("btn-texto");

// Modal
const modalEl = document.getElementById("modal");
const modalDialog = modalEl.querySelector(".dialogo");
const modalContentEl = document.getElementById("contenido-modal");
const modalCloseBtn = document.getElementById("cerrar");
const modalBackdrop = modalEl.querySelector(".fondo");

let lastFocusedElement = null;

// ====== FUNCIONES AUXILIARES ======
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function saveFavorites() {
  localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
}

function saveShopping() {
  localStorage.setItem(SHOP_KEY, JSON.stringify(shoppingList));
}

// ====== RENDER LISTA DE RECETAS ======
function renderRecipeList() {
  listEl.innerHTML = "";

  const filtradas = RECETAS.filter((r) => {
    const okFiltroCat = currentFilter === "todas" || r.category === currentFilter;
    const okFav = !showOnlyFavs || favorites.includes(r.id);
    const okSearch =
      !searchTerm ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase());

    return okFiltroCat && okFav && okSearch;
  });

  if (filtradas.length === 0) {
    const vacio = document.createElement("p");
    vacio.className = "empty";
    vacio.textContent = "No hay recetas que cumplan ese filtro.";
    listEl.appendChild(vacio);
    return;
  }

  filtradas.forEach((r) => {
    const card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `${r.title}, ${capitalize(r.category)}`);

    const img = document.createElement("img");
    img.src = r.image || DEFAULT_IMAGE;
    img.alt = r.title;

    const info = document.createElement("div");
    info.style.flex = "1";

    const h3 = document.createElement("h3");
    h3.textContent = r.title;

    const meta = document.createElement("small");
    meta.textContent =
      `${capitalize(r.category)} · ` +
      (r.time || "Tiempo no indicado");

    const diff = document.createElement("small");
    diff.textContent = r.difficulty ? ` · ${r.difficulty}` : "";

    const favBtn = document.createElement("button");
    favBtn.className = "btn small";
    favBtn.textContent = favorites.includes(r.id) ? "★ Fav" : "☆ Fav";
    favBtn.setAttribute(
      "aria-label",
      favorites.includes(r.id)
        ? `Quitar ${r.title} de favoritos`
        : `Añadir ${r.title} a favoritos`
    );

    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(r.id);
      renderRecipeList();
    });

    info.appendChild(h3);
    info.appendChild(meta);
    info.appendChild(diff);
    info.appendChild(document.createElement("br"));
    info.appendChild(favBtn);

    card.appendChild(img);
    card.appendChild(info);

    card.addEventListener("click", () => openRecipeModal(r.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openRecipeModal(r.id);
      }
    });

    listEl.appendChild(card);
  });
}

// ====== FAVORITOS ======
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((x) => x !== id);
  } else {
    favorites.push(id);
  }
  saveFavorites();
}

// ====== LISTA COMPRA ======
function renderShoppingList() {
  compraEl.innerHTML = "";
  if (shoppingList.length === 0) {
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent = "La lista de la compra está vacía.";
    compraEl.appendChild(p);
    return;
  }

  shoppingList.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "shopping-item";
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.alignItems = "center";
    row.style.marginBottom = ".25rem";

    const span = document.createElement("span");
    span.textContent = item;

    const btn = document.createElement("button");
    btn.className = "btn small danger";
    btn.textContent = "✕";
    btn.setAttribute("aria-label", `Quitar ${item} de la lista`);
    btn.addEventListener("click", () => {
      shoppingList.splice(idx, 1);
      saveShopping();
      renderShoppingList();
    });

    row.appendChild(span);
    row.appendChild(btn);
    compraEl.appendChild(row);
  });
}

function addRecipeToShoppingList(recipe) {
  (recipe.ingredients || []).forEach((ing) => {
    if (!shoppingList.includes(ing)) {
      shoppingList.push(ing);
    }
  });
  saveShopping();
  renderShoppingList();
}

// ====== MODAL RECETA ======
function openRecipeModal(id) {
  const r = RECETAS.find((x) => x.id === id);
  if (!r) return;

  lastFocusedElement = document.activeElement;

  currentRecipeId = id;
  currentStepIndex = 0;
  helpSpoken = false;
  stopVoice();
  stopVoiceRecognition();

  modalContentEl.innerHTML = "";

  const img = document.createElement("img");
  img.className = "imagen-modal";
  img.src = r.image || DEFAULT_IMAGE;
  img.alt = r.title;

  const title = document.createElement("h2");
  title.textContent = r.title;

  const meta = document.createElement("p");
  meta.textContent =
    `${capitalize(r.category)} · ` +
    (r.time || "Tiempo no indicado") +
    (r.difficulty ? ` · ${r.difficulty}` : "") +
    (r.servings ? ` · ${r.servings} raciones` : "");

  const btns = document.createElement("div");
  btns.className = "detail-buttons";

  const favBtn = document.createElement("button");
  favBtn.className = "btn small";
  const esFav = favorites.includes(id);
  favBtn.textContent = esFav ? "Quitar de favoritos" : "Añadir a favoritos";
  favBtn.addEventListener("click", () => {
    toggleFavorite(id);
    const ahoraFav = favorites.includes(id);
    favBtn.textContent = ahoraFav ? "Quitar de favoritos" : "Añadir a favoritos";
    renderRecipeList();
  });

  const compraBtn = document.createElement("button");
  compraBtn.className = "btn small";
  compraBtn.textContent = "Añadir a la lista";
  compraBtn.addEventListener("click", () => addRecipeToShoppingList(r));

  const voiceBtn = document.createElement("button");
  voiceBtn.className = "btn small";
  voiceBtn.textContent = "Leer paso actual (voz)";
  voiceBtn.addEventListener("click", () => startGuidedCooking(r));

  const prevBtn = document.createElement("button");
  prevBtn.className = "btn small";
  prevBtn.textContent = "Paso anterior (voz)";
  prevBtn.addEventListener("click", () => prevStep());

  const nextBtn = document.createElement("button");
  nextBtn.className = "btn small";
  nextBtn.textContent = "Siguiente paso (voz)";
  nextBtn.addEventListener("click", () => nextStep());

  const stopBtn = document.createElement("button");
  stopBtn.className = "btn small danger";
  stopBtn.textContent = "Parar voz";
  stopBtn.addEventListener("click", () => stopVoice());

  const voiceCtrlBtn = document.createElement("button");
  voiceCtrlBtn.className = "btn small";
  voiceCtrlBtn.textContent = "Control por voz: apagado";
  voiceCtrlBtn.addEventListener("click", () => toggleVoiceControl(voiceCtrlBtn));

  btns.appendChild(favBtn);
  btns.appendChild(compraBtn);
  btns.appendChild(voiceBtn);
  btns.appendChild(prevBtn);
  btns.appendChild(nextBtn);
  btns.appendChild(stopBtn);
  btns.appendChild(voiceCtrlBtn);

  const voiceStatus = document.createElement("p");
  voiceStatus.id = "voice-status";
  voiceStatus.className = "voice-status";
  voiceStatus.textContent =
    "Cocina guiada: usa los botones, el teclado o el control por voz.";

  const ingTitle = document.createElement("h3");
  ingTitle.textContent = "Ingredientes";

  const ingList = document.createElement("ul");
  (r.ingredients || []).forEach((ing) => {
    const li = document.createElement("li");
    li.textContent = ing;
    ingList.appendChild(li);
  });

  const stepsTitle = document.createElement("h3");
  stepsTitle.textContent = "Preparación";

  const stepsList = document.createElement("ol");
  stepsList.className = "pasos";
  if (!r.steps || r.steps.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Esta receta todavía no tiene pasos definidos.";
    stepsList.appendChild(li);
  } else {
    r.steps.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = p;
      stepsList.appendChild(li);
    });
  }

  modalContentEl.appendChild(img);
  modalContentEl.appendChild(title);
  modalContentEl.appendChild(meta);
  modalContentEl.appendChild(btns);
  modalContentEl.appendChild(voiceStatus);
  modalContentEl.appendChild(ingTitle);
  modalContentEl.appendChild(ingList);
  modalContentEl.appendChild(stepsTitle);
  modalContentEl.appendChild(stepsList);

  modalEl.classList.add("activo");
  modalDialog.focus();
}

function closeRecipeModal() {
  stopVoice();
  stopVoiceRecognition();
  modalEl.classList.remove("activo");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

modalCloseBtn.addEventListener("click", closeRecipeModal);
modalBackdrop.addEventListener("click", closeRecipeModal);

// Teclado global: ESC / flechas / R / S
document.addEventListener("keydown", (e) => {
  if (!modalEl.classList.contains("activo")) return;

  if (e.key === "Escape") {
    e.preventDefault();
    closeRecipeModal();
    return;
  }

  const key = e.key.toLowerCase();

  if (key === "arrowright") {
    e.preventDefault();
    nextStep();
  } else if (key === "arrowleft") {
    e.preventDefault();
    prevStep();
  } else if (key === "r") {
    e.preventDefault();
    speakCurrentStep();
  } else if (key === "s") {
    e.preventDefault();
    stopVoice();
  }
});

// ====== VOZ: SÍNTESIS (LECTURA) ======
function startGuidedCooking(recipe) {
  const status = document.getElementById("voice-status");
  if (!("speechSynthesis" in window)) {
    if (status) {
      status.textContent =
        "Tu navegador no soporta voz. Sigue los pasos leyendo la lista.";
    } else {
      alert("Tu navegador no soporta síntesis de voz.");
    }
    return;
  }
  if (!recipe.steps || recipe.steps.length === 0) {
    if (status) status.textContent = "Esta receta no tiene pasos definidos aún.";
    return;
  }
  currentRecipeId = recipe.id;
  speakCurrentStep();
}

function speakCurrentStep() {
  stopVoice();
  const recipe = RECETAS.find((r) => r.id === currentRecipeId);
  if (!recipe || !recipe.steps || recipe.steps.length === 0) return;

  const status = document.getElementById("voice-status");
  if (!status) return;

  const paso = recipe.steps[currentStepIndex];
  let texto = `Paso ${currentStepIndex + 1} de ${recipe.steps.length}. ${paso}`;

  if (currentStepIndex === 0 && recipe.time) {
    texto += `. El tiempo total aproximado de esta receta es ${recipe.time}.`;
  }

  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "es-ES";
  u.rate = 0.95;

  u.onstart = () => {
    status.textContent = `Leyendo paso ${currentStepIndex + 1} de ${recipe.steps.length}...`;
  };

  u.onend = () => {
    status.textContent =
      `Fin del paso ${currentStepIndex + 1}. Usa los botones, el teclado o la voz para continuar.`;

    if (!helpSpoken) {
      helpSpoken = true;
      const ayuda =
        "Comandos disponibles: di siguiente para ir al siguiente paso, " +
        "anterior para volver atrás, repite para oír de nuevo este paso, " +
        "para o silencio para detener la voz, y cerrar o salir para cerrar la receta.";
      const helpU = new SpeechSynthesisUtterance(ayuda);
      helpU.lang = "es-ES";
      helpU.rate = 0.95;
      window.speechSynthesis.speak(helpU);
    }
  };

  currentUtterance = u;
  window.speechSynthesis.speak(u);
}

function nextStep() {
  const recipe = RECETAS.find((r) => r.id === currentRecipeId);
  if (!recipe || !recipe.steps) return;
  if (currentStepIndex < recipe.steps.length - 1) {
    currentStepIndex++;
    speakCurrentStep();
  }
}

function prevStep() {
  const recipe = RECETAS.find((r) => r.id === currentRecipeId);
  if (!recipe || !recipe.steps) return;
  if (currentStepIndex > 0) {
    currentStepIndex--;
    speakCurrentStep();
  }
}

function stopVoice() {
  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
  const status = document.getElementById("voice-status");
  if (status) status.textContent = "Cocina guiada detenida.";
}

// ====== VOZ: RECONOCIMIENTO (COMANDOS) ======
function initVoiceRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    recognition = null;
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "es-ES";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const last = event.results[event.results.length - 1];
    const text = last[0].transcript.toLowerCase().trim();
    console.log("Comando de voz:", text);

    if (!modalEl.classList.contains("activo")) return;

    if (text.includes("siguiente")) {
      nextStep();
    } else if (
      text.includes("anterior") ||
      text.includes("atrás") ||
      text.includes("atras")
    ) {
      prevStep();
    } else if (text.includes("repite") || text.includes("repetir")) {
      speakCurrentStep();
    } else if (
      text.includes("para") ||
      text.includes("parar") ||
      text.includes("silencio")
    ) {
      stopVoice();
    } else if (text.includes("cerrar") || text.includes("salir")) {
      closeRecipeModal();
    }
  };

  recognition.onend = () => {
    if (voiceControlActive && modalEl.classList.contains("activo")) {
      try {
        recognition.start();
      } catch (e) {
        console.warn("No se pudo reiniciar reconocimiento:", e);
      }
    }
  };
}

function toggleVoiceControl(buttonEl) {
  const status = document.getElementById("voice-status");

  if (!recognition) {
    if (status) {
      status.textContent =
        "Control por voz no disponible en este navegador. Usa los botones o el teclado.";
    }
    alert("Tu navegador no soporta reconocimiento de voz (Chrome o Edge recomendado).");
    return;
  }

  voiceControlActive = !voiceControlActive;

  if (voiceControlActive) {
    buttonEl.textContent = "Control por voz: encendido";
    if (status) {
      status.textContent =
        "Control por voz encendido. Di: siguiente, anterior, repite, para o cerrar.";
    }
    try {
      recognition.start();
    } catch (e) {
      console.warn("Error al iniciar reconocimiento:", e);
    }
  } else {
    buttonEl.textContent = "Control por voz: apagado";
    if (status) {
      status.textContent =
        "Control por voz apagado. Usa botones, teclado o vuelve a activarlo.";
    }
    stopVoiceRecognition();
  }
}

function stopVoiceRecognition() {
  if (recognition && voiceControlActive) {
    voiceControlActive = false;
    try {
      recognition.stop();
    } catch (e) {
      console.warn("Error al parar reconocimiento:", e);
    }
  }
}

// ====== FILTROS / BUSCADOR ======
filtroBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filtroBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filtro");
    renderRecipeList();
  });
});

filtroFavsBtn.addEventListener("click", () => {
  showOnlyFavs = !showOnlyFavs;
  filtroFavsBtn.textContent = showOnlyFavs ? "Todos" : "Favoritos";
  renderRecipeList();
});

if (buscadorEl) {
  buscadorEl.addEventListener("input", () => {
    searchTerm = buscadorEl.value.trim();
    renderRecipeList();
  });
}

// ====== LISTA COMPRA BOTÓN VACIAR ======
btnVaciar.addEventListener("click", () => {
  shoppingList = [];
  saveShopping();
  renderShoppingList();
});

// ====== CONTROLES ACCESIBILIDAD GLOBAL ======
contrasteBtn.addEventListener("click", () => {
  document.body.classList.toggle("contraste");
});

textoBtn.addEventListener("click", () => {
  textSizeState = (textSizeState + 1) % 3;
  document.body.classList.remove("texto-grande", "texto-xl");
  if (textSizeState === 0) {
    textoBtn.textContent = "Texto normal";
  } else if (textSizeState === 1) {
    document.body.classList.add("texto-grande");
    textoBtn.textContent = "Texto grande";
  } else {
    document.body.classList.add("texto-xl");
    textoBtn.textContent = "Texto muy grande";
  }
});

// ====== INICIO ======
renderRecipeList();
renderShoppingList();
initVoiceRecognition();
