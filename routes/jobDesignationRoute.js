const express = require('express');
const { jobPost,getAllJobPosts,updateJobPostStatus }  = require('../controller/jobDesignationController')
const { isAuthenticatedUser} = require('../middleware/auth');
const router = express.Router();




router.route('/addJobPost').post(isAuthenticatedUser,jobPost);
router.route('/getAllJobPosts').get(isAuthenticatedUser,getAllJobPosts);
router.route('/jobPosts/:id').put(isAuthenticatedUser,updateJobPostStatus)

module.exports = router