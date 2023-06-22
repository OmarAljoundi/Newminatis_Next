import { ThemeOptions } from "@mui/material/styles";
import { components } from "./components";
import { blue, marron, paste, primary, themeColors } from "./themeColors";
import { typography } from "./typography";

const THEMES = {
  GIFT: "GIFT",
  HEALTH: "HEALTH",
  DEFAULT: "DEFAULT",
  GROCERY: "GROCERY",
  FURNITURE: "FURNITURE",
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

/*
WE CREATED MULTIPLE THEME OPTIONS FOR DIFFERENT SHOP VARIATION.

YOU CAN JUST KEEP [THEMES.DEFAULT] AND REMOVE OTHER THEME OPTIONS.
*/
const themesOptions: ThemeOptions = {
  [THEMES.DEFAULT]: {
    typography,
    breakpoints,
    components: { ...components },
    palette: {
      primary: { ...primary, light: primary[100] },
      ...themeColors,
    },
  },
  [THEMES.GROCERY]: {
    typography,
    breakpoints,
    components: { ...components },
    palette: {
      primary: { ...primary, light: primary[100] },
      ...themeColors,
    },
  },
  [THEMES.FURNITURE]: {
    typography,
    breakpoints,
    components: { ...components },
    palette: { primary: { ...paste, light: paste[100] }, ...themeColors },
  },
  [THEMES.HEALTH]: {
    typography,
    breakpoints,
    components: { ...components },
    palette: { primary: { ...blue, light: blue[100] }, ...themeColors },
  },
  [THEMES.GIFT]: {
    typography,
    breakpoints,
    components: { ...components },
    palette: { primary: { ...marron, light: marron[100] }, ...themeColors },
  },
};

const themeOptions = () => {
  let themeOptions = themesOptions[THEMES.DEFAULT];

  return themeOptions;
};

export default themeOptions;
