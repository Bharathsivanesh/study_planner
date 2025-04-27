import { updateUserProfile } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { updateUserProfile } from "";

const DailyRoutineModal = ({ user, closeModal }) => {
  const [time, setTime] = useState("");
  const [action, setAction] = useState("");
  const [routineList, setRoutineList] = useState([]);
  const dispatch = useDispatch();

  const addRoutine = () => {
    if (!time || !action) return;
    setRoutineList([...routineList, { time, action }]);
    setTime("");
    setAction("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      dailyRoutine: [...(user.dailyRoutine || []), ...routineList],
    };

    console.log("Updated User", updatedUser);
    dispatch(updateUserProfile(updatedUser));
    closeModal();
  };

  const removeRoutine = (index) => {
    const updated = [...routineList];
    updated.splice(index, 1);
    setRoutineList(updated);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 text-black">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Daily Routines</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div>
              <label className="block">
                Time:
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1 text-black"
                  placeholder="eg: 9:00 - 10:00"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </label>
              <label className="block mt-2">
                Action:
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1 text-black"
                  placeholder="eg.learning Time"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  required
                />
              </label>
              <button
                type="button"
                onClick={addRoutine}
                className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
              >
                Add Routine
              </button>
            </div>

            {routineList.length > 0 && (
              <div>
                <h3 className="text-md font-semibold mt-4">Routine List:</h3>
                <ul className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {routineList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded"
                    >
                      <span>
                        {item.time} - {item.action}
                      </span>
                      <button
                        onClick={() => removeRoutine(idx)}
                        className="text-red-500"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={routineList.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit All
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DailyRoutineModal;
