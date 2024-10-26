import React from "react";
import image from "./assets/img/contruction.jpg";
const App = () => {
  return (
    <div style={{ textAlign: "center", position: "absolute" }}>
      <h1
        style={{
          textAlign: "center",
          position: "absolute",
          right: "0",
          left: "0",
          top: "5px",
          fontSize: "10vw",
        }}
      >
        Druid
      </h1>
      <div className="image">
        <img src={image} alt="Construction" width="100%" />
      </div>
    </div>
  );
};

export default App;
