const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
       firstName:{
        type: String,
        require: true,
        unique: false
       },
       lastName:{
        type: String,
        require: true,
        unique: false
       },
       email:{
        type: String,
        require: true,
        unique: true
       },
       phone:{
        type: String,
        default: null
       },
       image:{
        type: String,
       },
       password:{
        type: String,
        require: true,
        unique: false
       }
    },
    {timestamps: true}
);

const user = mongoose.model("user", userSchema)
module.exports = user
