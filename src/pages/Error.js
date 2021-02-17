import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="section error">
      <h2> There is no such page</h2>
      <button className="submit-btn">
        <Link to="/">back to home</Link>
      </button>
    </div>
  );
};

export default Error;
