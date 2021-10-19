import { accessUrl } from "../../api/auth";

export const Login = params => {
  return (
    <div style={{ marginTop: "500px" }}>
      <a href={accessUrl}>LOGIN TO SPOTIFY</a>
    </div>
  );
};
