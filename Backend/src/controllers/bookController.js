const bookService = require('../services/bookService');

const bookController = {
    // Get all books
    getBooks: (req, res) => {
        const books = bookService.getAll();
        res.json(books);
    },

    // Create a new book
    createBook: (req, res) => {
        const { title, author, subject, image, description } = req.body;
        if (!title || !author) {
            return res.status(400).json({ error: 'Title and Author are required' });
        }
        const newBook = bookService.create({ title, author, subject, image, description });
        res.status(201).json(newBook);
    },

    // Update a book
    updateBook: (req, res) => {
        const { id } = req.params;
        const updatedBook = bookService.update(id, req.body);
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(updatedBook);
    },

    // Delete a book
    deleteBook: (req, res) => {
        const { id } = req.params;
        const success = bookService.delete(id);
        if (!success) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(204).end();
    }
};

module.exports = bookController;
