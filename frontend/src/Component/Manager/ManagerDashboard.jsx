// import React, { Component } from "react";
// import "./DashboardHR.css";
// import { HashRouter as Router } from "react-router-dom";
// import Sidebar from "./Sidebar.jsx";
// import MainContent from "./Router.jsx";
// import NavBar from "../../Pages/Navbar/NavBar.jsx";

// class DashboardHR extends Component {
//   state = {
//     redirect: true,
//     checked: true,
//   };

//   handleChange = (checked) => {
//     console.log("switch");
//     // var sidebarV = this.refs.sidebar;
//     // var sidebarV = React.findDOMNode( this.refs.sidebar);
//     // sidebarV.style.disply="none";

//     if (this.state.checked == true) {
//       // document.getElementById("sidebar").setAttribute("style", "display:none")
//       document.getElementById("sidebar").setAttribute("class", "display-none");
//     }
//     // document.getElementById("sidebar").setAttribute("style", "display:block");
//     else {
//       document.getElementById("sidebar").setAttribute("class", "display-block");
//     }
//     this.setState({ checked });
//   };

//   render() {
//     return (
//       <Router>
//         <div id="outer-main-div">
//           <div id="outer-nav">
//             <NavBar
//               loginInfo={this.props.data}
//               checked={this.state.checked}
//               handleChange={this.handleChange}
//               onLogout={this.props.onLogout}
//             />
//           </div>

//           <div
//             style={{
//               maxHeight: "100vh",
//             }}
//             id="main-non-nav"
//           >
//             <Sidebar />
//             <div className="HrDashBG" id="main-area">
//               <MainContent />
//             </div>
//           </div>
//         </div>
//       </Router>
//     );
//   }
// }

// export default DashboardHR;

import React, { useState } from "react";
import "./DashboardHR.css";
import { HashRouter as Router } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import MainContent from "./Router.jsx";
import NavBar from "../../Pages/Navbar/NavBar.jsx";
import DashContainer from "../DashContainer.jsx";

const DashboardHR = (props) => {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    console.log("switch");

    if (checked) {
      document.getElementById("sidebar").setAttribute("class", "display-none");
    } else {
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }

    setChecked(!checked);
  };

  return (
    <DashContainer>
      <Router>
        <div id="outer-main-div">
          <div id="outer-nav">
            <NavBar
              loginInfo={props.data}
              checked={checked}
              handleChange={handleChange}
              onLogout={props.onLogout}
            />
          </div>

          <div
            className="d-flex"
            style={{
              maxHeight: "100vh"
            }}
            id="main-non-nav"
          >
            <Sidebar />
            <div className="HrDashBG w-100" id="main-area">
              <MainContent />
            </div>
          </div>
        </div>
      </Router>
    </DashContainer>
  );
};

export default DashboardHR;
