// ═══════════════════════════════════════
// services.js – Fetch, render, filter service cards
// Uses: Fetch API, async/await, try/catch,
//       map, filter, reduce, template literals, ES modules
// ═══════════════════════════════════════

import { openModal } from './modal.js';
import { saveFilter, loadFilter } from './storage.js';

let allServices = [];

// ── Public init called from main.js ──────────────────────────────
export async function initServices({ target, showFilters, limit }) {
    const container = document.querySelector(`#${target}`);
    if (!container) return;

    try {
        const response = await fetch('data/services.json');
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        allServices = await response.json();

        const displayList = limit ? allServices.slice(0, limit) : allServices;
        renderCards(displayList, container);

        if (showFilters) {
            initFilters(container);
            updateResultsCount(displayList.length);
        }

    } catch (error) {
        container.innerHTML = `
      <p style="color:#DC2626;text-align:center;padding:2rem;">
        ⚠️ Could not load services. Please try again later.<br>
        <small>${error.message}</small>
      </p>`;
    }
}

// ── Render an array of services into a container ──────────────────
function renderCards(services, container) {
    if (services.length === 0) {
        container.innerHTML = '';
        document.querySelector('#noResults')?.classList.remove('hidden');
        return;
    }

    document.querySelector('#noResults')?.classList.add('hidden');

    // Use map() to build card HTML strings, then join and set innerHTML
    container.innerHTML = services.map(service => buildCardHTML(service)).join('');

    // Attach event listeners after DOM insertion
    container.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const service = allServices.find(s => s.id === id);
            if (service) openModal(service);
        });
    });
}

// ── Build a single card using template literals ───────────────────
function buildCardHTML(service) {
    const price = service.price === 0 ? 'Free' : `$${service.price.toFixed(2)}`;
    const availClass = service.available ? 'yes' : 'no';
    const availLabel = service.available ? '✅ Available' : '❌ Unavailable';

    return `
    <article class="service-card" data-category="${service.category}">
      <div class="card-icon" aria-hidden="true">${service.icon}</div>
      <div class="card-body">
        <h3>${service.name}</h3>
        <div class="card-meta">
          <span class="badge-category">${service.category}</span>
          <span class="badge-available ${availClass}">${availLabel}</span>
          <span>⏱ ${service.duration} min</span>
        </div>
      </div>
      <div class="card-actions">
        <p class="card-price">${price}</p>
        <button class="btn-details" data-id="${service.id}" aria-label="View details for ${service.name}">Details</button>
        <a class="btn-book" href="contact.html?service=${encodeURIComponent(service.name)}">Book</a>
      </div>
    </article>
  `;
}

// ── Filter buttons (services.html only) ──────────────────────────
function initFilters(container) {
    const buttons = document.querySelectorAll('.filter-btn');
    if (!buttons.length) return;

    // Restore last filter from localStorage
    const saved = loadFilter();
    buttons.forEach(btn => {
        if (btn.dataset.category === saved) {
            btn.classList.add('active');
            applyFilter(saved, container);
        }
    });

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            saveFilter(category);          // localStorage
            applyFilter(category, container);
        });
    });
}

// ── Apply a category filter using filter() ────────────────────────
function applyFilter(category, container) {
    const filtered = category === 'all'
        ? allServices
        : allServices.filter(s => s.category === category);

    renderCards(filtered, container);
    updateResultsCount(filtered.length);
}

// ── Count display using reduce() ─────────────────────────────────
function updateResultsCount(count) {
    const el = document.querySelector('#resultsCount');
    if (!el) return;

    // reduce() demo: total estimated minutes for displayed services
    const totalMinutes = allServices
        .filter(s => s.available)
        .reduce((sum, s) => sum + s.duration, 0);

    el.textContent = `Showing ${count} service${count !== 1 ? 's' : ''} · ${totalMinutes} total available minutes`;
}