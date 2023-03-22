import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDate } from "../redux/dateSlice";
import { add, addDays, format } from "date-fns";
import { uk } from "date-fns/locale";
import { TODAY, TOMORROW, YESTERDAY } from "../assets/CONSTANTS";

const today = format(new Date(), "yyyy-MM-dd");
export const yesterday = format(add(new Date(), { days: -1 }), "yyyy-MM-dd");
const tomorrow = format(add(new Date(), { days: 1 }), "yyyy-MM-dd");

export default function DatePicker() {
  const dispatch = useDispatch();
  const { date } = useSelector((state) => state.date);

  const [currentDate, setCurrentDate] = useState(date);

  const handleDateChange = (e) => {
    if (e.target.value === "") {
      setCurrentDate(today);
      dispatch(changeDate(today));
    } else {
      setCurrentDate(e.target.value);
      dispatch(changeDate(e.target.value));
    }
  };

  const increaseDate = (dateValue) => {
    const updatedDate = addDays(new Date(dateValue), 1);
    const updatedAndFormatedDate = format(updatedDate, "yyyy-MM-dd");
    setCurrentDate(updatedAndFormatedDate);
    dispatch(changeDate(updatedAndFormatedDate));
  };

  const decreaseDate = (dateValue) => {
    const updatedDate = addDays(new Date(dateValue), -1);
    const updatedAndFormatedDate = format(updatedDate, "yyyy-MM-dd");
    setCurrentDate(updatedAndFormatedDate);
    dispatch(changeDate(updatedAndFormatedDate));
  };

  const formatedDay = format(new Date(currentDate), "eeee", { locale: uk });
  const textFormatedDay = getTextFormatedDay(currentDate);

  function getTextFormatedDay(date) {
    switch (date) {
      case today:
        return TODAY;
      case yesterday:
        return YESTERDAY;
      case tomorrow:
        return TOMORROW;
      default:
        return formatedDay;
    }
  }

  return (
    <div className="max-w-md w-full mx-4 flex dark:text-gray-200">
      <button
        onClick={() => decreaseDate(currentDate)}
        className="border border-gray-400 dark:border-transparent dark:bg-[#575757] p-3 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <div className="w-full px-8 rounded-xl flex flex-col justify-center items-center text-sm font-semibold relative">
        {textFormatedDay.toUpperCase()}
        <input
          type="date"
          id="datepick"
          value={currentDate}
          className="bg-transparent mt-1 outline-none"
          onChange={handleDateChange}
        />
      </div>

      <button
        onClick={() => increaseDate(currentDate)}
        className="border border-gray-400 dark:border-transparent dark:bg-[#575757] p-3 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}

// ADD to global.css
// input[type="date"]::-webkit-calendar-picker-indicator {
//   opacity: 1;
//   display: block;
//   margin-left: -12px;
// }
// @media (prefers-color-scheme: dark) {
//   input[type="date"]::-webkit-calendar-picker-indicator {
//     background-color: aliceblue;
//     border-radius: 4px;
//   }
// }
