import React, { useState } from "react";
import { useNewProductMutation } from "../../../redux/apis/productsApi";
import { setData } from "../../../redux/userSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../../hooks/useAuth";
import ModalWrapper from "../../UI/ModalWrapper";
import HeartIcon from "../../UI/Icons/HeartIcon";
import HeartSolidIcon from "../../UI/Icons/HeartSolidIcon";
import {
  CALORIES,
  CANCEL,
  CARBOHIDR,
  CREATE,
  FATS,
  NAME,
  PROTEINS,
  PROT,
  FAT,
  CARB,
  CAL,
  CREATE_NEW_PRODUCT,
} from "../../../assets/CONSTANTS";

export default function NewProduct({ visible, setVisible }) {
  const dispatch = useDispatch();
  const { username } = useAuth();

  const [createProduct] = useNewProductMutation();

  const [title, setTitle] = useState("qqq");
  const [calories, setCalories] = useState("1");
  const [proteins, setProteins] = useState("2");
  const [fats, setFats] = useState("3");
  const [carbohydrates, setCarbohydrates] = useState("4");
  const [checked, setChecked] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const closeModal = () => {
    setVisible(false);
    cleanInputs();
  };

  const createNewProduct = () => {
    return {
      id: uuidv4(),
      title: title,
      proteins: proteins.toString(),
      fats: fats.toString(),
      carbohydrates: carbohydrates.toString(),
      calories: calories.toString(),
      isFavorite: checked,
    };
  };
  const product = carbohydrates && createNewProduct();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { userData } = await createProduct({ username, product }).unwrap();
      dispatch(setData({ userData }));
    } catch (error) {
      setErrMsg(error);
    }
    cleanInputs();
    setVisible(false);
  };

  function cleanInputs() {
    setTitle("");
    setChecked("");
    setProteins("");
    setFats("");
    setCarbohydrates("");
    setCalories("");
  }

  return (
    <ModalWrapper
      show={visible}
      setVisible={setVisible}
      closeModal={closeModal}
      title={CREATE}
    >
      <form onSubmit={handleSubmit}>
        <label className="label mt-4">{NAME}</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={NAME}
          className="input"
          required
        />

        <div className="mt-4 grid grid-cols-4 gap-3">
          <div>
            <label className="label">{CALORIES}</label>
            <input
              type="number"
              min="0"
              step={0.1}
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="input px-4 py-3 text-sm"
              placeholder={CAL}
              required
            />
          </div>
          <div className="mb-6">
            <label className="label">{PROTEINS}</label>
            <input
              type="number"
              min="0"
              step={0.1}
              value={proteins}
              onChange={(e) => setProteins(e.target.value)}
              className="input px-4 py-3 text-sm"
              placeholder={PROT}
              required
            />
          </div>
          <div className="mb-6">
            <label className="label">{FATS}</label>
            <input
              type="number"
              min="0"
              step={0.1}
              value={fats}
              onChange={(e) => setFats(e.target.value)}
              className="input px-4 py-3 text-sm"
              placeholder={FAT}
              required
            />
          </div>
          <div className="mb-6">
            <label className="label">{CARBOHIDR}</label>
            <input
              type="number"
              min="0"
              step={0.1}
              value={carbohydrates}
              onChange={(e) => setCarbohydrates(e.target.value)}
              className="input px-4 py-3 text-sm"
              placeholder={CARB}
              required
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              type="button"
              className="clearBtn text-base"
              onClick={closeModal}
            >
              {CANCEL}
            </button>
            <button type="submit" className="btn text-base">
              {CREATE_NEW_PRODUCT}
            </button>
          </div>

          <div>
            <input
              id="favorite"
              type="checkbox"
              value=""
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="hidden"
            />
            <label
              htmlFor="favorite"
              className="flex justify-center items-center cursor-pointer select-none bg-white w-14 h-14 rounded-full"
            >
              {checked ? <HeartSolidIcon /> : <HeartIcon />}
            </label>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
}
