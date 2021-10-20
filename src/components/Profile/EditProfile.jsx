import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import { useLogin } from "../../context";
import { useHistory } from "react-router-dom";
import { Header } from "../Header/Header";
import { Button, FormControl, Grid } from "@mui/material";
import { useState } from "react";
import { handleEditUser } from "../../api/userService";

const useStyles = makeStyles({
  root: {
    paddingTop: "20vh",
    // display: "flex",
  },
  profilePic: {
    height: "120px",
    width: "120px",
    borderRadius: "50%",
    border: "1px solid lightgray",
  },

  name: {
    fontWeight: 700,
    fontSize: "20px",
    display: "inline-flex",
  },

  anchor: {
    textDecoration: "none",
    color: "inherit",
  },
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
  },
}));

export const EditProfile = () => {
  const classes = useStyles();
  const history = useHistory();

  const { userState, userDispatch } = useLogin();

  const [firstName, setFirstName] = useState(userState?.user?.first_name);
  const [lastName, setLastName] = useState(userState?.user?.last_name);
  const [userName, setUserName] = useState(userState?.user?.username);
  const [bio, setBio] = useState(userState?.user?.bio);

  const [instaName, setInstaName] = useState(
    userState?.user?.instagram_username
  );
  const [twitterName, setTwitterName] = useState(
    userState?.user?.twitter_username
  );

  const handleUpdate = () => {
    let requestParams = {
      username: userName,
      first_name: firstName,
      last_name: lastName,
      bio: bio,
      instagram_username: instaName,
      twitter_username: twitterName,
    };

    handleEditUser(requestParams).then(res => {});
  };
  return (
    <div className={classes.root}>
      <Header />

      <Grid
        container
        spacing={2}
        style={{ textAlign: "center" }}
        // columns={1}
      >
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              First Name
            </InputLabel>
            <BootstrapInput
              id="bootstrap-input"
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Last Name
            </InputLabel>
            <BootstrapInput
              id="bootstrap-input"
              value={lastName}
              onChange={e => {
                setLastName(e.target.value);
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Username
            </InputLabel>
            <BootstrapInput
              id="bootstrap-input"
              value={userName}
              onChange={e => {
                setUserName(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Bio
            </InputLabel>
            <BootstrapInput
              id="bootstrap-input"
              value={bio}
              onChange={e => {
                setBio(e.target.value);
              }}
              fullWidth
              //   style={{ w }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Instagram Username
            </InputLabel>
            <BootstrapInput
              id="bootstrap-input"
              value={instaName}
              onChange={e => {
                setInstaName(e.target.value);
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <FormControl variant="standard">
            <InputLabel shrink htmlFor="bootstrap-input">
              Twitter Username
            </InputLabel>
            <BootstrapInput
              id="bootstrap-input"
              value={twitterName}
              onChange={e => {
                setTwitterName(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid item style={{ textAlign: "center" }} onClick={() => handleUpdate()}>
        <Button variant="outlined" size="medium">
          SAVE
        </Button>
      </Grid>
    </div>
  );
};
