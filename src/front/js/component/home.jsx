import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div class="jumbotron jumbotron-fluid justify-content-center">
      <div class="container">
        <h1 class="display-4 text-center">Welcome, User</h1>
        <p class="lead">
          If you are seeing this, this means you successfully logged into this
          page. Do it again.
        </p>
      </div>
    </div>
  );
};
