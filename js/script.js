"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // ===== MANEJO DEL MODO OSCURO =====
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Función para establecer el tema
    function setTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            if (themeIcon) themeIcon.textContent = 'dark_mode';
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            if (themeIcon) themeIcon.textContent = 'light_mode';
            localStorage.setItem('theme', 'light');
        }
    }

    // Detectar preferencia del sistema o localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Evento del botón de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = htmlElement.classList.contains('dark');
            setTheme(isDark ? 'light' : 'dark');
        });
    }

    // ===== MENÚ HAMBURGUESA =====
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const closeBtn = document.getElementById('close-menu-btn');

    function openMenu() {
        if (!mobileMenu || !overlay) return;
        mobileMenu.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        if (!mobileMenu || !overlay) return;
        mobileMenu.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }

    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Cerrar menú al hacer clic en un enlace interno
    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                closeMenu();
            });
        });
    }

    // ===== ACTUALIZAR AÑO EN FOOTER =====
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
