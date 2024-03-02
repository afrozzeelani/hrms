import React, { useState } from "react";
import "../../HrManager/DashboardHR.css";
import { Link } from "react-router-dom";
import LeaveApplicationEmpTable from "../LeaveApplicationEmpTable";
import HolidayList from "../../../Pages/LeaveCalendar/HolidayList";
import UpcomingBirthdays from "../../../Pages/AddEmployee/UpcomingBirthdays";
import EmpTaskChart from "./EmpChart.jsx/EmpTaskChart";
import EmpTaskCount from "./CountData/EmpTaskCount";

import Chart from "react-apexcharts";

import { IoIosArrowDroprightCircle } from "react-icons/io";

const EmpDash = (props) => {
  const [totalEmployeeLeave, setTotalEmployeeLeave] = useState(0);

  // Update total leave count when LeaveApplicationEmpTable component notifies
  const updateTotalEmployeeLeave = (count) => {
    setTotalEmployeeLeave(count);
  };

  return (
    <div className="main-container">
      <h2 className="text-muted fw-bolder mb-4">🪟 EMPLOYEE DASHBOARD</h2>
      <div className="row gap-0 mx-0">
        <div className="col-lg-9">
          <EmpTaskCount />
          {/* <EmplolyeeCount />
          <LeaveCount /> */}

          <div className="row row_flex mt-5">
            <div className="col-lg-6">
              <EmpTaskChart />
            </div>
            <div className="col-lg-6">{/* <DepartmentChart /> */}</div>
          </div>
          <div className="row row_flex">
            <div className="col-lg-12">{/* <TodatAttendance /> */}</div>
          </div>
        </div>
        <div className="col-lg-3 ">
          <UpcomingBirthdays />
          <div className="holiday mt-3">
            <HolidayList />
          </div>
          <div className="col-md-9"></div>
        </div>
      </div>
    </div>
  );
};

export default EmpDash;
