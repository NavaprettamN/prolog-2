const express = require('express');
const router = express.Router();
const userController =  require('../controllers/userController');
const { verifyToken } = require('../util/verifyToken');


router.post('/login', userController.userLogin);
router.post('/signup', userController.userSignup);
router.get('/logout', userController.userLogout);
router.get('/getuser', verifyToken ,userController.getUser);

module.exports = router;
