const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const interest = require('../../models/interestModel')

const updateInterest = async (req, res)=>{
    const token = req.cookies.auth_cookie.token;
    try{
        jwt.verify(token, process.env.JWT_SECRET, {}, async(err, info)=>{
            if(err)
                return res.status(401).json('User not authenticated');
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
                    return res.status(200).json({message:'interests updated', data: updateInterests.interestNames});
                }
                else{
                    const createInterests = {
                        interestNames: interests,
                        userId: userId
                    }
                    await interest.create(createInterests);
                    return res.status(200).json('interests created');
                }
            }
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json('Internal srver error');
    }
}

module.exports = updateInterest
