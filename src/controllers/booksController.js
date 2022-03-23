const Book = require('../Models/Book.js');

// GET
exports.allBooks = (req,res) =>
{
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
// GET :ID
// POST :ID
// PUT :ID
// DELETE :ID