// ═══════════════════════════════════════
// date.js – Footer year + last modified
// ═══════════════════════════════════════

export function updateFooterDates() {
    const yearEl = document.querySelector('#currentyear');
    const modEl = document.querySelector('#lastModified');

    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modEl) modEl.textContent = `Last modified: ${document.lastModified}`;
}