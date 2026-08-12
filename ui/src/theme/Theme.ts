import type { ThemeOptions } from '@mui/material/styles';

export const themeOptionsLight: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1fb59c',

    },
    secondary: {
      main: '#d1c4e9',
    },
    background: {
      default: '#FFFFFF',
      paper: '#f5f5f5'
    }
  },
};

export const themeOptionsDark: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#1fb59c',

    },
    secondary: {
      main: '#8A2BE2',
    }
  },
}