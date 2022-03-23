const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authUser, adminUser } = require('../middleware/userRoles.js');

// const upload = multer(
//     {
//         limits:
//         { fileSize: 50000000 }
//     });

const {
    allBooks,
    addBook,
    oneBook,
    editBook,
    deleteBook
} = require('../controllers/booksController.js');

router.route('/')
    .get(allBooks)
    // .post(authUser, upload.single('cover'), addBook );
    .post(authUser, addBook );

router.route('/:id')
    .get(oneBook)
    .put(editBook)
    .delete(deleteBook);

module.exports = router;
