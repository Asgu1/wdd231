// ── TIMESTAMP ────────────────────────────────────────────────────────────────
document.getElementById("timestamp").value = new Date().toLocaleString();

// ── MODALS ───────────────────────────────────────────────────────────────────
document.querySelectorAll(".info-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const modalId = btn.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
    });
});

document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest("dialog").close();
    });
});

// Close modal when clicking the backdrop
document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("click", e => {
        const rect = dialog.getBoundingClientRect();
        const clickedOutside =
            e.clientX < rect.left || e.clientX > rect.right ||
            e.clientY < rect.top  || e.clientY > rect.bottom;
        if (clickedOutside) dialog.close();
    });
});

// ── MENU ─────────────────────────────────────────────────────────────────────
const menuBtn = document.querySelector("#menuBtn");
const menu    = document.querySelector("#menu");

if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        menuBtn.setAttribute(
            "aria-label",
            menu.classList.contains("open") ? "Close menu" : "Open menu"
        );
    });
}

// ── FOOTER ───────────────────────────────────────────────────────────────────
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;