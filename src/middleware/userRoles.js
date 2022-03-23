require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authUser = (req, res, next) =>
{
    try
    {
        let token = req.cookies.access_token;
        const decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

        console.log(token);
        console.log(decodedData);
        next();
    }
    catch(err)
    {
        res.status(401).json({ message: 'User not authorized!' });
    }
};

exports.adminUser = (req, res, next) =>
{
    try 
    {
        console.log(req.body);
        if(req.body.admin)
        {
            console.log(req.body);
            next();
        }
        else throw Error('Sorry, you are not an Admin.');
    } 
    catch (err)
    {
        next(err);
    }
};
