import { places } from "../data/places.mjs";

const grid = document.getElementById("discover-grid");

places.forEach((place, index) => {
    const card = document.createElement("div");
    card.classList.add("discover-card");
    card.style.gridArea = `place${index + 1}`;

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="images/discover/${place.image}"
                 alt="${place.name}"
                 loading="lazy"
                 width="300"
                 height="200">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button type="button">Learn More</button>
    `;

    grid.appendChild(card);
});

const visitMsg = document.getElementById("visit-message");
const now = Date.now();
const lastVisit = localStorage.getItem("discoverLastVisit");

if (!lastVisit) {
    visitMsg.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diffMs = now - Number(lastVisit);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        visitMsg.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
        visitMsg.textContent = "You last visited 1 day ago.";
    } else {
        visitMsg.textContent = `You last visited ${diffDays} days ago.`;
    }
}

localStorage.setItem("discoverLastVisit", now);

const menuBtn = document.querySelector("#menuBtn");
const menu = document.querySelector("#menu");

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