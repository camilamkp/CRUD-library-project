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
    const user = User.findById(id);
    if(!user)throw new Error('not found');
    res.status(200).json({
        success: true,
        data: user
    });
};

// PUT :ID
exports.update = (req, res) =>
{
    const { id } =req.params;
    const { password } = req.body;

    if(id !== req.tokenUser)
    {
        return res.status(400).json({
            success: false,
            message: 'you are not authorized to proceed'
        });
    }

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }
    if(password)
    {
        const updatedPassword = User.find({ _id: id });
        updatedPassword.password = crypto.createHmac('sha256', process.env.SECRET_TOKEN).update(password).digest('hex');

        User.findOneAndUpdate({ _id: id }, { ...req.body, password: updatedPassword.password });
        return res.status(200).json({
            success: true,
            message: 'User updated'
        });
    }
    const user = User.findOneAndUpdate({ _id: id }, { ...req.body });
    res.status(200).json({
        success: true,
        message: 'User updated'
    });

    if(!user) throw new Error('user not found!')
};
// DELETE :ID

// POST
exports.login = (req, res) =>
{
    const { username, password } = req.body;

    const error = validator.validationResult(req).errors;

    if(error.length > 0)
    {
        return res.status(400)
            .json({
                success: false,
                message: error.map(err => err.message)
            });
    }

    const signAccessToken = jwt.sign({
        username: userLastLogin.username,
        userId: userLastLogin._id
    }, process.env.SECRET_TOKEN, { expiresIn: '24h' });

    User.findOne({ username })
        .then(foundUser =>
        {
            if(foundUser)
            {
                if(foundUser.comparePassword(password))
                {
                    foundUser.lastLogin = new Date();
                    const oneDay = 24 * 60 * 60;
                    foundUser.save()
                        .then(user =>
                        {
                            res.status(200)
                                .cookie('access_token', token, 
                                    {
                                        httpOnly: true,
                                        maxAge: oneDay
                                    })
                                .json({
                                    success: true,
                                    token: signAccessToken({ username }),
                                    message: `Hey ${ userLastLogin.username }, you're logged in!`,
                                    user
                                });
                        });
                }
                else
                {
                    res.status(401).json({
                        success: false,
                        message: [ 'Please enter a valid Username and Password' ]
                    });
                }
            }
            else
            {
                res.status(404).json({
                    success: false,
                    message: [ 'User not found. Please sign in.' ]
                });
            }
        });
};
