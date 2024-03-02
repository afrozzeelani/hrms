import React, { Component } from "react";
import "./RoleTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class RoleTable extends Component {
  state = {
    roleData: [],
    loading: true,
    updateTotalRole: "",

    rowData: [],

    getRowHeight: function (params) {
      return 35;
    },
  };
  roleObj = [];
  rowDataT = [];

  loadRoleData = () => {
    axios
      .get(`${window.location.origin}/api/role`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        this.roleObj = response.data;

        console.log("response", response.data);
        this.setState({ roleData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.roleObj.map((data) => {
          let temp = {
            data,
            CompanyName: data["company"][0]["CompanyName"],
            RoleName: data["RoleName"],
          };

          this.rowDataT.push(temp);
        });

        this.props.updateTotalRole(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onRoleDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record ? ") == true) {
      axios
        .delete(`${window.location.origin}/api/role/` + e, {
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
    this.loadRoleData();
  }
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onRoleDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditRole(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div
        style={{ height: "100vh", width: "100%", scrollbarWidth: "thin" }}
        className="p-4"
      >
        <div className="d-flex justify-between aline-items-start mb-3">
          <div className=" my-auto">
            <h3 className="fw-bold text-muted">Role Details</h3>
            <p>
              You can create new role and view all role of the companies here !
            </p>
          </div>

          <Button
            variant="primary"
            className="my-auto"
            id="add-button"
            onClick={this.props.onAddRole}
          >
            <FontAwesomeIcon icon={faPlus} id="plus-icon" />
            Add new role
          </Button>
        </div>
        <div id="clear-both" />
        {!this.state.loading ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th
                  style={{
                    background: "linear-gradient(#1D267D, #2F58CD)",
                    color: "white",
                  }}
                  className="py-1"
                >
                  Company
                </th>
                <th
                  style={{
                    background: "linear-gradient(#1D267D, #2F58CD)",
                    color: "white",
                  }}
                  className="py-1"
                >
                  Role
                </th>
                <th
                  style={{
                    background: "linear-gradient(#1D267D, #2F58CD)",
                    color: "white",
                    textAlign: "center",
                  }}
                  className="py-1"
                >
                  Action
                </th>
              </tr>
            </thead>

            {!this.state.loading ? (
              <React.Fragment>
                {this.roleObj.map((data, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{data["company"][0]["CompanyName"]}</td>
                      <td>{data["RoleName"]}</td>

                      <td className="roleAction">
                        <div className="d-flex gap-5">
                          <span
                            title="Update"
                            className="m-auto text-primary"
                            style={{ cursor: "pointer" }}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              onClick={() => this.props.onEditRole(data)}
                            />
                          </span>

                          <span
                            title="Delete"
                            className="m-auto text-danger"
                            style={{ cursor: "pointer" }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => this.onRoleDelete(data["_id"])}
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </React.Fragment>
            ) : (
              <tbody>
                <tr>
                  <td />
                  <td>
                    <div id="loading-bar">
                      <RingLoader
                        css={override}
                        sizeUnit={"px"}
                        size={150}
                        color={"#0000ff"}
                        loading={true}
                      />
                    </div>
                  </td>
                  <td />
                  <td />
                </tr>
              </tbody>
            )}
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
  }
}

export default RoleTable;
