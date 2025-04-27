const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    progress: { type: String, default: "0" }
});

const subjectSchema = new mongoose.Schema({
    examDate: { type: Date, required: true },
    examDifficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    subjectName: { type: String, required: true },
    topics: [topicSchema],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);
