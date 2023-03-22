import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentState } from "../redux/userSlice";
import {
  getDaylyNorm,
  getDailyСonsumedNutrients,
} from "../functions/getNutrientsValues";
import Information from "./Modals/Information";
import InformIcon from "./UI/Icons/InformIcon";
import { APP } from "../assets/CONSTANTS";

export default function Header() {
  const [infoModal, setInfoModal] = useState(false);
  const handleMenuModal = () => setInfoModal(true);

  const { userData } = useSelector(selectCurrentState);
  const { date } = useSelector((state) => state.date);

  const daylyMeals = userData?.meals?.filter((meal) => meal.date === date);
  const weight = userData?.weight;

  const { normOfCalories } = getDaylyNorm(weight);
  const { dailyСonsumedCalories } = getDailyСonsumedNutrients(daylyMeals);

  return (
    <>
      <Information visible={infoModal} setVisible={setInfoModal} />

      <div className="mt-2 mb-6 flex items-center justify-between text-center text-xl dark:text-gray-200 uppercase">
        {APP}
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-200">
            {dailyСonsumedCalories?.toFixed(0)} / {normOfCalories?.toFixed(0)}
          </span>
          <button
            onClick={handleMenuModal}
            className="p-1 bg-white/80 rounded-full dark:bg-[#E4E4E4] shadow-md text-gray-500 cursor-pointer hover:scale-105 transition-all"
          >
            <InformIcon />
          </button>
        </div>
      </div>
    </>
  );
}
