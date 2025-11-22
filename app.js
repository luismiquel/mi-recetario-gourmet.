// Usa el array global RECETAS definido en recetas.js

// Imagen por defecto desde internet
const DEFAULT_IMAGE =
  "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600";

let favorites = JSON.parse(localStorage.getItem("gourmet_favorites") || "[]");
let shoppingList = JSON.parse(localStorage.getItem("gourmet_shopping") || "[]");
let currentFilter = "todas";
let showOnlyFavorites = false;
let currentRecipeId = null;
let currentStepIndex = 0;
let searchTerm = "";

// voz
let currentUtterance = null;
// 🔹 Ahora usaremos SIEMPRE modo paso a paso (no automático)
let autoVoiceMode = false;

const listEl = document.getElementById("recipe-list");
const shoppingEl = document.getElementById("shopping-list");
const clearShoppingBtn = document.getElementById("clear-shopping");
const toggleFavsBtn = document.getElementById("toggle-favs");
const searchInput = document.getElementById("search-recipes");
const contrastBtn = document.getElementById("toggle-contrast");
const textSizeBtn = document.getElementById("toggle-textsize");

const modalEl = document.getElementById("recipe-modal");
const modalContentEl = document.getElementById("modal-content");
const modalCloseBtn = document.getElementById("modal-close");
const modalDialog = document.querySelector(".modal-dialog");

let lastFocusedElement = null;
let textSizeState = 0; // 0 normal, 1 grande, 2 muy grande

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/*************** LISTADO ***************/
function renderRecipeList() {
  listEl.innerHTML = "";

  const filtered = RECETAS.filter(r => {
    const byCategory = currentFilter === "todas" || r.category === currentFilter;
    const byFav = !showOnlyFavorites || favorites.includes(r.id);
    const bySearch =
      !searchTerm ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase());
    return byCategory && byFav && bySearch;
  });

  if (filtered.length === 0) {
    listEl.innerHTML = '<p class="empty">No hay recetas para este filtro.</p>';
    return;
  }

  filtered.forEach(r => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.dataset.id = r.id;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `${r.title}, ${capitalize(r.category)}`);

    const img = document.createElement("img");
    img.className = "recipe-thumb";
    img.src = r.image || DEFAULT_IMAGE;
    img.alt = r.title;

    const info = document.createElement("div");
    info.className = "recipe-info";

    const h3 = document.createElement("h3");
    h3.textContent = r.title;

    const meta = document.createElement("small");
    meta.textContent = `${capitalize(r.category)} · ${r.time || "Tiempo variable"}`;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = r.difficulty || "Receta";

    const isFav = favorites.includes(r.id);
    const favIcon = document.createElement("button");
    favIcon.type = "button";
    favIcon.className = "fav-icon" + (isFav ? " active" : "");
    favIcon.textContent = "★";
    favIcon.setAttribute(
      "aria-label",
      isFav
        ? `Quitar ${r.title} de favoritos`
        : `Añadir ${r.title} a favoritos`
    );
    favIcon.setAttribute("aria-pressed", isFav ? "true" : "false");

    info.appendChild(h3);
    info.appendChild(meta);
    info.appendChild(badge);

    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(favIcon);

    card.addEventListener("click", (e) => {
      if (e.target === favIcon) {
        toggleFavorite(r.id);
        renderRecipeList();
        e.stopPropagation();
      } else {
        openRecipeModal(r.id);
      }
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openRecipeModal(r.id);
      }
    });

    listEl.appendChild(card);
  });
}

/*************** MODAL ***************/
function openRecipeModal(id) {
  const r = RECETAS.find(x => x.id === id);
  if (!r) return;

  lastFocusedElement = document.activeElement;

  currentRecipeId = id;
  currentStepIndex = 0;
  stopVoice();

  modalContentEl.innerHTML = "";

  const body = document.createElement("div");
  body.className = "modal-body";

  const img = document.createElement("img");
  img.className = "modal-image";
  img.src = r.image || DEFAULT_IMAGE;
  img.alt = r.title;

  const title = document.createElement("h2");
  title.className = "modal-title";
  title.id = "modal-title";
  title.textContent = r.title;

  const meta = document.createElement("div");
  meta.className = "modal-meta";
  meta.textContent =
    `${capitalize(r.category)} · ${r.time || "Tiempo variable"} · ` +
    `${r.difficulty || ""} · ${r.servings || ""} raciones`;

  const buttons = document.createElement("div");
  buttons.className = "detail-buttons";

  const btnFav = document.createElement("button");
  btnFav.className = "btn";
  const isFav = favorites.includes(id);
  btnFav.textContent = isFav ? "Quitar de favoritos" : "Añadir a favoritos";
  btnFav.setAttribute("aria-pressed", isFav ? "true" : "false");
  btnFav.addEventListener("click", () => {
    toggleFavorite(id);
    const favNow = favorites.includes(id);
    btnFav.textContent = favNow ? "Quitar de favoritos" : "Añadir a favoritos";
    btnFav.setAttribute("aria-pressed", favNow ? "true" : "false");
    renderRecipeList();
  });

  const btnShopping = document.createElement("button");
  btnShopping.className = "btn";
  btnShopping.textContent = "Añadir ingredientes a la compra";
  btnShopping.addEventListener("click", () => {
    addRecipeToShoppingList(r);
  });

  // 🔹 Ahora solo lee el paso actual (modo paso a paso)
  const btnVoice = document.createElement("button");
  btnVoice.className = "btn primary";
  btnVoice.textContent = "Leer paso actual (voz)";
  btnVoice.addEventListener("click", () => {
    autoVoiceMode = false; // siempre manual
    startGuidedCooking(r);
  });

  const btnPrev = document.createElement("button");
  btnPrev.className = "btn";
  btnPrev.textContent = "Paso anterior (voz)";
  btnPrev.addEventListener("click", () => {
    autoVoiceMode = false;
    prevStep();
  });

  const btnNext = document.createElement("button");
  btnNext.className = "btn";
  btnNext.textContent = "Siguiente paso (voz)";
  btnNext.addEventListener("click", () => {
    autoVoiceMode = false;
    nextStep();
  });

  const btnStop = document.createElement("button");
  btnStop.className = "btn danger";
  btnStop.textContent = "Parar voz";
  btnStop.addEventListener("click", () => stopVoice());

  buttons.appendChild(btnFav);
  buttons.appendChild(btnShopping);
  buttons.appendChild(btnVoice);
  buttons.appendChild(btnPrev);
  buttons.appendChild(btnNext);
  buttons.appendChild(btnStop);

  const voiceStatus = document.createElement("div");
  voiceStatus.className = "voice-status";
  voiceStatus.id = "voice-status";
  voiceStatus.textContent =
    "Cocina guiada: usa los botones de voz para leer cada paso.";

  const ingTitle = document.createElement("div");
  ingTitle.className = "modal-section-title";
  ingTitle.textContent = "Ingredientes";

  const ingList = document.createElement("ul");
  (r.ingredients || []).forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    ingList.appendChild(li);
  });

  const stepsTitle = document.createElement("div");
  stepsTitle.className = "modal-section-title";
  stepsTitle.textContent = "Preparación";

  const stepsList = document.createElement("ol");
  stepsList.style.fontSize = "0.85rem";
  if (!r.steps || r.steps.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Esta receta todavía no tiene pasos definidos.";
    stepsList.appendChild(li);
  } else {
    r.steps.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      stepsList.appendChild(li);
    });
  }

  body.appendChild(img);
  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(buttons);
  body.appendChild(voiceStatus);
  body.appendChild(ingTitle);
  body.appendChild(ingList);
  body.appendChild(stepsTitle);
  body.appendChild(stepsList);

  modalContentEl.appendChild(body);

  modalEl.classList.add("open");
  if (modalDialog) modalDialog.focus();
}

function closeRecipeModal() {
  stopVoice();
  modalEl.classList.remove("open");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

modalCloseBtn.addEventListener("click", closeRecipeModal);

modalEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-backdrop")) {
    closeRecipeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalEl.classList.contains("open")) {
    closeRecipeModal();
  }
});

/*************** FAVORITOS ***************/
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(x => x !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("gourmet_favorites", JSON.stringify(favorites));
}

/*************** LISTA COMPRA ***************/
function addRecipeToShoppingList(recipe) {
  (recipe.ingredients || []).forEach(ing => {
    if (!shoppingList.includes(ing)) {
      shoppingList.push(ing);
    }
  });
  saveShopping();
  renderShoppingList();
}

function renderShoppingList() {
  shoppingEl.innerHTML = "";
  if (shoppingList.length === 0) {
    shoppingEl.innerHTML = '<p class="empty">La lista de la compra está vacía.</p>';
    return;
  }
  shoppingList.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "shopping-item";

    const span = document.createElement("span");
    span.textContent = item;

    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.setAttribute("aria-label", `Quitar ${item} de la lista de la compra`);
    btn.addEventListener("click", () => {
      shoppingList.splice(index, 1);
      saveShopping();
      renderShoppingList();
    });

    row.appendChild(span);
    row.appendChild(btn);
    shoppingEl.appendChild(row);
  });
}

function saveShopping() {
  localStorage.setItem("gourmet_shopping", JSON.stringify(shoppingList));
}

if (clearShoppingBtn) {
  clearShoppingBtn.addEventListener("click", () => {
    shoppingList = [];
    saveShopping();
    renderShoppingList();
  });
}

/*************** VOZ ***************/
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
  // NO cambiamos índice: lee el paso actual (por si quieres repetir)
  speakCurrentStep();
}

function speakCurrentStep() {
  stopVoice();
  const recipe = RECETAS.find(r => r.id === currentRecipeId);
  if (!recipe || !recipe.steps || recipe.steps.length === 0) return;
  const status = document.getElementById("voice-status");
  if (!status) return;

  const stepText = recipe.steps[currentStepIndex];
  let text = `Paso ${currentStepIndex + 1} de ${recipe.steps.length}. ${stepText}`;

  // 🔹 En el primer paso, añadimos el tiempo total de la receta si lo hay
  if (currentStepIndex === 0 && recipe.time) {
    text += `. El tiempo total aproximado de esta receta es ${recipe.time}.`;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  utterance.rate = 0.95;

  utterance.onstart = () => {
    status.textContent = `Leyendo paso ${currentStepIndex + 1} de ${recipe.steps.length}...`;
  };

  // 🔹 En modo manual NO pasamos al siguiente paso automáticamente
  utterance.onend = () => {
    status.textContent = `Fin del paso ${currentStepIndex + 1}. Usa los botones para cambiar de paso.`;
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function nextStep() {
  const recipe = RECETAS.find(r => r.id === currentRecipeId);
  if (!recipe || !recipe.steps) return;
  if (currentStepIndex < recipe.steps.length - 1) {
    currentStepIndex++;
    speakCurrentStep();
  }
}

function prevStep() {
  const recipe = RECETAS.find(r => r.id === currentRecipeId);
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

/*************** FILTROS ***************/
document.querySelectorAll(".filters button[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filters button[data-filter]")
      .forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    currentFilter = btn.dataset.filter;
    renderRecipeList();
  });
});

if (toggleFavsBtn) {
  toggleFavsBtn.addEventListener("click", () => {
    showOnlyFavorites = !showOnlyFavorites;
    toggleFavsBtn.textContent = showOnlyFavorites ? "Ver todo" : "Solo favoritos";
    toggleFavsBtn.setAttribute("aria-pressed", showOnlyFavorites ? "true" : "false");
    renderRecipeList();
  });
}

/*************** BUSCADOR ***************/
if (searchInput) {
  searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.trim();
    renderRecipeList();
  });
}

/*************** ACCESIBILIDAD GLOBAL ***************/
if (contrastBtn) {
  contrastBtn.addEventListener("click", () => {
    const isOn = document.body.classList.toggle("high-contrast");
    contrastBtn.setAttribute("aria-pressed", isOn ? "true" : "false");
  });
}

// texto: normal -> grande -> muy grande
if (textSizeBtn) {
  textSizeBtn.addEventListener("click", () => {
    textSizeState = (textSizeState + 1) % 3;
    document.body.classList.remove("text-large", "text-xlarge");
    if (textSizeState === 0) {
      textSizeBtn.textContent = "Tamaño texto: normal";
    } else if (textSizeState === 1) {
      document.body.classList.add("text-large");
      textSizeBtn.textContent = "Tamaño texto: grande";
    } else {
      document.body.classList.add("text-xlarge");
      textSizeBtn.textContent = "Tamaño texto: muy grande";
    }
    textSizeBtn.setAttribute("aria-pressed", textSizeState !== 0 ? "true" : "false");
  });
}

/*************** INICIO ***************/
renderRecipeList();
renderShoppingList();
