const JobDesignation =require("../model/jobDesignation");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


exports.jobPost = catchAsyncErrors(async (req, res, next) => {
    const newJobPost = await JobDesignation.create(req.body);
    try {
      await newJobPost.save();
      res.status(200).json({
        success: true,
  
        response: newJobPost,
      });
    } catch (error) {
      
      res.status(500).json({
        success: true,
  
        response: error,
      });
    }
  
    
  });

  exports.getAllJobPosts = catchAsyncErrors(async (req, res, next) => {
    const page = req.query.p || 0
    const jobPostPerPage =3
  
   
  
    try {
      const allJobPosts = await JobDesignation.find({}).skip(page * jobPostPerPage);
      res.status(200).json({
        success: true,
  
        response: allJobPosts,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: true,
  
        response: error,
      });
    }
  
    
  });
  
  exports.updateJobPostStatus = catchAsyncErrors(async (req, res, next) => {
   
    const id = req.params.id;
    
    const  update = {
        $set: {status: req.body.status},
        
    }
    const options = { new: true };
    try {
      const updatedJobPostData = await JobDesignation.findByIdAndUpdate(
        id,
        update,
        options
      );
      res.status(200).json({
        success: true,
  
        response: updatedJobPostData,
      });
    } catch (error) {
     
      res.status(500).json({
        success: true,
  
        response: error,
      });
    }
  
});