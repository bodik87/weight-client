import { useSelector } from "react-redux";
import {
  LET_ADD,
  NONE,
  NONE_SECOND_LINE,
  NOTHING_ADDED,
} from "../assets/CONSTANTS";
import DatePicker from "../components/DatePicker";
import Meal from "../components/Meal";

export default function MealsPage() {
  return (
    <section className="flex items-center justify-center flex-col">
      <DatePicker />
      <Meal />
    </section>
  );
}
