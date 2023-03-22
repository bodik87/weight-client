import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useDeleteMealMutation } from "../../../redux/apis/mealsApi";
import { setData } from "../../../redux/userSlice";
import useAuth from "../../../hooks/useAuth";
import ModalWrapper from "../../UI/ModalWrapper";
import EditMealWeight from "./EditMealWeight";
import IncreaseMealWeight from "./IncreaseMealWeight";
import {
  ADD_AGAIN,
  DELETE,
  EDIT_WEIGHT,
  GRAM,
} from "../../../assets/CONSTANTS";

export default function MealOptions({ visible, setVisible, meal }) {
  const dispatch = useDispatch();
  const { username } = useAuth();

  const [deleteMeal, { isLoading }] = useDeleteMealMutation();

  const [increaseMealWeightModal, setIncreaseMealWeightModal] = useState(false);

  const closeModal = () => setVisible(false);

  const handleIncreaseMealWeightModal = () => {
    setVisible(false);
    setIncreaseMealWeightModal(true);
  };

  const [editMealWeightModal, setEditMealWeightModal] = useState(false);

  const handleEditMealWeightModal = () => {
    setVisible(false);
    setEditMealWeightModal(true);
  };

  const handleDeleteMeal = async (id) => {
    try {
      const { userData } = await deleteMeal({
        username,
        id,
      }).unwrap();
      dispatch(setData({ userData }));
    } catch (error) {
      console.log(error);
    }
    setVisible(false);
  };

  return (
    <>
      <IncreaseMealWeight
        meal={meal}
        visible={increaseMealWeightModal}
        setVisible={setIncreaseMealWeightModal}
        username={username}
      />

      <EditMealWeight
        meal={meal}
        visible={editMealWeightModal}
        setVisible={setEditMealWeightModal}
        username={username}
      />

      <ModalWrapper
        show={visible}
        setVisible={setVisible}
        closeModal={closeModal}
        title={`${meal?.product?.title} ${meal?.weight}
        ${GRAM}`}
      >
        <div className="mt-4 flex flex-col items-center gap-3">
          <button
            type="button"
            className="btn w-full h-16 whitespace-nowrap"
            onClick={handleEditMealWeightModal}
          >
            {EDIT_WEIGHT}
          </button>

          <div className="w-full flex gap-3 items-center justify-center">
            <button
              type="button"
              className="btn w-full bg-red-600 hover:bg-red-700 dark:bg-[#CE915B] dark:hover:bg-[#e69752] focus:ring-red-300 dark:focus:ring-red-800 whitespace-nowrap"
              onClick={() => handleDeleteMeal(meal?.id)}
            >
              {DELETE}
            </button>

            <button
              type="button"
              className="btn w-full whitespace-nowrap bg-green-600 hover:bg-green-700 dark:bg-[#44C9A2] dark:hover:bg-[#32bb92] focus:ring-green-400 dark:focus:ring-green-800"
              onClick={handleIncreaseMealWeightModal}
            >
              {ADD_AGAIN}
            </button>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}
