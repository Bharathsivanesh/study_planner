import { addSubject } from "@/store/subject-slice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function AddStudyPlanModal({ onClose }) {

  const {user} = useSelector((state)=>state.auth);

  console.log(user);

  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examDifficulty, setExamDifficulty] = useState("Easy");
  const [topics, setTopics] = useState([
    { name: "", difficulty: "Easy", progress: "0" },
  ]);

  const addTopic = () => {
    setTopics([...topics, { name: "", difficulty: "Easy", progress: "0" }]);
  };

  const dispatch = useDispatch();

  const handleTopicChange = (index, field, value) => {
    const updated = [...topics];
    updated[index][field] = value;
    setTopics(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalSubject = {
      userId : user?.userId,
      subjectName : subject,
      examDate : examDate,
      examDifficulty : examDifficulty,
      topics : topics
    }

    dispatch(addSubject(totalSubject)).then(()=>console.log("Success")).catch((error)=>console.log(error));


    console.log(totalSubject);
    onClose(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 rounded">
      <div className="bg-white p-6 rounded w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Study Plan</h2>
          <button onClick={onClose} className="text-red-500 font-bold text-xl">
            &times;
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-y-auto"
        >
          <div>
            <label className="text-black">Subject Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded border-black mt-2 text-black"
              placeholder="Subject Name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-black">Exam Date</label>
            <input
              type="date"
              className="w-full border p-2 rounded border-black mt-2 text-black"
              placeholder="dd/MM/yyyy"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-black">Exam Difficulty</label>
            <select
              className="w-full border p-2 rounded border-black mt-2 text-black"
              value={examDifficulty}
              onChange={(e) => setExamDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-black">Topics</label>
            {topics.map((topic, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Topic Name"
                  className="flex-1 border p-2 rounded border-black text-black"
                  value={topic.name}
                  onChange={(e) =>
                    handleTopicChange(index, "name", e.target.value)
                  }
                  required
                />
                <select
                  value={topic.difficulty}
                  onChange={(e) =>
                    handleTopicChange(index, "difficulty", e.target.value)
                  }
                  className="border p-2 rounded border-black text-black"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={addTopic}
              className="text-blue-600 mt-1"
            >
              + Add Topic
            </button>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Start Learning !
          </button>
        </form>
      </div>
    </div>
  );
}