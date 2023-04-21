const user = require('../../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const login = async (req, res)=>{
    const {email, password} = req.body;

    try{
        if(!email || !password){
            return res.status(400).json('Enter Required Input Fields');
        }
        else if(!validator.isEmail(email)){
            return res.status(400).json({message:'Invalid Email Address'});
        }
        else{
            const emailExist = await user.findOne({email: email});
            if(!emailExist){
                return res.status(404).json({message:'Email Not Registered'});
            }
            else{
                const matchPassword = await bcrypt.compare(password, emailExist.password);
                if(!matchPassword){
                    return res.status(401).json({message:'Incorrect password'});
                }
                else{
                    const user = emailExist;
                    const { firstName, lastName, email, phone, password } = user;
                    const token = jwt.sign({email, id:user._id}, process.env.JWT_SECRET);
                    return res.cookie('auth_cookie',
                    {   id: user._id,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phone: phone,
                        token: token
                    }, {httpOnly:true, secure: process.env.NODE_ENV === "production"}).status(200).json({id: user._id, firstName: firstName,lastName: lastName, email: email, phone: phone, message:'User logged-in successfully'});
                }
            }
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
}

module.exports = login
