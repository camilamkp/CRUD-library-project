require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.authUser = (req, res, next) =>
{
    const token = req.cookies.access_token;

    if(!token)
    {
        res.sendStatus(403);
    };

    try
    {
        const verifyData = jwt.verify(token, process.env.SECRET_TOKEN);
        req.tokenUser = verifyData.userId;
        next();
    }
    catch(e)
    { 
        res.status(401).json({ 
            success:false,
            message: 'You are not logged in!' 
        });
    };

};

// ein Problem hier zu lösen:
exports.adminUser = (req, res, next) =>
{
    try
    {
        if(req.body.admin === true)
        {
            console.log(req.body);
            next();
        }
        else throw new Error('User not admin');
    }
    catch (e)
    {
        next(e);
    }
};
