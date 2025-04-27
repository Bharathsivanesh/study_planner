import React from "react";

const NotificationModal = ({ subjects, closeModal }) => {
  const today = new Date();

  const upcomingSubjects = subjects
    .map((subject) => {
      const daysLeft = Math.ceil(
        (new Date(subject.examDate) - today) / (1000 * 60 * 60 * 24)
      );
      return { ...subject, daysLeft };
    })
    .filter((subject) => subject.daysLeft >= 0) // Only future exams
    .sort((a, b) => a.daysLeft - b.daysLeft); // Soonest first

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-gray-100 p-6 rounded-xl w-[600px] shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">
          Upcoming Exams
        </h2>
        {upcomingSubjects.length === 0 ? (
          <p className="text-gray-600 text-center">No upcoming exams!</p>
        ) : (
          <div className="flex flex-col gap-4">
            {upcomingSubjects.map((subject) => (
              <div
                key={subject._id}
                className="flex justify-between items-center p-4 bg-white rounded-xl    shadow-md"
              >
                {/* Left - Subject Name */}
                <div className="text-left text-purple-700 font-medium text-lg w-1/3">
                  {subject.subjectName}
                </div>

                {/* Center - Days Left */}
                <div className="text-center text-gray-600 font-medium text-lg w-1/3">
                  {subject.daysLeft} {subject.daysLeft === 1 ? "day" : "days"}{" "}
                  left
                </div>

                {/* Right - Progress (Optional) */}
                <div className="text-right text-gray-600 font-medium text-lg w-1/3">
                  {/* You can add progress percentage here if required */}
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={closeModal}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-lg w-full text-lg font-medium shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
