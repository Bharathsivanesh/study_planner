const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require('./routers/auth/auth-router');
const subjectRouter = require('./routers/subject/subject-router');


mongoose
  .connect("mongodb+srv://bharath:bharathsivanesh262005@cluste.5phjp.mongodb.net/study_planner?retryWrites=true&w=majority&appName=Cluste")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
);
// app.use(cors());
app.use(passport.initialize());

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/subject',subjectRouter);




app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));