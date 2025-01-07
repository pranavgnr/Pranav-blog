import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PranavLogo from "../assets/Pranav-logo.jpeg";


const Navbar = ({ button }) => {
  return (
      <>
      <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
        <Toolbar>
        <Box
            component="img"
            src={PranavLogo} // Replace with your image URL
            alt="logo"
            sx={{
              width: 40,
              height: 40,
              marginRight: 2, // Add spacing between image and text
            }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pranav Nag B
          </Typography>
          {button}
        </Toolbar>
      </AppBar>  
      </>
  );
};

export default Navbar;
