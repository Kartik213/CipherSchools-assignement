const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const interest = require('../../models/interestModel')

const getInterests = async(req, res)=>{
    const token = req.cookies.auth_cookie.token;
    try{
        jwt.verify(token, process.env.JWT_SECRET, {}, async(err, info)=>{
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
module.exports = getInterests
