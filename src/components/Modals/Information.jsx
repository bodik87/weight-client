import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { selectCurrentState } from "../../redux/userSlice";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDaylyNorm,
  getDailyСonsumedNutrients,
  getPercentageOfNutrients,
} from "../../functions/getNutrientsValues";
import {
  ADVICES,
  ATTITUDE,
  ATTITUDE_TITLE,
  CAL,
  CALORIES,
  CARBOHIDR,
  DOCTOR,
  FATS,
  INFO,
  MAIN,
  MAIN_TITLE,
  MORE_INFO,
  PROTEINS,
  TARGET,
  TARGET_TITLE,
} from "../../assets/CONSTANTS";
import { Link } from "react-router-dom";

export default function Information({ visible, setVisible }) {
  const [advises, setAdvises] = useState(false);

  function closeModal() {
    setAdvises(false);
    setVisible(false);
  }

  const { userData } = useSelector(selectCurrentState);
  const { date } = useSelector((state) => state.date);
  const daylyMeals = userData?.meals?.filter((meal) => meal.date === date);
  const weight = userData?.weight;

  const { normOfProteins, normOfFats, normOfCarbohydrates, normOfCalories } =
    getDaylyNorm(weight);

  const {
    dailyСonsumedCalories,
    dailyСonsumedProteins,
    dailyСonsumedFats,
    dailyСonsumedCarbohydrates,
  } = getDailyСonsumedNutrients(daylyMeals);

  const caloriesPercentage = Math.round(
    (dailyСonsumedCalories / normOfCalories) * 100
  );

  function getColorNotification(percent) {
    if (percent > 85) return "#DC2626";
    if (percent > 60 && percent <= 85) return "#FF7043";
    else return "#16A34A";
  }
  const colorNotification = getColorNotification(caloriesPercentage);

  const { proteinsPercent, fatsPercent, carbohydratesPercent } =
    getPercentageOfNutrients(
      normOfProteins,
      dailyСonsumedProteins,
      normOfFats,
      dailyСonsumedFats,
      normOfCarbohydrates,
      dailyСonsumedCarbohydrates
    );

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="fixed inset-0" onClose={closeModal}>
        <div className="relative max-w-xl mx-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-0"
            enterTo="opacity-100 translate-y-3"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-3"
            leaveTo="opacity-0 translate-y-0"
          >
            <Dialog.Panel className="absolute top-[60px] max-h-[75vh] overflow-y-auto right-4 max-w-xs w-full bg-white/90 backdrop-blur-md p-6 pb-4 overflow-hidden rounded-2xl shadow-lg transition-all">
              {!advises ? (
                <>
                  <Nutrient
                    nutrient={CALORIES}
                    concumed={dailyСonsumedCalories}
                    norm={normOfCalories}
                    percent={Math.round(
                      (dailyСonsumedCalories / normOfCalories) * 100
                    )}
                    colorNotification={colorNotification}
                    size="70px"
                  />
                  <Nutrient
                    nutrient={PROTEINS}
                    concumed={dailyСonsumedProteins}
                    norm={normOfProteins}
                    percent={proteinsPercent}
                    colorNotification={colorNotification}
                    size="60px"
                  />
                  <Nutrient
                    nutrient={FATS}
                    concumed={dailyСonsumedFats}
                    norm={normOfFats}
                    percent={fatsPercent}
                    colorNotification={colorNotification}
                    size="60px"
                  />
                  <Nutrient
                    nutrient={CARBOHIDR}
                    concumed={dailyСonsumedCarbohydrates}
                    norm={normOfCarbohydrates}
                    percent={carbohydratesPercent}
                    colorNotification={colorNotification}
                    size="60px"
                  />
                </>
              ) : (
                <Advises />
              )}
              <div className="mt-6 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setAdvises(!advises)}
                  className="clearBtn h-8 text-sm"
                >
                  {advises ? INFO : ADVICES}
                </button>
                {advises && (
                  <Link
                    to="info"
                    onClick={closeModal}
                    className="ml-4 text-sm text-blue-700"
                  >
                    {MORE_INFO}
                  </Link>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

function Nutrient({
  nutrient = "",
  concumed,
  norm,
  percent,
  colorNotification,
  size,
}) {
  return (
    <div className="flex items-center gap-4 mb-3 select-none">
      <div style={{ width: size }}>
        <CircularProgressbar
          value={percent}
          text={`${percent}%`}
          strokeWidth={12}
          styles={{
            trail: {
              stroke: "#C7CDD4",
            },
            path: {
              stroke: colorNotification,
              strokeLinecap: "round", // 'butt' or 'round'
              transition: "stroke-dashoffset 0.5s ease 0s",
            },
            text: {
              fill: "#000",
              fontWeight: "bold",
            },
          }}
        />
      </div>
      {nutrient && (
        <span className="text-sm text-gray-900">
          {nutrient}: {concumed.toFixed(1)} / {norm.toFixed(1)} {CAL}
        </span>
      )}
    </div>
  );
}

function Advises() {
  return (
    <div className="w-full max-w-xs">
      <h2 className="label dark:text-blue-700 mb-0 font-semibold">
        {TARGET_TITLE}
      </h2>
      <span className="text-sm">{TARGET}</span>

      <h2 className="label dark:text-blue-700 mt-3 mb-0 font-semibold">
        {ATTITUDE_TITLE}
      </h2>
      <span className="text-sm">{ATTITUDE}</span>

      <h2 className="label dark:text-blue-700 mt-3 mb-0 font-semibold">
        {MAIN_TITLE}
      </h2>
      <span className="text-sm">{MAIN}</span>

      <h2 className="label dark:text-red-500 mt-3 mb-0 font-semibold">
        {DOCTOR}
      </h2>
    </div>
  );
}
