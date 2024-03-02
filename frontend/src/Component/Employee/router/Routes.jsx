// import React from "react";
// import { HashRouter as Router, Route, Link } from "react-router-dom";
// import PersonalInfo from "../PersonalInfo.jsx";
// import Education from "../Education.jsx";
// import FamilyInfo from "../FamilyInfo.jsx";
// import WorkExperience from "../WorkExperience.jsx";
// import LeaveApplicationEmp from "../LeaveApplicationEmp.jsx";
// // import NotFound404 from "../../NotFound404.jsx";
// import Attendance from "../attendance/Attendance.jsx";

// // import Attendance from "../employee/attendance/Attendance.jsx";
// import EmployeeNewTask from "../EmployeeTaskManagement/EmployeeNewTask.jsx";

// const EmpRoutes = () => {
//   return (
//     <div id="main-area">
//       <div id="sidebar-top-content" />
//       <Route
//         exact
//         path="/employee/:id/personal-info"
//         render={(props) => <PersonalInfo data={this.props.data} back={false} />}
//       />
//       <Route
//         exact
//         path="/employee/:id/education"
//         render={(props) => <Education data={this.props.data} back={false} />}
//       />
//       <Route
//         exact
//         path="/employee/:id/family-info"
//         render={(props) => <FamilyInfo data={this.props.data} back={false} />}
//       />
//       <Route
//         exact
//         path="/employee/:id/work-experience"
//         render={(props) => (
//           <WorkExperience data={this.props.data} back={false} />
//         )}
//       />
//       <Route
//         exact
//         path="/employee/:id/leave-application-emp"
//         render={(props) => <LeaveApplicationEmp data={this.props.data} />}
//       />
//       <Route path="/employee/newTask" exact component={EmployeeNewTask} />
//       <Route path="/employee/attenDance" exact component={Attendance} />

//       {/* <Route
//                   exact
//                   path="/employee"
//                   render={() => (
//                     <Redirect
//                       to={
//                         "/employee/" +
//                         this.props.data["_id"] +
//                         "/personal-info"
//                       }
//                     />
//                   )}
//                 /> */}
//       {/* <Route
//         render={
//           () => <NotFound404 />
//           // <Redirect to={"/employee/"+ this.props.data["_id"]+"/personal-info"} />
//         }
//       /> */}
//     </div>
//   );
// };

// export default EmpRoutes;

import React from "react";
import { Route } from "react-router-dom";
import PersonalInfo from "../PersonalInfo.jsx";
import Education from "../Education.jsx";
import FamilyInfo from "../FamilyInfo.jsx";
import WorkExperience from "../WorkExperience.jsx";
import LeaveApplicationEmp from "../LeaveApplicationEmp.jsx";
import Attendance from "../attendance/Attendance.jsx";
import EmployeeNewTask from "../EmployeeTaskManagement/EmployeeNewTask.jsx";

const EmpRoutes = (props) => {
  const { data } = props;

  return (
    <div id="main-area">
      <div id="sidebar-top-content" />
      <Route
        exact
        path="/employee/:id/personal-info"
        render={(routeProps) => <PersonalInfo {...routeProps} data={data} back={false} />}
      />
      <Route
        exact
        path="/employee/:id/education"
        render={(routeProps) => <Education {...routeProps} data={data} back={false} />}
      />
      <Route
        exact
        path="/employee/:id/family-info"
        render={(routeProps) => <FamilyInfo {...routeProps} data={data} back={false} />}
      />
      <Route
        exact
        path="/employee/:id/work-experience"
        render={(routeProps) => <WorkExperience {...routeProps} data={data} back={false} />}
      />
      <Route
        exact
        path="/employee/:id/leave-application-emp"
        render={(routeProps) => <LeaveApplicationEmp {...routeProps} data={data} />}
      />
      <Route path="/employee/newTask" exact component={EmployeeNewTask} />
      <Route path="/employee/attenDance" exact component={Attendance} />
    </div>
  );
};

export default EmpRoutes;

