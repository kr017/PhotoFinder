import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPhotos } from "../../api/userService";
import { usePhotos } from "../../context";
import { useLocation } from "react-router";

const useStyles = makeStyles({
  root: {
    padding: "4px",

    "& .imageBlock": {
      padding: "4px",
    },
    marginTop: "25px",
  },
});

export const Dashboard = params => {
  const classes = useStyles();
  const path = useLocation();

  const [cols, setCols] = useState(3);
  const [page, setPage] = useState(0);
  const { photosState, photosDispatch } = usePhotos();

  useEffect(() => {
    // Login().then(res => {
    //   userDispatch({ type: "LOGIN", payload: res.data.access_token });

    //   localStorage.setItem("hint", JSON.stringify(res.data.access_token));
    //   getCurrentUser().then(response => {});
    // });

    let requestParams = {
      count: 20,
      page: 0,
    };
    loadPhotos(requestParams);

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

  const loadPhotos = payload => {
    getPhotos(payload).then(res => {
      let data = [];
      if (photosState.photos.length > 0) {
        data = [photosState.photos, ...res.data];
      } else {
        data = res.data;
      }
      photosDispatch({
        type: "SET_PHOTOS",
        payload: data,
      });
    });
  };
  const fetchMoreData = () => {
    setPage(page + 1);
    let requestParams = {
      count: 20,
      page: page,
    };
    loadPhotos(requestParams);
  };
  return (
    <div className={classes.root}>
      {photosState.photos.length}
      <InfiniteScroll
        dataLength={500}
        //   {photosState?.photos?.length ? photosState?.photos?.length : 20
        // }
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {photosState?.photos.length && (
          <ImageList variant="masonry" cols={cols}>
            {photosState?.photos?.map(item => (
              <ImageListItem key={item.id} className="imageBlock">
                <img
                  src={`${item.urls.regular}`}
                  srcSet={`${item.urls.regular}`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </InfiniteScroll>
    </div>
  );
};
