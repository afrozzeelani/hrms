// import React, { Component } from "react";
// import "./EducationTable.css";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
// import { RingLoader } from "react-spinners";
// import { css } from "@emotion/core";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

// import InnerDashContainer from "../InnerDashContainer";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   margin-top: 45px;
//   border-color: red;
// `;

// class EducationTable extends Component {
//   state = {
//     educationData: [],
//     loading: true,

//     rowData: []
//   };
//   educationObj = [];
//   rowDataT = [];

//   loadEducationData = () => {
//     axios
//       .get("http://localhost:4000/api/education/" + this.props.data["_id"], {
//         headers: {
//           authorization: localStorage.getItem("token") || ""
//         }
//       })
//       .then((response) => {
//         this.educationObj = response.data;
//         console.log("response", response.data);
//         this.setState({ educationData: response.data });
//         this.setState({ loading: false });
//         this.rowDataT = [];
//         // let data=this.educationObj.education["0"];
//         this.educationObj.education.map((data) => {
//           let temp = {
//             data,
//             SchoolUniversity: data["SchoolUniversity"],
//             Degree: data["Degree"],
//             Grade: data["Grade"],
//             PassingOfYear: data["PassingOfYear"]
//           };

//           this.rowDataT.push(temp);
//         });
//         this.setState({ rowData: this.rowDataT });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   onEducationDelete = (e1, e2) => {
//     console.log(e1, e2);
//     if (window.confirm("Are you sure to delete this record? ") == true) {
//       axios
//         .delete("http://localhost:4000/api/education/" + e1 + "/" + e2, {
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
//     this.loadEducationData();
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
//           this.onEducationDelete(
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
//         onClick={() => this.props.onEditEducation(params.data.data)}
//       />
//     );
//   }

//   render() {
//     return (
//       <InnerDashContainer>
//         <h2 id="role-title">
//           Employee Education Details{" "}
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
//             onClick={this.props.onAddEducation}
//           >
//             <FontAwesomeIcon icon={faPlus} id="plus-icon" />
//             Add
//           </Button>
//         )}

//         <div id="clear-both" />

//         {!this.state.loading ? (
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
//                   School/University
//                 </th>
//                 <th
//                   style={{
//                     background:
//                       "linear-gradient(165deg, #700B97, 90%, #C84B31)",
//                     color: "white"
//                   }}
//                 >
//                   Degree
//                 </th>
//                 <th
//                   style={{
//                     background:
//                       "linear-gradient(165deg, #700B97, 90%, #C84B31)",
//                     color: "white"
//                   }}
//                 >
//                   Grade
//                 </th>
//                 <th
//                   style={{
//                     background:
//                       "linear-gradient(165deg, #700B97, 90%, #C84B31)",
//                     color: "white"
//                   }}
//                 >
//                   Passing Year
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {this.state.rowData.map((items, index) => (
//                 <tr key={index}>
//                   <td className="text-uppercase">{items.SchoolUniversity}</td>
//                   <td className="text-uppercase">{items.Degree}</td>
//                   <td className="text-uppercase">{items.Grade}</td>
//                   <td className="text-uppercase">{items.PassingOfYear}</td>
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

// export default EducationTable;

import React, { useState, useEffect } from "react";
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

const EducationTable = (props) => {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const loadEducationData = () => {
      axios
        .get(`${window.location.origin}/api/education/${props.data["_id"]}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then((response) => {
          const educationObj = response.data;
          console.log("response", response.data);
          setEducationData(educationObj);
          setLoading(false);

          const rowDataT = educationObj.education.map((data) => ({
            data,
            SchoolUniversity: data["SchoolUniversity"],
            Degree: data["Degree"],
            Grade: data["Grade"],
            PassingOfYear: data["PassingOfYear"]
          }));

          setRowData(rowDataT);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    loadEducationData();
  }, [props.data["_id"]]);

  const onEducationDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ")) {
      axios
        .delete(`${window.location.origin}/api/education/${e1}/${e2}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(() => {
          educationData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const renderButton = (params) => {
    console.log(params);
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          onEducationDelete(props.data["_id"], params.data.data["_id"])
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
        onClick={() => props.onEditEducation(params.data.data)}
      />
    );
  };

  return (
    <InnerDashContainer>
      <h2 id="role-title">
        Employee Education Details{" "}
        {props.back
          ? `of ${props.data["FirstName"]} ${props.data["LastName"]}`
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
          onClick={props.onAddEducation}
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
                School/University
              </th>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                Degree
              </th>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                Grade
              </th>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                Passing Year
              </th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((items, index) => (
              <tr key={index}>
                <td className="text-uppercase">{items.SchoolUniversity}</td>
                <td className="text-uppercase">{items.Degree}</td>
                <td className="text-uppercase">{items.Grade}</td>
                <td className="text-uppercase">{items.PassingOfYear}</td>
                {/* <td>
                  <button
                    onClick={() => props.onEditEducation(items.data)}
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

export default EducationTable;
