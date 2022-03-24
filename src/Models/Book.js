// const { Schema, model } = require('mongoose');

// const imageSchema = new Schema({
//     name: String,
//     data: Buffer,
//     contentType: String,
// }
// ,
// { _id : false });

// const bookSchema = new Schema({
//     ISBN: { type:Number, required: true, unique: true },
//     title: String,
//     author: String,
//     originalSprache: String,
//     isAvailable: Boolean,
//     genres: {
//         type: String, 
//         enum: [ 'Action', 'Drama', 'History', 'Romance', 'Sci-Fi', 'Adventure', 'Crime', 'Mystery' ]
//     },
//     year: Number,
//     tags: [ Array ],
//     pages: Number,
//     img: imageSchema

// },
// { timestamps: true });

// const bookModel = new model('Book', bookSchema, 'books');

// module.exports = bookModel;
