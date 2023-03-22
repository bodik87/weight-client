import { BREAKFAST, DINNER, LUNCH, SNACK } from "../assets/CONSTANTS";

export function getTextFormatedTitle(text) {
  switch (text) {
    case "breakfast":
      return BREAKFAST;
    case "lunch":
      return LUNCH;
    case "dinner":
      return DINNER;
    case "snack":
      return SNACK;
  }
}
