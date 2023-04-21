const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const user = require('../../models/userModel')

const updateUser = async (req, res)=>{
    const token = req.cookies.auth_cookie.token;

    try{
        jwt.verify(token, process.env.JWT_SECRET, {}, async(err, info)=>{
            if(err)
                return res.status(401).json({message: 'User not authenticated'});
            else{
                const { firstName, lastName, phone, image } = req.body;
                if(!firstName || !lastName){
                    return res.status(400).json({message:'Enter required fields'});
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
        res.status(500).json({message:'Internal server error'});
    }
}

module.exports = updateUser
