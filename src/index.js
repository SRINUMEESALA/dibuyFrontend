import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Check if it's running on the server (optional)
if (typeof window === "undefined") {
  const express = require("express"); // Assuming Express is installed
  const path = require("path");
  const { renderToString } = require("react-dom/server");

  const port = 3000;
  const server = express();

  const buildPath = path.join(__dirname, "build"); // Assuming a build folder

  server.use(express.static(buildPath));

  server.get("/", (req, res) => {
    const body = renderToString(<App />);
    res.sendFile(path.join(buildPath, "index.html"));
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
} else {
  // Client-side rendering (normal React app behavior)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
