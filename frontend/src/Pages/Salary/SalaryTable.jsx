import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import "./SalaryTable.css";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const AdminSalaryTable = (props) => {
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const loadSalaryData = () => {
    axios
      .get(`${window.location.origin}/api/salary`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        const salaryObj = response.data;
        console.log("response", response.data);
        setSalaryData(response.data);
        setLoading(false);

        const rowDataT = salaryObj.map((data) => ({
          data,
          EmployeeName: `${data["FirstName"]} ${data["MiddleName"]} ${data["LastName"]}`,
          BasicSalary: data["salary"][0]["BasicSalary"],
          BankName: data["salary"][0]["BankName"],
          AccountNo: data["salary"][0]["AccountNo"],
          AccountHolderName: data["salary"][0]["AccountHolderName"],
          IFSCcode: data["salary"][0]["IFSCcode"],
          TaxDeduction: data["salary"][0]["TaxDeduction"],
        }));

        setSalaryData(rowDataT);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSalaryDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ")) {
      axios
        .delete(`${window.location.origin}/api/salary/${e}`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          loadSalaryData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loadSalaryData();
  }, []);

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prevOrder) =>
      sortField === field ? (prevOrder === "asc" ? "desc" : "asc") : "asc"
    );
  };

  const renderSortIcon = (field) => {
    if (sortField === field) {
      return sortOrder === "asc" ? "▴" : "▾";
    }
    return null;
  };

  const sortedAndFilteredData = salaryData.slice().sort((a, b) => {
    if (sortField) {
      const aValue = a.salary[0][sortField];
      const bValue = b.salary[0][sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
    }
    return 0;
  });

  return (
    <div className=" p-3 mt-3">
      <div className="d-flex justify-between aline-items-start mb-3">
        <div className=" my-auto">
          <h3 className="fw-bold text-muted">Salary Details</h3>
          <p className="text-muted">
            You can create new employee Salary and view all employee's Salary here!
          </p>
        </div>

        <Button
          className="my-auto"
          id="add-button"
          onClick={props.onAddSalary}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add new Salary
        </Button>
      </div>

      <div id="clear-both" />

      {!loading ? (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th
                  style={{
                    background: "linear-gradient(#1D267D, #2F58CD)",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className="py-1"
                  onClick={() => handleSort("EmployeeName")}
                >
                  Employee Name {renderSortIcon("EmployeeName")}
                </th>
                <th
                  style={{
                    background: "linear-gradient(#1D267D, #2F58CD)",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className="py-1"
                  onClick={() => handleSort("BasicSalary")}
                >
                  Salary {renderSortIcon("BasicSalary")}
                </th>
                <th
                  style={{
                    background: "linear-gradient(#1D267D, #2F58CD)",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className="py-1"
                  onClick={() => handleSort("BankName")}
                >
                  Bank Name {renderSortIcon("BankName")}
                </th>
                <th
                  style={{
                    background: "linear-gradient(#1D267D, #2F58CD)",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className="py-1"
                  onClick={() => handleSort("AccountNo")}
                >
                  Account No {renderSortIcon("AccountNo")}
                </th>
                <th
                  style={{
                    background: "linear-gradient(#1D267D, #2F58CD)",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className="py-1"
                  onClick={() => handleSort("AccountHolderName")}
                >
                  Account Holder Name {renderSortIcon("AccountHolderName")}
                </th>

                <th
                  style={{
                    background: "linear-gradient(#1D267D, #2F58CD)",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className="py-1"
                  onClick={() => handleSort("IFSCcode")}
                >
                  IFSC Code {renderSortIcon("IFSCcode")}
                </th>
                <th
                  style={{
                    background: "linear-gradient(#1D267D, #2F58CD)",
                    color: "white",
                    cursor: "pointer",
                  }}
                  className="py-1"
                  onClick={() => handleSort("TaxDeduction")}
                >
                  Tax Deduction {renderSortIcon("TaxDeduction")}
                </th>
                <th
                  style={{
                    background: "linear-gradient(#1D267D, #2F58CD)",
                    color: "white",
                  }}
                  className="py-1 text-center"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedAndFilteredData.map((item, index) => (
                <tr key={index}>
                  <td className="text-uppercase">{item.EmployeeName}</td>
                  <td>{item.BasicSalary}</td>
                  <td className="text-uppercase">{item.BankName}</td>
                  <td className="text-uppercase">{item.AccountNo}</td>
                  <td className="text-uppercase">{item.AccountHolderName}</td>
                  <td className="text-uppercase">{item.IFSCcode}</td>
                  <td>{item.TaxDeduction}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <FontAwesomeIcon
                        className="text-danger"
                        icon={faTrash}
                        onClick={() => onSalaryDelete(item.data._id)}
                      />
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => props.onEditSalary(item.data)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default AdminSalaryTable;

