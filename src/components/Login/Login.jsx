import { accessUrl } from "../../api/auth";

export const Login = params => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "40vh" }}
    >
      <div style={{}}>
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
  );
};
