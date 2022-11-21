/* eslint-disable @next/next/no-img-element */
import { Movie } from "../../modal/user.modal";
import { XIcon } from "@heroicons/react/outline";
import axios from "axios";
import { KeyedMutator } from "swr";

export interface MovieComponentProps {
  movie: Movie;
  yourUsername: string,
  mutateUserData: KeyedMutator<any>
}

const deleteMovie = async (
  title:string,
  imageUrl: string,
  imdbID: string,
  userName: string
) => {

  await axios.delete(`/api/delete-movie?imdbID=${imdbID}&username=${userName}&title=${title}&imageUrl=${imageUrl}`);
}

const MovieComponent: React.FC<MovieComponentProps> = ({
  movie,
  yourUsername,
  mutateUserData
}: MovieComponentProps) => {
  return (
      <div
        key={movie.imbdId}
        className="w-[130px] sm:w-[150px] md:w-[180px] lg:w-[220px] inline-block cursor-pointer relative p-2 sm:mx-4 md:mx-7"
      >
        <img
          className="w-full h-auto block"
          src={movie.imageUrl}
          alt={movie.title}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-neutral-900/80 opacity-0 hover:opacity-100 text-white">
          <XIcon
            className="absolute left-0 w-[50px] sm:w-[50px] md:w-[50px]"
            onClick={ async () => {
              await deleteMovie(movie.title,movie.imageUrl,movie.imbdId,yourUsername);
              mutateUserData();
            }}
          />
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center ">
            {movie.title}
          </p>
        </div>
      </div>
  );
};
export default MovieComponent;
