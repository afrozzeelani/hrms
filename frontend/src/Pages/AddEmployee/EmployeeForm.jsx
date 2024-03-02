

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

const EmployeeForm = (props) => {
  const [roleData, setRoleData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    loadRoleInfo();
    loadPositionInfo();
    loadDepartmentInfo();
  }, []);

  const loadRoleInfo = () => {
    axios
      .get(`${window.location.origin}/api/role`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        setRoleData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadPositionInfo = () => {
    axios
      .get(`${window.location.origin}/api/position`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        setPositionData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadDepartmentInfo = () => {
    axios
      .get(`${window.location.origin}/api/department`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        setDepartmentData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="registration-page py-4 ">
      <h2 className="text-center text-black text-uppercase fw-bold my-4">
        Add New Employee
      </h2>

      <Form
        id="form"
        onSubmit={props.onEmployeeSubmit}
        className="container d-flex flex-column m-10 empForm"
        encType="multipart/form-data"
      >
        <div className="d-flex w-100 flex-column gap-6 rounded ">
          <div style={{ padding: "80px" }} className="row row-gap-3 ">
            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Email
              </Form.Label>

              <Col sm={10} className="form-input">
                <Form.Control type="email" placeholder="Email" />
              </Col>
            </div>

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Password
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </div>

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Account access
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select">
                  <option value="1">Admin</option>
                  <option value="2">HR</option>
                  <option value="3">Employee</option>
                  <option value="4">Manager</option>
                </Form.Control>
              </Col>
            </div>

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Role
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="role">
                  <option disabled selected>
                    Select your option
                  </option>
                  {roleData.map((data, index) => (
                    <option key={index} value={data["_id"]}>
                      {data["RoleName"]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </div>
            <div className="form-group col-12 col-md-6">
              <Form.Label as="legend" column sm={6}>
                Gender
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  inline
                  type="radio"
                  label="Male"
                  value="male"
                  name="gender"
                  onChange={props.onGenderChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Female"
                  value="female"
                  name="gender"
                  onChange={props.onGenderChange}
                />
              </Col>
            </div>
            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                First Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="First Name" />
              </Col>
            </div>
            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Middle Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Middle Name" />
              </Col>
            </div>
            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Last Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Last Name" />
              </Col>
            </div>
            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                DOB
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="date" placeholder="DOB" />
              </Col>
            </div>
            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Contact No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Contact No " />
              </Col>
            </div>
            {/* <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Employee Code
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Employee Code"
                  
                />
              </Col>
            </div> */}

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Department
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="department">
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  {departmentData.map((data, index) => (
                    <option key={index} value={data["_id"]}>
                      {data["DepartmentName"]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </div>

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Position
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" name="position">
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  {positionData.map((data, index) => (
                    <option key={index} value={data["_id"]}>
                      {data["PositionName"]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </div>
            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Date Of Joining
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="date" placeholder="Date Of Joining" />
              </Col>
            </div>

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Profile Image
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="file"
                //
                />
              </Col>
            </div>

            {/* <div className="form-group col-12 col-md-6">
            <label>
              Terminate Date
            </label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="date"
                placeholder="Terminate Date"
              />
            </Col>
          </div> */}

            <div
              className="form-group col-12 d-flex  gap-5"
              id="form-submit-button"
            >
              <Button className="mx-3" type="submit">
                Submit
              </Button>
              <Button className="mx-3" type="reset" onClick={props.onFormClose}>
                cancel
              </Button>
            </div>
            <div
              className="form-group col-12 col-md-6"
              id="form-cancel-button"
            ></div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EmployeeForm;
