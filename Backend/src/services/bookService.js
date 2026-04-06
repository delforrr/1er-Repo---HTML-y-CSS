const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../../data/books.json');

const bookService = {
    // Read all books
    getAll: () => {
        try {
            const data = fs.readFileSync(DATA_PATH, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading books.json:', err);
            return [];
        }
    },

    // Save all books
    saveAll: (books) => {
        try {
            fs.writeFileSync(DATA_PATH, JSON.stringify(books, null, 4), 'utf8');
            return true;
        } catch (err) {
            console.error('Error writing books.json:', err);
            return false;
        }
    },

    // Find book by ID
    getById: (id) => {
        const books = bookService.getAll();
        return books.find(b => b.id === parseInt(id));
    },

    // Create a new book
    create: (bookData) => {
        const books = bookService.getAll();
        const newBook = {
            id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
            ...bookData
        };
        books.push(newBook);
        bookService.saveAll(books);
        return newBook;
    },

    // Update a book
    update: (id, bookData) => {
        const books = bookService.getAll();
        const index = books.findIndex(b => b.id === parseInt(id));
        if (index === -1) return null;

        books[index] = { ...books[index], ...bookData, id: parseInt(id) };
        bookService.saveAll(books);
        return books[index];
    },

    // Delete a book
    delete: (id) => {
        const books = bookService.getAll();
        const filtered = books.filter(b => b.id !== parseInt(id));
        if (books.length === filtered.length) return false;
        
        bookService.saveAll(filtered);
        return true;
    }
};

module.exports = bookService;
