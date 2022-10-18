import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { SearchPalette } from "./search-palette";
import { KeyedMutator } from "swr";
import ShuffleModal from "../home/shuffle-modal";
import { SafeUser } from "../../modal/user.modal";

interface NavBarProps {
  username: string;
  mutateUserData: KeyedMutator<any>;
  availableUsers: SafeUser[];
}

const NavBar = ({
  username,
  mutateUserData,
  availableUsers,
}: NavBarProps): JSX.Element => {
  const [showSearch, setShowSearch] = useState(false);
  const [showShuffle, setShowShuffle] = useState(false);

  return (
    <>
      {showSearch && (
        <SearchPalette
          username={username}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          mutateUserData={mutateUserData}
        />
      )}
      {showShuffle && (
        <ShuffleModal
          showShuffle={showShuffle}
          setShowShuffle={setShowShuffle}
          availableUsers={availableUsers}
        />
      )}
      <div className="sticky right-[39%] sm:right-[44%] bottom-4 flex flex-row items-center gap-12 mt-auto mx-auto">
        <div className="flex w-full items-center">
          <button
            className="h-7 w-11 shadow-lg hover:scale-125"
            onClick={() => setShowSearch(true)}
          >
            <SearchIcon className="w-7 h-7 mx-auto text-white" />
          </button>
          <button
            className="h-7 w-11 shadow-lg hover:scale-125"
            onClick={() => setShowShuffle(true)}
          >
            <ShuffleIcon className="w-7 h-7 mx-auto text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export { NavBar };
