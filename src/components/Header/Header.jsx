import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import logo from "../../images/1.PNG";
import { makeStyles } from "@mui/styles";
import {
  AppBar,
  Grid,
  InputBase,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";

import StayCurrentLandscapeOutlinedIcon from "@mui/icons-material/StayCurrentLandscapeOutlined";
import StayCurrentPortraitOutlinedIcon from "@mui/icons-material/StayCurrentPortraitOutlined";

// import { Search } from "@mui/icons-material";
import { useRef } from "react";
import { searchPhotos } from "../../api/userService";
import { useLogin, usePhotos } from "../../context";
import default_profile from "../../images/default_profile.jpg";

const useStyles = makeStyles({
  root: {
    position: "sticky",

    // boxShadow: "0 4px 12px 0 #0000000d",
    // lineHeight: "80px",
    width: "100%",
    padding: "10px",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    color: "black",
    alignItems: "center",
  },
  catContainer: {
    padding: "0 12px 0 12px",
    textDecoration: "none",
    color: "#282c3f",
    cursor: "pointer",
  },

  inputRoot: {
    color: "inherit",
    width: "260px",
    marginLeft: "8px",
  },
  inputInput: {
    padding: "8px 16px",
    paddingLeft: `calc(1em + 18px)`,
    width: "100%",
  },
  search: {
    position: "relative",
    borderRadius: "20px",
    margin: "0px 8px",
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(3),
    //   width: "auto",
    // },
    color: "#696e79",
    backgroundColor: "#f5f5f6",
    "&:hover": {
      color: "#696e79",
      backgroundColor: "#f5f5f6",
    },
  },
  searchIcon: {
    padding: "0px 8px", //theme.spacing(0, 1),

    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  profilePic: {
    height: "40px",
    width: "40px",
    borderRadius: "50%",
  },
});

export const Header = () => {
  const classes = useStyles();
  const history = useHistory();

  const searchQuery = useRef();
  const [searchText, setSearchText] = useState("");
  const { userState, userDispatch } = useLogin();
  const { photosDispatch } = usePhotos();

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const [orientation, setOrientation] = useState(null);
  // const [loading, setLoading] = useState(false);

  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    searchPhotos({
      query: searchText,
      // color: "pink",
      orientation: "squarish",
    }).then(function (res) {
      photosDispatch({
        type: "SET_PHOTOS",
        payload: res.data.results,
      });
    });
  };

  const handleNavigateToProfile = () => {
    history.push("/profile");
  };

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    localStorage.removeItem("hint");
  };

  return (
    <AppBar className={classes.root} style={{ backgroundColor: "white" }}>
      <Grid container className={classes.header}>
        <Link
          to="/"
          className={`${classes.catContainer}`}
          style={{
            marginRight: "20px",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            fontSize: "22px",
            fontWeight: 600,
          }}
        >
          <img src={logo} alt="app-logo" height="40px" width="40px" />
          Photo Finder
        </Link>

        <Grid>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginRight: "4px",
            }}
          >
            <div className={classes.search}>
              {/* <div className={classes.searchIcon}>
                <Search />
              </div> */}
              <InputBase
                placeholder="Search free high resolution photos"
                inputRef={searchQuery}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{
                  "aria-label": "Search",
                }}
                onKeyPress={e => {
                  if (e.charCode === 13) {
                    // setLoading(true);
                    setSearchText(searchQuery.current.value);
                    handleSearch();
                  }
                }}
              />
            </div>
          </span>
        </Grid>
        <Grid
          onClick={e => setAnchorEl(e.currentTarget)}
          style={{ cursor: "pointer", minWidth: "120px" }}
          display={{ xs: "none", sm: "block" }}
        >
          {orientation ? <>{orientation}</> : <>Any Orientation</>}
        </Grid>

        <Grid
          onClick={e => setMenuAnchorEl(e.currentTarget)}
          style={{ cursor: "pointer" }}
        >
          <img
            className={classes.profilePic}
            src={
              userState?.user?.profile_image?.small
                ? userState?.user?.profile_image?.small
                : default_profile
            }
            alt="profile_img"
          />
        </Grid>
      </Grid>

      {/* menu */}
      <Popover
        // id={id}
        open={Boolean(menuAnchorEl)}
        anchorEl={menuAnchorEl}
        onClose={() => {
          setMenuAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ListItemButton onClick={() => handleNavigateToProfile()}>
          <ListItemText primary="View Profile" />
        </ListItemButton>

        <ListItemButton onClick={() => handleLogout()}>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Popover>

      {/* orientation */}
      <Popover
        // id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ListItemButton onClick={() => setOrientation("landscape")}>
          <ListItemIcon>
            <StayCurrentLandscapeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Landscape" />
        </ListItemButton>

        <ListItemButton onClick={() => setOrientation("portrait")}>
          <ListItemIcon>
            <StayCurrentPortraitOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Portrait" />
        </ListItemButton>

        <ListItemButton onClick={() => setOrientation("squarish")}>
          <ListItemIcon>
            <StayCurrentLandscapeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Square" />
        </ListItemButton>
      </Popover>
    </AppBar>
  );
};
