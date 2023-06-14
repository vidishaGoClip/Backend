const express = require('express');
var cors = require('cors')
const ConnDB = require('./config/database')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();
const dotenv = require('dotenv');
const cookieParser =  require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());
dotenv.config({path:"./config/config.env"});
ConnDB();
app.use(cors());
const PORT = process.env.PORT || 7000
const user = require('./routes/userRoutes');
const candidates = require('./routes/candidateRoute')
const jobPost = require('./routes/jobDesignationRoute')
const interviewSchedule = require('./routes/interviewScheduleRoute')
app.use('/api/v1',candidates);
app.use('/api/v1',jobPost);
app.use('/api/v1',interviewSchedule);
app.use('/api/v1',user);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})