// ── READ URL PARAMS & POPULATE SUMMARY ───────────────────────────────────────
const params = new URLSearchParams(window.location.search);

const fields = {
    "sum-firstName" : "firstName",
    "sum-lastName"  : "lastName",
    "sum-email"     : "email",
    "sum-phone"     : "phone",
    "sum-orgName"   : "orgName",
    "sum-timestamp" : "timestamp",
};

Object.entries(fields).forEach(([elId, paramKey]) => {
    const el  = document.getElementById(elId);
    const val = params.get(paramKey);
    if (el && val) el.textContent = decodeURIComponent(val);
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