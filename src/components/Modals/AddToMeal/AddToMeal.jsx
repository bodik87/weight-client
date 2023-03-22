import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentState } from "../../../redux/userSlice";
import { getLastProducts } from "../../../functions/getLastProducts";
import Table from "../../UI/Table";
import Search from "../../UI/Search";
import NewProduct from "./NewProduct";
import CreateMeal from "./CreateMeal";
import ModalWrapper from "../../UI/ModalWrapper";
import ClockIcon from "../../UI/Icons/ClockIcon";
import HeartIcon from "../../UI/Icons/HeartIcon";
import {
  CHOIСE,
  CANCEL,
  FAVORITES,
  ALL,
  LAST,
  CREATE_NEW_PRODUCT,
} from "../../../assets/CONSTANTS";

export default function AddToMeal({ visible, setVisible }) {
  const { userData } = useSelector(selectCurrentState);

  const [filteredProducts, setFilteredProducts] = useState(
    userData?.products || []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryLabel, setCategoryLabel] = useState(FAVORITES);

  const handleChange = (e) => {
    let lowerCase = e.target.value.toLowerCase().trim();
    const filteredData = userData?.products?.filter((el) => {
      if (lowerCase === "") return userData?.products;
      else return el.title.trim().toLowerCase().includes(lowerCase);
    });
    setFilteredProducts(filteredData);
    setSearchQuery(lowerCase);
  };

  const favoriteProducts =
    userData && userData?.products.filter((product) => product.isFavorite);

  const lastProducts = userData && getLastProducts(userData?.meals);

  const handleAllClick = () => {
    if (categoryLabel !== ALL) setCategoryLabel(ALL);
    setFilteredProducts(userData?.products);
  };
  const handleFavoritesClick = () => {
    if (categoryLabel !== FAVORITES) setCategoryLabel(FAVORITES);
    setFilteredProducts(favoriteProducts);
  };
  const handleLastClick = () => {
    if (categoryLabel !== LAST) setCategoryLabel(LAST);
    setFilteredProducts(lastProducts);
  };
  const handleBackspaceClick = () => {
    setFilteredProducts(userData?.products);
    setSearchQuery("");
    setCategoryLabel(ALL);
  };

  function closeModal() {
    setVisible(false);
    setFilteredProducts(userData?.products);
  }

  const [editableProduct, setEditableProduct] = useState(null);

  const [productWeightModal, setProductWeightModal] = useState(false);
  const handleProductWeightModal = (prod) => {
    setEditableProduct(prod);
    setProductWeightModal(true);
  };

  const [newProductModal, setNewProductModal] = useState(false);
  const handleNewProductModal = () => setNewProductModal(true);

  useEffect(() => {
    setFilteredProducts(userData?.products);
  }, [userData?.products]);

  return (
    <>
      <NewProduct visible={newProductModal} setVisible={setNewProductModal} />

      <CreateMeal
        visible={productWeightModal}
        setVisible={setProductWeightModal}
        product={editableProduct}
      />

      <ModalWrapper
        show={visible}
        setVisible={setVisible}
        closeModal={closeModal}
        title={CHOIСE}
      >
        <label className="mt-4 label">{categoryLabel}</label>
        <div className="inline-flex rounded-md shadow-sm w-full">
          <button
            onClick={handleAllClick}
            type="button"
            className="btnsGroup whitespace-nowrap border rounded-l-md"
          >
            {ALL}
          </button>
          <button
            onClick={handleFavoritesClick}
            type="button"
            className="btnsGroup border-y"
          >
            <HeartIcon w={20} h={20} />
          </button>
          <button
            onClick={handleLastClick}
            type="button"
            className="btnsGroup border rounded-r-md"
          >
            <ClockIcon w={20} h={20} />
          </button>
        </div>

        <Search
          searchQuery={searchQuery}
          handleBackspaceClick={handleBackspaceClick}
          handleChange={handleChange}
        />
        <Table
          productsArray={filteredProducts}
          modalFunction={handleProductWeightModal}
        />

        <div className="mt-6 flex justify-between">
          <button type="button" className="btn" onClick={closeModal}>
            {CANCEL}
          </button>

          <button
            type="button"
            onClick={handleNewProductModal}
            className="clearBtn"
          >
            {CREATE_NEW_PRODUCT}
          </button>
        </div>
      </ModalWrapper>
    </>
  );
}
