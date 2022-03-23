require('dotenv').config();
const Chance = require('chance');
const mongoose = require('mongoose');
const Book = require('../Models/Book.js');
const User = require('../Models/User.js');

const databaseURL = process.env.DB_URL + '/' + process.env.DB_NAME;
const chance = new Chance();

mongoose.connect(databaseURL, { useNewUrlParser: true });

const creatingBooks = () =>
{
    return{
        ISBN: chance.integer({ min: 0, max: 3000 }),
        title: chance.sentence({ words: 5 }),
        author: chance.name({ middle: true }),
        originalSprache: chance.locale({ region: true }),
        isAvailable: chance.bool(),
        country: chance.country({ full: true }),
        genre: chance.pickone([ 'Action', 'Drama', 'History', 'Romance', 'Sci-Fi', 'Adventure', 'Crime', 'Mystery' ]),
        description: chance.paragraph(),
        year: chance.year({ min: 1900, max: 2022 }),
        pages: chance.integer({ min: 10, max: 3000 }),
        // img: chance.avatar({ fileExtension: 'jpg' }),
        tags: chance.pickset([ 'fiction', 'non-fiction', 'film-adaptation', 'nobel', 'kids' ], 3)
    };
};

// propagating 20 books
const propagateBook = [

    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks(),
    creatingBooks()
];
Book.insertMany(propagateBook)
    .then( () => console.log('tons of books were successfully added'))
    .catch( err => { throw err; });

const creatingUsers = () =>
{
    return{
        firstName: chance.first(),
        lastName: chance.last({ nationality: 'jp' }),
        username: chance.email(),
        password: chance.hash({ length: 10, casing: 'upper' }),
        admin: chance.bool({ likelihood: 10 }),
        street: chance.street({ short_suffix: true }),
        postalcode: chance.zip({ plusfour: true }),
        number:chance.natural({ min: 1, max: 999 }),
        city: chance.city(),
    };
};

const propagateUser = [

    creatingUsers(),
    creatingUsers(),
    creatingUsers(),
    creatingUsers(),
    creatingUsers(),
    creatingUsers(),
    creatingUsers(),
    creatingUsers(),
    creatingUsers(),
    creatingUsers()
];
User.insertMany(propagateUser)
    .then( () => console.log('a community from users was successfully added'))
    .catch( err => { throw err; });
