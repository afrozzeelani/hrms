// MainContent.jsx
import React from "react";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Role from "../../Pages/Department/Role.jsx";
import Position from "../../Pages/Department/Position.jsx";
import Department from "../../Pages/Department/Department.jsx";
import Country from "../../Pages/Location/Country.jsx";
import State from "../../Pages/Location/State.jsx";
import City from "../../Pages/Location/City.jsx";
import Company from "../../Pages/Company/Company.jsx";
import Employee from "../../Pages/AddEmployee/Employee.jsx";
import Salary from "../../Pages/Salary/Salary.jsx";
import LeaveApplicationHR from "../HrManager/LeaveApplicationHR.jsx";
import NotFound404 from "../../Pages/PageNot/NotFound404.jsx";
import Dashboard from "../HrManager/Dashboard/HRDash.jsx";
import ViewAttendance from "../HrManager/attendance/ViewAttendance.jsx";
// task management
import ManagerNewTask from "../HrManager/ManagerTaskManagement/ManagerNewTask.jsx";
import ManagerCencelledTask from "../HrManager/ManagerTaskManagement/ManagerCencelledTask.jsx";
import ManagerCompletedTask from "../HrManager/ManagerTaskManagement/ManagerCompletedTask.jsx";
import ManagerRejectedTask from "../HrManager/ManagerTaskManagement/ManagerRejectedTask.jsx";
import ManagerActiveTask from "./ManagerTaskManagement/ManagerActiveTask.jsx";
import Attendance from "../HrManager/attendance/Attendance.jsx";
import InnerDashContainer from "../InnerDashContainer.jsx";
import LeaveCalendar from "../../Pages/LeaveCalendar/LeaveCalendar.jsx";
import TodaysAttendance from "../HrManager/attendance/TodaysAttendance.jsx";
import LeaveApplication from "../../Pages/ApplyLeave/LeaveApplication.jsx";
import LeaveApplicationHRAccept from "./LeaveStatus/LeaveApplicationHRAccept.jsx";
import LeaveApplicationHRReject from "./LeaveStatus/LeaveApplicationHRReject.jsx";

const MainContent = () => {
  return (
    <InnerDashContainer>
      <div id="main-area">
        <div id="sidebar-top-content" />
        <Switch>
          <Route path="/hr/employee" component={Employee} />
          <Route path="/hr/salary" exact component={Salary} />
          <Route path="/hr/company" exact component={Company} />
          <Route path="/hr/role" component={Role} />
          <Route path="/hr/position" exact component={Position} />
          <Route path="/hr/department" exact component={Department} />
          <Route path="/hr/country" exact component={Country} />
          <Route path="/hr/state" exact component={State} />
          <Route path="/hr/city" exact component={City} />
          <Route
            path="/hr/leave-application-hr"
            exact
            component={LeaveApplicationHR}
          />

          <Route path="/hr/city" exact component={City} />
          <Route path="/hr/dashboard" exact component={Dashboard} />
          {/* <Route path="/hr/task" exact component={TaskAssign} /> */}
          <Route path="/hr/newTask" exact component={ManagerNewTask} />
          <Route path="/hr/ActiveTask" exact component={ManagerActiveTask} />
          <Route path="/hr/taskcancle" exact component={ManagerCencelledTask} />
          <Route
            path="/hr/taskcomplete"
            exact
            component={ManagerCompletedTask}
          />
          <Route path="/hr/rejectTask" exact component={ManagerRejectedTask} />
          <Route path="/hr/attenDance" exact component={Attendance} />
          <Route path="/hr/viewAttenDance" exact component={ViewAttendance} />
          <Route path="/hr/holiday" exact component={LeaveCalendar} />
          <Route
            path="/hr/todaysAttendance"
            exact
            component={TodaysAttendance}
          />
          <Route path="/hr/hrLeave" exact component={LeaveApplication} />
          <Route
            path="/hr/leaveAccepted"
            exact
            component={LeaveApplicationHRAccept}
          />
          <Route
            path="/hr/leaveRejected"
            exact
            component={LeaveApplicationHRReject}
          />
          {/* attendance */}
          <Route render={() => <NotFound404 />} />
        </Switch>
      </div>
    </InnerDashContainer>
  );
};

export default MainContent;
