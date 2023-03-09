const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

// Create a user
router.post('/', userController.createUser);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

// Get all users
router.get('/', userController.getUsers);

// User login
router.post('/login', userController.login);

module.exports = router;
