import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import druidLogo from "../assets/img/druid_logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const theme = useTheme();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Home", to: "/" },
    { text: "About Us", to: "/about" },
    { text: "Services", to: "/services" },
    { text: "Blogs", to: "/blogs" },
    { text: "Career", to: "/career" },
    { text: "Contact", to: "/contact" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: theme.palette.background.default,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Link to="/">
            <img src={druidLogo} width="100" height="30" alt="Logo" />
          </Link>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Language Switcher */}
          <IconButton edge="end" sx={{ mr: 2 }} color="" aria-label="language">
            <LanguageIcon />
            <Typography sx={{ ml: 1 }}>EN</Typography>
          </IconButton>

          {/* Hamburger Menu */}
          <IconButton
            edge="end"
            sx={{ color: "#E11000" }} // Updated color
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            bgcolor: "background.paper",
            pt: 2,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.to}>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
