import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../../../redux/userSlice";
import { useDeleteProductMutation } from "../../../redux/apis/productsApi";
import useAuth from "../../../hooks/useAuth";
import EditProduct from "./EditProduct";
import ModalWrapper from "../../UI/ModalWrapper";
import Skeleton from "../../UI/Skeleton";
import { DELETE, EDIT } from "../../../assets/CONSTANTS";

export default function ProductOptions({ visible, setVisible, product }) {
  const dispatch = useDispatch();
  const { username } = useAuth();

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const [editProductModal, setEditProductModal] = useState(false);
  const handleEditProductModal = () => {
    setVisible(false);
    setEditProductModal(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const { userData } = await deleteProduct({
        username,
        id,
      }).unwrap();
      dispatch(setData({ userData }));
    } catch (error) {
      console.log(error);
    }
    setVisible(false);
  };

  const closeModal = () => setVisible(false);

  if (isLoading) return <Skeleton />;

  return (
    <>
      <EditProduct
        visible={editProductModal}
        setVisible={setEditProductModal}
        product={product}
      />

      <ModalWrapper
        show={visible}
        setVisible={setVisible}
        closeModal={closeModal}
        title={product?.title}
      >
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            className="btn w-full block bg-red-600 hover:bg-red-700 dark:bg-[#CE915B] dark:hover:bg-[#e69752] focus:ring-red-300 dark:focus:ring-red-800 whitespace-nowrap"
            onClick={() => handleDeleteProduct(product?.id)}
          >
            {DELETE}
          </button>

          <button
            type="button"
            className="btn w-full whitespace-nowrap"
            onClick={handleEditProductModal}
          >
            {EDIT}
          </button>
        </div>
      </ModalWrapper>
    </>
  );
}
