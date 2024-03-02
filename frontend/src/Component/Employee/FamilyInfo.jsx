// import React, { Component } from "react";
// import "./FamilyInfo.css";
// import axios from "axios";
// import FamilyInfoTable from "./FamilyInfoTable.jsx";
// import FamilyInfoForm from "./FamilyInfoForm.jsx";
// import FamilyInfoFormEdit from "./FamilyInfoFormEdit.jsx";
// class FamilyInfo extends Component {
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
//             <FamilyInfoFormEdit
//               onFamilyInfoEditUpdate={this.handleFamilyInfoEditUpdate}
//               onFormEditClose={this.handleEditFormClose}
//               editData={this.state.editData}
//             />
//           ) : (
//               <FamilyInfoTable
//                 onAddFamilyInfo={this.handleAddFamilyInfo}
//                 onEditFamilyInfo={this.handleEditFamilyInfo}
//                 data={this.props.data}
//                 back={this.props.back}
//               />
//             )
//         ) : (
//             <FamilyInfoForm
//               onFamilyInfoSubmit={this.handleFamilyInfoSubmit}
//               onFormClose={this.handleFormClose}
//               onGenderChange={this.handleAddFormGenderChange}
//             />
//           )}
//       </React.Fragment>
//     );
//   }
//   handleFamilyInfoSubmit = event => {
//     event.preventDefault();
//     console.log("id", event.target[0].value, event.target[1].value);
//     this.setState({ table: true });

//     let body = {
//       Name: event.target[0].value,
//       Relationship: event.target[1].value,
//       DOB: event.target[2].value,
//       Occupation: event.target[3].value,
//     };
//     axios
//       .post("http://localhost:4000/api/family-info/" + this.props.data["_id"], body, {
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
//   handleAddFamilyInfo = () => {
//     console.log("clicked1");
//     this.setState({ table: false });
//   };
//   handleEditFamilyInfo = e => {
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
//   handleFamilyInfoEditUpdate = (info, newInfo) => {
//     newInfo.preventDefault();
//     console.log("zero data", newInfo.target[0].value);
//     let body = {
//       Name: newInfo.target[0].value,
//       Relationship: newInfo.target[1].value,
//       DOB: newInfo.target[2].value,
//       Occupation: newInfo.target[3].value,
//     };
//     console.log("update", body);
//     axios
//       .put(
//         "http://localhost:4000/api/family-info/" + info["_id"],
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

// export default FamilyInfo;
import React, { useState } from "react";
import "./FamilyInfo.css";
import axios from "axios";
import FamilyInfoTable from "./FamilyInfoTable.jsx";
import FamilyInfoForm from "./FamilyInfoForm.jsx";
import FamilyInfoFormEdit from "./FamilyInfoFormEdit.jsx";

const FamilyInfo = (props) => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  const handleFamilyInfoSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    setTable(true);

    let body = {
      Name: event.target[0].value,
      Relationship: event.target[1].value,
      DOB: event.target[2].value,
      Occupation: event.target[3].value
      // parentMobile: event.target[4].value
    };

    axios
      .post(
        `${window.location.origin}/api/family-info/` + props.data["_id"],
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

  const handleAddFamilyInfo = () => {
    console.log("clicked1");
    setTable(false);
  };

  const handleEditFamilyInfo = (e) => {
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

  const handleFamilyInfoEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    let body = {
      Name: newInfo.target[0].value,
      Relationship: newInfo.target[1].value,
      DOB: newInfo.target[2].value,
      Occupation: newInfo.target[3].value
      // parentMobile: newInfo.target[4].value
    };

    console.log("update", body);

    axios
      .put(`${window.location.origin}/api/family-info/` + info["_id"], body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
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
    <>
      {table ? (
        editForm ? (
          <FamilyInfoFormEdit
            onFamilyInfoEditUpdate={handleFamilyInfoEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <FamilyInfoTable
            onAddFamilyInfo={handleAddFamilyInfo}
            onEditFamilyInfo={handleEditFamilyInfo}
            data={props.data}
            back={props.back}
          />
        )
      ) : (
        <FamilyInfoForm
          onFamilyInfoSubmit={handleFamilyInfoSubmit}
          onFormClose={handleFormClose}
          onGenderChange={handleAddFormGenderChange}
        />
      )}
    </>
  );
};

export default FamilyInfo;
