// import React, { Component } from "react";
// import "./LeaveApplicationEmpForm.css";
// import { Form, Button, Col, Row } from "react-bootstrap";
// import axios from "axios";

// class LeaveApplicationEmpForm extends Component {
//   state = {
//   };
//   componentWillMount() {

//   }
//   render() {
//     return (
//       <div style={{ height: '100vh', width: '100%' }} className="registration-page py-4">
//         <h2 id="role-form-title" className="text-center text-black text-uppercase fw-bold my-4">Add LeaveApplicationEmp Details</h2>

//         <div id="role-form-outer-div">
//           <Form id="form" onSubmit={this.props.onLeaveApplicationEmpSubmit}>
//             <div className="d-flex w-100 flex-column gap-2 rounded ">
//               <div className="row row-gap-3 ">

//                 <div className="form-group col-12 col-md-6" >
//                   <Form.Label column sm={6}>
//                     Leave Type
//                   </Form.Label>
//                   <Col sm={10} className="form-input">
//                     <Form.Control as="select" required>
//                       <option value="" disabled selected>
//                         Select your option
//                       </option>
//                       <option value="Sick Leave">Sick Leave</option>
//                       <option value="Casual Leave">Casual Leave</option>
//                       <option value="Privilege Leave">Privilege Leave</option>
//                     </Form.Control>
//                   </Col>
//                 </div>
//                 <div className="form-group col-12 col-md-6">
//                   <Form.Label column sm={6}>
//                     FromDate
//                   </Form.Label>
//                   <Col sm={10} className="form-input">
//                     <Form.Control type="date" required />
//                   </Col>
//                 </div>
//                 <div className="form-group col-12 col-md-6">
//                   <Form.Label column sm={6}>
//                     ToDate
//                   </Form.Label>
//                   <Col sm={10} className="form-input">
//                     <Form.Control type="date" placeholder="ToDate" required />
//                   </Col>
//                 </div>

//                 <div className="form-group col-12 col-md-6" >
//                   <Form.Label column sm={6}>
//                     Leave Status
//                   </Form.Label>
//                   <Col sm={10} className="form-input">
//                     <Form.Control as="select" required>
//                       <option value="1" selected>Pending</option>
//                     </Form.Control>
//                   </Col>
//                 </div>

//                 <div className="form-group col-12">
//                   <Form.Label column sm={6}>
//                     Reason for leave
//                   </Form.Label>
//                   <Col sm={11} className="form-input">
//                     <Form.Control
//                       as="textarea" rows={3}
//                       required
//                       className="form-control"
//                       placeholder="Please Describe your reasion...." />
//                   </Col>
//                 </div>

//                 <div className="form-group col-12 col-md-6" id="form-submit-button">
//                   <Col sm={{ span: 10, offset: 2 }}>
//                     <Button type="submit">Submit</Button>
//                   </Col>
//                 </div>
//                 <div className="form-group col-12 col-md-6" id="form-cancel-button">
//                   <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
//                     <Button type="reset" onClick={this.props.onFormClose}>cancel</Button>
//                   </Col>
//                 </div>
//               </div>
//             </div>
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }

// export default LeaveApplicationEmpForm;

import React from "react";
// import "./LeaveApplicationForm.css";a
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";

const LeaveApplicationEmpForm = (props) => {
  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      className="registration-page py-4"
    >
      <h2
        id="role-form-title"
        className="text-center text-black text-uppercase fw-bold my-4"
      >
        Add LeaveApplicationEmp Details
      </h2>

      <div id="role-form-outer-div">
        <Form id="form" onSubmit={props.onLeaveApplicationEmpSubmit}>
          <div className="d-flex w-100 flex-column gap-2 rounded ">
            <div className="row row-gap-3 ">
              <div className="form-group col-12 col-md-6">
                <Form.Label column sm={6}>
                  Leave Type
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control as="select" required>
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Privilege Leave">Privilege Leave</option>
                  </Form.Control>
                </Col>
              </div>
              <div className="form-group col-12 col-md-6">
                <Form.Label column sm={6}>
                  FromDate
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control type="date" required />
                </Col>
              </div>
              <div className="form-group col-12 col-md-6">
                <Form.Label column sm={6}>
                  ToDate
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control type="date" placeholder="ToDate" required />
                </Col>
              </div>

              <div className="form-group col-12 col-md-6">
                <Form.Label column sm={6}>
                  Leave Status
                </Form.Label>
                <Col sm={10} className="form-input">
                  <Form.Control as="select" required>
                    <option value="1" selected>
                      Pending
                    </option>
                  </Form.Control>
                </Col>
              </div>

              <div className="form-group col-12">
                <Form.Label column sm={6}>
                  Reason for leave
                </Form.Label>
                <Col sm={11} className="form-input">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    className="form-control"
                    placeholder="Please Describe your reasion...."
                  />
                </Col>
              </div>

              <div
                className="form-group col-12 col-md-6"
                id="form-submit-button"
              >
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit">Submit</Button>
                </Col>
              </div>
              <div
                className="form-group col-12 col-md-6"
                id="form-cancel-button"
              >
                <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                  <Button type="reset" onClick={props.onFormClose}>
                    cancel
                  </Button>
                </Col>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LeaveApplicationEmpForm;
