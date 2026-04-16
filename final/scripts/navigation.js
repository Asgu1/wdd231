// ═══════════════════════════════════════
// navigation.js – hamburger menu + wayfinding
// ═══════════════════════════════════════

export function initNavigation() {
    const menuBtn = document.querySelector('#menu');
    const nav = document.querySelector('#nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', isOpen.toString());
        });

        // Close nav when a link is clicked (mobile UX)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Wayfinding – highlight current page link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#nav a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}