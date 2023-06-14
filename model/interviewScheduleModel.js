const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const interviewScheduleSchema = Schema({
  jobPostion: {
    type: String,
    required: [true, "Please enter Job Position"],
  },
  interviewStart: { type: Date,  required: true },
  interviewEnd: { type: Date,  required: true },
  status: {
    type: String,
    enum: ["On Going", "Not Interested", "Completed"],
    required: true,
    default:"On Going"
  },
 
 
});

module.exports= mongoose.model("InterviewSchedule", interviewScheduleSchema);