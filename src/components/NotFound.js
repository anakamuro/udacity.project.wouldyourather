import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    <h1>Error 404!</h1>
    <p>
      {" "}
      Content not Not Found
      <Link to="/">Return To Home</Link>
    </p>
  </div>
);
export default NotFound;
