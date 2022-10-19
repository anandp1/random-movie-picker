/* eslint-disable @next/next/no-img-element */
import { Movie } from "../../modal/user.modal";
import { Fade } from "react-reveal";

export interface MovieComponentProps {
  movie: Movie;
}

const MovieComponent: React.FC<MovieComponentProps> = ({
  movie,
}: MovieComponentProps) => {
  return (
    <Fade left duration={1000}>
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
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center ">
            {movie.title}
          </p>
        </div>
      </div>
    </Fade>
  );
};
export default MovieComponent;
