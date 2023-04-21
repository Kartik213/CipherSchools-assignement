const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const follower = require('../../models/followersModel')
const user = require('../../models/userModel')

const getFollowers = async (req, res)=>{
    const token = req.cookies.auth_cookie.token;
    try{
        jwt.verify(token, process.env.JWT_SECRET, {}, async(err, info)=>{
            if(err)
                return res.status(401).json('user not authenticated');
            else{
                const id = req.cookies.auth_cookie.id;
                const followers = await follower.findOne({userId: id});
                const followersId = followers.followersId;
                console.log(followersId)
                let followersArray = []
                for (const id of followersId){
                    const userDetails = await user.findOne({_id: id});
                    const formatted = {firstName: userDetails.firstName, lastName: userDetails.lastName, phone: userDetails.phone, image: userDetails.image}
                    followersArray.push(formatted)
                }
                res.status(200).json(followersArray)
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
}

module.exports = getFollowers
