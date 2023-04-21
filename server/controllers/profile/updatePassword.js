const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const user = require('../../models/userModel')

const updatePassword = async (req, res)=>{
    const token = req.cookies.auth_cookie.token;
    try{
        jwt.verify(token, process.env.JWT_SECRET, {}, async(err, info)=>{
            if(err)
                return res.status(401).json('User not authenticated');
            else{
                const { currentPassword, newPassword, confirmNewPassword } = req.body;
                const id = req.cookies.auth_cookie.id;
                if(!currentPassword || !newPassword || !confirmNewPassword){
                    return res.status(400).json('Enter required fields');
                }
                else{
                    const userExist = await user.findOne({_id: id});
                    const matchPassword = await bcrypt.compare(currentPassword, userExist.password);
                    if(!matchPassword){
                        return res.status(401).json('incorrect password');
                    }
                    else{
                        if(newPassword !== confirmNewPassword){
                            return res.status(401).json('passwords does not matches')
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
        res.status(500).json('Internal server error');
    }
}

module.exports = updatePassword
