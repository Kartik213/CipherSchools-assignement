const mongoose = require('mongoose')

const interestSchema = new mongoose.Schema(
    {
        interestNames:[{ 
            type: String,
        }],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        }
    },
    {timestamps: true}
);

const interest = mongoose.model("interests", interestSchema);
module.exports = interest
