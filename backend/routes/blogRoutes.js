const blogController = require('../controllers/blogController')
const express = require('express');
const { verifyToken } = require('../util/verifyToken');
const router = express.Router();

router.post('/createblog', verifyToken, blogController.createBlog);
router.post('/updateblog', verifyToken, blogController.updateBlog);
router.get('/allblogs', blogController.getBlog);

module.exports = router;