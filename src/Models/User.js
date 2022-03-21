const { Schema, model } = require('mongoose');

// to generate a secret_token:
// const crypto = require('crypto');
// console.log(crypto.randomBytes(64).toString('hex'));

const userSchema = new Schema(
    {
        username: String,
        password: String,
        admin: {
            type: Boolean,
            default: false
        } 
    },
    { timestamps: true }
);

userSchema.methods.hashPassword = (password) =>
{
    const hash = crypto.createHmac('sha256', process.env.SECRET_TOKEN).update(password).digest('hex');
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
