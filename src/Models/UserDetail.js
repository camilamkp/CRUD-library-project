const { Schema, model } = require('mongoose');

const detailsSchema = new Schema({
    street: String,
    postalcode: Number,
    number: Number,
    city: String
},
{
    timestamps: true,
    _id: false
});

const userDetailsModel = new model('UserDetail', detailsSchema, 'userDetails');

module.exports = { detailsSchema, userDetailsModel };
