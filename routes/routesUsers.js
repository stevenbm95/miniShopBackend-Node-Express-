const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.registerUser);
router.post('/users/login', UserController.loginUser);
router.post('/users/logout', UserController.logOutUser);

module.exports = router;
