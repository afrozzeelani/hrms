import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"; // Import Axios
import "./leave.css";
import Container from "./Container";

const LeaveCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [holidayName, setHolidayName] = useState("");
  const [holidayType, setHolidayType] = useState("National Holiday");
  const [holidays, setHolidays] = useState([]);
  const [holidaysData, setHolidaysData] = useState([]);

  const formatDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const handleAddHoliday = async () => {
    if (date && holidayName) {
      const formattedDate = formatDate(date);
      const newHoliday = {
        holidayDate: formattedDate.getDate(),
        holidayMonth: formattedDate.getMonth() + 1,
        holidayYear: formattedDate.getFullYear(),
        holidayName,
        holidayType
      };

      try {
        const response = await axios.post(
          `${window.location.origin}/api/Create-holiday`,
          newHoliday
        );

        if (response.status === 201) {
          const responseData = response.data;
          setHolidays((prevHolidays) => [
            ...prevHolidays,
            responseData.newHoliday
          ]);
          setHolidayName("");
          setHolidayType("National Holiday");
          alert("Holiday Added Successfully");
        } else {
          console.error("Failed to add holiday:", response.statusText);
        }
      } catch (error) {
        console.error("Error adding holiday:", error);
      }
    }
  };

  useEffect(() => {
    // Fetch holiday data when the component mounts
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/holidays`);

        if (response.status === 200) {
          const data = response.data;
          setHolidaysData(data);
        } else {
          console.error("Failed to fetch holiday data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching holiday data:", error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <Container>
      <h1 className="text-uppercase fs-5 fw-bold mb-2">Holiday Calendar</h1>
      <div className="row py-2 ">
        <div className="col-12 col-md-4">
          <div className="card border-0">
            <div className="card-body">
              <Calendar
                className="w-100"
                value={date}
                onChange={setDate}
                tileContent={({ date, view }) => {
                  if (view === "month") {
                    const formattedDate = new Date(date);
                    formattedDate.setDate(formattedDate.getDate()); // Subtract one day
                    const formattedDateString = formattedDate
                      .toISOString()
                      .split("T")[0];

                    const holiday = holidays.find(
                      (holiday) => holiday.date === formattedDateString
                    );

                    if (holiday) {
                      return (
                        <div className="holiday-marker">
                          <span className="squarepinch"></span>
                          {holiday.type}
                        </div>
                      );
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 d-flex">
          <div className="card border-0 h-100 w-100">
            <div className="card-body d-flex flex-column justify-between align-center">
              <h3>Holiday Management</h3>
              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  value={date.toISOString().split("T")[0]}
                  onChange={(e) => setDate(new Date(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Holiday Name"
                  value={holidayName}
                  onChange={(e) => setHolidayName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select"
                  value={holidayType}
                  onChange={(e) => setHolidayType(e.target.value)}
                >
                  <option value="National Holiday">National Holiday</option>
                  <option value="Gazetted Holiday">Gazetted Holiday</option>
                  <option value="Restricted Holiday">Restricted Holiday</option>
                </select>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddHoliday}
              >
                Add Holiday
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card border-0 h-100">
            <div className="card-body">
              <h6 className="text-uppercase fw-bolder">Holiday List</h6>

              <table className="table striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Name</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {holidaysData.map((holiday, index) => (
                    <tr key={index}>
                      <td>{holiday.holidayDate}</td>
                      <td>{holiday.holidayMonth}</td>
                      <td>{holiday.holidayYear}</td>
                      <td>{holiday.holidayName}</td>
                      <td>{holiday.holidayType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LeaveCalendar;
