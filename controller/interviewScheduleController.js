const InterviewSchedule = require("../model/interviewScheduleModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require('../utils/sendEmail')

exports.addInterviewSchedule = catchAsyncErrors(async (req, res, next) => {
    const newInterviewSchedule = await InterviewSchedule.create(req.body);
    try {
      await newInterviewSchedule.save();
      res.status(200).json({
        success: true,
  
        response: newInterviewSchedule,
      });
    } catch (error) {
      // console.log(error)
      res.status(500).json({
        success: true,
  
        response: error,
      });
    }
  
    
  });
  exports.getAllInterviewSchedules = catchAsyncErrors(async (req, res, next) => {
    const page = req.query.p || 0
    const interviewSchedulePerPage =3
  
   
  
    try {
      const allInterviewSchedules = await InterviewSchedule.find({}).skip(page * interviewSchedulePerPage);
      res.status(200).json({
        success: true,
  
        response: allInterviewSchedules,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: true,
  
        response: error,
      });
    }
  
    
  });


// send Interview link
exports.sendInterviewlink = catchAsyncErrors(async (req, res, next) => {
     
  
  
    const message = `Hello`;
  
    try {
      await sendEmail({
        email: req.body,
        subject: `Interview`,
        message,
      });
  
      res.status(200).json({
       
        success: true,
        message: `Email sent   successfully`,
      });
    } catch (error) {
      
  
      return next(new ErrorHandler(error.message, 500));
    }
  });