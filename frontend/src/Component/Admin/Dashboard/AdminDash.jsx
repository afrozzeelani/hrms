// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import AdminEmployeeTable from "../../../Pages/AddEmployee/EmployeeTable";
// import PositionTable from "../../../Pages/Department/PositionTable";
// import RoleTable from "../../../Pages/Department/RoleTable";
// import LeaveApplicationHRTable from "../../HrManager/LeaveApplicationHRTable";
// import "../AdminDash.css";
// import { IoIosArrowDroprightCircle } from "react-icons/io";

// class HRDash extends Component {
//   state = {
//     totalEmployees: 0,
//     totalLeaves: 0,
//     totalAssignedTasks: 0
//   };

//   updateTotalEmployees = (totalEmployees) => {
//     this.setState({ totalEmployees });
//   };
//   updateTotalLeaves = (totalLeaves) => {
//     this.setState({ totalLeaves });
//   };
//   updateTotalPositions = (totalPositions) => {
//     this.setState({ totalPositions });
//   };

//   updateTotalRole = (totalRole) => {
//     this.setState({ totalRole });
//   };
//   setTotalAssignedTasks = (totalAssignedTasks) => {
//     this.setState({ totalAssignedTasks });
//   };
//   render() {
//     return (
//       <div>
//         <div className="container-fluid mt-4">
//           <h2 className="text-muted fw-bolder mb-4">🪟 ADMIN DASHBOARD</h2>
//           <div className="row row-gap-4">
//             <div className="col-md-3">
//               <div
//                 style={{ backgroundColor: "#FED2AA" }}
//                 className=" DashboardCard position-relative"
//               >
//                 <div className=" d-flex flex-column gap-3">
//                   <p className="fw-bold pt-2 text-muted">
//                     Total Employees
//                     <span
//                       className="fw-bolder text-info position-absolute"
//                       style={{ fontSize: "35px", right: "10%", top: "4%" }}
//                     >
//                       {this.state.totalEmployees}
//                     </span>
//                   </p>
//                   <Link
//                     className="text-decoration-none bg-white px-4  rounded-5 d-flex justify-between py-2  aline-items-center fw-bold text-info  aline-center"
//                     to="/admin/user"
//                   >
//                     <p className="my-auto">More Info</p>{" "}
//                     <p className="my-auto fs-4 d-flex">
//                       <IoIosArrowDroprightCircle />
//                     </p>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div
//                 style={{ backgroundColor: "#BAFFB4" }}
//                 className="DashboardCard position-relative"
//               >
//                 <div className="d-flex flex-column gap-3">
//                   <p className="fw-bold pt-2 text-muted">
//                     Total Leave Applications{" "}
//                     <span
//                       className="fw-bolder text-info position-absolute"
//                       style={{ fontSize: "35px", right: "10%", top: "4%" }}
//                     >
//                       {this.state.totalLeaves}
//                     </span>
//                   </p>
//                   <Link
//                     className="text-decoration-none bg-white px-4  rounded-5 d-flex justify-between py-2  aline-items-center fw-bold text-info  aline-center"
//                     to="/admin/leave"
//                   >
//                     <p className="my-auto">More Info</p>{" "}
//                     <p className="my-auto fs-4 d-flex">
//                       <IoIosArrowDroprightCircle />
//                     </p>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div
//                 style={{ backgroundColor: "#FEBBCC" }}
//                 className="DashboardCard position-relative"
//               >
//                 <div className="d-flex flex-column gap-3">
//                   <p className="fw-bold pt-2 text-muted">
//                     Total Position
//                     <span
//                       className="fw-bolder text-info position-absolute"
//                       style={{ fontSize: "35px", right: "10%", top: "4%" }}
//                     >
//                       {this.state.totalPositions}
//                     </span>
//                   </p>
//                   <Link
//                     className="text-decoration-none bg-white px-4  rounded-5 d-flex justify-between py-2  aline-items-center fw-bold text-info  aline-center"
//                     to="/admin/position"
//                   >
//                     <p className="my-auto">More Info</p>{" "}
//                     <p className="my-auto fs-4 d-flex">
//                       <IoIosArrowDroprightCircle />
//                     </p>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div
//                 style={{ backgroundColor: "#BCCEF8" }}
//                 className="DashboardCard position-relative"
//               >
//                 <div className="d-flex flex-column gap-3">
//                   <p className="fw-bold pt-2 text-muted">
//                     Total Role
//                     <span
//                       className="fw-bolder text-info position-absolute"
//                       style={{ fontSize: "35px", right: "10%", top: "4%" }}
//                     >
//                       {this.state.totalRole}
//                     </span>
//                   </p>
//                   <Link
//                     className="text-decoration-none bg-white px-4  rounded-5 d-flex justify-between py-2  aline-items-center fw-bold text-info  aline-center"
//                     to="/admin/role"
//                   >
//                     <p className="my-auto">More Info</p>{" "}
//                     <p className="my-auto fs-4 d-flex">
//                       <IoIosArrowDroprightCircle />
//                     </p>
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             <h1>Task Management Details..</h1>
//             <div className="col-md-3">
//               <div
//                 style={{ backgroundColor: "#D0A2F7" }}
//                 className=" DashboardCard position-relative"
//               >
//                 <div className=" d-flex flex-column gap-3">
//                   <p className="fw-bold pt-2 text-muted">
//                     Total Login
//                     <span
//                       className="fw-bolder text-info position-absolute"
//                       style={{ fontSize: "35px", right: "10%", top: "4%" }}
//                     >
//                       {this.state.totalAssignedTasks}
//                     </span>
//                   </p>
//                   <Link
//                     className="text-decoration-none bg-white px-4  rounded-5 d-flex justify-between py-2  aline-items-center fw-bold text-info  aline-center"
//                     to="/admin/user"
//                   >
//                     <p className="my-auto">More Info</p>{" "}
//                     <p className="my-auto fs-4 d-flex">
//                       <IoIosArrowDroprightCircle />
//                     </p>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div
//                 style={{ backgroundColor: "#FF9B9B" }}
//                 className="DashboardCard position-relative"
//               >
//                 <div className="d-flex flex-column gap-3">
//                   <p className="fw-bold pt-2 text-muted">
//                     Total Logout
//                     <span
//                       className="fw-bolder text-info position-absolute"
//                       style={{ fontSize: "35px", right: "10%", top: "4%" }}
//                     >
//                       {this.state.totalLeaves}
//                     </span>
//                   </p>
//                   <Link
//                     className="text-decoration-none bg-white px-4  rounded-5 d-flex justify-between py-2  aline-items-center fw-bold text-info  aline-center"
//                     to="/admin/leave"
//                   >
//                     <p className="my-auto">More Info</p>{" "}
//                     <p className="my-auto fs-4 d-flex">
//                       <IoIosArrowDroprightCircle />
//                     </p>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div
//                 style={{ backgroundColor: "#FFF38C" }}
//                 className="DashboardCard position-relative"
//               >
//                 <div className="d-flex flex-column gap-3">
//                   <p className="fw-bold pt-2 text-muted">
//                     Total Leave
//                     <span
//                       className="fw-bolder text-info position-absolute"
//                       style={{ fontSize: "35px", right: "10%", top: "4%" }}
//                     >
//                       {this.state.totalPositions}
//                     </span>
//                   </p>
//                   <Link
//                     className="text-decoration-none bg-white px-4  rounded-5 d-flex justify-between py-2  aline-items-center fw-bold text-info  aline-center"
//                     to="/admin/position"
//                   >
//                     <p className="my-auto">More Info</p>{" "}
//                     <p className="my-auto fs-4 d-flex">
//                       <IoIosArrowDroprightCircle />
//                     </p>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div
//                 style={{ backgroundColor: "#7FE9DE" }}
//                 className="DashboardCard position-relative"
//               >
//                 <div className="d-flex flex-column gap-3">
//                   <p className="fw-bold pt-2 text-muted">
//                     Employee's Birthday
//                     <span
//                       className="fw-bolder text-info position-absolute"
//                       style={{ fontSize: "35px", right: "10%", top: "4%" }}
//                     >
//                       {this.state.totalRole}
//                     </span>
//                   </p>
//                   <Link
//                     className="text-decoration-none bg-white px-4  rounded-5 d-flex justify-between py-2  aline-items-center fw-bold text-info  aline-center"
//                     to="/admin/role"
//                   >
//                     <p className="my-auto">More Info</p>{" "}
//                     <p className="my-auto fs-4 d-flex">
//                       <IoIosArrowDroprightCircle />
//                     </p>
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-9">
//               {/* Your existing code for tables */}
//               <div style={{ display: "none" }}>
//                 <AdminEmployeeTable
//                   onAddEmployee={this.handleAddEmployee}
//                   onEmpInfo={this.handleEmpInfo}
//                   onEditEmployee={this.handleEditEmployee}
//                   updateTotalEmployees={this.updateTotalEmployees}
//                 />
//               </div>

//               <div style={{ display: "none" }}>
//                 <LeaveApplicationHRTable
//                   updateTotalLeaves={this.updateTotalLeaves}
//                 />
//               </div>
//               <div style={{ display: "none" }}>
//                 <PositionTable
//                   updateTotalPositions={this.updateTotalPositions}
//                 />
//               </div>
//               <div style={{ display: "none" }}>
//                 <RoleTable updateTotalRole={this.updateTotalRole} />
//               </div>
//               {/* <div style={{ display: "none" }}>
//                 <AdminAssignedTask
//                   setTotalAssignedTasks={this.setTotalAssignedTasks}
//                 />
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default HRDash;

import React from "react";
import "../AdminDash.css";
import UpcomingBirthdays from "../../../Pages/AddEmployee/UpcomingBirthdays";
import TaskChart from "../Dashboard/Chart/TaskChart";
import DepartmentChart from "../../../Pages/Chart/DepartmentChart";
import HolidayList from "../../../Pages/LeaveCalendar/HolidayList";
import EmployeeCount from "./CountData/EmployeeCount";
import LeaveCount from "./CountData/LeavesCount";

const AdminDash = () => {
  return (
    <div className="main-container">
      <h2 className="text-muted fw-bolder mb-4">🪟 ADMIN DASHBOARD</h2>
      <div className="row gap-0 mx-0">
        <div className="col-lg-9">
          <EmployeeCount />
          <LeaveCount />
          <div className="row row_flex mt-5">
            <div className="col-lg-6">
              <TaskChart />
            </div>
            <div className="col-lg-6">
              <DepartmentChart />
            </div>
          </div>
          <div className="row row_flex">
            <div className="col-lg-12">{/* <TodatAttendance /> */}</div>
          </div>
        </div>
        <div className="col-lg-3 ">
          <UpcomingBirthdays />
          <div className=" mt-3">
            <HolidayList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
