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

import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

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

interface SettingsModalFieldProps {
  availableUsers: SafeUser[];
}

const SettingsModalFields: React.FC<SettingsModalFieldProps> = ({
  availableUsers,
}: SettingsModalFieldProps) => {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const handleLogout = async () => {
    signOut()
  };

  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-center text-xl font-bold text-white mb-2 tracking-wider">
        {"Logout Button Placeholder Name?"}
      </p>

      <div className="w-full">
        <button
          className="bg-neutral-700 hover:opacity-80 text-white font-bold py-2 px-4 rounded-full w-[97%] ml-2 mt-4 tracking-wide"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsModalFields;
