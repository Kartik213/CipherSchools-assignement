const user = require('../../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const register = async (req, res)=>{
    const {firstName, lastName, email, phone, password} = req.body;
    console.log("register")
    try{
        if(!firstName || !lastName || !email || !password){
            console.log(firstName);
            res.status(400).json('Enter required fields');
        }
        else if(!validator.isEmail(email)){
            res.status(400).json('Invalid email');
        }
        else{
            const emailExist = await user.findOne({email: email});
            if(emailExist){
                res.status(409).json('user already registered');
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10);
                const userData = await user.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    password: hashedPassword
                });
                res.status(201).json("Registration successfull");
            }
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json('Internal server error');
    }
}

module.exports = register
