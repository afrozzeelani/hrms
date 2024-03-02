

import React, { useState } from "react";
import "./Employee.css";
import axios from "axios";
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeForm from "./EmployeeForm.jsx";
import EmployeeFormEdit from "./EmployeeFormEdit.jsx";
import EmployeeInfo from "./EmployeeInfo.jsx";
import { HashRouter as Router, Route } from "react-router-dom";
import PersonalInfo from "../../Component/Employee/PersonalInfo.jsx";
import Education from "../../Component/Employee/Education.jsx";
import FamilyInfo from "../../Component/Employee/FamilyInfo.jsx";
import WorkExperience from "../../Component/Employee/WorkExperience.jsx";

const Employee = () => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [addFormGender, setAddFormGender] = useState("");
  const [editFormGender, setEditFormGender] = useState("");
  const [empInfo, setEmpInfo] = useState({});
  const [empInfoBool, setEmpInfoBool] = useState(false);

  const handleEmpInfo = (e) => {
    setEmpInfo(e);
    setEmpInfoBool(true);
  };

  const handleBack = () => {
    setEmpInfoBool(false);
  };

  // const handleEmployeeSubmit = async (event) => {
  //   event.preventDefault();
  //   setTable(true);

  //   const fileInput = event.target[15];

  //   // Read the file as a Data URL (base64)
  //   const reader = new FileReader();
  //   let profilePath;
  //   reader.onloadend = () => {
  //     profilePath = reader.result.split(',')[1];
  //   }

  //   const body = {
  //     Email: event.target[0].value,
  //     Password: event.target[1].value,
  //     Account: event.target[2].value,
  //     RoleID: event.target[3].value,
  //     Gender: addFormGender,

  //     FirstName: event.target[6].value,
  //     MiddleName: event.target[7].value,
  //     LastName: event.target[8].value,
  //     DOB: event.target[9].value,
  //     ContactNo: event.target[10].value,

  //     EmployeeCode: event.target[11].value,
  //     DepartmentID: event.target[12].value,
  //     PositionID: event.target[13].value,
  //     DateOfJoining: event.target[14].value,
  //     profile : event.target[15].files[0],
  //     // TerminateDate: event.target[15].value,
  //   };

  //   // console.log(body);
  //   // let formData = new FormData();

  //   // formData( "Email" , event.target[0].value,)
  //   // formData( "Password" , event.target[1].value,)
  //   // formData( "Account" , event.target[2].value,)
  //   // formData( "RoleID" , event.target[3].value,)
  //   // formData( "Gender" , addFormGender)

  //   // formData( "FirstName" , event.target[6].value,)
  //   // formData( "MiddleName" , event.target[7].value,)
  //   // formData( "LastName" , event.target[8].value,)
  //   // formData( "DOB" , event.target[9].value,)
  //   // formData( "ContactNo" , event.target[10].value,)

  //   // formData( "EmployeeCode" , event.target[11].value,)
  //   // formData( "DepartmentID" , event.target[12].value,)
  //   // formData( "PositionID" , event.target[13].value,)
  //   // formData( "DateOfJoining" , event.target[14].value,)
  //   // formData( "profile" , body.profile)

  //   console.log(body);

  //  await axios
  //     .post("http://localhost:4000/api/employee", body, {
  //       headers: {
  //         authorization: localStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       setTable(false);
  //       setTable(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleEmployeeSubmit = async (event) => {
    event.preventDefault();
    // setTable(true);

    const formData = new FormData();

    formData.append("Email", event.target[0].value);
    formData.append("Password", event.target[1].value);
    formData.append("Account", event.target[2].value);
    formData.append("RoleID", event.target[3].value);
    formData.append("Gender", addFormGender);

    formData.append("FirstName", event.target[6].value);
    formData.append("MiddleName", event.target[7].value);
    formData.append("LastName", event.target[8].value);
    formData.append("DOB", event.target[9].value);
    formData.append("ContactNo", event.target[10].value);

    // formData.append("EmployeeCode", event.target[11].value);
    formData.append("DepartmentID", event.target[11].value);
    formData.append("PositionID", event.target[12].value);
    formData.append("DateOfJoining", event.target[13].value);
    formData.append("profile", event.target[14].files[0]);

    await axios
      .post(`${window.location.origin}/api/employee`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((res) => {
        // setTable(false);
        setTable(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 400) {
          alert(err.response.data);
        }
      });
  };

  const handleAddEmployee = () => {
    setTable(false);
  };

  const handleEditEmployee = (e) => {
    setEditForm(true);
    setEditData(e);
    setEditFormGender(e["Gender"]);
  };

  const handleFormClose = () => {
    setTable(true);
  };

  const handleEditFormClose = () => {
    setEditForm(false);
  };

  // const handleEmployeeEditUpdate = (info, newInfo) => {
  //   newInfo.preventDefault();

  //   const body = {
  //     Email: newInfo.target[0].value,
  //     Account: newInfo.target[1].value,
  //     RoleID: newInfo.target[2].value,
  //     Gender: editFormGender,
  //     FirstName: newInfo.target[5].value,
  //     MiddleName: newInfo.target[6].value,
  //     LastName: newInfo.target[7].value,
  //     DOB: newInfo.target[8].value,
  //     ContactNo: newInfo.target[9].value,
  //     EmployeeCode: newInfo.target[10].value,
  //     DepartmentID: newInfo.target[11].value,
  //     PositionID: newInfo.target[12].value,
  //     DateOfJoining: newInfo.target[13].value,
  //     profile: newInfo.target[14].files[0],
  //     // TerminateDate: newInfo.target[14].value,
  //   };

  //   console.log(body);
  //   axios
  //     .put(`http://localhost:4000/api/employee/${info["_id"]}`, body, {
  //       headers: {
  //         authorization: localStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       setTable(false);
  //       setTable(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   setEditForm(false);
  // };

  const handleEmployeeEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();

    if (newInfo.target[9].value) {
    }

    const formData = new FormData();

    formData.append("Email", newInfo.target[0].value);
    formData.append("Account", newInfo.target[1].value);
    formData.append("RoleID", newInfo.target[2].value);
    formData.append("Gender", editFormGender);
    formData.append("FirstName", newInfo.target[5].value);
    formData.append("MiddleName", newInfo.target[6].value);
    formData.append("LastName", newInfo.target[7].value);
    formData.append("DOB", newInfo.target[8].value);
    formData.append("ContactNo", newInfo.target[9].value);
    // formData.append("EmployeeCode", newInfo.target[10].value);
    formData.append("DepartmentID", newInfo.target[10].value);
    formData.append("PositionID", newInfo.target[11].value);
    formData.append("DateOfJoining", newInfo.target[12].value);
    formData.append("profile", newInfo.target[13].files[0]);
    // formData.append("TerminateDate", newInfo.target[14].value);

    axios
      .put(`${window.location.origin}/api/employee/${info["_id"]}`, formData, {
        headers: {
          authorization: localStorage.getItem("token") || "",
          "Content-Type": "multipart/form-data" // Set content type explicitly for FormData
        }
      })
      .then((res) => {
        setTable(false);
        setTable(true);
        setEditForm(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert(err.response.data);
        }
      });
  };

  const handleAddFormGenderChange = (e) => {
    setAddFormGender(e.currentTarget.value);
  };

  const handleEditFormGenderChange = (e) => {
    setEditFormGender(e.currentTarget.value);
  };

  return (
    <Router>
      <Route
        exact
        path="/hr/employee"
        render={(props) => (
          <>
            {table ? (
              editForm ? (
                <EmployeeFormEdit
                  onEmployeeEditUpdate={handleEmployeeEditUpdate}
                  onFormEditClose={handleEditFormClose}
                  editData={editData}
                  onGenderChange={handleEditFormGenderChange}
                />
              ) : (
                <>
                  {!empInfoBool ? (
                    <EmployeeTable
                      onAddEmployee={handleAddEmployee}
                      onEditEmployee={handleEditEmployee}
                      onEmpInfo={handleEmpInfo}
                    />
                  ) : (
                    <EmployeeInfo data={empInfo} onBack={handleBack} />
                  )}
                </>
              )
            ) : (
              <EmployeeForm
                onEmployeeSubmit={handleEmployeeSubmit}
                onFormClose={handleFormClose}
                onGenderChange={handleAddFormGenderChange}
              />
            )}
          </>
        )}
      />

      <Route
        exact
        path="/hr/employee/info/personal-info"
        render={(props) => <PersonalInfo data={empInfo} back={true} />}
      />
      <Route
        exact
        path="/hr/employee/info/education"
        render={(props) => <Education data={empInfo} back={true} />}
      />
      <Route
        exact
        path="/hr/employee/info/family-info"
        render={(props) => <FamilyInfo data={empInfo} back={true} />}
      />
      <Route
        exact
        path="/hr/employee/info/work-experience"
        render={(props) => <WorkExperience data={empInfo} back={true} />}
      />
    </Router>
  );
};

export default Employee;
