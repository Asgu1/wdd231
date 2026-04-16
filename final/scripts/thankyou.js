// ═══════════════════════════════════════
// thankyou.js – Display form data via URLSearchParams
// ═══════════════════════════════════════

import { updateFooterDates } from './date.js';
import { initNavigation } from './navigation.js';

initNavigation();
updateFooterDates();

const container = document.querySelector('#submittedData');
if (container) {
    const params = new URLSearchParams(window.location.search);

    const fields = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'service', label: 'Service Requested' },
        { key: 'date', label: 'Preferred Date' },
        { key: 'notes', label: 'Notes' },
    ];

    const rows = fields
        .filter(f => params.get(f.key))
        .map(f => `<p><strong>${f.label}:</strong> ${params.get(f.key)}</p>`)
        .join('');

    container.innerHTML = rows || '<p>No form data received.</p>';
}