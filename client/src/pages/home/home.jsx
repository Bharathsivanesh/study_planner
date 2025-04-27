import SubjectCard from "@/components/common/subjectCard";
import StudyPlanCard from "@/components/home-view/studyCard";
import { getStudyPlan, getUserSubjects } from "@/store/subject-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { subjects } = useSelector((state) => state.subject);
  const { studyPlan, loading, error } = useSelector((state) => state.subject);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user?.userId);
    if (user?.userId) {
      const userId = user?.userId;
      dispatch(getUserSubjects(user?.userId));
    }
  }, [dispatch, user]);

  // console.log(subjects);

  useEffect(() => {
    if (user?.userId) {
      dispatch(getStudyPlan(user?.userId));
    }
  }, [user]);

  console.log(studyPlan);

  return (
    <div className="flex flex-col items-center justify-center gap-3 text-black">
      <div className="flex flex-col items-start w-full p-5 justify-start gap-10">
        <h2 className="text-black font-semibold font-poppins text-[1.6rem] w-full ">
          Your Progress !
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {subjects
            .slice() // make a copy to avoid mutating original
            .sort((a, b) => {
              const daysLeftA = Math.ceil(
                (new Date(a.examDate) - new Date()) / (1000 * 60 * 60 * 24)
              );
              const daysLeftB = Math.ceil(
                (new Date(b.examDate) - new Date()) / (1000 * 60 * 60 * 24)
              );
              return daysLeftA - daysLeftB; // ascending order: fewest days first
            })
            .map((subject) => (
              <SubjectCard key={subject._id} subject={subject} />
            ))}
        </div>
      </div>

      <div className="flex flex-col items-start  p-5 justify-start gap-10">
        <h2 className="text-black font-semibold font-poppins text-[1.6rem] w-full ">
          Study Plan !
        </h2>
        <div className="flex flex-row flex-wrap  gap-12">
          {studyPlan?.study_plan.map((item, idx) => (
            <StudyPlanCard key={idx} plan={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
