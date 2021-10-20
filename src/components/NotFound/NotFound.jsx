import notfound from "../../images/notfound.jpg";

export const NotFound = params => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#404853",
        height: "100vh",
      }}
    >
      <img src={notfound} />
    </div>
  );
};
