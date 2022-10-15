import { Dialog, Combobox, Disclosure } from "@headlessui/react";
import { GitBranchIcon, SearchIcon, SyncIcon } from "@primer/octicons-react";
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

  useEffect(() => {
    debouncedChangeHandler.cancel();

    if (query.length > 0) {
      console.log(data);
      mutate();
    }
  }, [query, debouncedChangeHandler, mutate]);

  if (error) {
    return <div>Failed to load</div>;
  }

  //    const allOptions = [];

  //   pipelineObject?.forEach((pipeline) => allOptions.push(pipeline));
  //   pullRequestObject?.forEach((pullRequest) => allOptions.push(pullRequest));

  //   const filteredData = allOptions?.filter((option) => {
  //     return (
  //       option.title?.toLowerCase().includes(query.toLowerCase()) ||
  //       option.name.toLowerCase().includes(query.toLowerCase())
  //     );
  //   if (!data) {
  //     return SyncSection;
  //   }

  console.log(data);
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
            : data.movieResults?.Search?.map((movie) => (
                <div key={movie.Title} className="p-4 text-sm text-gray-600">
                  <div className="mt-3 mb-3 flex content-center overflow-x-auto rounded-lg px-4 py-8 shadow-md">
                    <div className="flex flex-col">
                      <span className="text-2xl">{movie.Title}</span>
                    </div>
                  </div>
                </div>
              ))}
        </Combobox.Options>
      </Combobox>
    </Dialog>
  );
};

export { SearchPalette };
