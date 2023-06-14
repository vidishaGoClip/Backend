const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const jobDesignationSchema = Schema({
  jobPostion: {
    type: String,
    required: [true, "Please enter Job Position"],
  },
  status:{ type : String, required: true, default:"Active"},
  createdAt: { type: Date, default: Date.now, required: true },
 
 
});

module.exports= mongoose.model("JobDesignation", jobDesignationSchema);