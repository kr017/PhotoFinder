import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

import { ClipLoader } from "react-spinners";

const useStyles = makeStyles(theme => ({
  loader: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
    marginTop: "25vh",
  },
}));

export function Loader(props) {
  const classes = useStyles();
  return (
    <Grid className={classes.loader}>
      <ClipLoader color="#f15151" loading={true} size={50} />
    </Grid>
  );
}
