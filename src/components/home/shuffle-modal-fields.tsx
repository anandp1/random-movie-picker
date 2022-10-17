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
import { SafeUser } from "../../modal/user.modal";

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

interface ShuffleModalFieldsProps {
  availableUsers: SafeUser[];
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const ShuffleModalFields: React.FC<ShuffleModalFieldsProps> = ({
  availableUsers,
}: ShuffleModalFieldsProps) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>(
    availableUsers.map((user) => user.displayName)
  );

  const allAvailableUsers = availableUsers.map((user) => user.displayName);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleShuffle = async () => {
    const movies = await axios.post("/api/get-all-movies", {
      users: personName,
    });

    console.log(movies);

    const randomMovie =
      movies.data.allMovies[
        Math.floor(Math.random() * movies.data.allMovies.length)
      ];

    alert(randomMovie.title);
  };

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const widthForm = width <= 640 ? 280 : 450;
  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-center text-xl font-medium text-white mb-2">Shuffle</p>

      <div className="w-full">
        <ThemeProvider theme={darkTheme}>
          <FormControl sx={{ m: 1, width: widthForm }}>
            <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
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
        </ThemeProvider>
        <button
          className="bg-gray-700 hover:opacity-80 text-white font-bold py-2 px-4 rounded-full w-[97%] ml-2 mt-4"
          onClick={handleShuffle}
        >
          Shuffle
        </button>
      </div>
    </div>
  );
};

export default ShuffleModalFields;
