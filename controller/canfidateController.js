const Candidate = require("../model/candidateModel");
// const User = require("../models/userModel");
// const sendToken = require('../utils/jwtToken');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.addcandidate = catchAsyncErrors(async (req, res, next) => {
  const newCandidate = await Candidate.create(req.body);
  try {
    await newCandidate.save();
    res.status(200).json({
      success: true,

      response: newCandidate,
    });
  } catch (error) {
    // console.log(error)
    res.status(500).json({
      success: true,

      response: error,
    });
  }

  // res.send('Working Fine')
});
exports.getAllCandidate = catchAsyncErrors(async (req, res, next) => {
  const page = req.query.p || 0
  const candidatePerPage =3

  // const {name,email,password} = req.body;

  try {
    const allCandidates = await Candidate.find({}).skip(page * candidatePerPage);
    res.status(200).json({
      success: true,

      response: allCandidates,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: true,

      response: error,
    });
  }

  // res.send('Working Fine')
});

exports.getCandidateDetails = catchAsyncErrors(async (req, res, next) => {
  const candidate = await Candidate.findById(req.params.id);

  if (!candidate) {
    return next(new ErrorHandler("Candidate not found", 404));
  }

  res.status(200).json({
    success: true,
    candidate,
  });
});

exports.updateCandidateConversation = catchAsyncErrors(async (req, res, next) => {
  let {assistant, user, useremail, interviewStage} = req.body
  try {
    let isAvailable = await Candidate.findOne({ email:useremail })
    
    if(isAvailable){
      
        let conversationDocument =await Candidate.findByIdAndUpdate({_id: isAvailable._id}, {
          $push: {
            "candidateConversation.messages": {assistant:assistant, user:user,interviewStage: interviewStage}
          }
        },{ upsert: true, new: true });
       
          return res.status(200).json({success:true, message: "Updated",data:conversationDocument})
    }
    else {
      return res.status(404).json({success:false, message: "Candidate is not present"})
    }
    


} catch (error) {
    return res.status(500).json({success:false, message:error.message})       
}
  
});


