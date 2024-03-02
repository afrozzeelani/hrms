import React, { Component } from "react";
// import "./AdminCompanyTable.css";
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
class AdminCompanyTable extends Component {
  state = {
    companyData: [],
    loading: true,
    rowData: []
  };
  companyObj = [];
  rowDataT = [];

  loadCompanyData = () => {
    axios
      .get(`${window.location.origin}/api/company`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        this.companyObj = response.data;
        console.log("response", response.data);
        this.setState({ companyData: response.data });
        this.setState({ loading: false });

        this.rowDataT = [];

        this.companyObj.map((data) => {
          let temp = {
            data,
            CompanyName: data["CompanyName"],
            Address: data["Address"],
            CountryName:
              data["city"][0]["state"][0]["country"][0]["CountryName"],
            StateName: data["city"][0]["state"][0]["StateName"],
            CityName: data["city"][0]["CityName"],
            PostalCode: data["PostalCode"],
            Website: data["Website"],
            Email: data["Email"],
            ContactPerson: data["ContactPerson"],
            ContactNo: data["ContactNo"],
            FaxNo: data["FaxNo"],
            PanNo: data["PanNo"],
            GSTNo: data["GSTNo"],
            CINNo: data["CINNo"]
          };

          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onCompanyDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete(`${window.location.origin}/api/company/` + e, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then((res) => {
          this.componentDidMount();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    this.loadCompanyData();
  }

  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onCompanyDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditCompany(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div className="p-4">
        <div className="d-flex justify-between aline-items-start mb-3">
          <div className=" my-auto">
            <h3 className="fw-bold text-muted">Company Details</h3>
            <p>
              You can create new company and view all compnay details here !
            </p>
          </div>

          <Button
            variant="primary"
            className="my-auto"
            id="add-button"
            onClick={this.props.onAddCompany}
          >
            <FontAwesomeIcon icon={faPlus} id="plus-icon" />
            Add new Company
          </Button>
        </div>

        <div id="clear-both" />

        {!this.state.loading ? (
          <div style={{ maxWidth: "100%", overflowX: "auto" }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    Company Name
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    Address
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    Country
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    State
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    City
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    Postal Code
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    Website
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    Email
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    ContactPerson
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    ContactNo
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    FaxNo
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    PanNo
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    GST No
                  </th>
                  <th
                    style={{
                      background: "linear-gradient(#700B97, #C84B31)",
                      color: "white",
                      whiteSpace: "pre"
                    }}
                  >
                    CIN No
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.companyObj.map((items, index) => (
                  <tr style={{ overflowX: "auto" }} key={index}>
                    <td className="text-uppercase">{items.CompanyName}</td>
                    <td>{items.Address}</td>
                    <td className="text-uppercase">
                      {items.city[0].state[0].country[0].CountryName}
                    </td>
                    <td className="text-uppercase">
                      {items.city[0].state[0].StateName}
                    </td>
                    <td className="text-uppercase">{items.city[0].CityName}</td>
                    <td>{items.PostalCode}</td>
                    <td>{items.Website}</td>
                    <td>{items.Email}</td>
                    <td>{items.ContactPerson}</td>
                    <td>{items.ContactNo}</td>
                    <td>{items.FaxNo}</td>
                    <td>{items.PanNo}</td>
                    <td>{items.GSTNo}</td>
                    <td>{items.CINNo}</td>
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
        {/*         
        <div id="inner-table-div">
          <table id="role-table">
            <thead>
              <tr>
                <th width="6.667%">Company Name</th>
                <th width="6.667%">Address</th>
                <th width="6.667%">Country</th>
                <th width="6.667%">State</th>
                <th width="6.667%">City</th>
                <th width="6.667%">Postal Code</th>
                <th width="6.667%">Website</th>
                <th width="6.667%">Email</th>
                <th width="6.667%">ContactPerson</th>
                <th width="6.667%">ContactNo</th>
                <th width="6.667%">FaxNo</th>
                <th width="6.667%">PanNo</th>
                <th width="6.667%">GST No</th>
                <th width="6.667%">CIN No</th>
                <th width="3.33%" />
                <th width="3.33%" />
              </tr>
            </thead>

            {!this.state.loading ? (
              <React.Fragment>
                {this.companyObj.map((data, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{data["CompanyName"]}</td>
                      <td>{data["Address"]}</td>
                      <td>
                        {
                          data["city"][0]["state"][0]["country"][0][
                            "CountryName"
                          ]
                        }
                      </td>
                      <td>{data["city"][0]["state"][0]["StateName"]}</td>
                      <td>{data["city"][0]["CityName"]}</td>
                      <td>{data["PostalCode"]}</td>
                      <td>{data["Website"]}</td>
                      <td>{data["Email"]}</td>
                      <td>{data["ContactPerson"]}</td>
                      <td>{data["ContactNo"]}</td>
                      <td>{data["FaxNo"]}</td>
                      <td>{data["PanNo"]}</td>
                      <td>{data["GSTNo"]}</td>
                      <td>{data["CINNo"]}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => this.props.onEditCompany(data)}
                        />
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => this.onCompanyDelete(data["_id"])}
                        />
                      </td>
                    </tr>
                  </tbody>
                ))}
                {console.log("final", this.companyObj)}
              </React.Fragment>
            ) : (
              <tbody>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>
                    <div id="loading-bar">
                      <BarLoader
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
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />

                  <td />
                  <td />
                </tr>
              </tbody>
            )}
          </table>
        </div> */}
      </div>
    );
  }
}

export default AdminCompanyTable;
