import * as React from "react";
import {
  Theme,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { Movie, SafeUser } from "../../modal/user.modal";
import { DataContext } from "../../pages";
import { genreList } from "../../lib/genre-list";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 450,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface ShuffleModalFieldsProps {
  availableUsers: SafeUser[];
}

const ShuffleModalFields: React.FC<ShuffleModalFieldsProps> = ({
  availableUsers,
}: ShuffleModalFieldsProps) => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const widthForm = width <= 640 ? 280 : 450;

  const moviesByUser = React.useContext(DataContext);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>(
    availableUsers.map((user) => user.displayName)
  );
  const genreIds = [];

  Object.values(moviesByUser).forEach(
    (user: { movies: Movie[]; displayName: string }) => {
      user.movies.forEach((movie: Movie) => {
        genreIds.push(movie.genre_ids);
      });
    }
  );

  const cleanGenreIds = genreIds
    .filter(Boolean)
    .flat()
    .map((id: number) => id.toString());

  const availableGenreNames = genreList
    .map((data) => {
      if (cleanGenreIds.includes(data.id.toString())) {
        return data.name;
      }
    })
    .filter(Boolean);

  const [genreNames, setGenreNames] =
    React.useState<string[]>(availableGenreNames);

  const allAvailableUsers = availableUsers.map((user) => user.displayName);

  const handleChange = (
    event: SelectChangeEvent<typeof personName | typeof genreNames>,
    isGenreSelection?: boolean
  ) => {
    const {
      target: { value },
    } = event;

    isGenreSelection
      ? setGenreNames(typeof value === "string" ? value.split(",") : value)
      : setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleShuffle = async () => {
    const movies = await axios.post("/api/get-all-movies", {
      users: personName,
    });

    const genreIds = genreList
      .map((data) => {
        if (genreNames.includes(data.name)) {
          return data.id;
        }
      })
      .filter(Boolean);

    const filteredMovies = movies.data.allMovies
      .map((movie: Movie) => {
        const test = movie.genre_ids?.filter((id) => genreIds.includes(id));

        if (test?.length > 0) {
          return movie;
        }

        if ("imbdId" in movie) {
          return movie;
        }
      })
      .filter(Boolean);

    const randomMovie =
      filteredMovies[Math.floor(Math.random() * filteredMovies.length)];

    alert(randomMovie.title);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-center text-xl font-bold text-white mb-2 tracking-wider">
        {"Who's Watching?"}
      </p>

      <div className="w-full">
        <ThemeProvider theme={darkTheme}>
          <FormControl sx={{ m: 1, width: widthForm }}>
            <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={(onChangeEvent) => handleChange(onChangeEvent, false)}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {allAvailableUsers.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: widthForm }}>
            <InputLabel id="demo-multiple-chip-label">
              Genre Selection
            </InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={genreNames}
              onChange={(onChangeEvent) => handleChange(onChangeEvent, true)}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {genreList
                .filter((data) => cleanGenreIds.includes(data.id.toString()))
                .map((data) => (
                  <MenuItem
                    key={data.name}
                    value={data.name}
                    style={getStyles(data.name, genreNames, theme)}
                  >
                    {data.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </ThemeProvider>
        <button
          className="bg-neutral-700 hover:opacity-80 text-white font-bold py-2 px-4 rounded-full w-[97%] ml-2 mt-4 tracking-wide"
          onClick={handleShuffle}
        >
          Shuffle
        </button>
      </div>
    </div>
  );
};

export default ShuffleModalFields;
