import { createContext, useContext, useReducer } from "react";

const photosContext = createContext();

const photosReducer = (state, action) => {
  switch (action.type) {
    case "SET_PHOTOS":
      return { ...state, photos: action?.payload };

    case "SET_LIKE_ITEMS":
      return { ...state, likedPhotos: action?.payload };

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
