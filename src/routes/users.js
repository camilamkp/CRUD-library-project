const express = require('express');
const router = express.Router();
const { authUser, adminUser } = require('../middleware/userRoles.js');

const { 
    allUsers, 
    create, 
    oneUser, 
    update,
    login 
} = require('../controllers/userController.js');

const isValidUser = require('../validation/userValidation.js');

router.route('/')
    .get(authUser, adminUser, allUsers)
    .post(isValidUser, create);

router.route('/:id')
    .get(authUser, oneUser)
    .put(authUser, update)
    .delete(authUser);

router.route('/login')
    .post(isValidUser, login);

module.exports = router;
