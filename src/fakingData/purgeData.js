require('dotenv').config();
const Chance = require('chance');
const mongoose = require('mongoose');
const Book = require('../Models/Book.js');
const User = require('../Models/User.js');

const databaseURL = process.env.DB_URL + '/' + process.env.DB_NAME;
const chance = new Chance();

mongoose.connect(databaseURL, { useNewUrlParser: true });

const purgeFakeData = async () =>
{
    try
    {
        await Book.deleteMany();
        await User.deleteMany();
        console.log('all the books and users were deleted');
    }
    catch(err)
    {
        console.log(err);
    }
    mongoose.connection.close();
};
purgeFakeData();
