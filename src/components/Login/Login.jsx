import { accessUrl } from "../../api/auth";

export const Login = params => {
  return (
    <div style={{ marginTop: "20vh" }}>
      <div style={{ textAlign: "center" }}>
        <p>PLEASE MAKE SURE YOU ARE LOGGED IN ON UNSPLASH</p>
        <div>
          <p>Test Credentails for Unsplash Account</p>
          <i>testmate71@gmail.com</i>
          <p>paste this as email and password are same.</p>
        </div>
        <div style={{ marginTop: "5vh" }}>
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
