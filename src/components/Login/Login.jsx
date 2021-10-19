import { accessUrl } from "../../api/auth";

export const Login = params => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "40vh" }}
    >
      <a href={accessUrl}>LOGIN TO SPOTIFY</a>
    </div>
  );
};
