// Usa el array global RECETAS definido en recetas.js

let favorites = JSON.parse(localStorage.getItem("gourmet_favorites") || "[]");
let shoppingList = JSON.parse(localStorage.getItem("gourmet_shopping") || "[]");
let currentFilter = "todas";
let showOnlyFavorites = false;
let currentRecipeId = null;
let currentStepIndex = 0;

const listEl = document.getElementById("recipe-list");
const detailEl = document.getElementById("detail-section");
const shoppingEl = document.getElementById("shopping-list");
const clearShoppingBtn = document.getElementById("clear-shopping");
const toggleFavsBtn = document.getElementById("toggle-favs");

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
    return byCategory && byFav;
  });

  if (filtered.length === 0) {
    listEl.innerHTML = '<p class="empty">No hay recetas para este filtro.</p>';
    return;
  }

  filtered.forEach(r => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.dataset.id = r.id;

    const img = document.createElement("img");
    img.className = "recipe-thumb";
    // Imagen local de reserva; crea img/plato.jpg si quieres que se vea algo sin internet
    img.src = r.image || "img/plato.jpg";
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

    const favIcon = document.createElement("div");
    favIcon.className = "fav-icon" + (favorites.includes(r.id) ? " active" : "");
    favIcon.textContent = "★";

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
        showRecipeDetail(r.id);
      }
    });

    listEl.appendChild(card);
  });
}

/*************** DETALLE ***************/
function showRecipeDetail(id) {
  const r = RECETAS.find(x => x.id === id);
  if (!r) return;

  currentRecipeId = id;
  currentStepIndex = 0;
  stopVoice();

  detailEl.innerHTML = "";

  const header = document.createElement("div");
  header.className = "detail-header";

  const img = document.createElement("img");
  img.src = r.image || "img/plato.jpg";
  img.alt = r.title;

  const text = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.textContent = r.title;

  const meta = document.createElement("div");
  meta.className = "detail-meta";
  meta.textContent =
    `${capitalize(r.category)} · ${r.time || "Tiempo variable"} · ` +
    `${r.difficulty || ""} · ${r.servings || ""} raciones`;

  const buttons = document.createElement("div");
  buttons.className = "detail-buttons";

  const btnFav = document.createElement("button");
  btnFav.className = "btn";
  btnFav.textContent = favorites.includes(id) ? "Quitar de favoritos" : "Añadir a favoritos";
  btnFav.addEventListener("click", () => {
    toggleFavorite(id);
    btnFav.textContent = favorites.includes(id) ? "Quitar de favoritos" : "Añadir a favoritos";
    renderRecipeList();
  });

  const btnShopping = document.createElement("button");
  btnShopping.className = "btn";
  btnShopping.textContent = "Añadir ingredientes a la compra";
  btnShopping.addEventListener("click", () => {
    addRecipeToShoppingList(r);
  });

  const btnVoice = document.createElement("button");
  btnVoice.className = "btn primary";
  btnVoice.textContent = "Iniciar cocina guiada (voz)";
  btnVoice.addEventListener("click", () => startGuidedCooking(r));

  const btnPrev = document.createElement("button");
  btnPrev.className = "btn";
  btnPrev.textContent = "Paso anterior";
  btnPrev.addEventListener("click", () => prevStep());

  const btnNext = document.createElement("button");
  btnNext.className = "btn";
  btnNext.textContent = "Siguiente paso";
  btnNext.addEventListener("click", () => nextStep());

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
    "Cocina guiada: selecciona \"Iniciar\" para escuchar los pasos.";

  text.appendChild(h2);
  text.appendChild(meta);
  text.appendChild(buttons);
  text.appendChild(voiceStatus);

  header.appendChild(img);
  header.appendChild(text);

  const ingTitle = document.createElement("div");
  ingTitle.className = "section-title";
  ingTitle.textContent = "Ingredientes";

  const ingList = document.createElement("ul");
  (r.ingredients || []).forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    ingList.appendChild(li);
  });

  const stepsTitle = document.createElement("div");
  stepsTitle.className = "section-title";
  stepsTitle.textContent = "Preparación";

  const stepsList = document.createElement("ol");
  stepsList.style.fontSize = "0.85rem";
  (r.steps || []).forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    stepsList.appendChild(li);
  });

  detailEl.appendChild(header);
  detailEl.appendChild(ingTitle);
  detailEl.appendChild(ingList);
  detailEl.appendChild(stepsTitle);
  detailEl.appendChild(stepsList);
}

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

/*************** VOZ (cocina guiada) ***************/
function startGuidedCooking(recipe) {
  if (!("speechSynthesis" in window)) {
    alert("Tu navegador no soporta síntesis de voz.");
    return;
  }
  currentRecipeId = recipe.id;
  currentStepIndex = 0;
  speakCurrentStep();
}

function speakCurrentStep() {
  stopVoice();
  const recipe = RECETAS.find(r => r.id === currentRecipeId);
  if (!recipe || !recipe.steps || recipe.steps.length === 0) return;
  const status = document.getElementById("voice-status");
  if (!status) return;

  const stepText = recipe.steps[currentStepIndex];
  const text = `Paso ${currentStepIndex + 1}: ${stepText}`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  window.speechSynthesis.speak(utterance);
  status.textContent = `Cocina guiada: paso ${currentStepIndex + 1} de ${recipe.steps.length}`;
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
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  const status = document.getElementById("voice-status");
  if (status) status.textContent = "Cocina guiada detenida.";
}

/*************** FILTROS ***************/
document.querySelectorAll(".filters button[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filters button[data-filter]")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderRecipeList();
  });
});

if (toggleFavsBtn) {
  toggleFavsBtn.addEventListener("click", () => {
    showOnlyFavorites = !showOnlyFavorites;
    toggleFavsBtn.textContent = showOnlyFavorites ? "Ver todo" : "Solo favoritos";
    renderRecipeList();
  });
}

/*************** INICIO ***************/
renderRecipeList();
renderShoppingList();
