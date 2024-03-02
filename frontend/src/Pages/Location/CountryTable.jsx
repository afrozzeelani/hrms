import React, { Component } from "react";
import "./CountryTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class CountryTable extends Component {
  state = {
    countryData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Country",
        field: "CountryName",
        sortable: true
        // width: 150,
        // filter: true ,
      },

      {
        headerName: "",
        field: "edit",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderEditButton.bind(this)
      },
      {
        headerName: "",
        field: "delete",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderButton.bind(this)
      }
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 1180,
      filter: "agTextColumnFilter"
      // filter: true ,
    },
    getRowHeight: function (params) {
      return 35;
    }
  };
  countryObj = [];
  rowDataT = [];

  // countryDataArray;
  loadCountryData = () => {
    axios
      .get(`${window.location.origin}/api/country`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        // if(response.data.length==0){this.countryObj=["temp"];}
        // else{
        this.countryObj = response.data;
        // }
        console.log("response", response.data);
        this.setState({ countryData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.countryObj.map((data) => {
          let temp = {
            data,
            CountryName: data["CountryName"]
          };

          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onCountryDelete = (e) => {
    console.log(e);
    // let body= "ID=" + e;
    if (window.confirm("Are you sure to delete this record ? ") == true) {
      axios
        .delete(`${window.location.origin}/api/country/` + e, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then((res) => {
          // console.log(res);
          this.componentDidMount();
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.status == 403) {
            window.alert(err.response.data);
          }
        });
    }
  };

  componentDidMount() {
    this.loadCountryData();
  }
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onCountryDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditCountry(params.data.data)}
      />
    );
  }

  render() {
    // let value=(this.props.pass) ? undefined : "";<i class="fas fa-plus"></i>
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Country Details</h2>
        {/* <Link to="/admin/role/form"> */}
        {/* <button id="add-button" >
          
          Add
        </button> */}
        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddCountry}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>
        <div id="clear-both" />
        {!this.state.loading ? (
          // <div
          //   id="table-div"
          //   className="ag-theme-balham"
          // //   style={
          // //     {
          // //     height: "500px",
          // //     width: "100%"
          // //   }
          // // }
          // >
          //   <AgGridReact
          //     columnDefs={this.state.columnDefs}
          //     defaultColDef={this.state.defaultColDef}
          //     columnTypes={this.state.columnTypes}
          //     rowData={this.state.rowData}
          //     // floatingFilter={true}
          //     // onGridReady={this.onGridReady}
          //     pagination={true}
          //     paginationPageSize={10}
          //     getRowHeight={this.state.getRowHeight}
          //   />
          // </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th
                  style={{
                    background:
                      "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                    color: "white"
                  }}
                  className="py-1"
                >
                  Country
                </th>

                {/* <th
                  style={{
                    background:
                      "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                    color: "white"
                  }}
                  className="py-1"
                >
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              {this.state.countryData.map((items, index) => (
                <tr key={index}>
                  <td>{items.CountryName}</td>

                  {/* <td>
                    <button
                      onClick={() => this.props.onEditCountry(items.data)}
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
      </div>
    );
  }
}

export default CountryTable;
