import React from "react";
import { KeyedMutator } from "swr";
import ShuffleModal from "../home/shuffle-modal";
import { SafeUser } from "../../modal/user.modal";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SettingsIcon from "@mui/icons-material/Settings";
import { Fade, Bounce } from "react-awesome-reveal";

interface NavigationProps {
  username: string;
  mutateUserData: KeyedMutator<any>;
  availableUsers: SafeUser[];
}

  const Navigation = ({
    username,
    mutateUserData,
    availableUsers,
}: NavigationProps) => {;
  const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [showShuffle, setShowShuffle] = React.useState(false);
  return (
    <>
      {showShuffle && (
        <ShuffleModal
          showShuffle={showShuffle}
          setShowShuffle={setShowShuffle}
          availableUsers={availableUsers}
        />
      )}

      <nav className="relative flex flex-wrap items-center justify-between sm:px-2 sm:my-3">
        <div className="container flex flex-wrap items-center justify-between sm:px-4 mx-auto ">

          {/* logo */}
          <Bounce>
            <div className="relative flex sm:mt-6 hover:opacity-75">
              <a href="/">
              <img
              className="w-[220px] lg:w-[300px] sm:mx-8 my-2 sm:mb-8 "
              src={"logo.png"}
              alt={"Logo"}
              />
              </a>
            </div>
          </Bounce>

          {/* options */}
          <Fade>
            {/* dropdown menu - commented out in case we add more options */}
            {/* <button className="text-white cursor-pointer sm:hidden hover:opacity-75" onClick={() => setNavbarOpen(!navbarOpen)}>
              <ViewHeadlineIcon className="w-6 h-6" />
            </button> */}
            <div className={"sm:flex flex-grow items-center" + (navbarOpen ? " flex" : " flex")}>
              <ul className="flex flex-row list-none lg:ml-auto">
                {/* shuffle */}
                <li className="nav-item mt-1">
                  <button className = "mx-2 flex cursor-pointer items-center text-white hover:opacity-75" onClick={() => setShowShuffle(true)}>
                    <span className="px-2 sm:block hidden sm:text-md md:text-lg lowercase font-bold tracking-wider">Shuffle</span>
                    <ShuffleIcon className="text-white w-7 h-7" />
                  </button>
                </li>
                {/* settings */}
                <li className="nav-item mt-1">
                  <button className = "mx-2 flex cursor-pointer items-center text-white hover:opacity-75">
                    <span className="px-2 sm:block hidden sm:text-md md:text-lg lowercase font-bold tracking-wider">Settings</span>
                    <SettingsIcon className="text-white w-7 h-7" />
                  </button>
                </li>
              </ul>
            </div>
          </Fade>

        </div>
      </nav>

    </>
  );
};

export { Navigation };