import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { SearchPalette } from "./search-palette";

const NavBar = (): JSX.Element => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {showSearch && (
        <SearchPalette showSearch={showSearch} setShowSearch={setShowSearch} />
      )}
      <div className="absolute right-[44%] bottom-0 flex flex-row items-center gap-12 my-3 mx-auto">
        <div className="flex w-full items-center space-x-4">
          <button
            className="h-14 w-14 shadow-lg rounded-full border border-blue-600 bg-blue-600"
            onClick={() => setShowSearch(true)}
          >
            <SearchIcon className="w-7 h-7 mx-auto text-white" />
          </button>
          <button className="h-14 w-14 shadow-lg rounded-full border border-blue-600 bg-blue-600">
            <ShuffleIcon className="w-7 h-7 mx-auto text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export { NavBar };
