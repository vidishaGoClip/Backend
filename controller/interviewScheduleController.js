const InterviewSchedule = require("../model/interviewScheduleModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");
const Candidate = require("../model/candidateModel");

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
  const page = req.query.p || 0;
  const interviewSchedulePerPage = 3;

  try {
    const allInterviewSchedules = await InterviewSchedule.find({}).skip(
      page * interviewSchedulePerPage
    );
    res.status(200).json({
      success: true,

      response: allInterviewSchedules,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,

      response: error,
    });
  }
});

// send Interview link
exports.sendInterviewlink = catchAsyncErrors(async (req, res, next) => {
  try {
    const candidates = await Candidate.find({ email: { $in: req.body.email } });
    for (const candidate of candidates) {
      console.log(candidate, "candi");
      const message = `

       Dear ${candidate.firstname}, 
      
We are delighted to inform you that you have been shortlisted for the position of ${req.body.role} at ${req.user.companyName}. Congratulations! As the next step in our hiring process, we kindly request you to select a date and time for your interview before ${req.body.interviewEndDate}. 
 
To select your interview slot, please follow the instructions below: 
 
Access our interview scheduling portal by clicking on the following link: [Insert Interview Scheduling Link] 
You will be directed to the scheduling page where you can view available time slots. 
Choose a date and time that best fits your schedule and click on the corresponding option to reserve your interview slot. 
Once you have successfully scheduled your interview, you will receive a confirmation email with all the necessary details. 
 
If you encounter any difficulties or have any questions during the scheduling process, please don't hesitate to contact our support team at ${req.user.phoneNumber}/${req.user.email}. We are here to assist you promptly. 
 
We kindly request that you schedule your interview before the specified deadline to allow us ample time for the necessary preparations. Thank you for your cooperation, and we appreciate your interest in joining ${req.user.companyName}. We look forward to meeting you soon! 
 
Best regards, 
${req.user.firstname} ${req.user.lastname} 
${req.user.role} ${req.user.sector} 
${req.user.companyName}
`;
      await sendEmail({
        email: candidate.email,
        subject: `Select Your Interview Date and Time for ${req.body.role} at ${req.user.companyName} - Deadline ${req.body.interviewEndDate} `,
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent   successfully`,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
