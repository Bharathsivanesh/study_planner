import { updateTopicProgress } from "@/store/subject-slice";
import { Calendar, Check, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { SlCursor } from "react-icons/sl";
import { useDispatch } from "react-redux";

const SubjectCard = ({ subject }) => {
  const { subjectName, examDate, examDifficulty, topics } = subject;

  const [showModal, setShowModal] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState(null);

  const daysLeft = Math.ceil(
    (new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  const averageProgress =
    topics?.reduce((acc, t) => acc + parseInt(t.progress || 0), 0) /
    (topics?.length || 1);

  const dispatch = useDispatch();

  const handleProgressUpdate = (actionType) => {
    if (!selectedTopic) return;

    const increment =
      selectedTopic.difficulty === "Easy"
        ? 10
        : selectedTopic.difficulty === "Medium"
        ? 20
        : selectedTopic.difficulty === "Hard"
        ? 30
        : 0;

    dispatch(
      updateTopicProgress({
        subjectId: subject._id,
        topicName: selectedTopic.name,
        increment,
      })
    );

    setSelectedTopic(null);
  };

  return (
    <>
      <div
        className="bg-white shadow rounded-2xl p-5 w-full max-w-[350px] font-poppins"
        onClick={() => {
          console.log("clicked"), setShowModal(true);
        }}
      >
        <div className="flex justify-between items-start mb-3">
          {/* ✅ Subject Name Clickable */}
          <h3 className="text-lg font-semibold cursor-pointer text-purple-700 hover:underline">
            {subjectName}
          </h3>

          <span
            className={`text-sm px-2 py-1  rounded-full text-white ${
              examDifficulty === "Easy"
                ? "bg-green-500"
                : examDifficulty === "Medium"
                ? "bg-yellow-400"
                : "bg-red-600"
            } capitalize`}
          >
            {examDifficulty}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-sm text-gray-500 mb-3 mt-6">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{new Date(examDate).toLocaleDateString()}</span>
          </div>
          <div>
            <span>{daysLeft} days left</span>
          </div>
        </div>

        <hr className="my-3" />

        <div className="text-md font-medium mb-2">Topics:</div>
        <div className="flex flex-col gap-2 text-sm">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center mt-1"
              onClick={() => setSelectedTopic(topic)}
            >
              <div className="flex items-center gap-2">
                <span>
                  <SlCursor />
                </span>
                <span className="capitalize  cursor-pointer">{topic.name}</span>
              </div>
              {topic.difficulty === "Easy" ? (
                <span className="text-xs px-2 py-1  cursor-pointer rounded-full text-white bg-green-500 capitalize">
                  {topic.difficulty}
                </span>
              ) : topic.difficulty === "Medium" ? (
                <span className="text-xs px-2 py-1   cursor-pointer rounded-full text-white bg-yellow-500 capitalize">
                  {topic.difficulty}
                </span>
              ) : (
                <span className="text-xs px-2 py-1   cursor-pointer rounded-full text-white bg-red-500 capitalize">
                  {topic.difficulty}
                </span>
              )}

              {parseInt(topic.progress) >= 100 ? (
                <span className="text-green-600  cursor-pointer flex items-center gap-1">
                  <Check size={16} /> completed
                </span>
              ) : parseInt(topic.progress) > 0 ? (
                <span className="text-purple-600   cursor-pointer flex items-center gap-1">
                  <Loader2 size={16} /> {topic.progress}% on progress
                </span>
              ) : (
                <span className="text-purple-400   cursor-pointer flex items-center gap-1">
                  <Loader2 size={16} /> Start now
                </span>
              )}
            </div>
          ))}
        </div>

        {/* <div className="mt-4 flex gap-2 justify-end">
          <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm">
            Revise now
          </button>
          <button className="bg-gray-300 text-gray-600 px-3 py-1 rounded text-sm">
            Mark as learning
          </button>
        </div> */}

        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full"
            style={{ width: `${averageProgress || 0}%` }}
          ></div>
        </div>
        <div className="text-xs text-right text-gray-500 mt-1">
          {Math.round(averageProgress || 0)}% completed
        </div>
      </div>

      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-purple-700">
              {subjectName} - {selectedTopic.name}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              What would you like to do with{" "}
              <strong>{selectedTopic.name}</strong>?
            </p>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => {
                  handleProgressUpdate("startLearning");
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition text-sm"
              >
                Update Progress
              </button>

              <button
                onClick={() => setSelectedTopic(null)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectCard;
