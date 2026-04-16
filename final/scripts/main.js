// ═══════════════════════════════════════
// main.js – Entry point (ES Module)
// Runs on every page of the final project
// ═══════════════════════════════════════

import { initNavigation } from './navigation.js';
import { updateFooterDates } from './date.js';
import { initServices } from './services.js';
import { initModal } from './modal.js';

// Always run on every page
initNavigation();
updateFooterDates();

// Page-specific initialization
const path = window.location.pathname;

if (path.includes('services.html')) {
  initServices({ target: 'allServiceCards', showFilters: true, limit: null });
  initModal();
} else if (path.includes('index.html') || path.endsWith('/') || path.endsWith('/final/')) {
  initServices({ target: 'serviceCards', showFilters: false, limit: 6 });
  initModal();
  initSearch();
}

// ── Search (home page only) ──────────────────
function initSearch() {
  const input = document.querySelector('#serviceSearch');
  if (!input) return;

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.service-card');
    const noResults = document.querySelector('#noResults');
    let visible = 0;

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const show = text.includes(query);
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (noResults) noResults.classList.toggle('hidden', visible > 0);
  });
}