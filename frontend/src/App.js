import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Routes
} from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import history from "./history.js";

import Login from "./Pages/Login/Login.jsx";
import DashboardAdmin from "./Component/Admin/DashboardAdmin.jsx";
import DashboardHR from "./Component/HrManager/DashboardHR.jsx";
import DashboardEmployee from "./Component/Employee/DashboardEmployee.jsx";
import ManagerDashboard from "./Component/Manager/ManagerDashboard.jsx";
import ForgetPass from "./Pages/ForgotPass/ForgetPass.jsx";

const App = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [firstTimeAlert, setFirstTimeAlert] = useState(true);
  const [employees, setEmployees] = useState(null);
  useEffect(() => {
    setUserData({
      _id: localStorage.getItem("_id") || "",
      Account: localStorage.getItem("Account") || "",
      Name: localStorage.getItem("Name") || "",
      Email: localStorage.getItem("Email") || ""
    });

    setIsLogin(localStorage.getItem("isLogin") === "true");

    // temporary: for the user to see user id and pass of all accounts to explore all features of the app
    if (firstTimeAlert && !isLogin) {
      setFirstTimeAlert(false);
    }
  }, [firstTimeAlert, isLogin]);
  const loadEmployeeData = (email, account) => {
    console.log(email, account, localStorage.getItem("token"));
    axios
      .get(`${window.location.origin}/api/employee`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        // Ensure that response.data is an array
        let related = response.data.filter((val) => {
          return val.Account === account;
        });
        console.log(related);
        setEmployees(related);
        handleLogin(related, email);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    setPass(true);
    setLoading(true);
    login(event.target[0].value, event.target[1].value);
    event.target.reset();
  };
  // const handleLogou = async () => {
  //   let email = localStorage.getItem("Email");
  //   console.log(employees, email);
  //   if (employees) {
  //     let data = employees.filter((val) => {
  //       return val.Email === email;
  //     });
  //     console.log(data);
  //     let attencenceID = data[0].attendanceObjID;
  //     let selectedEmployee = data[0]._id;
  //     try {
  //       if (!email) {
  //         alert("Please select an employee");
  //         return;
  //       }

  //       const currentTime = new Date().toLocaleTimeString();
  //       await axios.post(
  //         `http://localhost:4000/api/attendance/${attencenceID}`,
  //         {
  //           employeeId: selectedEmployee,
  //           year: new Date().getFullYear(),
  //           month: new Date().getMonth() + 1,
  //           date: new Date().getDate(),
  //           logoutTime: [currentTime],
  //           status: "logout"
  //         }
  //       );
  //       alert("Logout time recorded successfully");
  //     } catch (error) {
  //       console.error("Error recording logout time:", error);
  //       alert("Error recording logout time");
  //     }
  //   }
  // };

  const handleLogou = async () => {
    let email = localStorage.getItem("Email");
    console.log(employees, email);
    if (employees) {
      let data = employees.filter((val) => {
        return val.Email === email;
      });
      console.log(data);
      let attencenceID = data[0].attendanceObjID;
      let selectedEmployee = data[0]._id;
      try {
        if (!email) {
          alert("Please select an employee");
          return;
        }

        // Create a new Date object
        const currentDate = new Date();

        // Get the current hour, minute, and second in 24-hour format
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        const currentSecond = currentDate.getSeconds();

        // Format the current time in 24-hour format
        const currentTime24Hrs = `${currentHour < 10 ? "0" : ""
          }${currentHour}:${currentMinute < 10 ? "0" : ""}${currentMinute}:${currentSecond < 10 ? "0" : ""
          }${currentSecond}`;

        // Get the current time in milliseconds
        const currentTimeMs = currentDate.getTime();

        await axios.post(
          `${window.location.origin}/api/attendance/${attencenceID}`,
          {
            employeeId: selectedEmployee,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            date: new Date().getDate(),
            logoutTime: [currentTime24Hrs],
            logoutTimeMs: [currentTimeMs],
            status: "Logout"
          }
        );
        alert("Logout time recorded successfully");
      } catch (error) {
        console.error("Error recording logout time:", error);
        alert("Error recording logout time");
      }
    }
  };
  const handleLogout = () => {
    console.log("logout");
    handleLogou();
    localStorage.clear();
    setUserData({});
    setIsLogin(false);
  };
  const fetchUsers = async (id, email) => {
    console.log(id, email);
    try {
      const response = await axios.get(
        `${window.location.origin}/api/employee/` + id,
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      );
      console.log(response.data);
      setEmployees(response.data);
      handleLogin(response.data, email);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // const handleLogin = async (data1, email) => {
  //   console.log(data1);
  //   if (data1 && email) {
  //     let data = data1.filter((val) => {
  //       return val.Email === email;
  //     });
  //     console.log(data[0].attendanceObjID, data[0]._id);
  //     let attencenceID = data[0].attendanceObjID;
  //     let selectedEmployee = data[0]._id;

  //     try {
  //       if (!(data1 && email)) {
  //         alert("Please select a user");
  //         return;
  //       }

  //       const currentTime = new Date().toLocaleTimeString();

  //       await axios.post(
  //         `http://localhost:4000/api/attendance/${attencenceID}`,
  //         {
  //           employeeId: selectedEmployee,
  //           year: new Date().getFullYear(),
  //           month: new Date().getMonth() + 1,
  //           date: new Date().getDate(),
  //           loginTime: [currentTime],
  //           status: "login"
  //         }
  //       );
  //       alert("Login time recorded successfully");
  //     } catch (error) {
  //       console.error("Error recording login time:", error);
  //       alert("Error recording login time");
  //     }
  //   }
  // };

  const handleLogin = async (data1, email) => {
    console.log(data1);
    if (data1 && email) {
      let data = data1.filter((val) => {
        return val.Email === email;
      });
      console.log(data[0].attendanceObjID, data[0]._id);
      let attencenceID = data[0].attendanceObjID;
      let selectedEmployee = data[0]._id;

      try {
        if (!(data1 && email)) {
          alert("Please select a user");
          return;
        }

        const currentDate = new Date();

        // Get the current hour, minute, and second in 24-hour format
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        const currentSecond = currentDate.getSeconds();

        // Format the current time in 24-hour format
        const currentTime24Hrs = `${currentHour < 10 ? "0" : ""
          }${currentHour}:${currentMinute < 10 ? "0" : ""}${currentMinute}:${currentSecond < 10 ? "0" : ""
          }${currentSecond}`;

        // Get the current time in milliseconds
        const currentTimeMs = currentDate.getTime();

        await axios.post(
          `${window.location.origin}/api/attendance/${attencenceID}`,
          {
            employeeId: selectedEmployee,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            date: new Date().getDate(),
            loginTime: [currentTime24Hrs],
            loginTimeMs: [currentTimeMs],
            status: "login"
          }
        );
        alert("Login time recorded successfully");
      } catch (error) {
        console.error("Error recording login time:", error);
        alert("Error recording login time");
      }
    }
  };
  const login = (id, pass) => {
    const bodyLogin = {
      email: id,
      password: pass
    };

    axios
      .post(`${window.location.origin}/api/login`, bodyLogin)
      .then((res) => {
        const decodedData = jwt.decode(res.data);

        localStorage.setItem("token", res.data);

        if (decodedData.Account === 1) {
          setPass(true);
          setLoading(false);
          setIsLogin(true);

          localStorage.setItem("isLogin", true);
          localStorage.setItem("Account", 1);
          localStorage.setItem("_id", decodedData._id);
          localStorage.setItem(
            "Name",
            `${decodedData.FirstName} ${decodedData.LastName}`
          );
          localStorage.setItem("Email", bodyLogin.email);
          loadEmployeeData(bodyLogin.email, decodedData.Account);
          history.push("#/admin/dashboard");
        } else if (decodedData.Account === 2) {
          setPass(true);
          setLoading(false);
          setIsLogin(true);

          localStorage.setItem("isLogin", true);
          localStorage.setItem("Account", 2);
          localStorage.setItem("_id", decodedData._id);
          localStorage.setItem(
            "Name",
            `${decodedData.FirstName} ${decodedData.LastName}`
          );
          localStorage.setItem("Email", bodyLogin.email);
          // console.log(decodedData._id);
          loadEmployeeData(bodyLogin.email, decodedData.Account);
          // fetchUsers(decodedData._id, bodyLogin.email);
          history.push("#/hr/dashboard");
        } else if (decodedData.Account === 4) {
          setPass(true);
          setLoading(false);
          setIsLogin(true);

          localStorage.setItem("isLogin", true);
          localStorage.setItem("Account", 4);
          localStorage.setItem("_id", decodedData._id);
          localStorage.setItem(
            "Name",
            `${decodedData.FirstName} ${decodedData.LastName}`
          );
          localStorage.setItem("Email", bodyLogin.email);
          // console.log(decodedData._id);
          loadEmployeeData(bodyLogin.email, decodedData.Account);
          // fetchUsers(decodedData._id, bodyLogin.email);
          history.push("#/manager/dashboard");
        } else if (decodedData.Account === 3) {
          setPass(true);
          setLoading(false);
          setIsLogin(true);

          localStorage.setItem("isLogin", true);
          localStorage.setItem("Account", 3);
          localStorage.setItem("_id", decodedData._id);
          localStorage.setItem(
            "Name",
            `${decodedData.FirstName} ${decodedData.LastName}`
          );
          localStorage.setItem("Email", bodyLogin.email);
          // loadEmployeeData(bodyLogin.email, decodedData.Account);
          fetchUsers(decodedData._id, bodyLogin.email);

          // history.push(`#/employee/${decodedData._id}/dashboard`);
        }
      })
      .catch((err) => {
        console.log(err);
        setPass(false);
        setLoading(false);
      });
  };

  return (
    <Router>
      <Route
        exact
        path="/login"
        render={() =>
          userData.Account == 1 ? (
            <Redirect to="/admin/dashboard" />
          ) : userData.Account == 2 ? (
            <Redirect to="/hr/dashboard" />
          ) : userData.Account == 3 ? (
            <Redirect to="/employee/dashboard" />
          ) : userData.Account == 4 ? (
            <Redirect to="/manager/dashboard" />
          ) : (
            <Login onSubmit={handleSubmit} loading={loading} pass={pass} />
          )
        }
      />
      <Route
        path="/admin"
        render={() =>
          userData.Account == 1 ? (
            <DashboardAdmin data={userData} onLogout={handleLogout} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        path="/hr"
        render={() =>
          userData.Account == 2 ? (
            <DashboardHR data={userData} onLogout={handleLogout} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        path="/employee/"
        render={() =>
          userData.Account == 3 ? (
            <DashboardEmployee data={userData} onLogout={handleLogout} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        path="/manager/"
        render={() =>
          userData.Account == 4 ? (
            <ManagerDashboard data={userData} onLogout={handleLogout} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route path="/forgetPassword" exact component={ForgetPass} />
      <Route path="/" render={() => <Redirect to="/login" />} />
      <Route render={() => <Redirect to="/login" />} />
    </Router>
  );
};

export default App;
