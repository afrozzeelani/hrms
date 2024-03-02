import React, { Component } from "react";
import "./DepartmentTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";

// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
// import autoTable from "jspdf-autotable";

class DepartmentTable extends Component {
  state = {
    departmentData: [],
    loading: true,

    // columnDefs: [
    //   {
    //     headerName: "Company",
    //     field: "CompanyName",
    //     sortable: true,
    //     // width: 150,
    //     // filter: true ,
    //   },

    //   {
    //     headerName: "Department",
    //     field: "DepartmentName",
    //     sortable: true,
    //     // width: 150,
    //     // filter: true ,
    //   },
    // ],
    // rowData: [],
    // defaultColDef: {
    //   resizable: false,
    //   width: 636,
    // },
    // getRowHeight: function (params) {
    //   return 35;
    // },
  };
  departmentObj = [];
  rowDataT = [];

  loadDepartmentData = () => {
    axios
      .get(`${window.location.origin}/api/department`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.departmentObj = response.data;
        console.log("response", response.data);
        this.setState({ departmentData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.departmentObj.map((data) => {
          let temp = {
            data,
            CompanyName: data["company"][0]["CompanyName"],
            DepartmentName: data["DepartmentName"],
          };

          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onDepartmentDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record ? ") == true) {
      axios
        .delete(`${window.location.origin}/api/department/` + e, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          this.componentDidMount();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          if (err.response.status == 403) {
            window.alert(err.response.data);
          }
        });
    }
  };
  componentDidMount() {
    this.loadDepartmentData();
  }

  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onDepartmentDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditDepartment(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div className="p-4">
        <div className="d-flex justify-between aline-items-start mb-3">
          <div className=" my-auto">
            <h3 className="fw-bold text-muted">Department Details</h3>
            <p className="text-muted">
              You can create new department and view all department of the
              companies here !
            </p>
          </div>

          <Button
            className="my-auto"
            variant="primary"
            id="add-button"
            onClick={this.props.onAddDepartment}
          >
            <FontAwesomeIcon icon={faPlus} id="plus-icon" />
            Add new department
          </Button>
        </div>
        <table className="table table-striped">
          <thead>
            <th
              style={{
                background: "linear-gradient(#1D267D, #2F58CD)",
                color: "white",
              }}
            >
              Company
            </th>
            <th
              style={{
                background: "linear-gradient(#1D267D, #2F58CD)",
                color: "white",
              }}
            >
              Department
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
          </thead>

          <tbody>
            {this.state.departmentData.map((items, index) => (
              <tr key={index}>
                <td className="py-0">{items["company"][0]["CompanyName"]}</td>
                <td className="py-0">{items.DepartmentName}</td>
                <td className="py-0">
                  <div className="d-flex gap-3 py-2">
                    <p
                      style={{ cursor: "pointer" }}
                      title="Update"
                      className="m-auto text-primary"
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => this.props.onEditDepartment(items)}
                      />
                    </p>
                    <p
                      style={{ cursor: "pointer" }}
                      title="Delete"
                      className="m-auto text-danger"
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => this.onDepartmentDelete(items["_id"])}
                      />
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      // <div id="table-outer-div-scroll">
      //   <h2 id="role-title">Department Details</h2>
      //   <Button
      //     variant="primary"
      //     id="add-button"
      //     onClick={this.props.onAddDepartment}
      //   >
      //     <FontAwesomeIcon icon={faPlus} id="plus-icon" />
      //     Add
      //   </Button>

      //   <div id="clear-both" />
      //   {!this.state.loading ? (
      //     <div
      //       id="table-div"
      //       className="ag-theme-balham"
      //       //   style={
      //       //     {
      //       //     height: "500px",
      //       //     width: "100%"
      //       //   }
      //       // }
      //     >
      //       <AgGridReact
      //         columnDefs={this.state.columnDefs}
      //         defaultColDef={this.state.defaultColDef}
      //         columnTypes={this.state.columnTypes}
      //         rowData={this.state.rowData}
      //         // floatingFilter={true}
      //         // onGridReady={this.onGridReady}
      //         pagination={true}
      //         paginationPageSize={10}
      //         getRowHeight={this.state.getRowHeight}
      //       />
      //     </div>
      //   ) : (
      //     <div id="loading-bar">
      //       <RingLoader
      //         css={override}
      //         sizeUnit={"px"}
      //         size={50}
      //         color={"#0000ff"}
      //         loading={true}
      //       />
      //     </div>
      //   )}
      //
      // </div>
    );
  }
}

export default DepartmentTable;
