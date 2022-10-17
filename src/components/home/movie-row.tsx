import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Movie } from "../../modal/user.modal";
import MovieComponent from "./movie";

interface MovieRowProps {
  data: any;
  randomId: number;
  username: string;
}

const MovieRow: React.FC<MovieRowProps> = ({
  data,
  randomId,
  username,
}: MovieRowProps) => {
  const slideLeft = () => {
    let slider = document.getElementById("slider" + randomId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider" + randomId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white sm:text-lg md:text-xl lg:text-3xl px-2">
        {data.moviesByUser[username].displayName}
      </h2>
      <div className="relative flex items-center group">
        <div className="group relative hidden sm:block h-full">
          <ChevronLeftIcon
            onClick={slideLeft}
            className="absolute top-0 bottom-0 left-2 z-40 m-auto w-10 cursor-pointer opacity-0 text-white group-hover:bg-black group-hover:opacity-100 group-hover:bg-opacity-40 h-full"
          />
        </div>
        <div
          id={"slider" + randomId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {data.moviesByUser[username].movies?.map((movie: Movie) => {
            return <MovieComponent movie={movie} key={movie.title} />;
          })}
        </div>
        <div className="group relative hidden sm:block h-full">
          <ChevronRightIcon
            onClick={slideRight}
            className="absolute top-0 bottom-0 right-[0.4px] z-40 m-auto w-12 cursor-pointer opacity-0 text-white group-hover:bg-black group-hover:opacity-100 group-hover:bg-opacity-40 h-full"
          />
        </div>
      </div>
    </>
  );
};

export default MovieRow;
