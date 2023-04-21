const mongoose = require('mongoose')

const userFollowerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        followersId:[{ 
            type: String,
        }],
    },
    {timestamps: true}
);

const follower = mongoose.model("follower", userFollowerSchema)
module.exports = follower
