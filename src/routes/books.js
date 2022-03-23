const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer(
    {
        limits:
        { fileSize: 50000000 }
    });

const {
    allBooks,
    addBook,
    oneBook,
    editBook,
    deleteBook
} = require('../controllers/booksController.js');

router.route('/')
    .get(allBooks)
    .post(upload.single('cover'), addBook );

router.route('/:id')
    .get(oneBook)
    .put(editBook)
    .delete(deleteBook);

module.exports = router;
