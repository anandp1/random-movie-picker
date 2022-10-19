import React from "react";
import { KeyedMutator } from "swr";
import ShuffleModal from "../home/shuffle-modal";
import { SafeUser } from "../../modal/user.modal";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { Bounce } from "react-reveal";
import { Fade } from "react-reveal";

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
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <Bounce>
          <div className="relative flex lg:w-auto lg:static mt-6">
            <a href="/">
            <img
            className="w-[250px] lg:w-[300px] mx-8"
            src={"logo.png"}
            alt={"Logo"}
            />
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {/* <i className="fas fa-bars"></i> */}
            </button>
          </div>
          </Bounce>
          <Fade duration={1000}>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                          <button
            onClick={() => setShowShuffle(true)}
          >
            <span className="px-3 py-2 flex cursor-pointer items-center text-lg lowercase font-bold leading-snug text-white hover:opacity-75 antialised tracking-wider">shuffle</span>
          </button>
              </li>
              <li className="nav-item">
                <span className="px-3 py-2 flex cursor-pointer items-center text-lg lowercase font-bold leading-snug text-white hover:opacity-75 antialised tracking-wider">Settings</span>
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
  
