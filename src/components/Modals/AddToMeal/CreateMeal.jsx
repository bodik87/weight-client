import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../../hooks/useAuth";
import { selectCurrentState, setData } from "../../../redux/userSlice";
import {
  useCreateMealMutation,
  useUpdateMealMutation,
} from "../../../redux/apis/mealsApi";
import ModalWrapper from "../../UI/ModalWrapper";
import {
  ADD_WEIGHT,
  WEIGHT,
  ADD,
  ADD_AGAIN,
  ADD_AGAIN_TITLE,
  GRAM,
} from "../../../assets/CONSTANTS";

export default function CreateMeal({ visible, setVisible, product }) {
  const dispatch = useDispatch();
  const { username } = useAuth();
  const { date } = useSelector((state) => state.date);
  const { userData } = useSelector(selectCurrentState);

  const [createMeal] = useCreateMealMutation();
  const [updateMeal] = useUpdateMealMutation();

  const daylyMeals = userData?.meals?.filter((meal) => meal.date === date);

  const duplicateMeal =
    daylyMeals &&
    daylyMeals.filter((meal) => meal?.product?.id === product?.id)[0];

  const [value, setValue] = useState("");
  const validValue = value > 0;

  function closeModal() {
    setVisible(false);
    setValue("");
  }

  const createNewMeal = () => {
    return {
      id: uuidv4(),
      date: date,
      weight: value,
      product: product,
    };
  };

  const createUpdatedMeal = () => {
    return {
      id: duplicateMeal?.id,
      date: duplicateMeal?.date,
      weight: (Number(duplicateMeal?.weight) + Number(value)).toString(),
      product: duplicateMeal?.product,
    };
  };

  const meal = product && validValue && createNewMeal();
  const updatedMeal = duplicateMeal && validValue && createUpdatedMeal();

  const handleAddNewMeal = async () => {
    if (validValue) {
      try {
        if (updatedMeal) {
          const { userData } = await updateMeal({
            username,
            updatedMeal,
          }).unwrap();
          dispatch(setData({ userData }));
        } else {
          const { userData } = await createMeal({ username, meal }).unwrap();
          dispatch(setData({ userData }));
        }
      } catch (error) {
        setErrMsg(error);
      }
      closeModal();
      setValue("");
    }
  };

  return (
    <ModalWrapper
      show={visible}
      setVisible={setVisible}
      closeModal={closeModal}
      title={ADD_WEIGHT}
    >
      <label className="label mt-4 mb-1 text-lg">{product?.title}</label>
      {duplicateMeal && (
        <label className="label pb-2 text-blue-900 dark:text-yellow-200">
          {ADD_AGAIN_TITLE} {duplicateMeal?.weight}
          {GRAM}
        </label>
      )}
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        step={1}
        placeholder={WEIGHT}
        className="input"
        min="1"
        required
      />

      <button type="button" className="btn mt-4" onClick={handleAddNewMeal}>
        {duplicateMeal ? ADD_AGAIN : ADD}
      </button>
    </ModalWrapper>
  );
}
