import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountMenu from "./AccountMenu";
import {Link} from "react-router-dom";
import logo from "../assets/images/logo-white-banner.png";

export default function Nav() {

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography sx={{ flexGrow: 1, mb: 1, mt:2 }}>
          <Link to="/" color="white">
            <img src={logo} alt="Logo" className="logo"/>
          </Link>
          </Typography>
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </>
  );
};
