import React, { useState } from "react";
import "./PersonalInfoFormEdit.css";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";

const PersonalInfoFormEdit = (props) => {
  const [state, setState] = useState({
    GenderData: props.editData["Gender"],
    EmailData: props.editData["Email"],
    FirstNameData: props.editData["FirstName"],
    MiddleNameData: props.editData["MiddleName"],
    LastNameData: props.editData["LastName"],
    DOBData: props.editData["DOB"].slice(0, 10),
    ContactNoData: props.editData["ContactNo"],
    EmergencyContactNoData: props.editData["EmergencyContactNo"] || "",
    PANcardNoData: props.editData["PANcardNo"] || "",
    HobbiesData: props.editData["Hobbies"] || "",
    PresentAddressData: props.editData["PresentAddress"] || "",
    PermanetAddressData: props.editData["PermanetAddress"] || "",
    presonalEmail: props.editData["presonalEmail"] || "",
    role: props.editData["role"] || ""
  });
  const onEmailDataChange = (e) => {
    setState({ ...state, EmailData: e.target.value });
  };

  const onFirstNameDataChange = (e) => {
    setState({ ...state, FirstNameData: e.target.value });
  };
  const onMiddleNameDataChange = (e) => {
    setState({ ...state, MiddleNameData: e.target.value });
  };
  const onLastNameDataChange = (e) => {
    setState({ ...state, LastNameData: e.target.value });
  };
  const onContactNoDataChange = (e) => {
    setState({ ...state, ContactNoData: e.target.value });
  };
  const onPANcardNoDataChange = (e) => {
    setState({ ...state, PANcardNoData: e.target.value });
  };
  const onpresonalemailDataChange = (e) => {
    setState({ presonalEmail: e.target.value });
  };
  const onEmergencyContactNoDataChange = (e) => {
    setState({ ...state, EmergencyContactNoData: e.target.value });
  };
  const onHobbiesDataChange = (e) => {
    setState({ ...state, HobbiesData: e.target.value });
  };
  const onPresentAddressDataChange = (e) => {
    setState({ ...state, PresentAddressData: e.target.value });
  };

  const onGenderChange = (e) => {
    setState({ ...state, GenderData: e.target.value });
    props.onGenderChange(e);
  };
  const onDOBDataChange = (e) => {
    console.log(e.target.value);
    setState({ ...state, DOBData: e.target.value });
  };

  return (
    <div className="registration-page py-4 ">
      <h2 id="text-center text-black text-uppercase fw-bold my-4">
        Edit PersonalInfo Details
      </h2>
      <div id="role-form-outer-div">
        <Form
          id="form"
          onSubmit={(e) => props.onPersonalInfoEditUpdate(props.editData, e)}
        >
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              First Name
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="text"
                placeholder="First Name"
                required
                disabled
                value={state.FirstNameData}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Middle Name
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="text"
                placeholder="Middle Name"
                required
                disabled
                value={state.MiddleNameData}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Last Name
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="text"
                placeholder="Last Name"
                disabled
                required
                value={state.LastNameData}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Gender
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                inline
                type="radio"
                label="Male"
                value="male"
                name="gender"
                onChange={onGenderChange}
                checked={state.GenderData == "male"}
                required
              />
              <Form.Check
                inline
                type="radio"
                label="Female"
                value="female"
                name="gender"
                onChange={onGenderChange}
                checked={state.GenderData == "female"}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Contact No
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="text"
                placeholder="Contact No "
                required
                value={state.ContactNoData}
                onChange={(value) => onContactNoDataChange(value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Emergency Contact No
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="text"
                placeholder="Emergency Contact No"
                required
                value={state.EmergencyContactNoData}
                onChange={(value) => onEmergencyContactNoDataChange(value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="email"
                placeholder="Email"
                required
                value={state.EmailData}
                onChange={(value) => onEmailDataChange(value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              PAN Card No
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="text"
                placeholder="PAN Card No"
                required
                value={state.PANcardNoData}
                onChange={(value) => onPANcardNoDataChange(value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Presonal Email
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="text"
                placeholder="Presonal Email"
                required
                value={state.presonalEmail}
                onChange={(value) => onpresonalemailDataChange(value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              DOB
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="date"
                placeholder="DOB"
                required
                //   value={props.editData["DOB"].slice(0, 10)}
                value={state.DOBData}
                onChange={(value) => onDOBDataChange(value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Blood Group
            </Form.Label>

            <Col sm={10} className="form-input">
              <Form.Control as="select" required>
                <option value="" disabled selected>
                  Select your option
                </option>
                <option
                  value="A+"
                  selected={props.editData["BloodGroup"] == "A+"}
                >
                  A+
                </option>
                <option
                  value="A-"
                  selected={props.editData["BloodGroup"] == "A-"}
                >
                  A-
                </option>
                <option
                  value="B+"
                  selected={props.editData["BloodGroup"] == "B+"}
                >
                  B+
                </option>
                <option
                  value="B-"
                  selected={props.editData["BloodGroup"] == "B-"}
                >
                  B-
                </option>
                <option
                  value="AB+"
                  selected={props.editData["BloodGroup"] == "AB+"}
                >
                  AB+
                </option>
                <option
                  value="AB-"
                  selected={props.editData["BloodGroup"] == "AB-"}
                >
                  AB-
                </option>
                <option
                  value="O+"
                  selected={props.editData["BloodGroup"] == "O+"}
                >
                  O+
                </option>
                <option
                  value="O-"
                  selected={props.editData["BloodGroup"] == "O-"}
                >
                  O-
                </option>
                {/* 
    A+
    A-
    B+
    B-
    AB+
    AB-
    O+
    O- */}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Hobbies
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                type="text"
                placeholder="Hobbies"
                required
                value={state.HobbiesData}
                onChange={(value) => onHobbiesDataChange(value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Present Address
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                as="textarea"
                rows="3"
                plassholder="Present Address"
                required
                value={state.PresentAddressData}
                onChange={(value) => onPresentAddressDataChange(value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Permanet Address
            </Form.Label>
            <Col sm={10} className="form-input">
              <Form.Control
                as="textarea"
                rows="3"
                plassholder=" Permanet Address"
                required
                value={state.PermanetAddressData}
                onChange={(value) => onPresentAddressDataChange(value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} id="form-submit-button">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Submit</Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row} id="form-cancel-button">
            <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
              <Button type="reset" onClick={props.onFormEditClose}>
                cancel
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
      {/* </div>
        </div> */}
    </div>
  );
};

export default PersonalInfoFormEdit;
