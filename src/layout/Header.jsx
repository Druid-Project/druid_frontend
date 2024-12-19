import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchFooterData } from "../redux/slices/footerSlice";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import druidLogo from "../assets/img/druid_logo.png";
import blackLogo from "../assets/img/logo_black.svg";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const drawerStyles = {
    width: "100%",
    height: "100%",
    bgcolor: "#222",
  };

  const drawerContentStyles = {
    bgcolor: "#000",
    pt: 2,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const logoStyles = {
    position: "absolute",
    top: "3rem",
    left: "3rem",
    display: "flex",
    alignItems: "center",
  };

  const closeButtonStyles = {
    position: "absolute",
    top: "1rem",
    right: "4.5rem",
    color: "#E11000",
    fontSize: "2rem",
  };

  const listItemTextStyles = {
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "left",
    color: "#fff",
    fontSize: { xs: "1.5rem", md: "2.5vw" },
    fontFamily: "Euclid, -apple-system, BlinkMacSystemFont",
  };

  const socialLinkStyles = {
    textTransform: "uppercase",
    fontSize: "0.8rem",
    textAlign: "center",
    color: "#838383",
    fontFamily: "Euclid, -apple-system, BlinkMacSystemFont",
  };

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
          <Link to="/">
            <img src={druidLogo} width="100" height="30" alt="Logo" />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton edge="end" sx={{ mr: 2 }} aria-label="language">
            <Typography sx={{ ml: 1 }}>ENGLISH</Typography>
          </IconButton>
          <IconButton
            edge="end"
            sx={{ color: "#222", marginRight: "2rem", fontSize: "2rem" }}
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: drawerStyles }}
      >
        <Box
          sx={drawerContentStyles}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={logoStyles}>
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
          <IconButton sx={closeButtonStyles} onClick={toggleDrawer(false)}>
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
                    "&:hover .MuiTypography-root": { color: "#cf2e2e" },
                  }}
                >
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={listItemTextStyles}
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
              flexDirection: { xs: "column", md: "row" },

              gap: "1rem",
              paddingTop: "1rem",
              borderTop: ".01px solid #838383",
            }}
          >
            {socialLinks.map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component="a"
                  href={link.uri}
                  sx={{ "&:hover .MuiTypography-root": { color: "#fefefe" } }}
                >
                  <ListItemText
                    primary={link.title.toUpperCase()}
                    primaryTypographyProps={socialLinkStyles}
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
