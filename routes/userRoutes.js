const express = require('express');
const { register,loginUser,logoutUser,getUserDetails ,forgotPassword, resetPassword}  = require('../controller/userController')
const { isAuthenticatedUser} = require('../middleware/auth');
const router = express.Router();






// router.route('/register').post(register);
router.route('/signup').post(register);
router.route('/signIn').post(loginUser);
router.route('/me').get(isAuthenticatedUser,getUserDetails);
router.route("/forgotPassword").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);
router.route('/logout').get(logoutUser);
module.exports = router