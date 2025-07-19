const recipes = window.recetas;
let favorites = JSON.parse(localStorage.getItem('fav')) || [];

const main = document.getElementById('recipes');
const modal = document.getElementById('modal');
const themeBtn = document.getElementById('toggle-theme');
const catBtns = document.querySelectorAll('#category-nav button');
const searchInput = document.getElementById('search');

function renderList() {
  const cat = document.querySelector('#category-nav button.active').dataset.cat;
  const term = searchInput.value.toLowerCase();
  main.innerHTML = '';
  recipes.filter(r => {
    return (cat === 'all' || r.categoria === cat)
        && (r.titulo.toLowerCase().includes(term) || r.ingredientes.join(' ').toLowerCase().includes(term));
  }).forEach(r => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${r.imagen}" alt="${r.titulo}">
      <div class="info">
        <h3>${r.titulo}</h3>
        <button data-titulo="${r.titulo}">Ver más</button>
      </div>`;
    main.appendChild(div);
  });
}

function setupEvents() {
  catBtns.forEach(b => b.onclick = () => {
    catBtns.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    renderList();
  });
  searchInput.oninput = renderList;
  themeBtn.onclick = () => {
    document.body.classList.toggle('dark');
  };
  main.onclick = e => {
    const btn = e.target.closest('button[data-titulo]');
    if (!btn) return;
    const rec = recipes.find(r => r.titulo === btn.dataset.titulo);
    openModal(rec);
  };
  document.getElementById('close-modal').onclick = () => modal.classList.add('hidden');
  document.getElementById('start-cooking').onclick = startCooking;
  document.getElementById('favorite-btn').onclick = () => {
    const t = document.getElementById('modal-title').textContent;
    if (favorites.includes(t)) {
      favorites = favorites.filter(x => x !== t);
    } else favorites.push(t);
    localStorage.setItem('fav', JSON.stringify(favorites));
    updateFavBtn();
  };
}

function openModal(r) {
  modal.classList.remove('hidden');
  document.getElementById('modal-title').textContent = r.titulo;
  document.getElementById('modal-img').src = r.imagen;
  const ul = document.getElementById('modal-ingredients');
  ul.innerHTML = r.ingredientes.map(i => `<li>${i}</li>`).join('');
  const ol = document.getElementById('modal-steps');
  ol.innerHTML = r.pasos.map(p => `<li>${p}</li>`).join('');
  updateFavBtn();
}

function updateFavBtn() {
  const btn = document.getElementById('favorite-btn');
  const t = document.getElementById('modal-title').textContent;
  btn.textContent = favorites.includes(t) ? '❤ Favorito' : 'Favorito ♡';
}

let cookSteps, cookIndex;
function startCooking() {
  cookSteps = recipes.find(r => r.titulo === document.getElementById('modal-title').textContent).pasos;
  cookIndex = 0;
  speakStep();
}

function speakStep() {
  if (cookIndex >= cookSteps.length) {
    alert('¡Listo! Has acabado.');
    return;
  }
  const text = `Paso ${cookIndex+1}: ${cookSteps[cookIndex]}`;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'es-ES';
  speechSynthesis.speak(u);
  cookIndex++;
}

document.getElementById('modal').addEventListener('click', e =>
  e.target === modal && modal.classList.add('hidden')
);

renderList();
setupEvents();
