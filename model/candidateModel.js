const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const candidateSchema = Schema({
  firstname: {
    type: String,
    required: [true, "Please enter first name"],
  },
  lastname: {
    type: String,
    required: [true, "Please enter last  name"],
  },
  gender: {
    type: String,
  },
  nationality: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  position:{
    type: String,
    required: [true, "Please enter Position"],
  },
  email: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  martialStatus: {
    type: String,
  },
  skills:[String],
  preferredJobLocation:[String],
  hobbies:[String],
  certifications:[{
      name:String,
      organisation:String,
      Date:String
  }],
  Job:[{
    companyName:String,
    role:String,
    Duration:Number
}],
postGrad:{
  pg:String,
  collegeName:String,
  subject:String,
  city:String,
  year:Number
},
grad:{
  grad:String,
  collegeName:String,
  subject:String,
  city:String,
  year:Number
},
equivalent:{
  equivalent:String,
  collegeName:String,
  subject:String,
  city:String,
  year:Number
},
  Status:{ type : String, required: true, default:"Process"},
  createdAt: { type: Date, default: Date.now, required: true },
  candidateConversation:{
    messages:[{ interviewStage: {type:String}, assistant: { type: String}, user:{type: String}, timestamp:{ type: Date, default: Date.now }}]
  }
 
 
});

module.exports= mongoose.model("Candidate", candidateSchema);