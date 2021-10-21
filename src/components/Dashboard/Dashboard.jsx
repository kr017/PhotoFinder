import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { makeStyles } from "@mui/styles";
import { ImageList, ImageListItem } from "@mui/material";
import FilledFavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

import {
  getCurrentUser,
  getPhotos,
  likeAPhoto,
  unlikeAPhoto,
} from "../../api/userService";
import { useLogin, usePhotos } from "../../context";
import { Login } from "../../api/auth";
import { Header } from "../Header/Header";
import { Loader } from "../Loader/Loader";

const useStyles = makeStyles({
  root: {
    paddingTop: "20px",

    "& .imageBlock": {
      padding: "4px",
      position: "relative",

      "&:hover .like": {
        opacity: 1,
      },
      "&:hover .liked": {
        opacity: 1,
      },
      "&:hover .creator": {
        opacity: 1,
      },
      "&:hover .download": {
        opacity: 1,
      },
    },
    "& .like": {
      opacity: 0,
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
      opacity: 0,
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
      opacity: 0,
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
    "& .download": {
      position: "absolute",
      bottom: "20px",
      right: "20px",
      cursor: "pointer",
      display: "inline-flex",
      opacity: 0,
      backgroundColor: "#efefefe6",
      padding: "4px 6px",
      borderRadius: "4px",
    },
  },
});

export const Dashboard = params => {
  const classes = useStyles();
  const history = useHistory();

  const [cols, setCols] = useState(3);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  const { photosState, photosDispatch } = usePhotos();
  const { userDispatch } = useLogin();

  useEffect(() => {
    Login().then(res => {
      if (res.status === 200) {
        setLoading(true);
        getCurrentUser()
          .then(response => {
            userDispatch({ type: "SET_CURRENT_USER", payload: response.data });
          })
          .catch(err => {
            setLoading(false);
            toast(
              t => (
                <div>Session Expired or invalid token. Please login again.</div>
              ),
              {
                style: {
                  borderRadius: "10px",
                  // background: "#f15151",
                  // color: "#fff",
                },
              }
            );
            history.push("/");
          });
        localStorage.setItem("hint", JSON.stringify(res.data.access_token));

        loadPhotos();
      }
    });

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
  }, []);

  const loadPhotos = () => {
    let request = {
      orientation: null,
    };
    getPhotos(request)
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          photosDispatch({
            type: "SET_PHOTOS",
            payload: res.data,
          });
        } else if (res.status === 401) {
          toast(t => (
            <span>Something went wrong please try after some time</span>
          ));
        }
      })
      .catch(err => {
        setLoading(false);
        toast(t => (
          <div>Session Expired or invalid token. Please login again.</div>
        ));
        history.push("/");
      });
  };

  const handleLikePhoto = id => {
    likeAPhoto(id).then(res => {
      photosDispatch({
        type: "LIKE_PHOTO",
        payload: id,
      });
    });
  };
  const handleUnlikePhoto = id => {
    unlikeAPhoto(id)
      .then(res => {
        photosDispatch({
          type: "UNLIKE_PHOTO",
          payload: id,
        });
      })
      .catch(err => {});
  };

  const downloadPhoto = async item => {
    try {
      const a = document.createElement("a");
      a.href = await toDataURL(item.urls.raw);
      a.download = item.user.first_name + "-" + item.id + ".jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      console.error("Unable to download image...");
    }
  };

  function toDataURL(url) {
    return fetch(url)
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        return window.URL.createObjectURL(blob);
      });
  }

  return (
    <div className={classes.root}>
      <Header />

      {photosState?.photos ? (
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
                alt={item?.title}
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
              <span
                className="download"
                onClick={() => {
                  toast.promise(downloadPhoto(item), {
                    loading: "Downloading...",
                    success: <b>Download Successful!!!</b>,
                    error: <b>Failed to download Please try again.</b>,
                  });
                }}
              >
                <ArrowDownwardRoundedIcon />
              </span>
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Loader />
      )}
    </div>
  );
};
