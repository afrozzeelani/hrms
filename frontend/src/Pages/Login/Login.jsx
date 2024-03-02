// import React from "react";
// import "./Login.css";
// import Logo from "../../img/logo.png";
// import { css } from "@emotion/core";
// import { ScaleLoader } from "react-spinners";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

// const Login = (props) => {
//   return (
//     <div
//       className="login-bg"
//       style={{
//         height: "100vh",
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center"
//       }}
//     >
//       <div className="login-holder">
//         <div>
//           <div id="logo-div">
//             <img id="logo-img" src={Logo} alt="" />
//           </div>
//           <div id="title-div">
//             <h4 className="fw-bold text-primary">Sign in</h4>
//           </div>

//           <div id="outer-login-form-div">
//             <form onSubmit={props.onSubmit}>
//               <input
//                 className="login-form-input"
//                 type="text"
//                 placeholder="Email"
//                 required="required"
//                 name="Username"
//               />
//               <input
//                 className="login-form-input"
//                 type="password"
//                 placeholder="Password"
//                 required="required"
//               />
//               <input
//                 className="login-form-input text-white"
//                 type="submit"
//                 value="Sign in"
//                 id="submitBtn"
//               />
//               {!props.pass ? (
//                 <p className="alert text-danger">
//                   Invalid UserName or Password
//                 </p>
//               ) : (
//                 ""
//               )}
//             </form>
//           </div>

//           <div className="loading">
//             <ScaleLoader
//               css={override}
//               sizeUnit={"px"}
//               size={150}
//               color={"#123abc"}
//               loading={props.loading}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import "./Login.css";
import Logo from "../../img/logo.png";
import { css } from "@emotion/core";
import { ScaleLoader } from "react-spinners";
import LoginIMG from "../../img/LOGINBACK.svg";
import { IoLogOutOutline } from "react-icons/io5";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Login = (props) => {
  const [alertMsg, setalertMsg] = useState("");
  const [seePass, setSeepass] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div
      style={{ height: "100vh", width: "100%", overflow: "auto" }}
      className="  m-0 p-0 bg-light"
    >
      <div style={{ height: "100%", width: "100%" }} className="row bg-white">
        <div
          style={{ height: "100%" }}
          className="col-12 col-md-6  px-5 d-flex bg-white flex-column justify-content-center aline-center"
        >
          <form
            style={{ height: "100%", widt: "60%" }}
            onSubmit={props.onSubmit}
            className="form  my-auto  p-3 pb-5 rounded text-black fw-bold d-flex flex-column justify-content-center gap-5"
          >
            <h2 className="fw-bolder text-success mb-2 text-start">
              {" "}
              <FaUserCircle /> Log in
            </h2>
            <div className="d-flex flex-column gap-2">
              <label for="email" className="ps-2">
                Enter uour email address{" "}
              </label>
              <input
                name="email"
                placeholder="abcd@xyz.com"
                className="form-control rounded-5 bg-white border-3 border-muted"
                type="email"
              />
            </div>

            <div className="d-flex flex-column gap-2">
              <label for="password" className="ps-2">
                Enter your password:
              </label>
              <div className="position-relative">
                <input
                  name="password"
                  style={{ width: "100%" }}
                  placeholder="**********"
                  className="form-control rounded-5 bg-white border-3 border-muted"
                  type={!seePass ? "password" : "text"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  style={{
                    position: "absolute",
                    top: "5%",
                    right: "3%",
                    outline: "none",
                    border: "none"
                  }}
                  className="btn p-0 fs-5 text-muted my-0"
                  onClick={() => setSeepass(seePass ? false : true)}
                >
                  {" "}
                  {!seePass ? <RxEyeOpen /> : <GoEyeClosed />}
                </button>
              </div>
              <p className="text-muted  fw-normal text-start">
                <Link to="/forgetPassword" className="fw-semibold   px-2">
                  Forgot password
                </Link>
              </p>
            </div>

            <p
              style={{
                display: alertMsg ? "block" : "none",
                fontWeight: "normal"
              }}
              className="text-danger text-center"
            >
              {alertMsg}
            </p>

            <button
              style={{ width: "fit-content" }}
              className="btn btn-success px-5 rounded-5 fw-bolder shadow-sm"
            >
              Login
            </button>

            <p className="text-muted  fw-normal text-center">
              if You forget your password please contact administration !
            </p>
            {!props.pass ? (
              <p className="alert text-danger">Invalid UserName or Password</p>
            ) : (
              ""
            )}
          </form>
        </div>
        <div
          style={{ height: "100%", backgroundColor: "#a6ecdec7" }}
          className="col-12 col-md-6 p-5 d-flex flex-column justify-content-center gap-4 "
        >
          <div className="pt-5">
            <h5
              style={{ wordSpacing: "5px" }}
              className="text-muted text-center"
            >
              👋 Nice to se you again
            </h5>
            <h1
              style={{ letterSpacing: "5px" }}
              className="fw-bolder text-success text-center"
            >
              Welcome Back
            </h1>
          </div>
          <img
            style={{ width: "80%", margin: "0 auto" }}
            src={LoginIMG}
            alt=""
          />
          <p className="text-center pt-5 text-muted">www.kasperinfotech.org</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
