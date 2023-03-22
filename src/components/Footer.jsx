import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentState } from "../redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { getPossibilityToAdd } from "../functions/getPossibilityToAdd";
import BodyWeight from "./Modals/BodyWeight";
import NavMenu from "./Modals/NavMenu";
import AddToMeal from "./Modals/AddToMeal/AddToMeal";
import BackIcon from "./UI/Icons/BackIcon";
import MenuIcon from "./UI/Icons/MenuIcon";
import PlusIcon from "./UI/Icons/PlusIcon";
import { KG, WEIGHT } from "../assets/CONSTANTS";

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { userData } = useSelector(selectCurrentState);

  const [weightModal, setWeightModal] = useState(false);
  const handleWeightModal = () => setWeightModal(true);

  const [addToMealModal, setAddToMealModal] = useState(false);
  const handleAddToMealModal = () => setAddToMealModal(true);

  const [menuModal, setMenuModal] = useState(false);
  const handleMenuModal = () => setMenuModal(true);

  const onGoHomeClicked = () => navigate("/userpage");

  const { date } = useSelector((state) => state.date);
  const possibilityToAdd = getPossibilityToAdd(date);

  return (
    <>
      <BodyWeight
        visible={weightModal}
        setVisible={setWeightModal}
        weight={userData?.weight}
      />

      <AddToMeal visible={addToMealModal} setVisible={setAddToMealModal} />

      <NavMenu visible={menuModal} setVisible={setMenuModal} />

      <div className="fixed bottom-0 left-0 w-full p-3 bg-white/60 dark:bg-[#444] backdrop-blur-md shadow-[0_2px_20px_0px_rgba(0,0,0,0.2)]">
        <div className="flex justify-between items-center w-full max-w-xl mx-auto">
          <div className="flex items-center gap-2">
            <button onClick={handleWeightModal} className="clearBtn">
              {WEIGHT}: {userData?.weight} {KG}
            </button>
            {possibilityToAdd && (
              <button onClick={handleAddToMealModal} className="clearBtn">
                <PlusIcon />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {pathname !== "/userpage" && (
              <button onClick={onGoHomeClicked} className="clearBtn">
                <BackIcon />
              </button>
            )}
            <button onClick={handleMenuModal} className="clearBtn">
              <MenuIcon w={24} h={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
