import { Dialog, Combobox, Disclosure } from "@headlessui/react";
import { GitBranchIcon, SearchIcon, SyncIcon } from "@primer/octicons-react";
import { PlusCircleIcon } from "@heroicons/react/outline";

import {
  Dispatch,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import { debounce, uniqBy } from "lodash";

import { Button } from "@mui/material";
import { fetcher } from "../../lib/fetcher";
import Image from "next/image";

const SyncSection = (
  <div className="w-full flex justify-center">
    <SyncIcon className="animate-spin h-8 w-8 mr-3 mt-3 mb-3" />
  </div>
);

interface SearchPaletteProps {
  showSearch: boolean;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
}

const SearchPalette: React.FC<SearchPaletteProps> = ({
  showSearch,
  setShowSearch,
}: SearchPaletteProps) => {
  const [query, setQuery] = useState("");
  const { data, error, mutate } = useSWR(
    query ? `/api/movies?title=${query}` : null,
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

  const handleSelectedMovie = (
    title: string,
    imdbID: string,
    imageUrl: string
  ) => {
    return;
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
      className="fixed inset-0 p-4 pt-40 overflow-y-auto z-50"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-75 "></Dialog.Overlay>

      <Combobox
        onChange={setQuery}
        as="div"
        className="relative bg-white max-w-xl mx-auto rounded-xl shadow-2xl flex flex-col max-h-[70vh] overflow-y-auto scrollbar-hide"
        value={query}
      >
        <div className="flex items-center px-4 mx-4 my-4 bg-gray-100 rounded-xl">
          <SearchIcon className="mr-4 h-6 w-6 text-gray-500" />
          <Combobox.Input
            onChange={debouncedChangeHandler}
            placeholder="Search Movies..."
            className="w-full bg-transparent outline-none border-none text-sm text-gray-800 placeholder-gray-400 h-12"
          />
        </div>

        <Combobox.Options>
          {!data
            ? SyncSection
            : data.movieResults?.Search?.map((movie: any) => (
                <div key={movie.Title} className="p-4 text-sm text-gray-600">
                  <button
                    className="rounded-lg shadow-md w-full group relative"
                    onClick={() =>
                      handleSelectedMovie(
                        movie.Title,
                        movie.imdbID,
                        movie.Poster
                      )
                    }
                  >
                    <span className="hidden group-hover:block absolute right-[44%] top-1/2">
                      <PlusCircleIcon className="w-10 h-10 text-gray-700" />
                    </span>

                    <div className="flex flex-row content-center gap-x-4 hover:opacity-50 px-4 py-8">
                      <Image
                        src={movie.Poster}
                        width={100}
                        height={150}
                        className="text-2xl"
                        alt="image"
                      />
                      <div className="flex flex-col">
                        <span className="text-2xl mr-auto">{movie.Title}</span>
                        <span className="text-xl mr-auto">{movie.Year}</span>
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
