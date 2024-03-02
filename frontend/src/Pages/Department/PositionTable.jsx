import React, { Component } from "react";
import "./PositionTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
// import { Button } from "react-bootstrap";
import {
  Form,
  Button,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class PositionTable extends Component {
  state = {
    positionData: [],
    loading: true,
    totalPositions: 0,
    rowData: [],

    getRowHeight: function (params) {
      return 35;
    },
  };
  positionObj = [];
  rowDataT = [];

  loadPositionData = () => {
    axios
      .get(`${window.location.origin}/api/position`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.positionObj = response.data;
        console.log("response", response.data);
        this.setState({ positionData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.positionObj.map((data) => {
          let temp = {
            data,
            CompanyName: data["company"][0]["CompanyName"],
            PositionName: data["PositionName"],
          };

          this.rowDataT.push(temp);
        });
        // this.setState({ totalPositions: response.data.length });
        this.props.updateTotalPositions(response.data.length); // Update this line
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onPositionDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record ? ") == true) {
      axios
        .delete(`${window.location.origin}/api/position/` + e, {
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
    this.loadPositionData();
  }
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onPositionDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditPosition(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div
        style={{ height: "100vh", width: "100%", scrollbarWidth: "thin" }}
        className="p-4"
      >
        <div className="d-flex justify-between mb-3">
          <div>
            <h2 className="fw-bold text-muted my-auto">Position Details</h2>
            <p className="text-muted">
              You can create new position and also view all existing position of
              the company here !
            </p>
          </div>
          <Button
            className="my-auto"
            variant="primary"
            id="add-button"
            onClick={this.props.onAddPosition}
          >
            <FontAwesomeIcon icon={faPlus} id="plus-icon" />
            Add new position
          </Button>
        </div>
        <div id="clear-both" />
        {/* {!this.state.loading ? (
          <div
            id="table-div"
            className="ag-theme-balham"
          //   style={
          //     {
          //     height: "500px",
          //     width: "100%"
          //   }
          // }
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.rowData}
              // floatingFilter={true}
              // onGridReady={this.onGridReady}
              pagination={true}
              paginationPageSize={10}
              getRowHeight={this.state.getRowHeight}
            />
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
          )} */}
        <Table className="table table-striped">
          <thead>
            <tr>
              <th
                style={{
                  background: "linear-gradient(#1D267D, #2F58CD)",
                  color: "white",
                }}
                className="p"
              >
                Company
              </th>
              <th
                style={{
                  background: "linear-gradient(#1D267D, #2F58CD)",
                  color: "white",
                }}
                className="p"
              >
                Position
              </th>
              <th
                style={{
                  background: "linear-gradient(#1D267D, #2F58CD)",
                  color: "white ",
                  textAlign: "center",
                }}
                className="p"
              >
                {" "}
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {this.positionObj.map((data, index) => (
              <tr key={index}>
                <td>{data["company"][0]["CompanyName"]}</td>
                <td>{data["PositionName"]}</td>

                <td>
                  <div className="d-flex gap-5">
                    <span
                      title="Update"
                      className="m-auto text-primary"
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => this.props.onEditPosition(data)}
                      />
                    </span>

                    <span
                      title="Delete"
                      className="m-auto text-danger"
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => this.onPositionDelete(data["_id"])}
                      />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default PositionTable;
