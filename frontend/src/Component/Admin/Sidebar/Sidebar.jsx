// Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { useState, useRef, useEffect } from "react";
// import "./Sidebar.css";
// import { MdDashboard } from "react-icons/md";
// import { FaUserTie } from "react-icons/fa";
// import { BsFillCalendar2DateFill } from "react-icons/bs";
// import { FaUsersCog } from "react-icons/fa";
// import { FaChair } from "react-icons/fa";
// import { FaBuilding } from "react-icons/fa";
// import { FaMoneyBillWave } from "react-icons/fa6";
// import { VscProject } from "react-icons/vsc";
// import { FiTarget } from "react-icons/fi";
// import { FaFileInvoice } from "react-icons/fa";
// import { RiMenu3Line } from "react-icons/ri";

// const Sidebar = () => {
//   const [isTaskSubMenuOpen, setTaskSubMenuOpen] = useState(false);
//   const [isExtended, setIsExtended] = useState(false);

//   const taskSubMenuRef = useRef(null);

//   const toggleTaskSubMenu = () => {
//     setTaskSubMenuOpen(!isTaskSubMenuOpen);
//   };

//   const checkExtended = () => {
//     if (isExtended === true) {
//       setIsExtended(false);
//     } else {
//       setIsExtended(true);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         taskSubMenuRef.current &&
//         !taskSubMenuRef.current.contains(event.target)
//       ) {
//         setTaskSubMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [taskSubMenuRef]);
//   return (
//     <div
//       className="px-0"
//       id="sidebar"
//       style={{
//         backgroundColor: "#1D267D",
//         width: "fit-content",
//         transition: "1s ease"
//       }}
//     >
//       {/* <div id="sidebar-top-content" /> */}
//       <div
//         style={{ boxShadow: "-3px 2px 3px gray inset", position: "relative" }}
//         className="fw-bold bg-white m-1 px-3 d-flex justify-between aline-center fs-5"
//       >
//         <p
//           style={{ display: isExtended ? "none" : "block" }}
//           className="my-auto px-2"
//         >
//           {" "}
//           ADMIN
//         </p>
//         <button
//           style={{
//             outline: "none",
//             border: "none",
//             backgroundColor: "transparent"
//           }}
//           onClick={checkExtended}
//           className="fs-4"
//         >
//           <RiMenu3Line className="fw-bolder my-auto" />
//         </button>
//       </div>
//       <div className="navbar-ul d-flex flex-column gap-2 p-1">
//         <li>
//           <Link to="/admin/dashboard" className="d-flex aline-center gap-2">
//             <span
//               title="Dashboard"
//               className="fs-4 d-flex my-auto text-warning"
//             >
//               <MdDashboard />
//             </span>
//             <p
//               className="my-auto px-2"
//               style={{ display: isExtended ? "none" : "block" }}
//             >
//               Dashboard
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/user" className="d-flex aline-center gap-2">
//             <span title="Employee" className="fs-4 d-flex my-auto text-warning">
//               <FaUserTie />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto px-2"
//             >
//               {" "}
//               Employee
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/leave" className="d-flex aline-center gap-2">
//             <span title="Leave" className="fs-4 d-flex my-auto text-warning">
//               <BsFillCalendar2DateFill />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto px-2"
//             >
//               {" "}
//               Leave
//             </p>
//           </Link>
//         </li>

//         <li>
//           <Link to="/admin/role" className="d-flex aline-center gap-2">
//             <span title="Role" className="fs-4 d-flex my-auto text-warning">
//               <FaUsersCog />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto px-2"
//             >
//               {" "}
//               Role
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/position" className="d-flex aline-center gap-2">
//             <span title="Position" className="fs-4 d-flex my-auto text-warning">
//               <FaChair />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto px-2"
//             >
//               {" "}
//               Position
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/department" className="d-flex aline-center gap-2">
//             <span
//               title="Department"
//               className="fs-4 d-flex my-auto text-warning"
//             >
//               <FaBuilding />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto px-2"
//             >
//               {" "}
//               Department
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/salary" className="d-flex aline-center gap-2">
//             <span title="Salary" className="fs-4 d-flex my-auto text-warning">
//               <FaMoneyBillWave />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto px-2"
//             >
//               {" "}
//               Salary
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/project-bid" className="d-flex aline-center gap-2">
//             <span
//               title=" Project Bidding"
//               className="fs-4 d-flex my-auto text-warning"
//             >
//               <VscProject />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto px-2"
//             >
//               {" "}
//               Project Bidding
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/portal-master" className="d-flex aline-center gap-2">
//             <span
//               title="Portal Master"
//               className="fs-4 d-flex my-auto text-warning"
//             >
//               <FiTarget />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto px-2"
//             >
//               {" "}
//               Portal Master
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/admin/task" className="d-flex aline-center gap-2">
//             <span title="Invoice" className="fs-4 d-flex my-auto text-warning">
//               <FaBuilding />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto"
//             >
//               {" "}
//               Invoice
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/admin/adminAttendance"
//             className="d-flex aline-center gap-2"
//           >
//             <span title="Invoice" className="fs-4 d-flex my-auto text-warning">
//               <FaBuilding />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto"
//             >
//               {" "}
//               Attendnce
//             </p>
//           </Link>
//         </li>
//         <li
//           onClick={toggleTaskSubMenu}
//           ref={taskSubMenuRef}
//           className="taskmanagement-menue"
//         >
//           <div style={{ color: "white" }} className="d-flex aline-center gap-2">
//             <span
//               title="Task Management"
//               className="fs-4 d-flex my-auto text-warning"
//             >
//               <FaFileInvoice />
//             </span>
//             <p
//               style={{
//                 display: isExtended ? "none" : "block",
//                 cursor: "pointer"
//               }}
//               className="my-auto px-2"
//             >
//               {" "}
//               Task Management
//             </p>
//           </div>
//           {isTaskSubMenuOpen && (
//             <div
//               className="sub-menu rounded-4 mt-3 rounded-top-0"
//               style={{
//                 background: "rgba(47, 45, 151, 0.944)",
//                 position: "absolute",
//                 width: "fit-conten",
//                 padding: "0rem 1rem .5rem .2rem",
//                 border: "3px solid gold",
//                 zIndex: "1"
//               }}
//             >
//               {/* Add your sub-menu items here */}
//               <li>
//                 <Link
//                   to="/admin/task"
//                   className="d-flex gap-2 justify-content-between aline-center"
//                 >
//                   Create Task <span> » </span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/admin/taskassign"
//                   className="d-flex gap-2 justify-content-between aline-center"
//                 >
//                   Assigned <span> » </span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/admin/taskstatus"
//                   className="d-flex gap-2 justify-content-between aline-center"
//                 >
//                   Active <span> » </span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/admin/taskcancle"
//                   className="d-flex gap-2 justify-content-between aline-center"
//                 >
//                   Cancelled <span> » </span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/admin/taskcomplete"
//                   className="d-flex gap-2 justify-content-between aline-center"
//                 >
//                   Completed <span> » </span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/admin/taskreject"
//                   className="d-flex gap-2 justify-content-between aline-center"
//                 >
//                   Reject <span> » </span>
//                 </Link>
//               </li>
//             </div>
//           )}
//         </li>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { BsBuildingsFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { MdDashboard, MdMenuOpen, MdTaskAlt } from "react-icons/md";
import { TbDeviceIpadMinus } from "react-icons/tb";
import { MdHolidayVillage } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FcLeave } from "react-icons/fc";

// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [extended, setExtended] = useState(true);

  const allLinks = [
    {
      icon: <MdDashboard />,
      name: "Dashboard",
      navLinks: [{ to: "/admin/dashboard", label: "Dashboard" }]
    },
    {
      icon: <FaUserTie />,
      name: "Employee",
      navLinks: [
        { to: "/admin/user", label: "Employee List" },
        { to: "/admin/salary", label: "Salary" }
      ]
    },
    {
      icon: <FaCalendarCheck />,
      name: "Attendance",
      navLinks: [
        { to: "/admin/adminAttendance", label: "Create Attendance" },
        { to: "/admin/adminviewAttenDance", label: "View Attendance" }
      ]
    },
    {
      icon: <FcLeave />,
      name: "Leave",
      navLinks: [
        { to: "/admin/applyLeave", label: "Apply Leave" },
        { to: "/admin/pendingLeave", label: "Pending " },
        { to: "/admin/leaveAccepted", label: "Accepted " },
        { to: "/admin/leaveRejected", label: "Rejected " }
      ]
    },
    {
      icon: <MdTaskAlt />,
      name: "Task",
      navLinks: [
        { to: "/admin/task", label: "Create New Task" },
        { to: "/admin/taskassign", label: "Assigned" },
        { to: "/admin/taskstatus", label: "Active Taask" },
        { to: "/admin/taskcancle", label: "Cancelled Task" },
        { to: "/admin/taskcomplete", label: "Completed Task" },
        { to: "/admin/taskreject", label: "Rejected Task" }
      ]
    },
    {
      icon: <TbDeviceIpadMinus />,
      name: "Access",
      navLinks: [
        { to: "/admin/role", label: "Role" },
        { to: "/admin/position", label: "Position" },
        { to: "/admin/department", label: "Department" }
      ]
    },
    {
      icon: <BsBuildingsFill />,
      name: "Company",
      navLinks: [
        { to: "/admin/company", label: "Company List" }
        // { to: "/hr/employee", label: "Create Employee" },
      ]
    },
    {
      icon: <FaAddressBook />,
      name: "Address",
      navLinks: [
        { to: "/admin/country", label: "Country" },
        { to: "/admin/state", label: "State" },
        { to: "/admin/city", label: "City" }
      ]
    },
    {
      icon: <MdHolidayVillage />,
      name: "Holiday",
      navLinks: [{ to: "/admin/leaveCal", label: "Leave Calendar" }]
    },
    {
      icon: <AiOutlineFundProjectionScreen />,
      name: "Project",
      navLinks: [
        { to: "/admin/project-bid", label: "Project Bidding" },
        { to: "/admin/portal-master", label: "Portal Master" }
      ]
    }
  ];

  const ExtendClick = () => {
    setExtended(extended ? false : true);
  };

  return (
    <div
      style={{
        minHeight: "100%",
        maxHeight: "100%",
        overflowY: "auto",
        overflow: "inherit",
        width: "fit-content",
        background: "#1D267D"
      }}
      className="d-flex  flex-column gap-2 p-3"
    >
      <h3
        style={{ borderBottom: "3px solid green" }}
        className="fw-bolder mt-5 text-success justify-content-between py-2 d-flex gap-2"
      >
        <p
          style={{ display: !extended ? "none" : "block" }}
          className="my-auto"
        >
          ADMIN
        </p>{" "}
        <span
          onClick={ExtendClick}
          style={{
            border: "none",
            outline: "none",
            cursor: "pointer",
            transform: `rotate(${!extended ? "180deg" : "0deg"})`
          }}
          className="my-auto p-0 fs-2 text-white"
        >
          <MdMenuOpen />
        </span>
      </h3>

      {allLinks.map(({ icon, name, navLinks }) => (
        <div
          key={name}
          onMouseEnter={() => setActiveCategory(name)}
          onMouseLeave={() => setActiveCategory(null)}
          className="position-relative"
        >
          <button
            style={buttonStyle}
            className="btn p-0 text-white text-start fw-bold gap-2 justify-between w-100 d-flex justify-content-between"
          >
            <div
              style={{ width: "fit-content" }}
              className="d-flex gap-2 my-auto"
            >
              <p
                style={{
                  height: "30px",
                  width: "30px",
                  alignItems: "center",
                  color: activeCategory === name ? "#FF9209" : "white"
                }}
                className="m-auto d-flex rounded-5  justify-content-center fs-3"
              >
                {icon}
              </p>
              <p
                style={{ display: !extended ? "none" : "block" }}
                className="my-auto"
              >
                {name}
              </p>
            </div>
            <span
              style={{
                transform: `rotate(${
                  activeCategory === name ? "135deg" : "0deg"
                })`,
                transition: "1s ease",
                display: !extended ? "none" : "block"
              }}
              className="my-auto fs-4"
            >
              +
            </span>
          </button>

          <div
            style={{
              ...dropdownStyle,
              display: activeCategory === name ? "flex" : "none",
              background:
                "linear-gradient(165deg,#11009E, #700B97, 90%, #C84B31)",
              width: "fit-content"
            }}
            className="flex-column position-absolute top-0 start-100 py-2 px-2 gap-2 mt-2  "
          >
            {navLinks.map((link) => (
              <Link className="text-decoration-none" key={link.to} to={link.to}>
                <div className="text-decoration-none flex-nowrap text-start fw-bolder gap-3 text-white d-flex justify-content-between ">
                  <div
                    style={{ borderBottom: "1px solid white" }}
                    className="d-flex gap-1 flex-nowrap"
                  >
                    <p className="m-0">{link.icon}</p>
                    <p style={{ whiteSpace: "pre" }} className="m-auto">
                      {link.label}
                    </p>
                  </div>
                  <span style={{}} className="my-auto ">
                    ›
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const buttonStyle = {
  outline: "none",
  border: "none",
  height: "3rem"
};

const dropdownStyle = {
  width: "250px",
  zIndex: "5",
  borderLeft: "5px solid white"
};

export default Sidebar;
