import React, { Component } from "react";
import "./CityTable.css";
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
class CityTable extends Component {
  state = {
    cityData: [],
    loading: true,
    rowData: [],
  };
  cityObj = [];
  rowDataT = [];

  // stateDataArray;
  loadCityData = () => {
    axios
      .get(`${window.location.origin}/api/city`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        // if(response.data.length==0){this.cityObj=["temp"];}
        // else{
        this.cityObj = response.data;
        // }
        console.log("response", response.data);
        this.setState({ cityData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.cityObj.map((data) => {
          let temp = {
            data,
            CountryName: data["state"][0]["country"][0]["CountryName"],
            StateName: data["state"][0]["StateName"],
            CityName: data["CityName"],
          };

          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onCityDelete = (e) => {
    console.log(e);
    // let body= "ID=" + e;
    if (window.confirm("Are you sure to delete this record ? ") == true) {
      axios
        .delete(`${window.location.origin}/api/city/` + e, {
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
    this.loadCityData();
  }
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onCityDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditCity(params.data.data)}
      />
    );
  }

  render() {
    // let value=(this.props.pass) ? undefined : "";<i class="fas fa-plus"></i>
    return (
      <div className="p-4">
        <div className="d-flex justify-between aline-items-start mb-3">
          <div className=" my-auto">
            <h3 className="fw-bold text-muted">City Details</h3>
            <p>You can create new city and view all cities details here !</p>
          </div>

          <Button
            variant="primary"
            className="my-auto"
            id="add-button"
            onClick={this.props.onAddCity}
          >
            <FontAwesomeIcon icon={faPlus} id="plus-icon" />
            Add new City
          </Button>
        </div>
        <div id="clear-both" />

        {!this.state.loading ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th
                  style={{
                    background:
                      "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                    color: "white",
                  }}
                  className="py-1"
                >
                  Country
                </th>
                <th
                  style={{
                    background:
                      "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                    color: "white",
                  }}
                  className="py-1"
                >
                  State
                </th>
                <th
                  style={{
                    background:
                      "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                    color: "white",
                  }}
                  className="py-1"
                >
                  City
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.cityData.map((items, index) => (
                <tr key={index}>
                  <td>{items.state[0].country[0].CountryName}</td>
                  <td>{items.state[0].StateName}</td>
                  <td>{items.CityName}</td>
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

export default CityTable;
