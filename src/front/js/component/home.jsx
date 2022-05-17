import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Login } from "./login.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);
  return (
    <>
      {store.user ? (
        <div class="jumbotron jumbotron-fluid justify-content-center">
          <div class="container">
            <h1 class="display-4 text-center">Welcome, User</h1>
            <p class="lead">
              If you are seeing this, this means you successfully logged into
              this page. Do it again.
            </p>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
