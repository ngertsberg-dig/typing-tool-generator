import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.sass";

class Header extends React.Component{
  render(){
    const { user, onLogOut } = this.props;
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" id = 'AppBar'>
          <Toolbar className = 'toolbar-container'>
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
              <div className="right-menu">
                <div className="display-name">{`Hi${
                  user && user.displayName ? `, ${user.displayName}` : ""
                }`}</div>
                <div className="logout-button" onClick={onLogOut}>
                  <ExitToAppIcon />
                </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}




export default connect(null, {})(Header);
