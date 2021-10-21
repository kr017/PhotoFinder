import { makeStyles } from "@mui/styles";
import { useLogin } from "../../context";
import EditIcon from "@mui/icons-material/Edit";
import default_profile from "../../images/default_profile.jpg";
import { useHistory } from "react-router-dom";
import { Header } from "../Header/Header";

const useStyles = makeStyles({
  root: {
    paddingTop: "20vh",
    display: "flex",
    margin: "2vh 20vw",
  },
  profilePic: {
    height: "120px",
    width: "120px",
    borderRadius: "50%",
    border: "1px solid lightgray",
  },
  section1: {},
  section2: {
    marginLeft: "20px",
  },
  name: {
    fontWeight: 700,
    fontSize: "20px",
    display: "inline-flex",
  },
  editContainer: {
    border: "1px solid lightgray",
    borderRadius: "4px",
    padding: "2px 8px",
    display: "inline-flex",
    fontWeight: 400,
    fontSize: "16px",
    marginLeft: "10px",
    cursor: "pointer",
  },
  social: {
    fontWeight: 600,
    fontSize: "14px",
    color: "#fff",
    marginTop: "20px",
  },
  twitter: {
    backgroundColor: "#1DA1F2",
    padding: "4px",
    borderRadius: "4px",
    textAlign: "center",
    margin: "4px 0px",
  },
  insta: {
    background: "linear-gradient(217deg, #F58529, #e1306c,#8437AF)",
    padding: "4px",
    borderRadius: "4px",
    textAlign: "center",
    margin: "4px 0px",
  },
  anchor: {
    textDecoration: "none",
    color: "inherit",
  },
});
export const Profile = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userState } = useLogin();

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.section1}>
        <img
          className={classes.profilePic}
          src={
            userState?.user?.profile_image?.large
              ? userState?.user?.profile_image?.large
              : default_profile
          }
          alt="profile_img"
        />
      </div>
      <div className={classes.section2}>
        <div className={classes.name}>
          {userState?.user?.first_name && (
            <span>{userState?.user?.first_name + " "}</span>
          )}
          {userState?.user?.last_name && (
            <span> {" " + userState?.user?.last_name}</span>
          )}

          <span
            className={classes.editContainer}
            onClick={() => {
              history.push("/editProfile");
            }}
          >
            <EditIcon fontSize="small" />
            Edit Profile
          </span>
        </div>

        <div className={classes.social}>
          {userState?.user?.social?.instagram_username && (
            <div className={classes.insta}>
              <a
                className={classes.anchor}
                href={`https://www.instagram.com/${userState?.user?.social?.instagram_username}`}
                target="_blank"
                rel="noreferrer"
              >
                INSTAGRAM
              </a>
            </div>
          )}
          {userState?.user?.social?.twitter_username && (
            <div className={classes.twitter}>
              <a
                className={classes.anchor}
                href={`https://twitter.com/${userState?.user?.social?.twitter_username}`}
                target="_blank"
                rel="noreferrer"
              >
                TWITTER
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
