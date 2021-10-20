import { createContext, useContext, useReducer } from "react";

const userContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action?.payload,
      };
    case "LOGOUT":
      return {
        token: "",
      };
    case "SET_CURRENT_USER":
      return { ...state, user: action?.payload };

    default:
      return;
  }
};

const initalState = {
  token: "",
  user: null,
};

export const UserProvider = ({ children }) => {
  let token = JSON.parse(localStorage.getItem("hint"));

  if (token) {
    initalState.token = token;
    // initalState.name = token?.name;
    // initalState.email = token?.email;
  }

  const [userState, userDispatch] = useReducer(userReducer, initalState);

  return (
    <userContext.Provider value={{ userState, userDispatch }}>
      {children}
    </userContext.Provider>
  );
};

export const useLogin = () => {
  return useContext(userContext);
};
