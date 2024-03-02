import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminDasd from "../Admin/Dashboard/AdminDash.jsx";
import Role from "../../Pages/Department/Role.jsx";
import Position from "../../Pages/Department/Position.jsx";
import Department from "../../Pages/Department/Department.jsx";
import AdminPortal from "../Admin/AdminPortal.jsx";
import AdminProjectBid from "../Admin/AdminProjectBid.jsx";
import Salary from "../../Pages/Salary/Salary.jsx";
import LeaveApplicationHR from "../../Component/HrManager/LeaveApplicationHR.jsx";
import AdminEmployeeTable from "../../Pages/AddEmployee/EmployeeTable.jsx";
import NotFound404 from "../../Pages/PageNot/NotFound404.jsx";
// ********************task management***************//

import AdminAsignTask from "./TaskManagement/AdminAsignTask.jsx";
import AdminTaskStatus from "./TaskManagement/AdminTaskStatus.jsx";
import AdminCancleTask from "./TaskManagement/AdminCancleTask.jsx";
import AdminCompleteTask from "./TaskManagement/AdminCompleteTask.jsx";
import RejectedTask from "./TaskManagement/RejectedTask.jsx";
import AdminAssignedTask from "./TaskManagement/AdminAssignedTask.jsx";
import AdminAttendance from "./attendance/Attendance.jsx";
import AdminViewAttendance from "./attendance/ViewAttendance.jsx";
import LeaveCalendar from "../../Pages/LeaveCalendar/LeaveCalendar.jsx";
import Country from "../../Pages/Location/Country.jsx";
import State from "../../Pages/Location/State.jsx";
import City from "../../Pages/Location/City.jsx";
import Company from "../../Pages/Company/Company.jsx";
import LeaveApplication from "../../Pages/ApplyLeave/LeaveApplication.jsx";
import LeaveApplicationHRAccept from "../HrManager/LeaveStatus/LeaveApplicationHRAccept.jsx";
import LeaveApplicationHRReject from "../HrManager/LeaveStatus/LeaveApplicationHRReject.jsx";

import InnerDashContainer from "../InnerDashContainer.jsx";
const AdminRoutes = () => {
  return (
    <InnerDashContainer>
      <div id="main-area">
        <div id="sidebar-top-content" />
        <Switch>
          <Route path="/admin/dashboard" exact component={AdminDasd} />
          <Route path="/admin/role" exact component={Role} />
          <Route path="/admin/position" exact component={Position} />
          <Route path="/admin/department" exact component={Department} />
          <Route path="/admin/portal-master" exact component={AdminPortal} />
          <Route path="/admin/project-bid" exact component={AdminProjectBid} />
          <Route path="/admin/salary" exact component={Salary} />

          <Route path="/admin/user" exact component={AdminEmployeeTable} />
          <Route path="/admin/task" exact component={AdminAsignTask} />
          <Route path="/admin/taskassign" exact component={AdminAssignedTask} />
          <Route path="/admin/taskstatus" exact component={AdminTaskStatus} />
          <Route path="/admin/taskcancle" exact component={AdminCancleTask} />
          {/* location route */}
          <Route path="/admin/leaveCal" exact component={LeaveCalendar} />
          <Route path="/admin/country" exact component={Country} />
          <Route path="/admin/state" exact component={State} />
          <Route path="/admin/city" exact component={City} />
          <Route path="/admin/company" exact component={Company} />
          <Route
            path="/admin/taskcomplete"
            exact
            component={AdminCompleteTask}
          />
          <Route path="/admin/taskreject" exact component={RejectedTask} />
          <Route
            path="/admin/adminAttendance"
            exact
            component={AdminAttendance}
          />
          <Route
            path="/admin/adminviewAttenDance"
            exact
            component={AdminViewAttendance}
          />
          {/* END TASK ROUTES */}
          {/* START LEAVE ROUTES */}
          <Route path="/admin/applyLeave" exact component={LeaveApplication} />
          <Route
            path="/admin/leaveAccepted"
            exact
            component={LeaveApplicationHRAccept}
          />
          <Route
            path="/admin/pendingLeave"
            exact
            component={LeaveApplicationHR}
          />
          <Route
            path="/admin/leaveRejected"
            exact
            component={LeaveApplicationHRReject}
          />
          {/*END LEAVE ROUTES */}
          <Route component={NotFound404} />
          {/* ********task******* */}
        </Switch>
      </div>
    </InnerDashContainer>
  );
};

export default AdminRoutes;
