const blogController = require('../controllers/blogController')
const express = require('express');
const { verifyToken } = require('../util/verifyToken');
const router = express.Router();

router.post('/createblog', verifyToken, blogController.createBlog);
router.put('/updateblog/:blogId',verifyToken , blogController.updateBlog);
router.get('/allblogs', blogController.getBlog);
router.get('/getuserblog', verifyToken, blogController.getUserBlog);
router.get('/blog/:id', verifyToken, blogController.getBlogData);


module.exports = router;