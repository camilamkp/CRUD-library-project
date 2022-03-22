const express = require('express');
const router = express.Router();

const { allUsers, create, login } = require('../controllers/userController.js');

router.route('/')
    .get(allUsers)
    .post(create);

router.route('/:id')
    .get()
    .put()
    .delete();

router.route('/login')
    .post(login);

module.exports = router;
