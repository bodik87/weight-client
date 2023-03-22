export function getDailyСonsumedNutrients(meals) {
  const dailyСonsumedCalories = meals
    ?.map((meal) => (meal?.product?.calories * meal?.weight) / 100)
    .reduce((acc, item) => acc + item, 0);
  const dailyСonsumedProteins = meals
    ?.map((meal) => (meal?.product?.proteins * meal?.weight) / 100)
    .reduce((acc, item) => acc + item, 0);
  const dailyСonsumedFats = meals
    ?.map((meal) => (meal?.product?.fats * meal?.weight) / 100)
    .reduce((acc, item) => acc + item, 0);
  const dailyСonsumedCarbohydrates = meals
    ?.map((meal) => (meal?.product?.carbohydrates * meal?.weight) / 100)
    .reduce((acc, item) => acc + item, 0);
  return {
    dailyСonsumedCalories,
    dailyСonsumedProteins,
    dailyСonsumedFats,
    dailyСonsumedCarbohydrates,
  };
}

export function getPercentageOfNutrients(
  daylyNormOfProteins,
  dailyСonsumedProteins,
  daylyNormOfFats,
  dailyСonsumedFats,
  daylyNormOfCarbohydrates,
  dailyСonsumedCarbohydrates
) {
  const proteinsPercent = Math.round(
    (dailyСonsumedProteins / daylyNormOfProteins) * 100
  );
  const fatsPercent = Math.round((dailyСonsumedFats / daylyNormOfFats) * 100);
  const carbohydratesPercent = Math.round(
    (dailyСonsumedCarbohydrates / daylyNormOfCarbohydrates) * 100
  );

  return {
    proteinsPercent,
    fatsPercent,
    carbohydratesPercent,
  };
}

export function getDaylyNorm(weight = 0) {
  const normOfProteins = weight * 1.5;
  const normOfFats = weight * 1;
  const normOfCarbohydrates = weight * 2;
  const normOfCalories =
    normOfProteins * 4 + normOfFats * 8 + normOfCarbohydrates * 3;
  return {
    normOfProteins,
    normOfFats,
    normOfCarbohydrates,
    normOfCalories,
  };
}
