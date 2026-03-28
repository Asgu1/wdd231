// ─── WEATHER ───────────────────────────────────────────────────────────────
const WEATHER_API_KEY = "5b5f2c2ddc79e6137433c24978ff7ea4";
const CITY = "Guayaquil,EC";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=imperial&appid=${WEATHER_API_KEY}`;

async function getWeather() {
    try {
        const response = await fetch(WEATHER_URL);
        if (!response.ok) throw new Error("Weather fetch failed");
        const data = await response.json();

        // Current temperature and description
        document.getElementById("temp").textContent =
            `Temperature: ${Math.round(data.list[0].main.temp)}°F`;

        document.getElementById("desc").textContent =
            data.list[0].weather[0].description;

        // 3-day forecast (every 8 entries = ~24 hours apart)
        const forecast = document.getElementById("forecast");
        forecast.innerHTML = "";

        const days = ["Today", "Tomorrow", "Day 3"];
        for (let i = 0; i < 3; i++) {
            const day = data.list[i * 8];
            const p = document.createElement("p");
            p.textContent = `${days[i]}: ${Math.round(day.main.temp)}°F`;
            forecast.appendChild(p);
        }
    } catch (error) {
        console.error("Weather error:", error);
        document.getElementById("temp").textContent = "Weather unavailable";
    }
}

getWeather();


// ─── SPOTLIGHTS ─────────────────────────────────────────────────────────────
const MEMBERS_URL = "data/members.json";

// Membership levels: 3 = Gold, 2 = Silver, 1 = Member
const MEMBERSHIP_LABELS = { 1: "Member", 2: "Silver", 3: "Gold" };

async function getMembers() {
    try {
        const response = await fetch(MEMBERS_URL);
        if (!response.ok) throw new Error("Members fetch failed");
        const data = await response.json();

        // FIX: membership is a number (2 = Silver, 3 = Gold)
        const eligible = data.members.filter(m =>
            m.membership === 3 || m.membership === 2
        );

        // Randomly pick 2 or 3 spotlights
        const shuffled = eligible.sort(() => 0.5 - Math.random());
        const spotlights = shuffled.slice(0, 3);

        displaySpotlights(spotlights);
    } catch (error) {
        console.error("Members error:", error);
    }
}

function displaySpotlights(members) {
    const container = document.getElementById("cards");
    container.innerHTML = "";

    members.forEach(m => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        // FIX: use m.image (not m.logo) to match members.json
        card.innerHTML = `
            <h3>${m.name}</h3>
            <img src="images/${m.image}" alt="${m.name} logo" loading="lazy">
            <p>${m.phone}</p>
            <p>${m.address}</p>
            <a href="${m.website}" target="_blank" rel="noopener">Visit Website</a>
            <p class="membership-level">${MEMBERSHIP_LABELS[m.membership] || "Member"}</p>
        `;

        container.appendChild(card);
    });
}

getMembers();


// ─── FOOTER ─────────────────────────────────────────────────────────────────
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;


// ─── MENU (hamburger) ────────────────────────────────────────────────────────
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