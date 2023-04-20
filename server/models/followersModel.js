const mongoose = require('mongoose')

const userFollowerSchema = new mongoose.Schema(
    {
        followerImage:{
            type: String,
            default: 'default.jpg'
        },
        followerName:{
            type: String,
            require: true
        },
        followerPosition:{
            type: String,
            require: true,
        },
        followersCount:{
            type: Number,
            require: true
        },
        followingOrNot:{
            type: Boolean,
            require: true
        }
    },
    {timestamps: true}
);

const followers = mongoose.model("follower", userFollowerSchema)
module.exports = followers
