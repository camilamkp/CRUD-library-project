require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authUser = (req, res, next) =>
{
    try
    {
        const authHeader = req.headers[ 'authorization' ];
        const token = authHeader && authHeader.split(' ')[ 1 ] ;
        const decodedData = jwt.verify(token, process.env.SECRET_TOKEN);

        console.log(authHeader);
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
