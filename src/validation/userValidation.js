const validator = require('express-validator');
const User = require('../Models/User.js');

const validConfirmPassword = (value, { req }) =>
{
    if(value !==req.body.password)
    {
        throw new Error('Its not the same password. Try it again.');
    }
    return true;
};

const usernameAlreadyExists = (value) =>
{
    return User.findOne({ username: value }).then(user =>
    {
        if(!user)
        {
            return Promise.reject('Email already exists!');
        }
    });
};

const isValidUser =
[
    validator.body('username')
        .isEmail()
        .trim()
        .not()
        .withMessage('Please enter a valid E-Mail!')
        .custom(usernameAlreadyExists)
        .withMessage('E-mail already exists!'),

    validator.body('password')
        .isLength({ min: 8, max: 16 })
        .withMessage('Password must contain at least 8 characters')
        .not()
        .isIn([ 'password', 'pässwörd', '12345678', 'test1234', 'hallo123' ])
        .withMessage('Please enter a valid password!'),
    validator.body('confirmPassword').custom(validConfirmPassword)
];

module.exports = isValidUser;
