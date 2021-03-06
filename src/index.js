require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const usersRouter = require('./routes/users.js');
const booksRouter = require('./routes/books.js');
const { setCors } = require('./middleware/cors.js');

const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DB_URL+'/'+process.env.DB_NAME;

const db = mongoose.connect(databaseURL)
    .then(() => console.log('๐๏ธ database connected ๐๏ธ'))
    .catch((err) => console.log('๐ข Oops, something went wrong ๐ข', err.reason));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(setCors);

// routes
app.use('/users', usersRouter);
app.use('/books', booksRouter);
// app.use('*', errors);
// endpoints

app.listen(port, () =>
{
    console.log(`๐ปServer is listening on port ${ port }๐ป` );
});
