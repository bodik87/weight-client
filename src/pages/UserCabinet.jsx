import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useDeleteUserMutation,
  useSendLogoutMutation,
} from "../redux/apis/usersActionsApi";
import { selectCurrentState } from "../redux/userSlice";
import useAuth from "../hooks/useAuth";
import ProductOptions from "../components/Modals/ProductOptions/ProductOptions";
import Table from "../components/UI/Table";
import Search from "../components/UI/Search";
import {
  DELETE_USER,
  DELETE_USER_ALERT,
  DELETE_USER_BTN,
  EXIT,
  SETTINGS,
} from "../assets/CONSTANTS";

export default function UserCabinet() {
  const navigate = useNavigate();

  const { username } = useAuth();
  const { userData } = useSelector(selectCurrentState);

  const [sendLogout, { isSuccess, isError, error }] = useSendLogoutMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [editableProduct, setEditableProduct] = useState(null);
  const [productOptionsModal, setProductOptionsModal] = useState(false);
  const handleProductOptionsModal = (product) => {
    setEditableProduct(product);
    setProductOptionsModal(true);
  };

  const handleUserDelete = async () => {
    try {
      confirm(DELETE_USER_ALERT) &&
        (await deleteUser({ username }).unwrap()) &&
        navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(
    userData?.products || []
  );

  const handleChange = (e) => {
    let lowerCase = e.target.value.toLowerCase().trim();
    const filteredData = userData?.products?.filter((el) => {
      if (lowerCase === "") return userData?.products;
      else return el.title.trim().toLowerCase().includes(lowerCase);
    });
    setFilteredProducts(filteredData);
    setSearchQuery(lowerCase);
  };

  const handleBackspaceClick = () => {
    setFilteredProducts(userData?.products);
    setSearchQuery("");
  };

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  useEffect(() => {
    setFilteredProducts(userData?.products);
  }, [userData?.products]);

  return (
    <>
      <ProductOptions
        visible={productOptionsModal}
        setVisible={setProductOptionsModal}
        product={editableProduct}
      />
      <section className="relative pb-20">
        <label className="label">{username}</label>
        <div className="flex items-center justify-between mb-6">
          <h1 className="title">{SETTINGS}</h1>
          <button
            onClick={sendLogout}
            className="btn h-10 bg-[#E44D26] hover:bg-[#d6411b] dark:bg-red-200 dark:hover:bg-red-300 focus:ring-red-300 dark:focus:ring-red-800"
          >
            {EXIT}
          </button>
        </div>

        <Search
          searchQuery={searchQuery}
          handleBackspaceClick={handleBackspaceClick}
          handleChange={handleChange}
        />

        <Table
          productsArray={filteredProducts}
          modalFunction={handleProductOptionsModal}
          heightVh={100}
        />
        <div>
          <label className="label mt-8 text-red-800 dark:text-red-300">
            {DELETE_USER}
          </label>
          <button
            onClick={handleUserDelete}
            className="btn h-10 mt-2 bg-red-600 hover:bg-red-500 dark:bg-red-200 dark:hover:bg-red-300 focus:ring-red-300 dark:focus:ring-red-800"
          >
            {DELETE_USER_BTN}
          </button>
        </div>
      </section>
    </>
  );
}
