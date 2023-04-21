const express = require('express');
const cookieParser = require("cookie-parser");
const updateUser = require('../controllers/profile/updateUser');
const updatePassword = require('../controllers/profile/updatePassword');
const updateInterest = require('../controllers/profile/updateInterest');
const getInterests = require('../controllers/profile/getInterest');
const getFollowers = require('../controllers/profile/getFollowers');
const getDetails = require('../controllers/profile/getDetails');
const updatefollower = require('../controllers/profile/updateFollowers');

const userRouter = express.Router();
userRouter.use(cookieParser());

userRouter.put('/updateuser', updateUser);

userRouter.put('/updatepassword', updatePassword);

userRouter.put('/updateinterests', updateInterest);

userRouter.put('/updateFollowers', updatefollower);

userRouter.get('/getinterests', getInterests);

userRouter.get('/getfollowers', getFollowers);

userRouter.get('/getdetails', getDetails);

module.exports = userRouter;
