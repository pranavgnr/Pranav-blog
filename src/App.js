import React, { useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';
import Navbar from '../src/components/navbar'

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const darkTheme = (
    <Button onClick={() => setDarkMode(!darkMode)}>
        Theme
      </Button>
  )

  return (
    <ThemeProvider theme={theme}>
      <Navbar button={darkTheme}/>
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
