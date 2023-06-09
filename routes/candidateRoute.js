const express = require('express');
const { addcandidate,getAllCandidate }  = require('../controller/canfidateController')
const { isAuthenticatedUser} = require('../middleware/auth');
const router = express.Router();




router.route('/addCandidate').post(isAuthenticatedUser,addcandidate);
router.route('/getCandidates').get(isAuthenticatedUser,getAllCandidate);

module.exports = router