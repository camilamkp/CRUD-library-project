require('dotenv').config();
const { Schema, model } = require('mongoose');
const crypto = require('crypto');

// to generate a secret_token:
// console.log(crypto.randomBytes(64).toString('hex'));

const secret = process.env.SECRET_TOKEN;
const { detailsSchema } = require('./UserDetail.js');
const userSchema = new Schema(
    {
        firstName: { type: String, trim: true },
        lastName: String,
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        admin: { type: Boolean, default: false },
        details: detailsSchema 
    },
    { timestamps: true }
);

userSchema.methods.hashPassword = (password) =>
{
    const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
    return hash;
};

userSchema.methods.comparePassword = function (loginPassword)
{
    if(this.password !== this.hashPassword(loginPassword))
    {
        return false;
    }
    return true;
};

const userModel = new model('User', userSchema, 'users');

module.exports = userModel;
