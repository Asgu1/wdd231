// ═══════════════════════════════════════
// storage.js – Local Storage helpers
// Persists: last selected filter category
// ═══════════════════════════════════════

const FILTER_KEY = 'acw_lastFilter';

export function saveFilter(category) {
    try {
        localStorage.setItem(FILTER_KEY, category);
    } catch (e) {
        // localStorage unavailable – fail silently
    }
}

export function loadFilter() {
    try {
        return localStorage.getItem(FILTER_KEY) || 'all';
    } catch (e) {
        return 'all';
    }
}