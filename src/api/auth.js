import axios from "axios";
// import { useLogin } from "../context";

export const authEndpoint = `${process.env.REACT_APP_AUTH_ENDPOINT}`;
const clientId = `${process.env.REACT_APP_ACCESS_KEY}`;
const client_secret = `${process.env.REACT_APP_SECRET_KEY}`;
// "cff76213089a4e228206c8bf120d67cb"; //`${process.env.REACT_APP_CLIENTID}`;
const redirectUri = `${process.env.REACT_APP_REDIRECT_URI}`;
// const scopes = [
//   "user-read-currently-playing",
//   "user-read-recently-played",
//   "user-read-playback-state",
//   "user-top-read",
//   "user-modify-playback-state",
//   "streaming",
//   "playlist-modify-private",
//   "playlist-read-private",
// ];

export const getTokenFromResponse = () => {
  return window.location.href.split("?code=")[1];
};
const scopes =
  "public+read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections";

export const accessUrl = `${
  authEndpoint + "oauth/authorize"
}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes}`;

export const Login = () => {
  return axios({
    method: "post",
    url: "https://unsplash.com/oauth/token",
    data: {
      client_id: clientId,
      client_secret: client_secret,
      redirect_uri: redirectUri,
      code: getTokenFromResponse(),
      grant_type: "authorization_code",
    },
  });
};

// https://unsplash.com/oauth/authorize?client_id=PARENT_APPLICATION_CLIENT_ID&redirect_uri=https://mywordpressinstall.com/unsplash_callback&response_type=code&scope=public
// http://localhost:3000/#access_token=BQAe7_3Zzf5DBzYPxys9mvleCEMcILBRhfjJ9pRER7qKz-3JnUJocnlv9osWGhKWETIpBoVCkC1HH_KMxC0YqcEPU3xRI9u6Vpom-DFoEO2ZujVN7XVBLSxeiYxjqFVuBTl72yVWoBPKAKULVP9kFZ27PVHklfIW7HvSUJVtZ97di5QMv2mvlKCQD8dMuvwMY4uRdcKUv4wyU4KTttVgiJ6IcOY&token_type=Bearer&expires_in=3600
