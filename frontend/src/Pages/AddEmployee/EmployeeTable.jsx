import React, { useState, useEffect } from "react";
import "./EmployeeTable.css";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { TbPhoneCalling } from "react-icons/tb";
import { FcNumericalSorting12 } from "react-icons/fc";
import { FcNumericalSorting21 } from "react-icons/fc";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// *************csv & pdf **************//
import jsPDF from "jspdf";
import "jspdf-autotable";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FiSearch } from "react-icons/fi";
// *************csv & pdf **************//

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const AdminEmployeeTable = (props) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isIdFilterActive, setIsIdFilterActive] = useState(false);
  const [isIdSortAscending, setIsIdSortAscending] = useState(true);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  const loadEmployeeData = () => {
    axios
      .get(`${window.location.origin}/api/employee`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        // Ensure that response.data is an array
        if (Array.isArray(response.data)) {
          setEmployeeData(response.data);
          setLoading(false);

          // Clear the state arrays
          setRowData([]);

          response.data.forEach((data) => {
            let temp = {
              data,
              Email: data["Email"],
              Password: data["Password"],
              Account:
                data["Account"] === 1
                  ? "Admin"
                  : data["Account"] === 2
                    ? "HR"
                    : data["Account"] === 3
                      ? "Employee"
                      : data["Account"] === 4
                        ? "Manager"
                        : "",

              RoleName: data["role"][0] ? data["role"][0]["RoleName"] : "",
              FirstName: data["FirstName"],
              MiddleName: data["MiddleName"],
              LastName: data["LastName"],
              DOB: data["DOB"].slice(0, 10),
              ContactNo: data["ContactNo"],
              // EmployeeCode: data["EmployeeCode"],
              empID: data["empID"],
              DepartmentName: data["department"][0]
                ? data["department"][0]["DepartmentName"]
                : "",
              PositionName: data["position"][0]
                ? data["position"][0]["PositionName"]
                : "",
              DateOfJoining: data["DateOfJoining"].slice(0, 10)
            };

            // Use set function to update state
            setRowData((prevData) => [...prevData, temp]);
          });
        } else {
          console.error("Data received is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEmployeeDelete = (e) => {
    if (window.confirm("Are you sure to delete this record? ")) {
      axios
        .delete(`${window.location.origin}/api/employee/${e}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(() => {
          loadEmployeeData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const exportToPDF = () => {
    window.confirm("Are you sure to download Employee record? ");
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [297, 210]
    });

    doc.setFontSize(18);
    doc.text("Employee Details", 297 / 2, 15, "center");
    const headers = [
      "Emp Id",
      "Email",
      "Account Access",
      "First Name",
      "Last Name",
      "DOB",
      "ContactNo",
      "Role",
      "Position",
      "Department",
      "D.O.J"
    ];
    const data = rowData.map((row) => [
      row.empID,
      row.Email,
      row.Account,
      row.FirstName,
      row.LastName,
      row.DOB,
      row.ContactNo,
      row.RoleName,
      row.PositionName,
      row.DepartmentName,
      row.DateOfJoining,
      ""
    ]);
    doc.setFontSize(12);
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 25
    });

    doc.save("employee_data.pdf ");
  };

  const renderInfoButton = (params) => {
    if (params.data && params.data.data) {
      return (
        <div>
          <FontAwesomeIcon
            icon={faInfoCircle}
            onClick={() => props.onEmpInfo(params.data.data)}
          />
        </div>
      );
    }
    return null;
  };

  const renderButton = (params) => {
    if (params.data && params.data.data && params.data.data["_id"]) {
      return (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => onEmployeeDelete(params.data.data["_id"])}
        />
      );
    }
    return null;
  };

  const renderEditButton = (params) => {
    if (params.data && params.data.data) {
      return (
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => props.onEditEmployee(params.data.data)}
        />
      );
    }
    return null;
  };

  const getBackgroundColor = (accountType) => {
    switch (accountType) {
      case "Admin":
        return "#8EAC50";
      case "HR":
        return "#0079FF";
      case "Employee":
        return "purple";
      case "Manager":
        return "red";
      default:
        return "#FF9B50";
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleToggleIdSort = () => {
    setIsIdSortAscending(!isIdSortAscending);
  };

  const sortById = (a, b) => {
    const idA = a.empID.toLowerCase();
    const idB = b.empID.toLowerCase();

    if (isIdSortAscending) {
      return idA.localeCompare(idB);
    } else {
      return idB.localeCompare(idA);
    }
  };

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const calculateUpcomingBirthdays = () => {
    const today = new Date();
    const upcomingBirthdaysData = rowData.filter((employee) => {
      const dob = new Date(employee.DOB);
      dob.setFullYear(today.getFullYear());

      // Check if the upcoming birthday is within the next 7 days
      const timeDiff = dob - today;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff >= 0 && daysDiff <= 7;
    });

    setUpcomingBirthdays(upcomingBirthdaysData);
  };

  useEffect(() => {
    calculateUpcomingBirthdays();
  }, [rowData]);

  let filteredData = rowData.filter((item) => {
    const isMatchingId = isIdFilterActive
      ? item.empID.toLowerCase() === searchInput.toLowerCase()
      : true;

    const isMatchingFirstName = item.FirstName.toLowerCase().includes(
      searchInput.toLowerCase()
    );

    return isMatchingId && isMatchingFirstName;
  });

  filteredData = filteredData.sort(sortById);

  // Calculate the total length for each status
  const allCount = filteredData.filter((data) => data.Account === "").length;
  const adminCount = filteredData.filter(
    (data) => data.Account === "Admin"
  ).length;
  const hrCount = filteredData.filter((data) => data.Account === "HR").length;
  const managerCount = filteredData.filter(
    (data) => data.Account === "Manager"
  ).length;
  const employeeCount = filteredData.filter(
    (data) => data.Account === "Employee"
  ).length;

  return (
    <div className="p-4">
      <div className="row my-auto">
        <div className="d-flex justify-between p-2">
          <div>
            <h4 className="fw-bolder d-flex text-muted gap-0">
              Employees{" "}
              <span className="text-primary mx-2">({rowData.length})</span>
              <button
                style={{
                  outline: "none",
                  border: "none",
                  backgroundColor: "transparent",
                  scale: ".7"
                }}
                className="d-flex justify-center  aline-center gap-2"
                onClick={exportToPDF}
              >
                <BsFillFileEarmarkPdfFill className="text-danger m-auto" />
                <p className="my-auto text-muted fw-bold ">export pdf</p>
              </button>
            </h4>
            <p style={{ opacity: "60%" }} className="text-muted">
              All the employees of the company are listed here
            </p>
          </div>
          <div className="d-flex my-auto gap-2">
            <button
              className="btn rounded-5 btn-success m-auto fw-bold py-1 d-flex"
              onClick={props.onAddEmployee}
            >
              + Add new employees
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex my-auto gap-2 justify-content-between">
        <div className="searchholder border-0 col-3 position-relative">
          <input
            style={{
              height: "100%",
              width: "100%",
              padding: ".5rem 1rem",
              boxShadow: "-2px 2px 5px rgba(211, 205, 205, 0.692)"
            }}
            className="form-control rounded-5"
            type="text"
            placeholder="Search by name"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <div
          onClick={() => setSelectedFilter("")}
          className="btn fw-bold text-muted my-auto shadow rounded-5"
        >
          ALL ({rowData.length})
        </div>
        <div
          onClick={() => setSelectedFilter("Admin")}
          style={{ backgroundColor: "#8EAC50" }}
          className="btn fw-bold text-white my-auto shadow rounded-5"
        >
          ADMIN ({adminCount})
        </div>
        <div
          onClick={() => setSelectedFilter("HR")}
          style={{ backgroundColor: "#0079FF" }}
          className="btn fw-bold text-white my-auto shadow rounded-5"
        >
          HR ({hrCount})
        </div>
        <div
          onClick={() => setSelectedFilter("Manager")}
          style={{ backgroundColor: "red" }}
          className="btn fw-bold text-white my-auto shadow rounded-5"
        >
          MANAGER ({managerCount})
        </div>
        <div
          onClick={() => setSelectedFilter("Employee")}
          style={{ backgroundColor: "purple" }}
          className="btn fw-bold text-white my-auto shadow rounded-5"
        >
          EMPLOYEE ({employeeCount})
        </div>
        <span
          style={{ boxShadow: "-1px 1px 5px rgba(211, 205, 205, 0.692)" }}
          className="d-flex gap-4 px-3 rounded-5 d-flex aline-center justify-center"
        >
          <b>Sort</b>
          <button
            className="btn fw-bold fs-5 p-0 m-auto"
            onClick={handleToggleIdSort}
          >
            {isIdSortAscending ? (
              <FcNumericalSorting21 />
            ) : (
              <FcNumericalSorting12 />
            )}
          </button>
        </span>
      </div>

      <div id="clear-both" />
      {!loading ? (
        <div className="employee-card-holder">
          {filteredData
            .filter((items) =>
              selectedFilter ? items.Account === selectedFilter : true
            )

            .map((items, index) => {
              return (
                <div
                  key={index}
                  style={{
                    boxShadow: "4px 4px 3px rgba(226, 223, 223, 0.608)",
                    border: "1px solid rgba(226, 223, 223, 0.608) ",
                    overflow: "hidden",
                    maxWidth: "250px"
                  }}
                  className="card-top-upper position-relative bg-light text-center px-2 py-3  rounded-3  my-3"
                >
                  <div>
                    <div
                      style={{
                        width: "fit-content",
                        right: "7%",
                        top: "3%",
                        position: "absolute",
                        color: "white",
                        zIndex: "1",
                        cursor: "pointer"
                      }}
                    >
                      <button
                        onClick={() => props.onEmpInfo(items.data)}
                        className=" btn p-0 text-white"
                        to=""
                      >
                        <IoMdInformationCircleOutline className="fs-4" />
                      </button>
                    </div>
                  </div>
                  <div
                    className="card-top-upper"
                    style={{
                      position: "absolute",
                      height: "30%",
                      width: "100%",
                      background: getBackgroundColor(items.Account),
                      top: "0%",
                      right: "0",
                      borderRadius: "0% 0% 50% 50%",
                      opacity: "80%"
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0%",
                      display: "flex",
                      width: "94%",
                      justifyContent: "space-between"
                    }}
                    className="div m-auto"
                  >
                    <button
                      onClick={() => props.onEditEmployee(items.data)}
                      style={{ zIndex: "1", cursor: "pointer" }}
                      className="btn"
                    >
                      <FaRegEdit className="fs-4 text-primary bg-white p-1 rounded-5" />
                    </button>
                    <button
                      onClick={() => onEmployeeDelete(items.data["_id"])}
                      style={{ zIndex: "1", cursor: "pointer" }}
                      className="btn"
                    >
                      <MdDeleteForever className="fs-4 text-danger bg-white p-1 rounded-5" />
                    </button>
                  </div>
                  <div
                    className="card-top-lower"
                    style={{
                      position: "absolute",
                      height: "30%",
                      width: "100%",
                      background: getBackgroundColor(items.Account),
                      bottom: "0%",
                      right: "0",
                      borderRadius: "50% 50% 0% 0% ",
                      opacity: "30%"
                    }}
                  ></div>
                  <div className="row mb-3">
                    <div className="col-12 d-flex justify-center aline-center">
                      <div
                        style={{
                          height: "90px",
                          width: "90px",
                          overflow: "hidden",
                          borderRadius: "50%",
                          padding: "2px"
                        }}
                        className="profile-image bg-white "
                      >
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover"
                          }}
                          className="m-auto"
                          src={
                            items?.data?.profile?.image_url
                              ? items?.data?.profile?.image_url
                              : "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-12 text-start d-flex flex-column gap-0 text-center position-relative">
                      <p
                        style={{
                          fontSize: ".9rem",
                          width: "fit-content"
                        }}
                        className="m-auto my-2 text-uppercase  bg-warning px-2 rounded-5 text-white fw-bold"
                      >
                        {items.empID}
                      </p>
                      <p className=" w-100 fs-5 m-auto fw-bolder text-uppercase text-primary">
                        {items.FirstName} {items.LastName}
                      </p>
                      <p className=" text-uppercase w-100 text-muted m-auto  fw-bold mb-3">
                        {items.PositionName}
                      </p>
                    </div>
                    <div className="details d-flex flex-column gap-0">
                      <a
                        href={`mailto:${items.Email}`}
                        style={{
                          textShadow: "2px 2px 3px gray",
                          cursor: "pointer",
                          zIndex: "1",
                          opacity: "60%"
                        }}
                        className="m-auto bg-primary px-1 text-decoration-none my-auto d-flex text-white justify-center aline-center rounded-5 d-flex gap-2 aline-center"
                      >
                        <SiMinutemailer style={{ height: "100%" }} />
                        <p
                          style={{ transition: "1s ease" }}
                          className="hover_number rounded-5 m-auto"
                        >
                          {items.Email}
                        </p>
                      </a>
                      <a
                        href={`tel:${items.ContactNo}`}
                        style={{
                          cursor: "pointer",
                          zIndex: "1",
                          opacity: "100%"
                        }}
                        className="m-auto mt-1 px-1 bg-white text-decoration-none my-auto d-flex text-muted justify-center aline-center rounded-5 d-flex gap-2 aline-center"
                      >
                        <TbPhoneCalling />
                        {items.ContactNo}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
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

export default AdminEmployeeTable;

