// import React, { Component } from "react";
// import "./WorkExperienceTable.css";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
// import { RingLoader } from "react-spinners";
// import { css } from "@emotion/core";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-balham.css";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   margin-top: 45px;
//   border-color: red;
// `;

// class WorkExperienceTable extends Component {
//   state = {
//     workExperienceData: [],
//     loading: true,

//     rowData: []
//   };
//   workExperienceObj = [];
//   rowDataT = [];

//   loadWorkExperienceData = () => {
//     axios
//       .get(
//         "http://localhost:4000/api/work-experience/" + this.props.data["_id"],
//         {
//           headers: {
//             authorization: localStorage.getItem("token") || ""
//           }
//         }
//       )
//       .then((response) => {
//         this.workExperienceObj = response.data;
//         console.log("response", response.data);
//         this.setState({ workExperienceData: response.data });
//         this.setState({ loading: false });
//         this.rowDataT = [];
//         // let data=this.educationObj.education["0"];
//         this.workExperienceObj.workExperience.map((data) => {
//           let temp = {
//             data,
//             CompanyName: data["CompanyName"],
//             Designation: data["Designation"],
//             FromDate: data["FromDate"].slice(0, 10),
//             ToDate: data["ToDate"].slice(0, 10)
//           };

//           this.rowDataT.push(temp);
//         });
//         this.setState({ rowData: this.rowDataT });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   onWorkExperienceDelete = (e1, e2) => {
//     console.log(e1, e2);
//     if (window.confirm("Are you sure to delete this record? ") == true) {
//       axios
//         .delete("http://localhost:4000/api/work-experience/" + e1 + "/" + e2, {
//           headers: {
//             authorization: localStorage.getItem("token") || ""
//           }
//         })
//         .then((res) => {
//           this.componentDidMount();
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };
//   componentDidMount() {
//     this.loadWorkExperienceData();
//   }
//   renderButton(params) {
//     console.log(params);
//     if (this.props.back) {
//       return <React.Fragment />;
//     }
//     return (
//       <FontAwesomeIcon
//         icon={faTrash}
//         onClick={() =>
//           this.onWorkExperienceDelete(
//             this.props.data["_id"],
//             params.data.data["_id"]
//           )
//         }
//       />
//     );
//   }
//   renderEditButton(params) {
//     console.log(params);
//     if (this.props.back) {
//       return <React.Fragment />;
//     }
//     return (
//       <FontAwesomeIcon
//         icon={faEdit}
//         onClick={() => this.props.onEditWorkExperience(params.data.data)}
//       />
//     );
//   }

//   render() {
//     return (
//       <div id="table-outer-div-scroll">
//         <h2 id="role-title">
//           Employee Work Experience Details{" "}
//           {this.props.back
//             ? "of " +
//               this.props.data["FirstName"] +
//               " " +
//               this.props.data["LastName"]
//             : ""}
//         </h2>

//         {this.props.back ? (
//           <Link to="/hr/employee">
//             <Button variant="primary" id="add-button">
//               Back
//             </Button>
//           </Link>
//         ) : (
//           <Button
//             variant="primary"
//             id="add-button"
//             onClick={this.props.onAddWorkExperience}
//           >
//             <FontAwesomeIcon icon={faPlus} id="plus-icon" />
//             Add
//           </Button>
//         )}

//         <div id="clear-both" />

//         {!this.state.loading ? (
//           <div
//             id="table-div"
//             className="ag-theme-balham"
//             //   style={
//             //     {
//             //     height: "500px",
//             //     width: "100%"
//             //   }
//             // }
//           >
//             <AgGridReact
//               columnDefs={this.state.columnDefs}
//               defaultColDef={this.state.defaultColDef}
//               columnTypes={this.state.columnTypes}
//               rowData={this.state.rowData}
//               // floatingFilter={true}
//               // onGridReady={this.onGridReady}
//               pagination={true}
//               paginationPageSize={10}
//               getRowHeight={this.state.getRowHeight}
//             />
//           </div>
//         ) : (
//           <div id="loading-bar">
//             <RingLoader
//               css={override}
//               sizeUnit={"px"}
//               size={50}
//               color={"#0000ff"}
//               loading={true}
//             />
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default WorkExperienceTable;

import React, { useState, useEffect } from "react";
import "./WorkExperienceTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const WorkExperienceTable = (props) => {
  const [workExperienceData, setWorkExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  // Removed const from here
  let workExperienceObj = [];
  let rowDataT = [];

  const loadWorkExperienceData = () => {
    axios
      .get(`${window.location.origin}/api/work-experience/` + props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        workExperienceObj = response.data;
        console.log("response", response.data);
        setWorkExperienceData(response.data);
        setLoading(false);
        rowDataT.length = 0;
        workExperienceObj.workExperience.map((data) => {
          let temp = {
            data,
            CompanyName: data["CompanyName"],
            Designation: data["Designation"],
            FromDate: data["FromDate"].slice(0, 10),
            ToDate: data["ToDate"].slice(0, 10)
          };

          rowDataT.push(temp);
        });
        setRowData(rowDataT);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onWorkExperienceDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ") === true) {
      axios
        .delete(`${window.location.origin}/api/work-experience/` + e1 + "/" + e2, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then((res) => {
          loadWorkExperienceData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loadWorkExperienceData();
  }, []);

  // Corrected function declaration
  const renderButton = (params) => {
    console.log(params);
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          onWorkExperienceDelete(props.data["_id"], params.data.data["_id"])
        }
      />
    );
  };

  // Corrected function declaration
  const renderEditButton = (params) => {
    console.log(params);
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => props.onEditWorkExperience(params.data.data)}
      />
    );
  };

  return (
    <div id="table-outer-div-scroll">
      <h2 id="role-title">
        Employee Work Experience Details{" "}
        {props.back
          ? "of " + props.data["FirstName"] + " " + props.data["LastName"]
          : ""}
      </h2>

      {props.back ? (
        <Link to="/hr/employee">
          <Button variant="primary" id="add-button">
            Back
          </Button>
        </Link>
      ) : (
        <Button
          variant="primary"
          id="add-button"
          onClick={props.onAddWorkExperience}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>
      )}

      <div id="clear-both" />

      {!loading ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                Company Name
              </th>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                Designation
              </th>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                FromDate
              </th>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                ToDate
              </th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((items, index) => (
              <tr key={index}>
                <td className="text-uppercase">{items.CompanyName}</td>
                <td className="text-uppercase">{items.Designation}</td>
                <td className="text-uppercase">{items.FromDate}</td>
                <td className="text-uppercase">{items.ToDate}</td>
                {/* <td>
                  {" "}
                  <button
                    onClick={() => props.onEditWorkExperience(items.data)}
                    style={{
                      zIndex: "1",
                      cursor: "pointer"
                    }}
                    className="btn"
                  >
                    <FaRegEdit className="fs-4 text-primary bg-white p-1 rounded-5" />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div id="loading-bar">
          <RingLoader
            css={override}
            sizeUnit={"px"}
            size={50}
            color={"#0000ff"}
            loading={true}
          />
        </div>
      )}
    </div>
  );
};

export default WorkExperienceTable;
