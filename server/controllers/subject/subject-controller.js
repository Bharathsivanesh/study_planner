const Subject = require("../../models/Subject");
const axios = require("axios");

const addSubject = async (req, res) => {
    try {
      const { examDate, examDifficulty, subjectName, topics, userId } = req.body;
        
      // console.log(examDate + " " + examDifficulty + " " + subjectName + " " + JSON.stringify(topics,null,2) + " " + userId);
      if (!examDate || !examDifficulty || !subjectName || !topics || !userId) {
        return res.status(400).json({
          success: false,
          message: "All fields are required including userId"
        });
      }
  
      const newSubject = new Subject({
        examDate,
        examDifficulty,
        subjectName,
        topics,
        userId
      });
  
      await newSubject.save();
  
      res.status(201).json({
        success: true,
        message: "Subject added successfully",
        data: newSubject
      });
  
    } catch (error) {
      console.error("Add Subject Error:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
        error
      });
    }
  };
  

// Get all subjects for a user
const getUserSubjects = async (req, res) => {
    try {
        const userId = req.body.userId;
        // console.log("userId",userId);
        const subjects = await Subject.find({ userId });

        res.status(200).json({
            success: true,
            subjects
        });

    } catch (error) {
        console.error("Get Subjects Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

const updateTopicProgress = async (req, res) => {
  try {
    const { subjectId, topicName, increment } = req.body;

    if (!subjectId || !topicName || !increment) {
      return res.status(400).json({
        success: false,
        message: "subjectId, topicName, and increment are required"
      });
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }

    const topic = subject.topics.find(t => t.name === topicName);
    if (!topic) {
      return res.status(404).json({ success: false, message: "Topic not found" });
    }

    topic.progress = Math.min(100, parseInt(topic.progress || 0) + parseInt(increment));
    await subject.save();

    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      updatedTopic: topic
    });

  } catch (error) {
    console.error("Update Topic Progress Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error
    });
  }
};

const getStudyPlan = async (req, res) => {
  const { userId } = req.params;

  try {
    const mlResponse = await axios.get(`https://plan-scheduler.onrender.com/generate-user-plan?userId=${userId}`);
    console.log("MLResponse",mlResponse);
    return res.status(200).json(mlResponse.data);
  } catch (error) {
    console.error("Error getting study plan:", error);
    return res.status(500).json({ message: "Failed to fetch study plan" });
  }
};




module.exports = { addSubject, getUserSubjects , updateTopicProgress ,getStudyPlan};
