// import React, { Component } from "react";
// import "./FamilyInfoTable.css";
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
// import InnerDashContainer from "../InnerDashContainer";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   margin-top: 45px;
//   border-color: red;
// `;

// class FamilyInfoTable extends Component {
//   state = {
//     familyInfoData: [],
//     loading: true,

//     rowData: []
//   };
//   familyInfoObj = [];
//   rowDataT = [];

//   loadFamilyInfoData = () => {
//     axios
//       .get("http://localhost:4000/api/family-info/" + this.props.data["_id"], {
//         headers: {
//           authorization: localStorage.getItem("token") || ""
//         }
//       })
//       .then((response) => {
//         this.familyInfoObj = response.data;
//         console.log("response", response.data);
//         this.setState({ familyInfoData: response.data });
//         this.setState({ loading: false });
//         this.rowDataT = [];
//         // let data=this.familyInfoObj.familyInfo["0"];
//         this.familyInfoObj.familyInfo.map((data) => {
//           let temp = {
//             data,
//             Name: data["Name"],
//             Relationship: data["Relationship"],
//             DOB: data["DOB"].slice(0, 10),
//             Occupation: data["Occupation"]
//           };

//           this.rowDataT.push(temp);
//         });
//         this.setState({ rowData: this.rowDataT });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   onFamilyInfoDelete = (e1, e2) => {
//     console.log(e1, e2);
//     if (window.confirm("Are you sure to delete this record? ") == true) {
//       axios
//         .delete("http://localhost:4000/api/family-info/" + e1 + "/" + e2, {
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
//     this.loadFamilyInfoData();
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
//           this.onFamilyInfoDelete(
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
//         onClick={() => this.props.onEditFamilyInfo(params.data.data)}
//       />
//     );
//   }

//   render() {
//     return (
//       <InnerDashContainer>
//         <h2 id="role-title">
//           Employee Family Details{" "}
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
//             onClick={this.props.onAddFamilyInfo}
//           >
//             <FontAwesomeIcon icon={faPlus} id="plus-icon" />
//             Add
//           </Button>
//         )}

//         <div id="clear-both" />

//         {!this.state.loading ? (
//           // <div
//           //   id="table-div"
//           //   className="ag-theme-balham"
//           //   //   style={
//           //   //     {
//           //   //     height: "500px",
//           //   //     width: "100%"
//           //   //   }
//           //   // }
//           // >
//           //   <AgGridReact
//           //     columnDefs={this.state.columnDefs}
//           //     defaultColDef={this.state.defaultColDef}
//           //     columnTypes={this.state.columnTypes}
//           //     rowData={this.state.rowData}
//           //     // floatingFilter={true}
//           //     // onGridReady={this.onGridReady}
//           //     pagination={true}
//           //     paginationPageSize={10}
//           //     getRowHeight={this.state.getRowHeight}
//           //   />
//           // </div>
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th
//                   style={{
//                     background:
//                       "linear-gradient(165deg, #700B97, 90%, #C84B31)",
//                     color: "white"
//                   }}
//                 >
//                   Name
//                 </th>
//                 <th
//                   style={{
//                     background:
//                       "linear-gradient(165deg, #700B97, 90%, #C84B31)",
//                     color: "white"
//                   }}
//                 >
//                   Relationship
//                 </th>
//                 <th
//                   style={{
//                     background:
//                       "linear-gradient(165deg, #700B97, 90%, #C84B31)",
//                     color: "white"
//                   }}
//                 >
//                   DOB
//                 </th>
//                 <th
//                   style={{
//                     background:
//                       "linear-gradient(165deg, #700B97, 90%, #C84B31)",
//                     color: "white"
//                   }}
//                 >
//                   Occupation
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {this.state.rowData.map((items, index) => (
//                 <tr key={index}>
//                   <td className="text-uppercase">{items.Name}</td>
//                   <td className="text-uppercase">{items.Relationship}</td>
//                   <td className="text-uppercase">{items.DOB}</td>
//                   <td className="text-uppercase">{items.Occupation}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
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
//       </InnerDashContainer>
//     );
//   }
// }

// export default FamilyInfoTable;

import React, { useState, useEffect } from "react";
import "./FamilyInfoTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

import InnerDashContainer from "../InnerDashContainer";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const FamilyInfoTable = (props) => {
  const [familyInfoData, setFamilyInfoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  const familyInfoObj = [];

  const loadFamilyInfoData = () => {
    axios
      .get(`${window.location.origin}/api/family-info/` + props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        familyInfoObj.push(response.data);
        console.log("response", response.data);
        setFamilyInfoData(response.data);
        setLoading(false);
        const tempRowData = response.data.familyInfo.map((data) => ({
          data,
          Name: data["Name"],
          Relationship: data["Relationship"],
          DOB: data["DOB"].slice(0, 10),
          Occupation: data["Occupation"]
        }));
        setRowData(tempRowData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFamilyInfoDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ") === true) {
      axios
        .delete(`${window.location.origin}/api/family-info/` + e1 + "/" + e2, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then((res) => {
          loadFamilyInfoData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loadFamilyInfoData();
  }, []);

  const renderButton = (params) => {
    console.log(params);
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          onFamilyInfoDelete(props.data["_id"], params.data.data["_id"])
        }
      />
    );
  };

  const renderEditButton = (params) => {
    console.log(params);
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => props.onEditFamilyInfo(params.data.data)}
      />
    );
  };

  return (
    <InnerDashContainer>
      <h2 id="role-title">
        Employee Family Details{" "}
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
          onClick={props.onAddFamilyInfo}
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
                Name
              </th>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                Relationship
              </th>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                DOB
              </th>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                Occupation
              </th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((items, index) => (
              <tr key={index}>
                <td className="text-uppercase">{items.Name}</td>
                <td className="text-uppercase">{items.Relationship}</td>
                <td className="text-uppercase">{items.DOB}</td>
                <td className="text-uppercase">{items.Occupation}</td>
                {/* <td>
                  {" "}
                  <button
                    onClick={() => props.onEditFamilyInfo(items.data)}
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
    </InnerDashContainer>
  );
};

export default FamilyInfoTable;
