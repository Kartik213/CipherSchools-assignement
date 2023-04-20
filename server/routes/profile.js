const express = require('express');

const profileRouter = express.Router();

const { updateUserProfile, updateUserPassword, updateUserInterest, getAllFollowers, getUserDetails, getUserInterests } = require('../controllers/profile');
profileRouter.put('/updateuserprofile', updateUserProfile);

profileRouter.put('/updateuserpassword', updateUserPassword);

profileRouter.put('/updateuserinterests', updateUserInterest);

profileRouter.get('/getallinterests', getUserInterests);

profileRouter.get('/getallfollowers', getAllFollowers);

profileRouter.get('/getuserdetails', getUserDetails);

module.exports = profileRouter;
