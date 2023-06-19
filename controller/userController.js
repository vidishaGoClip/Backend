const User = require('../model/userModel')
const sendToken = require('../utils/jwtToken');
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')
exports.register = catchAsyncErrors(async (req,res,next)=>{
     const {firstname,lastname,email,password,companyName,phoneNumber,role,sector,plans,confirmPassword} = req.body;
     if(password !==confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password are not matching", 400));
     }
     else{
     
    const user = await User.create({
        firstname,lastname,email,password,companyName,phoneNumber,role,sector,plans
        
    });

     sendToken(user,201,res);
    }
    // res.send('Working Fine')

})

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{

    const {email,password} = req.body;

    //Check  if user has given email and password both
    if(!email || !password){
        return next(new ErrorHandler('Please enter Email and Password',400));
    }
    const  user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched ){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }
    sendToken(user,200,res);

});

exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})
// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: ` Password Recovery`,
        message,
      });
  
      res.status(200).json({
        tokenData:resetToken,
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHandler(error.message, 500));
    }
  });
  
  // Reset Password
  exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
   
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
  
    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.cpassword) {
      return next(new ErrorHandler("Password does not password", 400));
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    sendToken(user, 200, res);
  });
  
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
    const  user = await User.findById(req.user.id);
    res.status(200).json({
      success:true,
      user,
    });
})
