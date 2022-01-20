import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import authSelectors from "../redux/auth/authSelectors";
import { logout } from "../redux/auth/authSlice";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";

const userMenu = ["Profile", "My posts", "Logout"];

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const isLoggedIn = useSelector(authSelectors.getIsLoggegIn);

  const userName = useSelector(authSelectors.getUserName);
  const userAvatar = useSelector(authSelectors.getUserAvatar);

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (e) => {
    e.preventDefault();

    switch (e.target.innerText) {
      case userMenu[2]:
        dispatch(logout());
        break;

      case userMenu[1]:
        navigate("/myPosts");
        handleCloseUserMenu();
        break;

      case userMenu[0]:
        navigate("/profile");
        handleCloseUserMenu();
        break;

      default:
        break;
    }
  };

  const getPage = () => {
    switch (location.pathname) {
      case "/myPosts":
        return "My Posts";

      case "/profile":
        return "Profile";

      default:
        return "Posts";
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            {getPage()}
          </Typography>

          <Box
            sx={{
              flexGrow: 0,
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            {isLoggedIn ? (
              <>
                <Typography variant="h6" sx={{ marginRight: "10px" }}>
                  Hello, {userName}
                </Typography>
                <Tooltip title="Open user menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={userName}
                      src={"http://localhost:2531" + userAvatar}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userMenu.map((setting) => (
                    <MenuItem key={setting} onClick={handleMenuClick}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex" }}>
                <Button color="inherit" component={NavLink} to="/signin">
                  SIGNIN
                </Button>
                <Typography variant="h6">|</Typography>
                <Button color="inherit" component={NavLink} to="/signup">
                  SIGNUP
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopBar;
