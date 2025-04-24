import React from "react";
import bgImage from "../../assets/home/bg.jpg";
// import ExamCard from "../../components/Examcard/examcard";

const Home = () => {
  return (
    <>
      <div
        className="h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat text-white px-6"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})`,
        }}
      >
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl font-bold mb-6 drop-shadow-md">
            AI Study Companion
          </h1>
          <p className="text-lg mb-8 leading-relaxed drop-shadow">
            Supercharge your study time with smart AI-powered scheduling. Our
            app prioritizes topics based on upcoming exams, difficulty, and your
            learning progress. Focus on what matters most — efficiently and
            stress-free.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition">
              Schedule now
            </button>
          </div>
        </div>
      </div>
      {/* <div className="bg-gray-50 py-10 px-4 flex flex-wrap gap-6 justify-center">
        <p className="">Your Progress</p>
        <ExamCard />
      </div> */}
    </>
  );
};

export default Home;
