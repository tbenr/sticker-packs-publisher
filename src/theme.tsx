import { createMuiTheme, Theme } from '@material-ui/core/styles';

const s: Theme['shadows'] = (() : Theme['shadows'] => {
  let s =  Array<string>(25).fill('none') as Theme['shadows'];
  s[1]='0px 8px 16px rgba(0, 34, 51, 0.1);';
  return s
})();

const backgroundColor = "#ffffff";

// A custom theme for this app
const theme = createMuiTheme(
  {
    palette: {
      type: "light",
      primary: {
        light: "#ECEFFC",
        main: "#4360DF",
        dark: "#303f9f",
        contrastText: "#fff"
      },
      secondary: {
        light: "#ff4081",
        main: "#ECEFFC",
        dark: "#c51162",
        contrastText: "#4360DF"
      },
      error: {
        light: "#FFEAEE",
        main: "#FF2D55",
        dark: "#d32f2f",
        contrastText: "#fff"
      },
      text: {
        primary: "#000000",
        secondary: "#939BA1",
        disabled: "rgba(0, 0, 0, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)"
      },
      background: {
        default: backgroundColor
      }
    },
    typography: {
      h6: {
        fontWeight: "bold",
        fontSize: '15px'
      },
      h5: {
        fontWeight: "bold",
        fontSize: '22px',
        lineHeight: '28px'
      },
      h4: {
        fontWeight: "bold",
        fontSize: '22px',
        lineHeight: '30px'
      },
      subtitle1: {
        fontSize: '15px',
        lineHeight: '22px'
      },
      subtitle2: {
        fontSize: '12px',
        lineHeight: '16px'
      }
    },
    shadows:  s,
    shape: {
      borderRadius: 8
    },
    overrides: {
      MuiButton: {
        root: {
          textTransform: 'none',
        }
      },
      MuiTooltip: {
        tooltip: {
          color: "#000000",
          backgroundColor: backgroundColor,
          boxShadow: "0px 2px 4px rgba(0, 34, 51, 0.16), 0px 4px 12px rgba(0, 34, 51, 0.08)",
        },
        arrow: {
          "&::before": {
          backgroundColor: backgroundColor,
          boxShadow: "0px 0px 4px rgba(0, 34, 51, 0.16), 0px 0px 12px rgba(0, 34, 51, 0.08)",
          }
        }
      }
    }
  }
);


export default theme;
