import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchFooterData } from "../redux/footerSlice";
import { Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import blackLogo from "../assets/img/logo_black.svg";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const footerData = useSelector((state) => state.footer.data);

  useEffect(() => {
    dispatch(
      fetchFooterData({
        endpoint: "node/footer",
        includes: "field_footer_page_sections.field_connect_card",
      })
    );
  }, [dispatch]);

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

  const socialLinks = footerData.included
    ? footerData.included
        .filter((item) => item.type === "paragraph--footer_section")
        .flatMap((section) => section.attributes.field_social_media_link)
    : [];

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
            <Typography sx={{ ml: 1 }}>ENGLISH</Typography>
          </IconButton>

          {/* Hamburger Menu */}
          <IconButton
            edge="end"
            sx={{ color: "#222", marginRight: "2rem", fontSize: "2rem" }} // Updated size
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "100%", // Cover full window width
            height: "100%", // Cover full window height
            bgcolor: "#222", // Use dark theme color
          },
        }}
      >
        <Box
          sx={{
            bgcolor: "#000", // Use dark theme color
            pt: 2,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
            position: "relative", // Add relative positioning
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box
            sx={{
              position: "absolute",
              top: "3rem",
              left: "3rem",
              display: "flex",
              alignItems: "center", // Align items horizontally
            }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <img src={blackLogo} width="80" height="60" alt="Logo" />
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "2rem",
                }}
              >
                Druid
              </Typography>
            </Link>
          </Box>
          <IconButton
            edge="end"
            sx={{
              position: "absolute",
              top: "1rem",
              right: "4.5rem",
              color: "#E11000",
              fontSize: "2rem",
            }} // Updated size
            onClick={toggleDrawer(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  sx={{
                    justifyContent: "flex-start",
                    "&:hover .MuiTypography-root": {
                      color: "#cf2e2e", // Change color on hover
                    },
                  }}
                >
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      textTransform: "capitalize", // Use capitalize
                      textAlign: "left", // Align text to the left
                      color: "#fff", // Light color
                      fontSize: "3vw", // Bigger size
                      fontFamily: "Euclid, -apple-system, BlinkMacSystemFont",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box
            sx={{
              position: "absolute",
              bottom: "2rem",
              right: "2rem",
              display: "flex",
              flexDirection: "row", // Align items horizontally
              gap: "1rem", // Add some space between items
              paddingTop: "1rem", // Add padding at the top
              borderTop: ".01px solid #838383", // Add border at the top
            }}
          >
            {socialLinks.map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component="a" href={link.uri}>
                  <ListItemText
                    primary={link.title.toUpperCase()}
                    primaryTypographyProps={{
                      textTransform: "uppercase",
                      fontSize: "0.8rem",
                      textAlign: "center", // Center text horizontally
                      color: "#838383", // Light color
                      fontFamily: "Euclid, -apple-system, BlinkMacSystemFont",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
