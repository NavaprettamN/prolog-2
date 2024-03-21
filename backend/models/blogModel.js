const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly'], // Possible values: 'daily' or 'weekly'
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    lastPostedAt: {
        type: Date,
        default: Date.now
    }
})

const blogData = mongoose.model('BlogData', blogSchema);

module.exports = blogData;