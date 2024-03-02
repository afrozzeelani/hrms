// import React, { Component } from "react";
// import "./LeaveApplicationEmp.css";
// import axios from "axios";
// import LeaveApplicationEmpTable from "./LeaveApplicationEmpTable.jsx";
// import LeaveApplicationEmpForm from "./LeaveApplicationEmpForm.jsx";
// import LeaveApplicationEmpFormEdit from "./LeaveApplicationEmpFormEdit.jsx";
// class LeaveApplicationEmp extends Component {
//   state = {
//     table: true,
//     editForm: false,
//     editData: {},

//   };

//   render() {
//     return (
//       <React.Fragment>
//         {/* <h1>iiiiiiiiiinnnnnnnnnnnnnn{
//           JSON.stringify(this.props.data)}</h1> */}

//         {this.state.table ? (
//           this.state.editForm ? (
//             <LeaveApplicationEmpFormEdit
//               onLeaveApplicationEmpEditUpdate={this.handleLeaveApplicationEmpEditUpdate}
//               onFormEditClose={this.handleEditFormClose}
//               editData={this.state.editData}
//             />
//           ) : (
//               <LeaveApplicationEmpTable
//                 onAddLeaveApplicationEmp={this.handleAddLeaveApplicationEmp}
//                 onEditLeaveApplicationEmp={this.handleEditLeaveApplicationEmp}
//                 data={this.props.data}
//               />
//             )
//         ) : (
//             <LeaveApplicationEmpForm
//               onLeaveApplicationEmpSubmit={this.handleLeaveApplicationEmpSubmit}
//               onFormClose={this.handleFormClose}
//               onGenderChange={this.handleAddFormGenderChange}
//             />
//           )}
//       </React.Fragment>
//     );
//   }
//   handleLeaveApplicationEmpSubmit = event => {
//     event.preventDefault();
//     console.log("id", event.target[0].value, event.target[1].value);
//     this.setState({ table: true });

//     let body = {

//       //  CompanyName: event.target[0].value,
//       //  Designation:  event.target[1].value,
//       //  FromDate:  event.target[2].value,
//       //  ToDate:  event.target[3].value,

//       Leavetype: event.target[0].value,
//       FromDate: event.target[1].value,
//       ToDate: event.target[2].value,
//       Status: event.target[3].value,
//       Reasonforleave: event.target[4].value,

//     };
//     axios
//       .post("http://localhost:4000/api/leave-application-emp/" + this.props.data["_id"], body, {
//         headers: {
//           authorization: localStorage.getItem("token") || ""
//         }
//       })
//       .then(res => {
//         this.setState({ table: false });
//         this.setState({ table: true });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
//   handleAddLeaveApplicationEmp = () => {
//     console.log("clicked1");
//     this.setState({ table: false });
//   };
//   handleEditLeaveApplicationEmp = e => {
//     console.log(e);
//     console.log("clicked6");
//     this.setState({ editForm: true });
//     this.setState({ editData: e });
//     this.setState({ editFormGender: e["Gender"] })
//   };
//   handleFormClose = () => {
//     console.log("clicked1");
//     this.setState({ table: true });
//   };
//   handleEditFormClose = () => {
//     console.log("clicked5");
//     this.setState({ editForm: false });
//   };
//   // handleFormClose = () => {
//   //   console.log("clicked1");
//   //   this.setState({ table: true });
//   // };
//   handleLeaveApplicationEmpEditUpdate = (info, newInfo) => {
//     newInfo.preventDefault();
//     console.log("zero data", newInfo.target[0].value);
//     let body = {
//       Leavetype: newInfo.target[0].value,
//       FromDate: newInfo.target[1].value,
//       ToDate: newInfo.target[2].value,
//       Status: newInfo.target[3].value,
//       Reasonforleave: newInfo.target[4].value,

//     };
//     console.log("update", body);
//     axios
//       .put(
//         "http://localhost:4000/api/leave-application-emp/" + info["_id"],
//         body, {
//         headers: {
//           authorization: localStorage.getItem("token") || ""
//         }
//       }
//       )
//       .then(res => {
//         this.setState({ table: false });
//         this.setState({ table: true });
//       })
//       .catch(err => {
//         console.log(err);
//       });

//     this.setState({ editForm: false });
//   };

// }

// export default LeaveApplicationEmp;

import React, { useState } from "react";
import "./LeaveApplicationEmp.css";
import axios from "axios";
import LeaveApplicationEmpTable from "./LeaveApplicationTable.jsx";
import LeaveApplicationEmpForm from "./LeaveApplicationForm.jsx";
import LeaveApplicationEmpFormEdit from "./LeaveApplicationFormEdit.jsx";

const LeaveApplicationEmp = (props) => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  const handleLeaveApplicationEmpSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    setTable(true);

    let body = {
      Leavetype: event.target[0].value,
      FromDate: event.target[1].value,
      ToDate: event.target[2].value,
      Status: event.target[3].value,
      Reasonforleave: event.target[4].value
    };

    axios
      .post(
        `${window.location.origin}/api/leave-application-emp/` +
        localStorage.getItem("_id"),
        body,
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      )
      .then((res) => {
        setTable(false);
        setTable(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddLeaveApplicationEmp = () => {
    console.log("clicked1");
    setTable(false);
  };

  const handleEditLeaveApplicationEmp = (e) => {
    console.log(e);
    console.log("clicked6");
    setEditForm(true);
    setEditData(e);
  };

  const handleFormClose = () => {
    console.log("clicked1");
    setTable(true);
  };

  const handleEditFormClose = () => {
    console.log("clicked5");
    setEditForm(false);
  };

  const handleLeaveApplicationEmpEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    let body = {
      Leavetype: newInfo.target[0].value,
      FromDate: newInfo.target[1].value,
      ToDate: newInfo.target[2].value,
      Status: newInfo.target[3].value,
      Reasonforleave: newInfo.target[4].value
    };

    console.log("update", body);

    axios
      .put(
        `${window.location.origin}/api/leave-application-emp/` + info["_id"],
        body,
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      )
      .then((res) => {
        setTable(false);
        setTable(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setEditForm(false);
  };
  const handleAddFormGenderChange = () => { };

  return (
    <React.Fragment>
      {table ? (
        editForm ? (
          <LeaveApplicationEmpFormEdit
            onLeaveApplicationEmpEditUpdate={
              handleLeaveApplicationEmpEditUpdate
            }
            onFormEditClose={handleEditFormClose}
            onFormClose={handleFormClose}
            editData={editData}
          />
        ) : (
          <LeaveApplicationEmpTable
            onAddLeaveApplicationEmp={handleAddLeaveApplicationEmp}
            onEditLeaveApplicationEmp={handleEditLeaveApplicationEmp}
            data={props.data}
          />
        )
      ) : (
        <LeaveApplicationEmpForm
          onLeaveApplicationEmpSubmit={handleLeaveApplicationEmpSubmit}
          onFormClose={handleFormClose}
          onGenderChange={handleAddFormGenderChange}
        />
      )}
    </React.Fragment>
  );
};

export default LeaveApplicationEmp;
