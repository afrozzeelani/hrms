import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Col } from "react-bootstrap";

const SalaryForm = (props) => {
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const loadEmployeeInfo = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/employee`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        });
        setEmployeeData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadEmployeeInfo();
  }, []); // empty dependency array to mimic componentDidMount behavior

  return (
    <div className="registration-page py-4 ">
      <h2 className="text-center text-black text-uppercase fw-bold my-4">
        Add Salary Details
      </h2>
      {/* <div id="role-form-outer-div"> */}

      <Form
        id="form"
        onSubmit={props.onSalarySubmit}
        className="container d-flex flex-column m-10 empForm"
      >
        <div className="d-flex w-100 flex-column gap-6 rounded ">
          <div style={{ padding: "80px" }} className="row row-gap-3 ">
            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Select Employee
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control as="select" required>
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  {employeeData.map((data, index) => (
                    <option key={index} value={data["_id"]}>
                      {data["FirstName"] +
                        " " +
                        data["MiddleName"] +
                        " " +
                        data["LastName"]}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </div>

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Basic Salary
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Basic Salary"
                  required
                />
              </Col>
            </div>

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Bank Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Bank Name" required />
              </Col>
            </div>

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Account No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="Account No" required />
              </Col>
            </div>

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Re-Enter Account No
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Re-Enter Account No"
                  required
                />
              </Col>
            </div>

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Account Holder Name
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="text"
                  placeholder="Account Holder Name"
                  required
                />
              </Col>
            </div>

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                IFSC Code
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control type="text" placeholder="IFSC Code" required />
              </Col>
            </div>

            <div className="form-group col-12 col-md-6">
              <Form.Label column sm={6}>
                Tax Deduction
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Basic Salary"
                  required
                />
              </Col>
            </div>

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

export default SalaryForm;
