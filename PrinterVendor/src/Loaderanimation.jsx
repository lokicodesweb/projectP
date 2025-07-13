import React from "react";
import "./loading.css";

export default function Loader() {
  return (
    <div className="loading">
      <video
        src="src/assets/Printer.mp4"
        muted
        autoPlay
        loop
        alt="Loading..."
      />
      <h1>Loading.....</h1>
      <p>Please wait</p>
    </div>
  );
}
