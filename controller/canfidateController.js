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

