import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const Signup = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");

  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">First Name</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputFirstname1"
          placeholder="First name"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Last Name</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputLastname1"
          placeholder="Last name"
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Date of Birth</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputDob1"
          placeholder="00/00/0000"
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email"
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
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          actions.create(email, password, firstname, lastname, dob);
        }}
      >
        Submit
      </button>
    </form>
  );
};
