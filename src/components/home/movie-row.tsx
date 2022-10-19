import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Movie } from "../../modal/user.modal";
import MovieComponent from "./movie";

interface MovieRowProps {
  data: any;
  randomId: number;
  username: string;
  yourUsername: string;
}

const MovieRow: React.FC<MovieRowProps> = ({
  data,
  randomId,
  username,
  yourUsername,
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
      <h2 className="text-white my-5 mx-9 px-9 sm:text-lg md:text-xl lg:text-2xl font-bold px-2 antialised tracking-wider" id="nav-title">
        {yourUsername === username
          ? "Your Picks"
          : data.moviesByUser[username].displayName}
      </h2>
      <div className="relative flex items-center group">
        <div className="group relative hidden sm:block h-full">
          <ChevronLeftIcon
            onClick={slideLeft}
            className="absolute top-0 bottom-0 left-[0.4px] z-40 m-auto w-10 cursor-pointer opacity-0 text-white group-hover:bg-black group-hover:opacity-100 group-hover:bg-opacity-40 h-full"
          />
        </div>
        <div
          id={"slider" + randomId} 
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative mx-9 tracking-wider"
        >
          {data.moviesByUser[username].movies?.map((movie: Movie, index) => {
            return <MovieComponent movie={movie} key={index} />;
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
