// const path = require('path');
const Book = require('../Models/Book.js');

// GET
exports.allBooks = (req, res) =>
{
    // res.status(200).sendFile(path.join(__dirname, '../../public/books.html'));

    Book.find( {}, (err, books) =>
    {
        if(err)
        {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        return res.status(200).json({
            success: true,
            amount: books.length,
            data: books
        });
    });
};

// POST
exports.addBook = (req, res) =>
{
    const {
        ISBN,
        title,
        author,
        originalSprache,
        isAvailable,
        genres,
        year,
        tags,
        pages
    } = req.body;  

    const newBook = new Book({
        ISBN,
        title,
        author,
        originalSprache,
        isAvailable,
        genres,
        year,
        tags,
        pages
    });
    console.log(newBook);

    // const { buffer, originalname, mimetype } = req.file;

    // newBook.cover = { 
    //     name: Date.now() + '-' + originalname,
    //     data: buffer,
    //     contentType: mimetype 
    // };

    newBook.save((err, book) =>
    {
        if(err)
        {
            return res
                .status(400)
                .json({
                    success: false,
                    message: err.message
                })
                .redirect('/images');
            ;
        }
        return res.status(200).json({
            success: true,
            data: book
        });
    });
};

// GET :ID
exports.oneBook = (req, res) =>
{
    const { id } = req.params;
    
    Book.find({ _id :id }, (err, books) =>
    {
        if(err)
        {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        return res.status(200).json({
            success: true,
            data: books
        });
    }); 
};

// PUT :ID
exports.editBook = (req, res) =>
{
    try
    {
        const record = Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!record) throw new Error('not found');
        res.status(200).send(record);
    }
    catch (err)
    {
        next(err);
    }
};

// DELETE :ID
exports.deleteBook = (req, res) =>
{
    const { id } = req.params;
    
    Book.findOne({ _id: id }).then(() =>
    {
        return res.status(200).json({
            success: true,
            message: `The book with the id: ${ id } was just deleted`
        });
    })
        .catch(err =>
        {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        });
};
