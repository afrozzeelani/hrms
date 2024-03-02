import React, { Component } from "react";
import "./StateTable.css";
import axios from "axios";
// import { HashRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";

// var FontAwesome = require('react-fontawesome');
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;
class StateTable extends Component {
  state = {
    stateData: [],
    loading: true,
    rowData: []
  };

  // stateDataArray;
  loadStateData = () => {
    axios
      .get(`${window.location.origin}/api/state`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        // if(response.data.length==0){this.stateObj=["temp"];}
        // else{
        this.stateObj = response.data;
        // }
        console.log("response", response.data);
        this.setState({ stateData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.stateObj.map((data) => {
          let temp = {
            data,
            CountryName: data["country"][0]["CountryName"],
            StateName: data["StateName"]
          };

          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onStateDelete = (e) => {
    console.log(e);
    // let body= "ID=" + e;
    if (window.confirm("Are you sure to delete this record ? ") == true) {
      axios
        .delete(`${window.location.origin}/api/state/` + e, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
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
    this.loadStateData();
  }
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onStateDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditState(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div className="p-4">
        <div className="d-flex justify-between aline-items-start mb-3">
          <div className=" my-auto">
            <h3 className="fw-bold text-muted">State Details</h3>
            <p>You can create new state and view all state details here !</p>
          </div>

          <Button
            variant="primary"
            className="my-auto"
            id="add-button"
            onClick={this.props.onAddState}
          >
            <FontAwesomeIcon icon={faPlus} id="plus-icon" />
            Add new State
          </Button>
        </div>

        <div id="clear-both"></div>

        {!this.state.loading ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th
                  style={{
                    background:
                      "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                    color: "white"
                  }}
                >
                  Country
                </th>
                <th
                  style={{
                    background:
                      "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                    color: "white"
                  }}
                >
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.stateData.map((items, index) => (
                <tr key={index}>
                  <td className="text-uppercase">
                    {items.country[0].CountryName}
                  </td>
                  <td className="text-uppercase">{items.StateName}</td>
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
  }
}

export default StateTable;
