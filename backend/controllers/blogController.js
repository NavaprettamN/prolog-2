// create blog, update blog, delete blog
const blogData = require('../models/blogModel');

const createBlog = async (req, res) => {
    const {title, content, frequency, userId, lastPostedAt} = req.body;
    try {
        const newBlog = await blogData.create({title, content, frequency, userId, lastPostedAt});
        res.status(200).json({'message': 'created new blog'});
    }
    catch (err){
        res.json({'message': 'the blog was not created'});
    }
}

const updateBlog = async (req, res) => {
    const {blogId} = req.body;
    try {
        const existingBlog = await blogData.findOne({_id: blogId});
        if(existingBlog) {
            const updatedBlog = await blogData.updateOne({_id: existingBlog._id, title, content, frequency, userId, lastPostedAt});
        }
        res.status(200).json({'message': 'created new blog'});
    }
    catch (err){
        res.json({'message': 'the blog was not created'});
    }
}

const getBlog = async (req, res) => {
    try {
        const blogs = await blogData.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserBlog = async (req, res) => {
    try {
        const userblogs = await blogData.find({userId: req.userId});
        res.status(200).json(userblogs);
    }
    catch (err) {
        console.log("error fetching user blogs : ", err);
        res.status(500).json({message : "internal server error"});
    }
}

module.exports = {
    createBlog, 
    updateBlog,
    getBlog,
    getUserBlog,
};