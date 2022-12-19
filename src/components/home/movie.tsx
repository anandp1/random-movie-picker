/* eslint-disable @next/next/no-img-element */
import { Movie } from "../../modal/user.modal";
import TrashIcon from "@heroicons/react/solid/TrashIcon";
import axios from "axios";
import { KeyedMutator } from "swr";
import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";

export interface MovieComponentProps {
  movie: Movie;
  yourUsername: string;
  editMode: boolean;
  username: string;
  mutateUserData: KeyedMutator<any>;
  index: number;
  isLastMovie: boolean;
}

const deleteMovie = async (movie: Movie, yourUsername: string) => {
  await axios.delete(
    `/api/delete-movie?username=${yourUsername}&id=${movie.id}`
  );
};

const MovieComponent: React.FC<MovieComponentProps> = ({
  movie,
  yourUsername,
  editMode,
  username,
  mutateUserData,
  index,
  isLastMovie,
}: MovieComponentProps) => {
  const movieMargin = isLastMovie
    ? "ml-2 sm:ml-4 md:ml-7"
    : "mr-2 sm:mr-4 md:mr-7";
  return (
    <div
      key={movie.id}
      className={classNames(
        "w-[130px] sm:w-[150px] md:w-[180px] lg:w-[220px] inline-block cursor-pointer relative",
        index === 0 || isLastMovie ? movieMargin : "mx-2 sm:mx-4 md:mx-7"
      )}
    >
      <img
        className="w-full h-auto block"
        src={movie.poster_path}
        alt={movie.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-neutral-900/80 opacity-0 hover:opacity-100 text-white">
        {editMode && yourUsername === username && (
          <TrashIcon
            className={
              "absolute top-4 right-4 w-[24px] opacity-80 hover:opacity-60 cursor-pointer"
            }
            onClick={async () => {
              await deleteMovie(movie, yourUsername);
              mutateUserData();
            }}
          />
        )}
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center ">
          {movie.title}
        </p>
      </div>
    </div>
  );
};
export default MovieComponent;
