const express = require('express');
const register = require('../controllers/auth/register')
const login = require('../controllers/auth/login')
const logout = require('../controllers/auth/logout')

const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/logout', logout);

module.exports = authRouter;
