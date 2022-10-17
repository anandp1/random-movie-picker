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
      <h2 className="text-white font-bold md:text-xl p-2">
        {data.moviesByUser[username].displayName}
      </h2>
      <div className="relative flex items-center group">
        <ChevronLeftIcon
          onClick={slideLeft}
          className="h-8 w-8 left-2 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <div
          id={"slider" + randomId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {data.moviesByUser[username].movies?.map((movie: Movie) => {
            return <MovieComponent movie={movie} key={movie.title} />;
          })}
        </div>
        <ChevronRightIcon
          onClick={slideRight}
          className="h-8 w-8 right-1 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
    </>
  );
};

export default MovieRow;
