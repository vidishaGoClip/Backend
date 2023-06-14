const express = require('express');
const { addInterviewSchedule,getAllInterviewSchedules }  = require('../controller/interviewScheduleController')
const { isAuthenticatedUser} = require('../middleware/auth');
const router = express.Router();




router.route('/addInterviewSchedule').post(isAuthenticatedUser,addInterviewSchedule);
router.route('/getAllInterviewSchedules').get(isAuthenticatedUser,getAllInterviewSchedules);


module.exports = router