// import React from "react";
// import Chart from "react-apexcharts";
// import "./chart.css";
// function HrCharts() {
//   const data = {
//     options: {
//       chart: {
//         id: "area"
//       },
//       xaxis: {
//         categories: [2020, 2021, 2022, 2023, 2024],
//         labels: {
//           style: {
//             fontSize: "14px"
//           }
//         }
//       },
//       yaxis: {
//         labels: {
//           style: {
//             fontSize: "14px"
//           }
//         }
//       },
//       dataLabels: {
//         enabled: false
//       },
//       zoom: {
//         enabled: false
//       },
//       stroke: {
//         curve: "straight",
//         width: 3,
//         colors: ["#5932EA"]
//       },
//       markers: {
//         colors: "#5932EA",
//         hover: {
//           size: 6,
//           sizeOffset: 2,
//           colors: "#5932EA"
//         }
//       },
//       fill: {
//         type: "gradient",
//         colors: "#5932EA",
//         gradient: {
//           shadeIntensity: 0,
//           opacityFrom: 1,
//           opacityTo: 0.6,
//           stops: [0, 100]
//         }
//       }
//     },
//     series: [
//       {
//         name: "series-1",
//         data: [30, 40, 45, 50, 49, 60, 70, 91]
//       }
//     ]
//   };

//   const data1 = {
//     series: [
//       {
//         name: "Total Employee",
//         data: [30, 45, 57, 50, 65, 58, 63]
//       }
//     ],
//     options: {
//       chart: {
//         type: "bar",
//         height: 350
//       },
//       plotOptions: {
//         bar: {
//           horizontal: false,
//           columnWidth: "40%",
//           endingShape: "rounded"
//         }
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         show: true,
//         width: 2,
//         colors: ["transparent"]
//       },
//       xaxis: {
//         categories: [
//           "FrontEnd Developer",
//           "Backend Developer",
//           "Digital Marketing",
//           "UI/UX Designer",
//           "Graphic Designer",
//           "Web Developer",
//           "Web Designer"
//         ]
//       },
//       fill: {
//         opacity: 1,
//         colors: ["#5932EA"] // Change bar colors
//       },
//       tooltip: {
//         y: {
//           formatter: function (val) {
//             return " " + val + "";
//           }
//         },
//         markers: {
//           colors: "yellow"
//         }
//       }
//     }
//   };
//   return (
//     <div className="dashboard-table-container">
//       <div className="dashboard-table-left">
//         <h5>Employee Department</h5>
//         <Chart
//           options={data1.options}
//           type="bar"
//           series={data1.series}
//           height="85%"
//         />
//       </div>

//       <div className="dashboard-table-right">
//         <h5>Progress Report</h5>
//         <Chart
//           options={data.options}
//           type="area"
//           series={data.series}
//           height="85%"
//         />
//       </div>
//     </div>
//   );
// }

// export default HrCharts;

// EmployeeChart.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const TaskChart = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEmployeeData = () => {
    axios
      .get(`${window.location.origin}/api/employee`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDepartmentData(
            response.data.map(
              (data) => data["department"][0]?.DepartmentName || ""
            )
          );
        } else {
          console.error("Data received is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadTaskData = async () => {
    try {
      const response = await axios.get(`${window.location.origin}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      setError("Error fetching tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployeeData();
    loadTaskData();
  }, []);

  const calculateRemainingTime = (endDate) => {
    const now = new Date();
    const endDateTime = new Date(endDate);
    let remainingTime = endDateTime - now;

    if (remainingTime < 0) {
      // If remaining time is negative, consider it as delay
      remainingTime = Math.abs(remainingTime);
      return { delay: true, days: 0, hours: 0, minutes: 0 };
    } else {
      // Calculate remaining days, hours, minutes, and seconds
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      return { delay: false, days, hours, minutes };
    }
  };

  const countLateAndOnTimeTasks = () => {
    const lateTasksCount = tasks.filter(
      (task) =>
        task.status === "Pending" && calculateRemainingTime(task.endDate).delay
    ).length;

    const onTimeTasksCount = tasks.filter(
      (task) =>
        task.status === "Pending" && !calculateRemainingTime(task.endDate).delay
    ).length;

    return { lateTasksCount, onTimeTasksCount };
  };

  const departmentCounts = {};
  departmentData.forEach((department) => {
    departmentCounts[department] = (departmentCounts[department] || 0) + 1;
  });

  const taskStatusCounts = {
    Total: tasks.length,
    Assigned: tasks.filter((tasks) => tasks.status === "Assigned").length,
    ActiveTask: tasks.filter((task) => task.status === "Assigned").length,
    canceled: tasks.filter((task) => task.status === "Cancelled").length,
    Completed: tasks.filter((task) => task.status === "Completed").length,
    overdue: tasks.filter(
      (task) =>
        task.status === "Assigned" && calculateRemainingTime(task.endDate).delay
    ).length,

    onTime: tasks.filter(
      (task) =>
        task.status === "Assigned" &&
        !calculateRemainingTime(task.endDate).delay
    ).length

    // Rejected: tasks.filter((task) => task.status === "Rejected").length,
    // Active: tasks.filter((task) => task.status === "Pending").length,
    // Overdue: tasks.filter(
    //   (task) =>
    //     task.status === "Pending" && calculateRemainingTime(task.endDate).delay
    // ).length,
    // Ontime: tasks.filter(
    //   (task) =>
    //     task.status === "Pending" && !calculateRemainingTime(task.endDate).delay
    // ).length
  };

  const chartData = {
    series: [
      {
        name: "Total Employee",
        data: Object.values(departmentCounts)
      }
    ],
    options: {
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: Object.keys(departmentCounts),
        title: {
          text: "Department Wise Employee"
        }
      },
      yaxis: {
        title: {
          text: "Number of Employee"
        }
      },

      fill: {
        opacity: 1,
        colors: ["rgb(100, 150, 200)"] // Change bar colors
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return " " + val + "";
          }
        },
        markers: {
          colors: "yellow"
        }
      }
    }
  };
  const taskStatusChartData = {
    options: {
      chart: {
        id: "task-status-chart",
        type: "bar"
      },
      xaxis: {
        categories: Object.keys(taskStatusCounts),
        title: {
          text: "Task Status"
        }
      },
      yaxis: {
        title: {
          text: "Number of Tasks"
        }
      }
    },
    series: [
      {
        name: "Task Status",
        data: Object.values(taskStatusCounts)
      }
    ]
  };

  return (
    // <div className="dashboard-table-container">
    //   <div className="dashboard-table">
    //     <h5 style={{ textAlign: "center" }} className="p-3">
    //       Task Progress Report
    //     </h5>
    //     <Chart
    //       options={taskStatusChartData.options}
    //       type="bar"
    //       series={taskStatusChartData.series}
    //       height="85%"
    //     />
    //   </div>
    // </div>
    <div className="chart_container">
      <div className="chart_heading p-2">
        <h2>Task Progress Report</h2>
        {/* <select>
        <option>Today</option>
        <option>Tommorrow</option>
      </select> */}
      </div>
      <Chart
        options={taskStatusChartData.options}
        series={taskStatusChartData.series}
        type="bar"
        height="85%"
      />
    </div>
  );
};

export default TaskChart;
