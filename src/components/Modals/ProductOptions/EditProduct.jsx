import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../../../redux/userSlice";
import { useUpdateProductMutation } from "../../../redux/apis/productsApi";
import useAuth from "../../../hooks/useAuth";
import ModalWrapper from "../../UI/ModalWrapper";
import HeartIcon from "../../UI/Icons/HeartIcon";
import HeartSolidIcon from "../../UI/Icons/HeartSolidIcon";
import Skeleton from "../../UI/Skeleton";
import {
  CALORIES,
  CANCEL,
  CARBOHIDR,
  FATS,
  NAME,
  PROTEINS,
  PROT,
  FAT,
  CARB,
  CAL,
  EDIT,
  EDIT_PRODUCT,
} from "../../../assets/CONSTANTS";

export default function EditProduct({ visible, setVisible, product }) {
  const dispatch = useDispatch();
  const { username } = useAuth();

  const [title, setTitle] = useState(product?.title);
  const [calories, setCalories] = useState(product?.calories);
  const [proteins, setProteins] = useState(product?.proteins);
  const [fats, setFats] = useState(product?.fats);
  const [carbohydrates, setCarbohydrates] = useState(product?.carbohydrates);
  const [checked, setChecked] = useState(product?.isFavorite);
  const [errMsg, setErrMsg] = useState("");

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const closeModal = () => setVisible(false);

  const getUpdatedProduct = () => {
    return {
      id: product.id,
      title: title,
      proteins: proteins,
      fats: fats,
      carbohydrates: carbohydrates,
      calories: calories,
      isFavorite: checked,
    };
  };
  const updatedProduct = product && carbohydrates && getUpdatedProduct();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { userData } = await updateProduct({
        username,
        updatedProduct,
      }).unwrap();
      dispatch(setData({ userData }));
    } catch (error) {
      setErrMsg(error);
    }
    setVisible(false);
  };

  useEffect(() => {
    setTitle(product?.title);
    setChecked(product?.isFavorite);
    setProteins(product?.proteins);
    setFats(product?.fats);
    setCarbohydrates(product?.carbohydrates);
    setCalories(product?.calories);
  }, [visible]);

  if (isLoading) return <Skeleton />;

  return (
    <ModalWrapper
      show={visible}
      setVisible={setVisible}
      closeModal={closeModal}
      title={EDIT_PRODUCT}
    >
      <form onSubmit={handleSubmit}>
        <label className="label mt-4">{NAME}</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={NAME}
          className="input p-4"
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
            <button type="button" className="clearBtn" onClick={closeModal}>
              {CANCEL}
            </button>
            <button type="submit" className="btn">
              {EDIT}
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
