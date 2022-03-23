require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users.js');
const { setCors } = require('./middleware/cors.js')

const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DB_URL+'/'+process.env.DB_NAME;

const db = mongoose.connect(databaseURL)
    .then(() => console.log('🗄️ database connected🗄️'))
    .catch((err) => console.log('📢 Oops, something went wrong 📢', err.reason));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(setCors);

// routes
app.use('/users', usersRouter);
// app.use('*', errors);
// endpoints
// 
//

app.listen(port, () =>
{
    console.log(`💻Server is listening on port ${ port }💻` );
});
