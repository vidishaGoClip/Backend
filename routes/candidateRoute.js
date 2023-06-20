const express = require('express');
const { addcandidate,getAllCandidate,getCandidateDetails }  = require('../controller/canfidateController')
const { isAuthenticatedUser} = require('../middleware/auth');
const router = express.Router();




router.route('/addCandidate').post(isAuthenticatedUser,addcandidate);
router.route('/getCandidates').get(isAuthenticatedUser,getAllCandidate);
router.route("/candidate/:id").get(isAuthenticatedUser,getCandidateDetails);

module.exports = router