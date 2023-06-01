const express = require('express');
const routerUsers = express.Router();
const { getUsers, getUserById, createUser, editProfile, editAvatar } = require('../controllers/users');

routerUsers.get('/users', getUsers);
routerUsers.get('/users/:userId', getUserById);
routerUsers.post('/users', createUser);
routerUsers.patch('/users/me', editProfile);
routerUsers.patch('/users/me/avatar', editAvatar);

module.exports = routerUsers;