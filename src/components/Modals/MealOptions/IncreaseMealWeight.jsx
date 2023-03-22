import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateMealMutation } from "../../../redux/apis/mealsApi";
import { setData } from "../../../redux/userSlice";
import ModalWrapper from "../../UI/ModalWrapper";
import {
  ADD,
  ADD_AGAIN,
  GRAM,
  MORE,
  PREVIOUS,
} from "../../../assets/CONSTANTS";

export default function IncreaseMealWeight({
  visible,
  setVisible,
  meal,
  username,
}) {
  const dispatch = useDispatch();

  const [updateMeal] = useUpdateMealMutation();

  const [value, setValue] = useState("");
  const [increasedWeight, setIncreasedWeight] = useState("");

  const closeModal = () => setVisible(false);

  useEffect(() => {
    setIncreasedWeight(Number(meal?.weight) + Number(value));
  }, [value]);

  const createUpdatedMeal = () => {
    return {
      id: meal?.id,
      date: meal?.date,
      weight: increasedWeight.toString(),
      product: meal?.product,
    };
  };

  const updatedMeal = value && createUpdatedMeal();

  const handleUpdate = async () => {
    if (value) {
      try {
        const { userData } = await updateMeal({
          username,
          updatedMeal,
        }).unwrap();
        dispatch(setData({ userData }));
      } catch (error) {
        console.log(error);
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
      title={meal?.product?.title}
    >
      <label className="label mt-4">
        {PREVIOUS}
        {meal?.weight}
        {GRAM} {value && MORE}
        {value}
        {value && GRAM}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        step={5}
        placeholder={ADD_AGAIN}
        className="input"
        min="0"
        required
      />

      <button type="button" className="btn mt-4" onClick={handleUpdate}>
        {ADD}
      </button>
    </ModalWrapper>
  );
}
