import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/1.PNG";
import { makeStyles } from "@mui/styles";
import { AppBar, Grid, InputBase } from "@mui/material";
// import { Search } from "@mui/icons-material";
import { useRef } from "react";
import { searchPhotos } from "../../api/userService";
import { usePhotos } from "../../context";
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
  },
  catContainer: {
    padding: "0 12px 0 12px",
    textDecoration: "none",
    color: "#282c3f",
    cursor: "pointer",
  },

  inputRoot: {
    color: "inherit",
    width: "250px",
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
});

export const Header = () => {
  const classes = useStyles();
  const searchQuery = useRef();
  const [searchText, setSearchText] = useState("");
  const { photosDispatch } = usePhotos();

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
                onKeyPress={() => {
                  setSearchText(searchQuery.current.value);

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
                }}
              />
            </div>
          </span>
        </Grid>
      </Grid>
    </AppBar>
  );
};
