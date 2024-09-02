const express = require("express");
const cors = require('cors');
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

//DB connection
const connectToDb = require('./db');
connectToDb();

//Routes
app.use('/api/signup' , require('./routes/signupimage'));
app.use('/api/user' , require('./routes/userdetails'));
app.use('/api/calendar' , require('./routes/scheduleEvents'));
app.use('/api/tasks' , require('./routes/taskManager'));
app.use('/api/checkpoints' , require('./routes/checkPointManager'));
app.use('/api/apply-leave' , require('./routes/leavesManagement'));
app.use('/api/log-attendance' , require('./routes/attendanceManager'));
app.use('/api/profile-data' , require('./routes/profileManagement'));
app.use("/api/chat",require("./routes/chatRoute"));
app.use("/api/message",require("./routes/messageRoute"));
app.use('/api/employees', require('./routes/searchRoute'));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

