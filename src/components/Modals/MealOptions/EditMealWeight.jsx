import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateMealMutation } from "../../../redux/apis/mealsApi";
import { setData } from "../../../redux/userSlice";
import ModalWrapper from "../../UI/ModalWrapper";
import { EDIT_WEIGHT, GRAM } from "../../../assets/CONSTANTS";

export default function EditMealWeight({
  visible,
  setVisible,
  meal,
  username,
}) {
  const dispatch = useDispatch();

  const [updateMeal, { isLoading }] = useUpdateMealMutation();

  const [value, setValue] = useState("");

  const closeModal = () => setVisible(false);

  const createUpdatedMeal = () => {
    return {
      id: meal?.id,
      date: meal?.date,
      weight: value,
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
        console.lod(error);
      }
      closeModal();
      setValue("");
    }
  };

  useEffect(() => {
    setValue(meal?.weight);
  }, [meal]);

  return (
    <ModalWrapper
      show={visible}
      setVisible={setVisible}
      closeModal={closeModal}
      title={`${meal?.product?.title} ${meal?.weight}
        ${GRAM}`}
    >
      <input
        type="number"
        min="5"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        step={5}
        placeholder={EDIT_WEIGHT}
        className="input mt-4"
        required
      />
      <button type="button" className="btn mt-4" onClick={handleUpdate}>
        {EDIT_WEIGHT}
      </button>
    </ModalWrapper>
  );
}
