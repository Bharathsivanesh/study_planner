import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DailyRoutineModal from "./dailyRoutine";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/store/auth-slice";
import NotificationModal from "@/components/common/notifymessage";

const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigat = useNavigate();
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setUserName(user?.userName);
  }, user);

  const handlelogout = async () => {
    await dispatch(logoutUser());
    navigat("/auth/login");
  };
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { subjects } = useSelector((state) => state.subject);

  return (
    <div className="fixed top-5 right-10 text-white flex items-center justify-center gap-2 z-20">
      <div
        className="bg-black flex items-center justify-center border-gray-500 px-2 py-2 border-[.1rem] 
        rounded-[.5rem] relative"
        onClick={() => setIsNotificationOpen(true)}
      >
        <IoIosNotifications className="text-xl" />
        <div className="bg-[#453FF3] rounded-3xl w-[.5rem] h-[.5rem] absolute top-1 right-1"></div>
      </div>

      <div
        className="bg-black flex items-center border-gray-500 justify-center px-1 py-[.2rem] border-[.1rem] rounded-[.5rem] cursor-pointer"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <h2 className="rounded-[.1rem] font-poppins text-[1rem] p-1 ">
          {userName || "Get Started"}
        </h2>
        <MdKeyboardArrowRight />
      </div>
      <div className="bg-black p-2 rounded-[.5rem]  border-gray-500 cursor-pointer">
        <button onClick={handlelogout}>Log-Out</button>
      </div>

      {isModalOpen && (
        <DailyRoutineModal
          user={user}
          closeModal={() => setIsModalOpen(false)}
        />
      )}

      {isNotificationOpen && (
        <NotificationModal
          subjects={subjects}
          closeModal={() => setIsNotificationOpen(false)}
        />
      )}
    </div>
  );
};

export default Account;
