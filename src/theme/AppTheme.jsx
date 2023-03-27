import { ThemeProvider } from '@emotion/react'; //apuntes junto a hijo
import { CssBaseline } from '@mui/material';
import { purpleTheme } from './';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
      <CssBaseline />

      { children }
    </ThemeProvider>
  )
}
