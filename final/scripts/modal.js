// ═══════════════════════════════════════
// modal.js – Accessible modal dialog
// Opens with service detail data
// ═══════════════════════════════════════

const modal = document.querySelector('#serviceModal');
const closeBtn = document.querySelector('#modalClose');
const modalBody = document.querySelector('#modalBody');

export function initModal() {
    if (!modal) return;

    // Close button
    closeBtn?.addEventListener('click', closeModal);

    // Click on backdrop closes modal
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });

    // Escape key closes modal
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.open) closeModal();
    });
}

export function openModal(service) {
    if (!modal || !modalBody) return;

    const price = service.price === 0 ? 'Free' : `$${service.price.toFixed(2)}`;
    const avail = service.available
        ? '<span class="badge-available yes">✅ Available</span>'
        : '<span class="badge-available no">❌ Unavailable</span>';

    // Update the static #modalTitle element (already in HTML for aria-labelledby)
    const titleEl = document.querySelector('#modalTitle');
    if (titleEl) titleEl.textContent = service.name;

    modalBody.innerHTML = `
    <p class="modal-icon" aria-hidden="true">${service.icon}</p>
    <div class="modal-meta">
      <span class="badge-category">${service.category}</span>
      ${avail}
      <span>⏱ ${service.duration} min</span>
    </div>
    <p class="modal-desc">${service.description}</p>
    <p class="modal-price">${price}</p>
    <a href="contact.html?service=${encodeURIComponent(service.name)}" class="btn">Book This Service →</a>
  `;

    modal.showModal();
}

function closeModal() {
    modal?.close();
}