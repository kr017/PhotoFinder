import { createContext, useContext, useReducer } from "react";

const photosContext = createContext();

const photosReducer = (state, action) => {
  switch (action.type) {
    case "SET_PHOTOS":
      return { ...state, photos: action?.payload };

    case "LIKE_PHOTO":
      let index = state?.photos?.findIndex(x => x.id === action.payload);
      if (index > -1) {
        state.photos[index].liked_by_user = true;
      }
      return {
        ...state,
        photos: state.photos,
      };
    case "UNLIKE_PHOTO":
      let item = state.photos.findIndex(x => x.id === action.payload);
      if (item > -1) {
        state.photos[item].liked_by_user = false;
      }
      return {
        ...state,
        photos: state.photos,
      };
    case "REMOVE_LIKE_ITEMS":
      return {
        ...state,
        likedPhotos: state.likedPhotos.filter(
          wish => wish._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
const initalState = {
  photos: [],
};

export const PhotosProvider = ({ children }) => {
  const [photosState, photosDispatch] = useReducer(photosReducer, initalState);

  return (
    <photosContext.Provider value={{ photosState, photosDispatch }}>
      {children}
    </photosContext.Provider>
  );
};

export const usePhotos = () => {
  return useContext(photosContext);
};
