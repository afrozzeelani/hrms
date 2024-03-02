import React, { Component } from "react";
import "./DashboardEmployee.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import NavBar from "../../Pages/Navbar/NavBar.jsx";
import PersonalInfo from "./PersonalInfo.jsx";
import Education from "./Education.jsx";
import FamilyInfo from "./FamilyInfo.jsx";
import WorkExperience from "./WorkExperience.jsx";
import LeaveApplicationEmp from "./LeaveApplicationEmp.jsx";
import NotFound404 from "../../Pages/PageNot/NotFound404.jsx";
import EmployeeNewTask from "./EmployeeTaskManagement/EmployeeNewTask.jsx";
import EmployeeActiveTask from "./EmployeeTaskManagement/EmployeeActiveTask.jsx";
import Attendance from "./attendance/Attendance.jsx";
import AttendanceList from "./attendance/AttendanceList.jsx";
import EmpDash from "./Dashboard/EmpDash.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUser,
  faFileAlt,
  faUniversity,
  faBriefcase,
  faMale
} from "@fortawesome/free-solid-svg-icons";
import DashContainer from "../DashContainer.jsx";

class DashboardEmployee extends Component {
  state = {
    redirect: true,
    checked: true
  };
  handleChange = (checked) => {
    console.log("switch");

    if (this.state.checked == true) {
      document.getElementById("sidebar").setAttribute("class", "display-none");
    } else {
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }
    this.setState({ checked });
  };

  Navigation = [
    {
      icon: <FontAwesomeIcon icon={faUser} className="sidebar-icon" />,
      Linkrute: "/employee/dashboard",
      LinkName: "Dashboard"
    },
    {
      icon: <FontAwesomeIcon icon={faUser} className="sidebar-icon" />,
      Linkrute: "/employee/" + this.props.data["_id"] + "/personal-info",
      LinkName: "Profile"
    },
    {
      icon: <FontAwesomeIcon icon={faUniversity} className="sidebar-icon" />,
      Linkrute: "/employee/" + this.props.data["_id"] + "/education",
      LinkName: "Education"
    },
    {
      icon: <FontAwesomeIcon icon={faMale} className="sidebar-icon" />,
      Linkrute: "/employee/" + this.props.data["_id"] + "/family-info",
      LinkName: "Dependents"
    },
    {
      icon: <FontAwesomeIcon icon={faBriefcase} className="sidebar-icon" />,
      Linkrute: "/employee/" + this.props.data["_id"] + "/work-experience",
      LinkName: "WorkExp"
    },
    {
      icon: <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />,
      Linkrute:
        "/employee/" + this.props.data["_id"] + "/leave-application-emp",
      LinkName: "Leave"
    },
    {
      icon: <FontAwesomeIcon icon={faUser} className="sidebar-icon" />,
      Linkrute: "/employee/newTask",
      LinkName: "New Task"
    },
    {
      icon: <FontAwesomeIcon icon={faUser} className="sidebar-icon" />,
      Linkrute: "/employee/activeTask",
      LinkName: "Active Task"
    },
    {
      icon: <FontAwesomeIcon icon={faUser} className="sidebar-icon" />,
      Linkrute: "/employee/" + this.props.data["_id"] + "/attendance",
      LinkName: "Attendance"
    },
    {
      icon: <FontAwesomeIcon icon={faUser} className="sidebar-icon" />,
      Linkrute: "/employee/" + this.props.data["_id"] + "/attendanceList",
      LinkName: "Attendance List"
    }
  ];

  render() {
    return (
      <DashContainer>
        <Router>
          <NavBar
            loginInfo={this.props.data}
            checked={this.state.checked}
            handleChange={this.handleChange}
            onLogout={this.props.onLogout}
          />
          <div style={{ height: "94vh", width: "100%" }} className="d-flex">
            <div
              style={{ height: "100%" }}
              className="empSidebar bg-dark p-3 d-flex flex-column gap-4 "
            >
              {this.Navigation.map((navigation) => (
                <Link
                  className="text-white text-decoration-none fw-bold d-flex justify-content-between "
                  key={navigation}
                  to={navigation.Linkrute}
                >
                  <div
                    style={{ width: "fit-content" }}
                    className="d-flex gap-2"
                  >
                    <p
                      style={{
                        height: "20px",
                        width: "20px",
                        alignItems: "center"
                      }}
                      className="m-auto d-flex rounded-5  justify-content-center"
                    >
                      {navigation.icon}
                    </p>
                    <p
                      style={{ whiteSpace: "pre" }}
                      className="my-auto fw-normal"
                    >
                      {navigation.LinkName}
                    </p>
                  </div>
                  <span className="my-auto fs-4">+</span>
                </Link>
              ))}
            </div>

            <div
              div
              style={{ height: "100%", width: "100%" }}
              className="empSidebar d-flex flex-column"
            >
              <Route path="/employee/dashboard" exact component={EmpDash} />
              <Route
                exact
                path="/employee/:id/personal-info"
                render={(props) => (
                  <PersonalInfo data={this.props.data} back={false} />
                )}
              />
              <Route
                exact
                path="/employee/:id/education"
                render={(props) => (
                  <Education data={this.props.data} back={false} />
                )}
              />
              <Route
                exact
                path="/employee/:id/family-info"
                render={(props) => (
                  <FamilyInfo data={this.props.data} back={false} />
                )}
              />
              <Route
                exact
                path="/employee/:id/work-experience"
                render={(props) => (
                  <WorkExperience data={this.props.data} back={false} />
                )}
              />
              <Route
                exact
                path="/employee/:id/leave-application-emp"
                render={(props) => (
                  <LeaveApplicationEmp data={this.props.data} />
                )}
              />
              <Route
                exact
                path="/employee/:id/attenDance"
                render={(props) => <Attendance data={this.props.data} />}
              />
              <Route
                exact
                path="/employee/:id/attendanceList"
                render={(props) => <AttendanceList data={this.props.data} />}
              />
              <Route
                path="/employee/newTask"
                exact
                component={EmployeeNewTask}
              />
              <Route
                path="/employee/activeTask"
                exact
                component={EmployeeActiveTask}
              />
            </div>
          </div>
        </Router>
      </DashContainer>
    );
  }
}

export default DashboardEmployee;
