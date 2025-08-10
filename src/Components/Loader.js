import React from "react";
import Lottie from "lottie-react";
import loaderIcon from "../loaderIcon.json";

const LoaderComponent = () => {
  const style = {
    marginTop: "5%",
    width: "800px",
    height: "400px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
      className="loader-container"
    >
      <Lottie animationData={loaderIcon} loop={true} style={style} />
    </div>
  );
};

export default LoaderComponent;
