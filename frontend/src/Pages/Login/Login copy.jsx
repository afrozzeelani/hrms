

import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import Logo from "../../img/logo.png";
import { css } from "@emotion/core";
import { ScaleLoader } from "react-spinners";
import { AttendanceContext } from "../../Context/AttendanceContext/AttendanceContext";
import axios from "axios";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Login = (props) => {
  const {
    employees,
    setEmployees,
    selectedEmployee,
    setSelectedEmployee,
    attencenceID,
    setAttencenceID,
    message,
    setMessage,
    emailInput, setEmailInput
  } = useContext(AttendanceContext);




  return (
    <div
      className="login-bg"
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="login-holder">
        <div>
          <div id="logo-div">
            <img id="logo-img" src={Logo} alt="" />
          </div>
          <div id="title-div">
            <h4 className="fw-bold text-primary">Sign in</h4>
          </div>

          <div id="outer-login-form-div">
            <form onSubmit={props.onSubmit}>
              <input
                className="login-form-input"
                type="text"
                placeholder="Email"
                required="required"
                name="Username"
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <input
                className="login-form-input"
                type="password"
                placeholder="Password"
                required="required"
              />
              <input
                className="login-form-input text-white"
                type="submit"
                value="Sign in"
                id="submitBtn"
              />
              {!props.pass ? (
                <p className="alert text-danger">
                  Invalid UserName or Password
                </p>
              ) : (
                ""
              )}
            </form>
          </div>

          <div className="loading">
            <ScaleLoader
              css={override}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={props.loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
