import { Dialog, Combobox } from "@headlessui/react";
import { SearchIcon, SyncIcon } from "@primer/octicons-react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import Image from "next/image";
import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import useSWR, { KeyedMutator } from "swr";
import { debounce } from "lodash";

import { fetcher } from "../../lib/fetcher";
import { SignInRole } from "../../pages/sign-in";
import { Movie } from "../../modal/user.modal";

const SyncSection = (
  <div className="w-full flex justify-center">
    <SyncIcon className="animate-spin h-8 w-8 mr-3 mt-3 mb-5 text-white" />
  </div>
);

interface SearchPaletteProps {
  showSearch: boolean;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
  username: string;
  mutateUserData: KeyedMutator<any>;
}

const SearchPalette: React.FC<SearchPaletteProps> = ({
  showSearch,
  setShowSearch,
  username,
  mutateUserData,
}: SearchPaletteProps) => {
  const [query, setQuery] = useState("");
  const { data, error, mutate } = useSWR(
    query
      ? `/api/movies?title=${encodeURIComponent(query)}&username=${username}`
      : null,
    fetcher
  );

  const debouncedChangeEvent = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setQuery(event.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useCallback(
    debounce(debouncedChangeEvent, 1000),
    []
  );

  const handleSelectedMovie = async (movie: Movie) => {
    await axios.post(`/api/add-movie?username=${username}`, {
      ...movie,
    });

    mutateUserData();
    setShowSearch(false);
  };

  useEffect(() => {
    debouncedChangeHandler.cancel();

    if (query.length > 0) {
      mutate();
    }
  }, [query, debouncedChangeHandler, mutate]);

  if (error) {
    return <div>Failed to load</div>;
  }

  return (
    <Dialog
      open={showSearch}
      onClose={() => setShowSearch(false)}
      className="fixed inset-0 px-8 sm:px-4 pt-40 overflow-y-auto z-50"
    >
      <Dialog.Overlay className="fixed inset-0 bg-neutral-500 opacity-75 "></Dialog.Overlay>

      <Combobox
        onChange={setQuery}
        as="div"
        className="relative bg-neutral-700 max-w-xl mx-auto rounded-xl shadow-2xl flex flex-col max-h-[70vh] overflow-y-auto scrollbar-hide"
        value={query}
      >
        <div className="flex items-center px-4 mx-4 my-4 bg-neutral-700 rounded-xl border-neutral-500 hover:border-neutral-200 border">
          <SearchIcon className="mr-4 h-6 w-6 text-neutral-400" />
          <Combobox.Input
            onChange={debouncedChangeHandler}
            placeholder="Add Movie..."
            className="w-full bg-transparent outline-none border-none text-sm text-neutral-400 placeholder-neutral-400 h-12"
          />
        </div>

        <Combobox.Options>
          {!data
            ? SyncSection
            : data.movieResults
                ?.filter((movie: Movie) => movie.poster_path !== "N/A")
                .map((movie: Movie) => (
                  <div key={movie.title} className="p-4 text-sm text-white">
                    <button
                      className="rounded-lg shadow-md w-full group relative bg-neutral-800"
                      disabled={username === SignInRole.GUEST}
                      onClick={() => handleSelectedMovie(movie)}
                    >
                      <span className="hidden group-hover:block absolute right-[44%] top-1/2">
                        <PlusCircleIcon className="w-10 h-10 text-neutral-300" />
                      </span>

                      <div className="flex flex-row text-left gap-x-4 hover:opacity-50 px-4 py-8">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
                          width={100}
                          height={150}
                          className="text-2xl"
                          alt="image"
                        />
                        <div className="flex flex-col">
                          <span className="text-2xl mr-auto">
                            {movie.title}
                          </span>
                          <span className="text-xl mr-auto">
                            {movie.release_date.split("-")[0]}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
        </Combobox.Options>
      </Combobox>
    </Dialog>
  );
};

export { SearchPalette };
