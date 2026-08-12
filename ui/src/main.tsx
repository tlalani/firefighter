import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App'
import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline, useMediaQuery } from '@mui/material'
import { themeOptionsLight, themeOptionsDark } from './theme/Theme'


function AppTheme() {

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => createTheme(prefersDarkMode ? themeOptionsDark : themeOptionsLight), [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppTheme />
  </StrictMode>,
)
