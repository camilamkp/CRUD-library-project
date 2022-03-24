require('dotenv').config();
const validator = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../Models/User.js');

// GET
exports.allUsers = (req, res) =>
{
    User.find( {}, (err, users) =>
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
            amount: users.length,
            data: users
        });
    });
};

// POST
exports.create = (req, res) =>
{
    const {
        firstName,
        lastName,
        username,
        password,
        admin
    } = req.body;

    const newUser = new User({
        firstName,
        lastName,
        username,
        password,
        admin
    });

    newUser.details = {
        street,
        postalcode,
        number,
        city
    } = req.body;

    newUser.password = newUser.hashPassword(password);
    const errors = validator.validationResult(req).errors;
    console.log(errors);

    if(errors.length > 0)
    {
        return res.status(400).json({ errors });
    }
    console.log(newUser);
    newUser.save().then((user) =>
    {
        return res.status(200).json({
            success: true,
            message: 'new user '+ firstName +' successfully registered',
            data: user
        });
    });
};

// GET :ID
exports.oneUser = (req, res) =>
{
    const { id } = req.params;
    User.find({ _id: id }, (err, users) =>
    {
        if(err)
        {
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }
        return res.status(200).json({
            success: true,
            data: users
        });
    });  
};

// PUT :ID
exports.update = (req, res) =>
{
    const { id } = req.params;

    User.find({ _id: id }, (err, users) =>
    {
        if(err)
        {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        users.firstName = req.body.firstName || users.firstName;
        users.lastName = req.body.lastName || users.lastName;
        users.username = req.body.username || users.username;
        users.street = req.body.street || users.street;
        users.postalcode = req.body.postalcode || users.postalcode;
        users.number = req.body.number || users.number;
        users.city = req.body.city || users.city;
        
        // es fehlt hier das password zu hashen
        users.password = req.body.password || users.password;
    });
    users.save().then((user) =>
    {
        return res.status(200).json({
            success: true,
            message: 'new user '+ firstName +' successfully updated',
            data: user
        });
    });
};

// DELETE :ID
exports.del = (req, res) =>
{
    const { id } = req.params;
    const user = User.findById(id);

    if(req.body.admin !== 'true')
    {
        return res.status(400).json({
            success: false,
            message: 'you are not authorized to proceed'
        });
    }
    const deleteUser = User.deleteOne({ _id: id });
    res.status(200).json({
        success: true,
        message: 'The ' + user.firstName + ' with the email ' + user.username + ' was successfully deleted.',
        deleted: deleteUser
    });
};

// POST createCookie
exports.login = (req, res) =>
{
    const { username, password } = req.body;
    
    User.findOne({ username }).then(userFound =>
    {
        if(userFound)
        {
            const token = jwt.sign({ username: userFound.username }, process.env.SECRET_TOKEN );
            if(userFound.comparePassword(password))
            {
                return res.cookie('access_token', token,
                    {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60
                    })
                    .status(200)
                    .json({
                        success: true,
                        message: `Hello, '${ username }' you are logged in!`
                    });
            }
            else
            {
                res.status(400).json({
                    success: false,
                    message: 'You are not logged in. Please enter a valid email or password.'
                });
            }
        }
        else
        {
            res.status(400).json({
                success: false,
                message: 'Sign up to login'
            });
        }
    });
};

// POST clearCookie
exports.logout = (req, res) =>
{
    return res.clearCookie('access_token')
        .status(200)
        .json({
            success: true,
            message: 'You are logged out, see you later!'
        })
};
