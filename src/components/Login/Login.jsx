import { accessUrl } from "../../api/auth";

export const Login = params => {
  return (
    <div style={{ marginTop: "40vh" }}>
      <div style={{ textAlign: "center" }}>
        <p>PLEASE MAKE SURE YOU ARE LOGGED IN ON UNSPLASH</p>
        <div>
          <a
            href={accessUrl}
            style={{
              color: "inherit",
              textDecoration: "none",
              textTransform: "uppercase",
              padding: "10px",
              backgroundColor: "#add8e6",
            }}
          >
            LOGIN TO Photo Finder
          </a>
        </div>
      </div>
    </div>
  );
};
