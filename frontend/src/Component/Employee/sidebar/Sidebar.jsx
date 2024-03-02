// // Sidebar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
// import {
//   faUsers,
//   faUser,
//   faFileAlt,
//   faUniversity,
//   faBriefcase,
//   faMale
// } from "@fortawesome/free-solid-svg-icons";

// const Sidebar = (props) => {
//   const [isTaskSubMenuOpen, setTaskSubMenuOpen] = useState(false);

//   const toggleTaskSubMenu = () => {
//     setTaskSubMenuOpen(!isTaskSubMenuOpen);
//   };
//   return (
//     <div id="sidebar">
//       <div id="sidebar-top-content" />
//       <div id="main-title" className="main-title-employee">
//         <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
//         Employee
//       </div>
//       <ul className="navbar-ul">
//         <li>
//           <Link to={"/employee/" + props.data["_id"] + "/personal-info"}>
//             <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
//             Personal Information
//           </Link>
//         </li>
//         <li>
//           <Link to={"/employee/" + props.data["_id"] + "/education"}>
//             <FontAwesomeIcon icon={faUniversity} className="sidebar-icon" />
//             Education
//           </Link>
//         </li>
//         <li>
//           <Link to={"/employee/" + props.data["_id"] + "/family-info"}>
//             <FontAwesomeIcon icon={faMale} className="sidebar-icon" />
//             Dependents
//           </Link>
//         </li>
//         <li>
//           <Link to={"/employee/" + props.data["_id"] + "/work-experience"}>
//             <FontAwesomeIcon icon={faBriefcase} className="sidebar-icon" />
//             WorkExp
//           </Link>
//         </li>
//         <li>
//           <Link
//             to={"/employee/" + props.data["_id"] + "/leave-application-emp"}
//           >
//             <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />
//             Leave Application
//           </Link>
//         </li>

//         <li>
//           <Link to={"/employee/newTask"}>
//             <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />
//             Leave Application
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

// Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUser,
  faFileAlt,
  faUniversity,
  faBriefcase,
  faMale
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ data }) => {
  const [isTaskSubMenuOpen, setTaskSubMenuOpen] = useState(false);

  const toggleTaskSubMenu = () => {
    setTaskSubMenuOpen(!isTaskSubMenuOpen);
  };

  return (
    <div id="sidebar">
      <div id="sidebar-top-content" />
      <div id="main-title" className="main-title-employee">
        <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
        Employee
      </div>
      <ul className="navbar-ul">
        <li>
          <Link to={`/employee/${data["_id"]}/personal-info`}>
            <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
            Personal Information
          </Link>
        </li>
        <li>
          <Link to={`/employee/${data["_id"]}/education`}>
            <FontAwesomeIcon icon={faUniversity} className="sidebar-icon" />
            Education
          </Link>
        </li>
        <li>
          <Link to={`/employee/${data["_id"]}/family-info`}>
            <FontAwesomeIcon icon={faMale} className="sidebar-icon" />
            Dependents
          </Link>
        </li>
        <li>
          <Link to={`/employee/${data["_id"]}/work-experience`}>
            <FontAwesomeIcon icon={faBriefcase} className="sidebar-icon" />
            WorkExp
          </Link>
        </li>
        <li>
          <Link to={`/employee/${data["_id"]}/leave-application-emp`}>
            <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />
            Leave Application
          </Link>
        </li>
        <li>
          <Link to="/employee/newTask">
            <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />
            New Task
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
