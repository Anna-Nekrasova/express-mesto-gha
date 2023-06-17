const express = require('express');
const { celebrate, Joi } = require('celebrate');

const routerUsers = express.Router();
const {
  getUsers, getUserById, editProfile, editAvatar, getUserAuth,
} = require('../controllers/users');

routerUsers.get('/users/me', getUserAuth);
routerUsers.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().alphanum().length(24),
  }),
}), getUserById);
routerUsers.get('/users', getUsers);
routerUsers.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), editProfile);
routerUsers.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.[a-z0-9_-]{2,3}))(:\d{2,5})?((\/.+)+)?\/?#?/m),
  }),
}), editAvatar);

module.exports = routerUsers;
