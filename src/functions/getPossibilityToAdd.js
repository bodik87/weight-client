import { isAfter } from "date-fns";
import { yesterday } from "../components/DatePicker";

export const getPossibilityToAdd = (date) => {
  const possibilityToAdd = isAfter(new Date(date), new Date(yesterday));
  return possibilityToAdd;
};
