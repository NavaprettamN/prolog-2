const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        }, 
        password: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
);

const userData = mongoose.model("UserData", userDataSchema);

module.exports = userData;