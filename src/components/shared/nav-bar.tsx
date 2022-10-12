import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

const NavBar = (): JSX.Element => {
  return (
    <div className="flex flex-row items-center gap-12 bg-black my-3 mx-auto">
      <div className="flex w-full items-center space-x-4">
        <button className="h-14 w-14 shadow-lg rounded-full border border-gray-400 bg-gray-400">
          <SearchIcon className="w-7 h-7 mx-auto text-white" />
        </button>
      </div>
    </div>
  );
};

export { NavBar };
