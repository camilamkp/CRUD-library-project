// const Book = require('../Models/Book.js');

// // GET
// exports.allBooks = (req, res) =>
// {
//     Book.find( {}, (err, books) =>
//     {
//         if(err)
//         {
//             return res.status(400).json({
//                 success: false,
//                 message: err.message
//             });
//         }
//         return res.status(200).json({
//             success: true,
//             amount: books.length,
//             data: books
//         });
//     });
// };

// // POST
// exports.addBook = (req, res) =>
// {
//     const {
//         ISBN,
//         title,
//         author,
//         originalSprache,
//         isAvailable,
//         genres,
//         year,
//         tags,
//         pages
//     } = req.body;  

//     const newBook = new Book({
//         ISBN,
//         title,
//         author,
//         originalSprache,
//         isAvailable,
//         genres,
//         year,
//         tags,
//         pages
//     });
//     console.log(newBook);

//     const { buffer, originalname, mimetype } = req.file;

//     newBook.cover = { 
//         name: Date.now() + '-' + originalname,
//         data: buffer,
//         contentType: mimetype 
//     };

//     newBook.save((err, book) =>
//     {
//         if(err)
//         {
//             return res
//                 .status(400)
//                 .json({
//                     success: false,
//                     message: err.message
//                 })
//                 .redirect('/images');
//             ;
//         }
//         return res.status(200).json({
//             success: true,
//             data: book
//         });
//     });
// };

// // GET :ID
// // POST :ID
// // PUT :ID
// // DELETE :ID