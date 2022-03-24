const express = require('express');
const router = express.Router();
// const multer = require('multer');
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
    .get(authUser, allBooks)
    // .post(upload.single('cover'), addBook );
    .post(authUser, adminUser, addBook);

router.route('/:id')
    .get(authUser, oneBook)
    .put(authUser, editBook)
    .delete(authUser, deleteBook);

module.exports = router;
