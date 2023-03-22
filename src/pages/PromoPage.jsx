import React from "react";
import { Link } from "react-router-dom";
import { LOGIN, APP, PROMO } from "../assets/CONSTANTS";
import Pic from "/body.webp";

export default function PromoPage() {
  return (
    <div className="flex flex-col grow justify-center items-center">
      <img
        className="fixed inset-0 -z-10 w-full h-full object-cover object-left blur-sm"
        src={Pic}
        alt="background"
      />
      <div className="flex flex-col items-center justify-center bg-white/80 px-20 py-10 rounded-2xl backdrop-blur-sm shadow-2xl">
        <h1 className="title">{APP}</h1>
        <p className="label  mt-2">{PROMO}</p>
        <Link className="btn mt-4 flex items-center" to="/login">
          {LOGIN}
        </Link>
      </div>
    </div>
  );
}
