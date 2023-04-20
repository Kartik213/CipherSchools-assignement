const express = require('express');
const userRouter = express.Router();

const { register, login, logout } = require('../controllers/auth');

userRouter.post('/register', register);

userRouter.post('/login', login);

userRouter.post('/logout', logout);

module.exports = userRouter;
