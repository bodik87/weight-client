import React from "react";
import { SEARCH } from "../../assets/CONSTANTS";
import BackspaceIcon from "./Icons/BackspaceIcon";
import SearchIcon from "./Icons/SearchIcon";

export default function Search({
  searchQuery,
  handleBackspaceClick,
  handleChange,
}) {
  return (
    <div className="relative mt-4">
      <div className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon />
      </div>
      {searchQuery && (
        <div
          onClick={() => {
            handleBackspaceClick();
          }}
          className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center pr-4 cursor-pointer"
        >
          <BackspaceIcon />
        </div>
      )}
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder={SEARCH}
        className="input px-11 mb-4"
      />
    </div>
  );
}
