import { ChevronLeftIcon, ChevronRightIcon, PencilIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { Movie } from "../../modal/user.modal";
import MovieComponent from "./movie";
import { SearchPalette } from "../shared/search-palette";
import { KeyedMutator } from "swr";
import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

interface MovieRowProps {
  data: any;
  randomId: number;
  username: string;
  yourUsername: string;
  mutateUserData: KeyedMutator<any>;
}

const MovieRow: React.FC<MovieRowProps> = ({
  data,
  randomId,
  username,
  yourUsername,
  mutateUserData,
}: MovieRowProps) => {
  const slideLeft = () => {
    let slider = document.getElementById("slider" + randomId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider" + randomId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const [showSearch, setShowSearch] = useState(false);

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
      <div className="flex flex-col">
        <div className="flex flex-row my-6 h-full sm:ml-14">
          <h2
            className="text-white col-span-6 sm:text-lg md:text-xl lg:text-2xl font-bold px-2 tracking-wider"
            id="nav-title"
          >
            {yourUsername === username
              ? "Your Picks"
              : data.moviesByUser[username].displayName}
          </h2>

          {yourUsername === username && (
            <button
              className="opacity-90 hover:opacity-70  text-white mx-1"
              onClick={() => setShowSearch(true)}
            >
              <PlusCircleIcon className="w-6 h-6" />
            </button>
          )}
          {yourUsername === username && (
            <button
              className="opacity-90 hover:opacity-70  text-white mx-1"
              // Onclick edit function
            >
              <PencilIcon className="w-6 h-6" />
            </button>
          )}
        </div>

        <Fade direction={"left"} duration={2000} triggerOnce={true} cascade={true}>
          <div className="flex flex-row sm:mx-14">
            <Fade delay={2000} triggerOnce={true} cascade={true}>
            <div className="group relative block h-full px-6 sm:px-9 my-auto">
              <ChevronLeftIcon
                onClick={slideLeft}
                className="absolute top-0 bottom-0 right-4 sm:right-12 m-auto w-10 h-10 cursor-pointer opacity-10 hover:opacity-80 text-white"
              />
            </div>
            </Fade>

            <div
              id={"slider" + randomId}
              className="w-full h-full mb-3 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative antialiased tracking-wider"
            >
              {data.moviesByUser[username].movies?.map(
                (movie: Movie, index) => {
                  return <MovieComponent movie={movie} key={index} yourUsername={yourUsername} mutateUserData={mutateUserData}/>;
                }
              )}
            </div>

            <Fade delay={2000} triggerOnce={true} cascade={true}>
            <div className="group relative block h-full px-9 my-auto">
              <ChevronRightIcon
                onClick={slideRight}
                className="absolute top-0 bottom-0 sm:left-12 m-auto w-10 h-10 cursor-pointer opacity-10 hover:opacity-80 text-white"
              />
            </div>
            </Fade>
          </div>
        </Fade>
        
      </div>
    </>
  );
};

export default MovieRow;
