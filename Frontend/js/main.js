import { api } from './api.js';
import { ui } from './ui.js';

// State 
let allBooks = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentCategory = 'Todos';
let searchQuery = '';

// Edit/Delete basado en ubicación
const isLibrosPage = window.location.pathname.includes('libros.html');

async function loadBooks() {
    try {
        allBooks = await api.fetchBooks();
        filterAndRender();
    } catch (error) {
        console.error(error);
        ui.showToast('Error al conectar con el servidor', 'error');
    }
}

// Filtro y renderizado
function filterAndRender() {
    const filtered = allBooks.filter(book => {
        const title = book.title ? book.title.toLowerCase() : '';
        const author = book.author ? book.author.toLowerCase() : '';
        const subject = book.subject ? book.subject.toLowerCase() : '';
        const search = searchQuery.toLowerCase();

        const matchesSearch = title.includes(search) ||
            author.includes(search) ||
            subject.includes(search);

        const matchesCategory = currentCategory === 'Todos' ||
            (currentCategory === 'Favoritos' ? favorites.includes(book.id) : book.subject === currentCategory);
        return matchesSearch && matchesCategory;
    });

    ui.renderBooks(filtered, favorites, document.getElementById('main-section'), document.getElementById('results-count'), {
        onEdit: (book) => ui.openModal('add-book-modal', 'Editar Libro', book),
        onDelete: handleDelete,
        onToggleFavorite: handleToggleFavorite
    }, { showAdminActions: isLibrosPage });
}

// Handlers
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = Object.fromEntries(new FormData(form).entries());
    const editId = form.dataset.editId;

    try {
        if (editId) {
            const updated = await api.updateBook(editId, formData);
            allBooks = allBooks.map(b => b.id === parseInt(editId) ? updated : b);
            ui.showToast('Libro actualizado correctamente');
        } else {
            const newBook = await api.addBook(formData);
            allBooks.push(newBook);
            ui.showToast('Libro añadido correctamente');
        }
        ui.closeModal('add-book-modal');
        filterAndRender();
    } catch (error) {
        ui.showToast('Error al guardar el libro', 'error');
    }
}

async function handleDelete(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este libro?')) return;
    try {
        await api.deleteBook(id);
        allBooks = allBooks.filter(b => b.id !== id);
        favorites = favorites.filter(favId => favId !== id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        filterAndRender();
        ui.showToast('Libro eliminado');
    } catch (error) {
        ui.showToast('Error al eliminar', 'error');
    }
}

function handleToggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    filterAndRender();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    // Temas
    const isDark = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
        document.documentElement.classList.add('dark');
        ui.updateThemeIcons(true);
    }

    // Buscador y filtros
    document.getElementById('search-input')?.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterAndRender();
    });

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => {
                // Reset
                b.classList.remove('active', 'bg-utn-maroon', 'text-white', 'border-utn-maroon');
                b.classList.add('bg-white', 'dark:bg-slate-900', 'text-gray-700', 'dark:text-slate-300', 'border-gray-300', 'dark:border-slate-600');
            });
            // Estilos activos
            btn.classList.add('active', 'bg-utn-maroon', 'text-white', 'border-utn-maroon');
            btn.classList.remove('bg-white', 'dark:bg-slate-900', 'text-gray-700', 'dark:text-slate-300', 'border-gray-300', 'dark:border-slate-600');

            currentCategory = btn.dataset.category;
            filterAndRender();
        });
    });

    // Modal Eventos
    document.getElementById('open-add-book-modal')?.addEventListener('click', () => ui.openModal('add-book-modal'));
    document.getElementById('close-modal')?.addEventListener('click', () => ui.closeModal('add-book-modal'));
    document.querySelector('.modal-overlay')?.addEventListener('click', () => ui.closeModal('add-book-modal'));
    document.getElementById('add-book-form')?.addEventListener('submit', handleFormSubmit);

    // Toggle Temas
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        ui.updateThemeIcons(isDark);
    };
    document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('theme-toggle-mobile')?.addEventListener('click', toggleTheme);

    loadBooks();
});
