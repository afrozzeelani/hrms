// // Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// import { useState, useRef, useEffect } from "react";

// import { RiMenu3Line } from "react-icons/ri";
// import { MdDashboard } from "react-icons/md";

// import {
//   FaBuilding,
//   FaChair,
//   FaCity,
//   FaGlobeAmericas,
//   FaMoneyBillWave,
//   FaTasks,
//   FaUserTie,
//   FaUsersCog,
//   FaFileInvoice,
// } from "react-icons/fa";
// import { BsFillCalendar2DateFill } from "react-icons/bs";
// import { FaArchway, FaPlaceOfWorship, FaUserCheck } from "react-icons/fa6";

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
//       id="sidebar"
//       style={{
//         background: "linear-gradient(165deg,#11009E, #700B97, 90%, #C84B31)",
//         width: "fit-content",
//         transition: "1s ease",
//         overflowY: "auto",
//       }}
//     >
//       <div id="sidebar-top-content" />
//       <div
//         style={{ boxShadow: "-3px 2px 3px gray inset", position: "relative" }}
//         className="fw-bold bg-white m-1 px-3 d-flex justify-between aline-center fs-5"
//       >
//         <p
//           style={{ display: isExtended ? "none" : "block" }}
//           className="my-auto"
//         >
//           {" "}
//           HRD
//         </p>
//         <button
//           style={{
//             outline: "none",
//             border: "none",
//             backgroundColor: "transparent",
//           }}
//           onClick={checkExtended}
//           className="fs-4"
//         >
//           <RiMenu3Line className="fw-bolder my-auto" />
//         </button>
//       </div>
//       <div className="navbar-ul d-flex flex-column gap-2 p-1">
//         <li>
//           <Link to="/hr/dashboard" className="d-flex aline-center gap-2">
//             <span title="Dashboard" className="fs-4 d-flex my-auto text-white">
//               <MdDashboard />
//             </span>
//             <p
//               className="my-auto"
//               style={{ display: isExtended ? "none" : "block" }}
//             >
//               Dashboard
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/hr/employee" className="d-flex aline-center gap-2">
//             <span title="Employee" className="fs-4 d-flex my-auto text-white">
//               <FaUserTie />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto"
//             >
//               {" "}
//               Employee
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/hr/salary" className="d-flex aline-center gap-2">
//             <span title="Salary" className="fs-4 d-flex my-auto text-white">
//               <FaMoneyBillWave />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto"
//             >
//               {" "}
//               Salary
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/hr/leave-application-hr"
//             className="d-flex aline-center gap-2"
//           >
//             <span title="Leave" className="fs-4 d-flex my-auto text-white">
//               <BsFillCalendar2DateFill />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto"
//             >
//               {" "}
//               Leave
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/hr/company" className="d-flex aline-center gap-2">
//             <span title="Leave" className="fs-4 d-flex my-auto text-white">
//               <FaCity />
//             </span>

//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto"
//             >
//               company
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/hr/role" className="d-flex aline-center gap-2">
//             <span title="Role" className="fs-4 d-flex my-auto text-white">
//               <FaUsersCog />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto"
//             >
//               {" "}
//               Role
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/hr/position" className="d-flex aline-center gap-2">
//             <span title="Position" className="fs-4 d-flex my-auto text-white">
//               <FaChair />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto"
//             >
//               {" "}
//               Position
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/hr/department" className="d-flex aline-center gap-2">
//             <span title="Department" className="fs-4 d-flex my-auto text-white">
//               <FaBuilding />
//             </span>
//             <p
//               style={{ display: isExtended ? "none" : "block" }}
//               className="my-auto"
//             >
//               {" "}
//               Department
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/hr/country" className="d-flex aline-center gap-2">
//             <span title="Department" className="fs-4 d-flex my-auto text-white">
//               <FaGlobeAmericas />
//             </span>

//             <p
//               className="my-auto"
//               style={{ display: isExtended ? "none" : "block" }}
//             >
//               Country
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/hr/state" className="d-flex aline-center gap-2">
//             <span title="Department" className="fs-4 d-flex my-auto text-white">
//               <FaPlaceOfWorship />
//             </span>

//             <p
//               className="my-auto"
//               style={{ display: isExtended ? "none" : "block" }}
//             >
//               State
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/hr/city" className="d-flex aline-center gap-2">
//             <span title="Department" className="fs-4 d-flex my-auto text-white">
//               <FaArchway />
//             </span>

//             <p
//               className="my-auto"
//               style={{ display: isExtended ? "none" : "block" }}
//             >
//               City
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/hr/attenDance" className="d-flex aline-center gap-2">
//             <span title="Department" className="fs-4 d-flex my-auto text-white">
//               <FaUserCheck />
//             </span>

//             <p
//               className="my-auto"
//               style={{ display: isExtended ? "none" : "block" }}
//             >
//               Attendance
//             </p>
//           </Link>
//         </li>
//         <li>
//           <Link to="/hr/viewAttenDance" className="d-flex aline-center gap-2">
//             <span title="Department" className="fs-4 d-flex my-auto text-white">
//               <FaUserCheck />
//             </span>

//             <p
//               className="my-auto"
//               style={{ display: isExtended ? "none" : "block" }}
//             >
//              View Attendance
//             </p>
//           </Link>
//         </li>
//         {/* <li>
//           <Link to="/hr/empcard">
//             <FontAwesomeIcon icon={faArchway} className="sidebar-icon" />
//             empcard
//           </Link>
//         </li> */}

//         <li
//           onClick={toggleTaskSubMenu}
//           ref={taskSubMenuRef}
//           className="taskmanagement-menue"
//         >
//           <div style={{ color: "white" }} className="d-flex aline-center gap-2">
//             <span title="Department" className="fs-4 d-flex my-auto text-white">
//               <FaTasks />
//             </span>
//             <p
//               style={{
//                 display: isExtended ? "none" : "block",
//                 cursor: "pointer",
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
//                 zIndex: "1",
//                 height: "200px",
//                 overflow: "auto",
//               }}
//             >
//               {/* Add your sub-menu items here */}
//               <li>
//                 <Link
//                   to="/hr/newTask"
//                   className="d-flex gap-2 justify-content-between aline-center"
//                 >
//                   Assign New <span> » </span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/hr/ActiveTask"
//                   className="d-flex gap-2 justify-content-between aline-center"
//                 >
//                   Active <span> » </span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/hr/taskcancle"
//                   className="d-flex gap-2 justify-content-between aline-center"
//                 >
//                   Cancelled <span> » </span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/hr/taskcomplete"
//                   className="d-flex gap-2 justify-content-between aline-center"
//                 >
//                   Completed <span> » </span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/hr/rejectTask"
//                   className="d-flex gap-2 justify-content-between aline-center"
//                 >
//                   Rejected <span> » </span>
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
import { FcLeave } from "react-icons/fc";

// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [extended, setExtended] = useState(true);

  const allLinks = [
    {
      icon: <MdDashboard />,
      name: "Dashboard",
      navLinks: [{ to: "/hr/dashboard", label: "Dashboard" }]
    },
    {
      icon: <FaUserCircle />,
      name: "Employee",
      navLinks: [
        { to: "/hr/employee", label: "Employee List" },
        { to: "/hr/salary", label: "Salary" }
      ]
    },
    {
      icon: <FaCalendarCheck />,
      name: "Attendance",
      navLinks: [
        { to: "/hr/attenDance", label: "Create Attendance" },
        { to: "/hr/todaysAttendance", label: "TodaysAttendance" },
        { to: "/hr/viewAttenDance", label: "View Attendance" }
        // { to: "/hr/hrLeave", label: "Apply Leave" },
        // { to: "/hr/leave-application-hr", label: "View All Leave " }
      ]
    },
    {
      icon: <FcLeave />,
      name: "Leave",
      navLinks: [
        { to: "/hr/hrLeave", label: "Apply Leave" },
        { to: "/hr/leave-application-hr", label: "Pending " },
        { to: "/hr/leaveAccepted", label: "Accepted " },
        { to: "/hr/leaveRejected", label: "Rejected " }
      ]
    },
    {
      icon: <MdTaskAlt />,
      name: "Task",
      navLinks: [
        { to: "/hr/newTask", label: "Assign New Task" },
        { to: "/hr/ActiveTask", label: "Active Task" },
        { to: "/hr/taskcancle", label: "Cancelled Task" },
        { to: "/hr/taskcomplete", label: "Completed Task" },
        { to: "/hr/rejectTask", label: "Rejected Task" }
      ]
    },
    {
      icon: <TbDeviceIpadMinus />,
      name: "Access",
      navLinks: [
        { to: "/hr/role", label: "Role" },
        { to: "/hr/position", label: "Position" },
        { to: "/hr/department", label: "Department" }
      ]
    },
    {
      icon: <BsBuildingsFill />,
      name: "Company",
      navLinks: [
        { to: "/hr/company", label: "Company List" }
        // { to: "/hr/employee", label: "Create Employee" },
      ]
    },
    {
      icon: <FaAddressBook />,
      name: "Address",
      navLinks: [
        { to: "/hr/country", label: "Country" },
        { to: "/hr/state", label: "State" },
        { to: "/hr/city", label: "City" }
      ]
    },
    {
      icon: <MdHolidayVillage />,
      name: "Holiday",
      navLinks: [{ to: "/hr/holiday", label: "Leave Calendar" }]
    },
    {
      icon: <MdHolidayVillage />,
      name: "Profile",
      navLinks: [{ to: "/hr/profile", label: "Leave Calendar" }]
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
        background: "linear-gradient(165deg,#11009E, #700B97, 90%, #C84B31)"
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
          KASPER
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
              className="d-flex my-auto gap-2"
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
