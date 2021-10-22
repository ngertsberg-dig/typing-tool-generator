import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import "./index.sass";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" id = 'AppBar'>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <img className = 'header-logo' src = {process.env.PUBLIC_URL + "/img/Dig-Logo.png"} alt = "dig logo" width = "100" height = "64" />
          <Link to = "/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Typing Tool Generator
            </Typography>
          </ Link>
          <div className = 'button-container'>
            <Button color="inherit">Login</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}