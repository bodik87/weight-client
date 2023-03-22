import React from "react";
import { CAL, CARB, FAT, NAME, PROT } from "../../assets/CONSTANTS";

export default function Table({ productsArray, modalFunction, heightVh = 40 }) {
  return (
    <>
      {productsArray?.length > 0 && (
        <div className="pl-3 flex items-center justify-between">
          <div className="w-[55%] label mb-1 text-sm">{NAME}</div>
          <div className="w-[45%] label mb-1 text-sm">
            <div className="flex pr-1">
              <p className="label w-full text-center text-sm mb-1">{PROT}</p>
              <p className="label w-full text-center text-sm mb-1">{FAT}</p>
              <p className="label w-full text-center text-sm mb-1">{CARB}</p>
              <p className="label w-full text-center font-semibold text-sm mb-1">
                {CAL}
              </p>
            </div>
          </div>
        </div>
      )}
      <div
        style={{ maxHeight: `${heightVh}vh` }}
        className="overflow-y-auto rounded-md shadow-md bg-white"
      >
        {productsArray?.map((product) => (
          <div
            key={product?.id}
            onClick={() => modalFunction(product)}
            className={`pl-3 flex items-center justify-between text-sm bg-white dark:text-gray-900 ${
              productsArray && "border-b last:border-none"
            }  hover:bg-blue-700 dark:hover:bg-[#007ACC] dark:bg-gray-200 border-gray-300 dark:border-gray-400 hover:text-white transition-all select-none cursor-pointer`}
          >
            <div className="w-[55%] py-3 border-r overflow-hidden">
              {product.title?.length < 28
                ? product.title
                : product.title?.slice(0, 28) + "..."}
            </div>
            <div className="w-[45%] flex pr-1">
              <p className="py-3 w-full text-center border-r">
                {product.proteins}
              </p>
              <p className="py-3 w-full text-center border-r">{product.fats}</p>
              <p className="py-3 w-full text-center border-r">
                {product.carbohydrates}
              </p>
              <p className="py-3 w-full text-center font-semibold">
                {product.calories}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
