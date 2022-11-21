import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Movie } from "../../modal/user.modal";
import MovieComponent from "./movie";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { PencilIcon } from "@heroicons/react/solid";
import { SearchPalette } from "../shared/search-palette";
import { KeyedMutator } from "swr";
import React, { useState } from "react";

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

      <div className="grid grid-cols-12 my-6 h-full">
        <div></div>
        <div></div>
        <h2
          className="text-white col-span-6 sm:text-lg md:text-xl lg:text-2xl font-bold px-2 antialised tracking-wider"
          id="nav-title"
        >
          {yourUsername === username
            ? "Your Picks"
            : data.moviesByUser[username].displayName}
          {yourUsername === username && (
            <button
              className="opacity-90 hover:opacity-70 top-1 bottom-0 left-5 relative m-auto content-center"
              onClick={() => setShowSearch(true)}
            >
              <PlusCircleIcon className="w-6 text-content-center items-center white" />
            </button>
          )}
          {yourUsername === username && (
            <button
              className="opacity-90 hover:opacity-70 top-1 bottom-0 left-5 relative m-auto"
              // onClick={() => setShowSearch(true)}
            >
              <PencilIcon className="w-6 ml-2 mt-9 text-content-center white" />
            </button>
          )}        
        </h2>

        <div></div>
        <div></div>
      </div>

      <div className="grid grid-cols-12">
        <div></div>
        <div className="ggroup relative hidden sm:block h-full px-9">
          <ChevronLeftIcon
            onClick={slideLeft}
            className="absolute top-0 bottom-0 right-12 m-auto w-10 h-10 cursor-pointer opacity-10 hover:opacity-80 text-white"
          />
        </div>
        <div
          id={"slider" + randomId}
          className="w-full h-full mb-3 overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative antialiased tracking-wider col-span-8"
        >
          {data.moviesByUser[username].movies?.map((movie: Movie, index) => {   
            return <MovieComponent movie={movie} key={index} yourUsername={yourUsername} mutateUserData={mutateUserData} />;
          })}
        </div>
        <div className="group relative hidden sm:block h-full px-2">
          <ChevronRightIcon
            onClick={slideRight}
            className="absolute top-0 bottom-0 left-12 m-auto w-10 h-10 cursor-pointer opacity-10 hover:opacity-80 text-white"
          />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default MovieRow;
