import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const history = useHistory();
  return (
    <form>
      {errors}
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(e) => setEmail(e.target.value)}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group form-check"></div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => {
          if (email == "" && password == "") {
            setErrors("email or password cannot be empty.");
          } else {
            e.preventDefault();
            actions.logId(email, password);
            history.push("/home");
          }
        }}
      >
        Submit
      </button>
    </form>
  );
};
