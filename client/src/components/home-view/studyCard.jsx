import React from "react";
import { Calendar, Clock, BookOpen } from "lucide-react";

const StudyPlanCard = ({ plan }) => {
  // Example: Day 1: Subject dummy - fm in 13:00 - 14:10, allocated 1.0 hrs
  const [dayInfo, rest] = plan.split(": ");
  const day = dayInfo.replace("Day ", "Day ");
  const [subjectInfo, timeInfo] = rest.split(" in ");
  const subject = subjectInfo.split("Subject ")[1].split(" - ")[0];
  const topic = subjectInfo.split(" - ")[1];
  const [time, allocated] = timeInfo.split(", allocated ");

  return (
    <div className="bg-white shadow-lg rounded-3xl p-8  w-[300px] font-poppins">
      <div className="flex items-center gap-12 mb-6">
        <Calendar size={24} className="text-purple-600" />
        <h3 className="text-2xl font-bold text-purple-700">{day}</h3>
      </div>

      <div className="space-y-5 text-gray-700 text-base">
        <div className="flex items-center gap-3">
          <BookOpen size={20} className="text-purple-500" />
          <span className="font-semibold">Subject:</span>
          <span className="capitalize">{subject}</span>
        </div>

        <div className="flex gap-3">
          <span className="font-semibold">Topic:</span>
          <span className="capitalize">{topic}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock size={20} className="text-purple-500" />
          <span className="font-semibold">Time:</span>
          <span>{time}</span>
        </div>

        <div className="flex gap-3">
          <span className="font-semibold">Allocated:</span>
          <span>{allocated}</span>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanCard;
