import { useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../../redux/userSlice";
import { useUpdateUserWeightMutation } from "../../redux/apis/usersActionsApi";
import useAuth from "../../hooks/useAuth";
import ModalWrapper from "../UI/ModalWrapper";
import { BODY_WEIGHT, EDIT, WARNING_INPUT } from "../../assets/CONSTANTS";
import Skeleton from "../UI/Skeleton";

export default function BodyWeight({ visible, setVisible, weight }) {
  const dispatch = useDispatch();
  const { username } = useAuth();

  const closeModal = () => setVisible(false);

  const [updateBodyWeight, { isLoading }] = useUpdateUserWeightMutation();

  const [value, setValue] = useState(weight);
  const validValue = value > 50;

  const handleSubmit = async () => {
    try {
      if (validValue) {
        const { userData } = await updateBodyWeight({
          username,
          value,
        }).unwrap();
        dispatch(setData({ userData }));
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Skeleton />;

  return (
    <ModalWrapper
      show={visible}
      setVisible={setVisible}
      closeModal={closeModal}
      title={BODY_WEIGHT}
    >
      <label className={`mt-4 label ${!validValue && "text-red-600"}`}>
        {WARNING_INPUT}
      </label>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        step={0.1}
        placeholder={BODY_WEIGHT}
        className="input"
        min="50"
        required
      />

      <button type="submit" onClick={handleSubmit} className="btn mt-4">
        {EDIT}
      </button>
    </ModalWrapper>
  );
}
