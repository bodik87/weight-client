import React from "react";
import { Link } from "react-router-dom";
import { LOGIN, APP } from "../assets/CONSTANTS";

export default function PromoPage() {
  return (
    <div className="flex flex-col grow justify-around items-center">
      <h1 className="title">{APP}</h1>
      <Link className="btn flex items-center" to="/login">
        {LOGIN}
      </Link>
    </div>
  );
}
