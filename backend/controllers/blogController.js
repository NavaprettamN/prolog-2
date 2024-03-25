// create blog, update blog, delete blog
const blogData = require('../models/blogModel');
const userData = require("../models/userModel");

const createBlog = async (req, res) => {
    const {title, content, frequency, userId, lastPostedAt} = req.body;
    try {
        const newBlog = await blogData.create({title, content, frequency, userId, lastPostedAt});
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
        res.status(200).json({'message': 'created new blog'});
    }
    catch (err){
        res.json({'message': 'the blog was not created'});
    }
}

const updateBlog = async (req, res) => {
    const { blogId } = req.params;
    console.log(blogId);
    const { title, content, lastPostedAt } = req.body;
    try {
        const existingBlog = await blogData.findOne({_id: blogId});
        if (existingBlog) {
            existingBlog.title = title;
            existingBlog.content = content;
            existingBlog.lastPostedAt = lastPostedAt || Date.now();
            await existingBlog.save();
            res.status(200).json({ 'message': 'updated new blog' });
        } 
        else {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
            res.send("something is wrong");
        }
    }
    catch (err){
        res.json({'message': 'the blog was not updated'});
    }
}

const getBlog = async (req, res) => {
    try {
        const blogs = await blogData.find();
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserBlog = async (req, res) => {
    try {
        const userblogs = await blogData.find({userId: req.userId});
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
        res.status(200).json(userblogs);
    }
    catch (err) {
        console.log("error fetching user blogs : ", err);
        res.status(500).json({message : "internal server error"});
    }
}

const getBlogData = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await blogData.findOne({_id: id});
        if(!blog) {
            return res.json({message : "there is no blog"});
        }
        const userId = blog.userId;
        const user = await userData.findById(userId);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
        res.status(200).json({blog, username: user.name });
    }
    catch (err) {
        console.log("error fetching blog data : ", err);
        res.status(500).json({message : "internal server error"});
    }
}

module.exports = {
    createBlog, 
    updateBlog,
    getBlog,
    getUserBlog,
    getBlogData,
};