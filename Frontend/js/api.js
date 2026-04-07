const API_URL = 'http://localhost:5000/api/books';

export const api = {
    async fetchBooks() {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    },

    async addBook(bookData) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        if (!response.ok) throw new Error('Failed to add book');
        return await response.json();
    },

    async updateBook(id, bookData) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
        if (!response.ok) throw new Error('Failed to update book');
        return await response.json();
    },

    async deleteBook(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete book');
        return true;
    }
};
