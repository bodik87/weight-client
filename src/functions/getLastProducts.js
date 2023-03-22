import { add, format } from "date-fns";

export function getLastProducts(meals) {
  const yesterday = format(add(new Date(), { days: -1 }), "yyyy-MM-dd");
  const dayBeforeYesterday = format(
    add(new Date(), { days: -2 }),
    "yyyy-MM-dd"
  );
  const threeDaysAgo = format(add(new Date(), { days: -3 }), "yyyy-MM-dd");

  try {
    const yesterdaysProducts = meals
      .filter((meal) => meal.date === yesterday)
      .map((meal) => meal.product);
    const dayBeforeYesterdayProducts = meals
      .filter((meal) => meal.date === dayBeforeYesterday)
      .map((meal) => meal.product);
    const threeDaysAgoProducts = meals
      .filter((meal) => meal.date === threeDaysAgo)
      .map((meal) => meal.product);

    const previousProducts = [
      ...yesterdaysProducts,
      ...dayBeforeYesterdayProducts,
      ...threeDaysAgoProducts,
    ];

    const lastThreeDaysProducts = [
      ...new Set(previousProducts.map((product) => JSON.stringify(product))),
    ].map((str) => JSON.parse(str));

    return lastThreeDaysProducts;
  } catch (error) {
    return;
    console.log(error);
  }
}
