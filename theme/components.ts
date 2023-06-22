import { Components, Theme } from "@mui/material";
import { dark, grey } from "./themeColors";
import { fontFamily, fontSize } from "./typography";

// ========================================================
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    dark: true;
    paste: true;
    marron: true;
  }

  interface ButtonPropsSizeOverrides {
    normal: true;
  }
}
// =========================================================

export const components: Components = {
  MuiChip: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.color === "primary" && {
          background: "#f8f8f8",
          color: "#1c1d26",
        }),
        ...(ownerState.color === "secondary" && {
          background: "#1c1d26",
          color: "#f8f8f8",
        }),
      }),
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        position: "absolute",
        right: 0,
        top: "40px",
        fontWeight: "100",
        marginRight: "4px",
        "@media (max-width: 600px)": {
          top: "36px",
        },
      }),
    },
  },
  MuiCssBaseline: {
    styleOverrides: (theme: Theme) => ({
      body: {
        backgroundColor: "#f4f4f4",
        backgroundPosition: "left top",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
        backgroundAttachment: "scroll",
      },
      html: { scrollBehavior: "smooth" },

      p: {
        lineHeight: 1.75,
        fontSize: "22px",
        margin: 0,
        "@media (max-width: 600px)": {
          fontSize: "18px",
        },
      },
      button: { fontFamily, fontSize },
      ".MuiRating-sizeSmall": { fontSize: "20px" },
      a: {
        textDecoration: "none",
        color: "inherit",
      },

      "#nprogress .bar": {
        overflow: "hidden",
        height: "3px !important",
        zIndex: "99999999 !important",
        background: `${theme.palette.primary.main} !important`,
      },
    }),
  },
  MuiInputLabel: {
    styleOverrides: {
      root: { zIndex: 0 },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: { borderRadius: 8 },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "0",
        position: "relative",
        padding: "1.5rem 1.75rem",
        border: "1px solid #d5d5d5",
        ["@media only screen and (max-width: 678px)"]: { padding: "1rem" },
      },
    },
  },
  MuiPagination: {
    defaultProps: {
      variant: "outlined",
      color: "primary",
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: { paddingTop: 8, paddingBottom: 8 },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        "& .secondary": { opacity: 0.4 },
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      colorSecondary: {
        color: "white",
        "&.Mui-checked": {
          color: "white",
        },
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      size: "small",
      variant: "outlined",
      InputLabelProps: { shrink: true },
    },

    styleOverrides: {
      root: ({ ownerState }) => ({
        "& .MuiFormLabel-root.Mui-error": {
          color: "#e53935 !important",
        },
        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: "#e53935!important",
        },
        "& .MuiFormHelperText-root.Mui-error": {
          color: "#e53935!important",
        },
        ...(ownerState.color == "secondary" && {
          "& .MuiInputBase-root": {
            backgroundColor: "white",
          },
        }),
        ...(ownerState.color === "info" && {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: grey[300],
          },
        }),
        "& .MuiOutlinedInput-root": {
          fontSize: "18px",

          "@media (max-width: 600px)": {
            fontSize: "16px",
          },
        },

        "& .MuiOutlinedInput-notchedOutline legend": {
          fontSize: "0.70em",
        },
        input: {
          background: "transparent",
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px white inset",
            transitionDelay: "9999s",
          },
        },

        "& .MuiFormLabel-root": {
          fontSize: "16px",
        },

        ...(ownerState.role == "banner" && {
          "& .MuiInputBase-root": {
            width: "85px",
            height: "30px",
          },
          "& .MuiInputBase-root svg": {
            color: "white",
          },
          "& .MuiInputBase-root.Mui-focused fieldset": {
            borderColor: "white",
          },
          "& .MuiInputBase-root fieldset": {
            borderColor: "white",
            borderWidth: "2px",
            "&.Mui-error": {
              borderColor: "#e53935",
            },
          },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "white",
              borderWidth: "2px",
              opacity: 1,
            },
          },
          "& .MuiInputBase-root .MuiSelect-select span": {
            color: "white",
            fontSize: "17px",
          },
          "& .MuiInputBase-root .MuiSelect-select": {
            paddingLeft: "10px",
            paddingRight: "10px",
          },
        }),
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        borderRadius: "0",
        border: "1px solid #d5d5d5",
        background: "white ",
        color: "#1c1d26",
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
      }),
    },
  },

  MuiButton: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.color === "primary" && {
          color: "white",
          backgroundColor: "black!important",
          border: "1px solid black",
          borderRadius: 0,
          "&:hover": {
            backgroundColor: "white!important",
            color: "black",
          },
          "&:disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.12)!important",
          },
        }),
        ...(ownerState.color === "secondary" && {
          color: "black",
          backgroundColor: "white!important",
          border: "1px solid black",
          borderRadius: 0,
          "&:hover": {
            backgroundColor: "black!important",
            color: "white",
          },
          "&:disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.12)!important",
          },
        }),
        minWidth: 0,
        minHeight: 0,
        fontSize: "14px",
        ["@media only screen and (max-width: 678px)"]: { fontSize: "11px" },
      }),
      sizeLarge: { padding: ".6rem 2.5rem" },
    },
    defaultProps: { color: "inherit" },
  },
};
