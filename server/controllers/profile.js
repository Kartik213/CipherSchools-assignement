const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
// const userSchema = require('../models/userModel');
// const userInterestSchema = require('../models/userInterestsModel');
// const userFollowerSchema = require('../models/userFollowersModel');
const user = require('../models/userModel')
const interest = require('../models/interestModel')
const follower = require('../models/followersModel')

const updateUserProfile = async (req, res)=>{
    const token = req.cookies.auth_cookie.token;

    try{
        jwt.verify(token, process.env.secretKey, {}, async(err, info)=>{
            if(err)
                return res.status(401).json({message: 'user not authenticated'});
            else{
                const { firstName, lastName, phone, image } = req.body;
                if(!firstName || !lastName){
                    return res.status(400).json({message:'Enter Required Input Fields'});
                }
                else{
                    const id = req.cookies.auth_cookie.id;
                    const updateUser = {
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                        image: image || ''
                    }
                    await user.findByIdAndUpdate(id, updateUser, {new: true});
                    res.status(200).json({ firstName, lastName, phone, image, message:'Profile updated'});
                }
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Internal Server Error'});
    }
}

const updateUserPassword = async (req, res)=>{
    const token = req.cookies.auth_cookie.token;
    try{
        jwt.verify(token, process.env.secretKey, {}, async(err, info)=>{
            if(err)
                return res.status(401).json('user not authenticated');
            else{
                const { currentPassword, newPassword, confirmNewPassword } = req.body;
                const id = req.cookies.auth_cookie.id;
                if(!currentPassword || !newPassword || !confirmNewPassword){
                    return res.status(400).json('Enter Required Input Fields');
                }
                else{
                    const userExist = await user.findOne({_id: id});
                    const matchPassword = await bcrypt.compare(currentPassword, userExist.password);
                    if(!matchPassword){
                        return res.status(401).json('Incorrect password');
                    }
                    else{
                        if(newPassword !== confirmNewPassword){
                            return res.status(401).json('new password and confirm password not matches')
                        }
                        else{
                            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
                            await user.findByIdAndUpdate(id, {password: hashedNewPassword}, {new: true} );
                            return res.status(200).json('password updated');
                        }
                    }
                }
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
}

const updateUserInterest = async (req, res)=>{
    const token = req.cookies.auth_cookie.token;
    try{
        jwt.verify(token, process.env.secretKey, {}, async(err, info)=>{
            if(err)
                return res.status(401).json('user not authenticated');
            else{
                const {interests} = req.body;
                console.log(interests);
                const userId = req.cookies.auth_cookie.id;
                const interestsExist = await interest.findOne({userId: userId});
                if(interestsExist){
                    const interest = await interest.findOne({userId: userId});
                    const interestId =  interest._id.toString();
                    const updateInterests = {
                        interestNames: interests,
                        userId: userId
                    }
                    const updatedInterests = await interest.findByIdAndUpdate( interestId ,updateInterests, {new: true});
                    return res.status(200).json({message:'user interests updated', data: updateInterests.interestNames});
                }
                else{
                    const createInterests = {
                        interestNames: interests,
                        userId: userId
                    }
                    await interest.create(createInterests);
                    return res.status(200).json('user interests created');
                }
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
}

const getAllFollowers = async (req, res)=>{
    const token = req.cookies.auth_cookie.token;
    try{
        jwt.verify(token, process.env.secretKey, {}, async(err, info)=>{
            if(err)
                return res.status(401).json('user not authenticated');
            else{
                const getFollowers = await follower.find();
                return res.status(200).json(getFollowers);
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
}

const getUserDetails = async(req, res)=>{
    const token = req.cookies.auth_cookie.token;
    try{
        jwt.verify(token, process.env.secretKey, {}, async(err, info)=>{
            if(err)
                return res.status(401).json('user not authenticated');
            else{
                const id = req.cookies.auth_cookie.id;
                const userDetails = await user.findOne({_id: id});
                res.status(200).json({firstName: userDetails.firstName, lastName: userDetails.lastName, phone: userDetails.phone, image: userDetails.image})
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
}

const getUserInterests = async(req, res)=>{
    const token = req.cookies.auth_cookie.token;
    try{
        jwt.verify(token, process.env.secretKey, {}, async(err, info)=>{
            if(err)
                return res.status(401).json('user not authenticated');
            else{
                const id = req.cookies.auth_cookie.id;
                const userIntersts = await interest.findOne({userId: id});
                res.status(200).json(userIntersts.interestNames);
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
}

module.exports = {
    updateUserProfile,
    updateUserPassword,
    updateUserInterest,
    getAllFollowers,
    getUserDetails,
    getUserInterests
}