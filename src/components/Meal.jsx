import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentState } from "../redux/userSlice";
import { getPossibilityToAdd } from "../functions/getPossibilityToAdd";
import MealOptions from "./Modals/MealOptions/MealOptions";
import EllipsisHorizontalIcon from "./UI/Icons/EllipsisHorizontalIcon";
import {
  GRAM,
  LET_ADD,
  NONE,
  NONE_SECOND_LINE,
  NOTHING_ADDED,
} from "../assets/CONSTANTS";

export default function Meal() {
  const { userData } = useSelector(selectCurrentState);
  const { date } = useSelector((state) => state.date);
  const daylyMeals = userData?.meals?.filter((meal) => meal.date === date);
  const possibilityToAdd = getPossibilityToAdd(date);

  const [editableMeal, setEditableMeal] = useState(null);
  const [mealOptionsModal, setMealOptionsModal] = useState(false);
  const handleMealOptionsModal = (meal) => {
    setEditableMeal(meal);
    setMealOptionsModal(true);
  };

  return (
    <>
      <MealOptions
        visible={mealOptionsModal}
        setVisible={setMealOptionsModal}
        meal={editableMeal}
      />

      <div className="mt-6 relative w-full">
        {daylyMeals?.length ? (
          <>
            {daylyMeals?.map((meal) => (
              <div
                key={meal.id}
                className="bg-blue-700 dark:bg-[#007ACC] text-white backdrop-blur-xl shadow-md relative px-5 py-4 mb-2 rounded-xl border border-gray-200 dark:border-transparent"
              >
                {possibilityToAdd && (
                  <div
                    onClick={() => handleMealOptionsModal(meal)}
                    className="bg-white rounded-full dark:bg-[#E4E4E4] shadow-md absolute z-10 top-3 right-4 p-1 text-gray-900 cursor-pointer hover:scale-105 transition-all"
                  >
                    <EllipsisHorizontalIcon />
                  </div>
                )}
                <p className="rounded-full text-gray-100 text-lg">
                  {meal.weight}
                  {GRAM} -{" "}
                  {Math.round((meal.product.calories * meal.weight) / 100)} кал
                </p>
                <div className="text-2xl mt-3">
                  {meal.product.title?.length < 28
                    ? meal.product.title
                    : meal.product.title?.slice(0, 28) + "..."}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="bg-white dark:bg-[#E4E4E4] text-gray-900 backdrop-blur-xl shadow-md relative px-5 py-4 mb-2 rounded-xl border border-gray-200">
            {possibilityToAdd && (
              <p className="rounded-full text-gray-900">{NONE}</p>
            )}
            {possibilityToAdd && (
              <p className="rounded-full text-gray-900">{NONE_SECOND_LINE}</p>
            )}
            <div className="text-2xl">
              {possibilityToAdd ? LET_ADD : NOTHING_ADDED}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
