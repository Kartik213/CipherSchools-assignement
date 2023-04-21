const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const follower = require('../../models/followersModel')
const user = require('../../models/userModel')

const updatefollower = async (req, res)=>{
    const token = req.cookies.auth_cookie.token;
    try{
        jwt.verify(token, process.env.JWT_SECRET, {}, async(err, info)=>{
            if(err)
                return res.status(401).json('User not authenticated');
            else{
                const {followerId} = req.body;
                console.log(followerId);
                const userId = req.cookies.auth_cookie.id;
                const followerExist = await follower.findOne({userId: userId});
                if(followerExist){
                    const followers = await follower.findOne({userId: userId});
                    const Id =  followers._id.toString();
                    const updateFollowers = {
                        followersId: followerId,
                        userId: userId
                    }
                    console.log(updateFollowers);
                    const updatedfollowers = await follower.findByIdAndUpdate( Id ,updateFollowers, {new: true});
                    return res.status(200).json({message:'followerss updated', data: updateFollowers.followersId});
                }
                else{
                    const createFollower = {
                        followersId: followerId,
                        userId: userId
                    }
                    await follower.create(createFollower);
                    return res.status(200).json('follower created');
                }
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json('Internal srver error');
    }
}

module.exports = updatefollower
