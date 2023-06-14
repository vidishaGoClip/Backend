const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler")
const jwt = require('jsonwebtoken');
const User = require('../model/userModel')

exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next)=>{
    console.log(req.headers.authorization,'token')
    // console.log(req.headers.authorization,'req')
    // // const {token} = req.headers.authorization;
    // console.log(req.headers.authorization,'token')
    if(!req.headers.authorization){
        return next(new ErrorHandler('Plaese Login to access this resource',401))
    }

    //console.log(token);
    const decodedData = jwt.verify(req.headers.authorization,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
});