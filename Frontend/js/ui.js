export const ui = {
    createBookCard(book, isFavorite, callbacks, options = { showAdminActions: false }) {
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full border border-gray-100 dark:border-slate-700 group';

        const adminOverlay = options.showAdminActions ? `
            <!-- Action Overlay -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
                <button class="edit-btn bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors shadow-lg transform hover:scale-110">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg transform hover:scale-110">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        ` : '';

        card.innerHTML = `
            <div class="relative h-64 overflow-hidden">
                <img src="${book.image}" alt="${book.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.src='https://via.placeholder.com/400x600?text=Sin+Imagen'">
                
                <!-- Badges and Favorite (Higher Z-Index) -->
                <div class="absolute top-0 right-0 m-2 flex flex-col gap-2 z-20">
                    <div class="px-2 py-1 bg-utn-maroon text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-lg">
                        ${book.subject}
                    </div>
                    <button class="favorite-btn p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-md hover:scale-110 transition-transform active:scale-95">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart text-red-500"></i>
                    </button>
                </div>

                ${adminOverlay}
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-utn-maroon dark:text-utn-green mb-2 line-clamp-2">${book.title}</h3>
                <p class="text-gray-600 dark:text-slate-400 font-medium mb-1 text-sm">Por: <span class="text-gray-800 dark:text-slate-200">${book.author}</span></p>
                <p class="text-gray-500 dark:text-slate-400 text-xs mt-3 flex-grow leading-relaxed">${book.description}</p>
                <div class="mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                    <button class="w-full bg-utn-green hover:bg-utn-green_dark text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95">
                        RESERVAR AHORA
                    </button>
                </div>
            </div>
        `;

        if (options.showAdminActions) {
            card.querySelector('.edit-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                callbacks.onEdit(book);
            });
            card.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                callbacks.onDelete(book.id);
            });
        }

        card.querySelector('.favorite-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            callbacks.onToggleFavorite(book.id);
        });

        return card;
    },

    renderBooks(books, favorites, container, countEl, callbacks, options = { showAdminActions: false }) {
        if (!container) return;
        container.innerHTML = '';

        if (books.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <i class="fas fa-search text-5xl text-gray-300 dark:text-slate-700 mb-4"></i>
                    <p class="text-gray-500 dark:text-slate-400 text-lg">No se encontraron libros.</p>
                </div>
            `;
            if (countEl) countEl.textContent = 'Sin resultados.';
        } else {
            books.forEach(book => {
                const isFavorite = favorites.includes(book.id);
                const card = ui.createBookCard(book, isFavorite, callbacks, options);
                container.appendChild(card);
            });
            if (countEl) countEl.textContent = `Mostrando ${books.length} libro(s).`;
        }
    },

    openModal(modalId, title = 'Cargar Nuevo Libro', book = null) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        const modalTitle = modal.querySelector('h3');
        const form = modal.querySelector('form');

        modalTitle.textContent = title;
        if (book) {
            form.dataset.editId = book.id;
            Object.keys(book).forEach(key => {
                if (form.elements[key]) form.elements[key].value = book[key];
            });
            form.querySelector('button[type="submit"]').textContent = 'Actualizar Libro';
        } else {
            form.reset();
            delete form.dataset.editId;
            form.querySelector('button[type="submit"]').textContent = 'Guardar Libro';
        }

        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    },

    // Tema
    updateThemeIcons(isDark) {
        const icons = [document.getElementById('theme-icon'), document.getElementById('theme-icon-mobile')];
        icons.forEach(icon => {
            if (icon) {
                icon.className = isDark ? 'fas fa-sun text-utn-green' : 'fas fa-moon text-white';
            }
        });
    },

    // Toasts
    showToast(msg, type = 'success') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        const toastMsg = document.getElementById('toast-msg');
        const toastIcon = document.getElementById('toast-icon');

        toastMsg.textContent = msg;
        toastIcon.className = type === 'success' ? 'fas fa-check-circle text-utn-green' : 'fas fa-exclamation-circle text-red-500';

        toast.classList.remove('translate-y-20', 'opacity-0');
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 3000);
    }
};
