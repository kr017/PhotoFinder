import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getPhotos, likeAPhoto } from "../../api/userService";
import { usePhotos } from "../../context";
import { useLocation } from "react-router";
import FilledFavoriteIcon from "@mui/icons-material/Favorite";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Login } from "../../api/auth";

const useStyles = makeStyles({
  root: {
    padding: "4px",

    "& .imageBlock": {
      padding: "4px",
      position: "relative",

      "&:hover .like": {
        opacity: 1,
      },
    },
    "& .like": {
      // opacity: 0,
      position: "absolute",
      top: "20px",
      right: "20px",
      cursor: "pointer",
      backgroundColor: "#fff",
      padding: "4px 6px",
      borderRadius: "4px",
      color: "#787676e6",
      "&:hover": {
        opacity: "0.6",
        color: "#000",
      },
    },

    "& .liked": {
      position: "absolute",
      top: "20px",
      right: "20px",
      cursor: "pointer",
      backgroundColor: "#f15151",
      padding: "4px 6px",
      borderRadius: "4px",
      color: "#fff",
      "&:hover": {
        opacity: "0.6",
        color: "#fff",
      },
    },

    "& .creator": {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      cursor: "pointer",
      display: "inline-flex",
    },
    "& .creator-profile": {
      borderRadius: "50%",
      cursor: "pointer",
    },
    "& .creator-name": {
      alignItems: "center",
      color: "white",
      display: "grid",
      marginLeft: "12px",
      fontWeight: 600,
    },
    "& .for_hire": {
      fontWeight: 400,
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
    },
    marginTop: "25px",
  },
});

export const Dashboard = params => {
  const classes = useStyles();
  const path = useLocation();

  const [cols, setCols] = useState(3);
  const { photosState, photosDispatch } = usePhotos();

  useEffect(() => {
    Login().then(res => {
      // userDispatch({ type: "LOGIN", payload: res.data.access_token });

      localStorage.setItem("hint", JSON.stringify(res.data.access_token));
      // getCurrentUser().then(response => {});
    });

    loadPhotos();

    if (window.innerWidth < 600) {
      setCols(1);
    } else if (window.innerWidth < 900) {
      setCols(2);
    } else if (window.innerWidth < 1200) {
      setCols(3);
    } else if (window.innerWidth < 1536) {
      setCols(4);
    }
    // eslint-disable-next-line
  }, [path.pathname]);

  const loadPhotos = () => {
    getPhotos().then(res => {
      photosDispatch({
        type: "SET_PHOTOS",
        payload: res.data,
      });
    });
  };

  const handleLikePhoto = id => {
    likeAPhoto(id);
  };
  const handleUnlikePhoto = id => {};

  return (
    <div className={classes.root}>
      {/* <ScrollList
        countLimit={10}
        loadNextData={fetchMoreData}
        loader={<h4>Loading...</h4>}
        children={ */}
      <ImageList variant="masonry" cols={cols}>
        {photosState?.photos?.map((item, index) => (
          <ImageListItem key={item.id} className="imageBlock">
            {!item?.liked_by_user ? (
              <span className="like" onClick={() => handleLikePhoto(item.id)}>
                <FilledFavoriteIcon fontSize="small" />
              </span>
            ) : (
              <span
                className="liked"
                onClick={() => handleUnlikePhoto(item.id)}
              >
                <FilledFavoriteIcon fontSize="small" />
              </span>
            )}
            <img
              src={`${item?.urls?.regular}`}
              srcSet={`${item?.urls?.regular}`}
              alt={item.title}
              loading="lazy"
            />

            <span className="creator">
              <img
                src={`${item?.user?.profile_image?.small}`}
                className="creator-profile"
                alt="profile_pic"
              />
              <span className="creator-name">
                <div>{item?.user?.first_name}</div>
                {item?.user?.for_hire && (
                  <div className="for_hire">
                    Available for Hire
                    <CheckCircleOutlineOutlinedIcon />
                  </div>
                )}
              </span>
            </span>
          </ImageListItem>
        ))}
      </ImageList>
      {/* } */}
    </div>
  );
};
