const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const user = require('../../models/userModel')

const getDetails = async(req, res)=>{
    const token = req.cookies.auth_cookie.token;
    try{
        jwt.verify(token, process.env.JWT_SECRET, {}, async(err, info)=>{
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
module.exports = getDetails
