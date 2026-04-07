document.addEventListener('DOMContentLoaded', () => {
    // Manejo de Temas
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateIcons(isDark);
    };

    const updateIcons = (isDark) => {
        const icons = [document.getElementById('theme-icon'), document.getElementById('theme-icon-mobile')];
        icons.forEach(icon => {
            if (icon) icon.className = isDark ? 'fas fa-sun text-utn-green' : 'fas fa-moon text-white';
        });
    };

    const isDark = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
        document.documentElement.classList.add('dark');
        updateIcons(true);
    }

    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('theme-toggle-mobile')?.addEventListener('click', toggleTheme);

    // Menú Móvil
    const menuIcon = document.getElementById('menu-icon');
    const navUl = document.querySelector('nav ul');
    if (menuIcon && navUl) {
        menuIcon.addEventListener('click', () => {
            navUl.classList.toggle('hidden');
            if (!navUl.classList.contains('hidden')) {
                navUl.className = 'absolute top-full left-0 right-0 bg-utn-maroon dark:bg-slate-950 p-6 flex flex-col space-y-4 md:hidden shadow-xl z-50';
            } else {
                navUl.className = 'hidden md:flex space-x-8 text-white font-medium uppercase tracking-wider text-sm items-center';
            }
        });
    }

    // Manejo de Formulario de Contacto
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const toast = document.getElementById('toast');
            if (toast) {
                toast.classList.remove('translate-y-20', 'opacity-0');
                form.reset();
                setTimeout(() => {
                    toast.classList.add('translate-y-20', 'opacity-0');
                }, 3000);
            }
        });
    }
});