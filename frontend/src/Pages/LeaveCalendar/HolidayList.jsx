import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios

function HolidayList() {
  const [holidaysData, setHolidaysData] = useState([]);
  const [isListVisible, setListVisibility] = useState(true);

  const toggleListVisibility = () => {
    setListVisibility(!isListVisible);
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
    // <div className="col-12 col-md-6 col-lg-6">
    //   <div className="card border-0 h-100">
    //     <div className="card-body">
    //       <h1 className="text-uppercase fw-bolder">Holiday List</h1>

    //       <table className="table striped">
    //         <thead>
    //           <tr>
    //             <th>Date</th>
    //             {/* <th>Month</th>
    //             <th>Year</th> */}
    //             <th>Name</th>
    //             <th>Type</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {holidaysData.map((holiday, index) => (
    //             <tr key={index}>
    //               <td>{`${holiday.holidayDate}/${holiday.holidayMonth}/${holiday.holidayYear}`}</td>

    //               {/* <td>{holiday.holidayDate}</td>
    //               <td>{holiday.holidayMonth}</td>
    //               <td>{holiday.holidayYear}</td> */}
    //               <td>{holiday.holidayName}</td>
    //               <td>{holiday.holidayType}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>

    <div className="container">
      <div className="card border-0 h-100">
        <div className="card-body main">
          <h4
            className="text-uppercase fw-bolder"
            onClick={toggleListVisibility}
          >
            Holiday List
          </h4>

          {isListVisible && (
            <table
              className="table table-striped"
              style={{ maxWidth: "100%", overflowX: "auto" }}
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {holidaysData.map((holiday, index) => (
                  <tr key={index}>
                    <td>{`${holiday.holidayDate}/${holiday.holidayMonth}/${holiday.holidayYear}`}</td>
                    <td>{holiday.holidayName}</td>
                    <td>{holiday.holidayType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default HolidayList;
