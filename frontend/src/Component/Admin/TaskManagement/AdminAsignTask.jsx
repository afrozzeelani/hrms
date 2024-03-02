// final filter based department
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const TaskAssign = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [endDateError, setEndDateError] = useState(false);
  const [managerData, setManagerData] = useState(null);
  const [newTask, setNewTask] = useState({
    Taskname: "",
    description: "",
    startDate: "",
    endDate: "",
    attachments: null,
    managerEmail: "",
    department: "",
    comment: ""
  });

  const isFormValid = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      newTask.Taskname.trim() !== "" &&
      newTask.description.trim() !== "" &&
      newTask.startDate.trim() !== "" &&
      newTask.endDate.trim() !== "" &&
      newTask.managerEmail.trim() !== "" &&
      emailPattern.test(newTask.managerEmail) &&
      newTask.department.trim() !== ""
    );
  };
  const ManagerDataHandler = () => {
    if (newTask.department === "") return;
    axios
      .get(`${window.location.origin}/api/employee`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((val) => {
        let mana = val.data.filter((val) => {
          return (
            val.Account === 4 &&
            val.department[0].DepartmentName === newTask.department
          );
        });
        setManagerData(mana);
      })
      .catch(console.log("hello"));
  };

  // const addTask = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4000/api/tasks",
  //       newTask
  //     );

  //     if (response.status === 201) {
  //       // Reset the form and show a success toast
  //       setNewTask({
  //         Taskname: "",
  //         description: "",
  //         startDate: "",
  //         endDate: "",
  //         attachments: null,
  //         managerEmail: "",
  //         department: "",
  //         comment: ""
  //       });
  //       alert("Task added successfully!");
  //     } else {
  //       // Handle the case where the request fails
  //       alert("Failed to add task. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error adding task:", error);
  //     alert("An unexpected error occurred. Please try again later.");
  //   }
  // };
  const addTask = async () => {
    let formData = new FormData();
    formData.append("Taskname", newTask.Taskname);
    formData.append("description", newTask.description);
    formData.append("startDate", newTask.startDate);
    formData.append("endDate", newTask.endDate);
    formData.append("file", newTask.attachments);
    formData.append("managerEmail", newTask.managerEmail);
    formData.append("department", newTask.department);
    formData.append("comment", newTask.comment);

    // console.log();
    const id = localStorage.getItem("_id");
    axios
      .post(`${window.location.origin}/api/tasks`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Fetch all tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/tasks`);
        // Handle the response data as needed (e.g., set it in the component state)
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        // Handle the error
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means this effect runs only once on mount

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

  useEffect(() => {
    loadDepartmentInfo();
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div style={{ zIndex: "1" }} className="p-4 d-flex flex-column ">
      <form className="row p-0 p-md-3 m-auto">
        <h2 className="fw-bold text-muted "> 🖋️Create New Task</h2>
        <p className="text-muted">
          You can Create New task and Assign to the manager for the process.
        </p>
        <div className="col-12 mt-5 d-flex flex-column">
          <Form.Group controlId="Taskname">
            <Form.Label className="fw-bold">Task Name</Form.Label>
            <input
              className="form-control"
              type="text"
              required
              placeholder="Enter task name"
              value={newTask.Taskname}
              onChange={(e) =>
                setNewTask({ ...newTask, Taskname: e.target.value })
              }
            />
          </Form.Group>
        </div>
        <div className="col-12 mt-2 d-flex flex-column">
          <Form.Group controlId="description">
            <Form.Label className="fw-bold">Task Description</Form.Label>
            <textarea
              className="form-control"
              required
              placeholder="Enter task description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </Form.Group>
        </div>
        <div className="col-12 col-md-6 mt-3 d-flex flex-column">
          <Form.Group controlId="startDate">
            <Form.Label className="fw-bold">Start Date</Form.Label>
            <input
              className="form-control"
              type="date"
              required
              value={newTask.startDate}
              onChange={(e) => {
                setNewTask({ ...newTask, startDate: e.target.value });
                // Reset the endDateError when StartDate changes
                setEndDateError(false);
              }}
            />
          </Form.Group>
        </div>
        <div className="col-12 col-md-6 mt-3 d-flex flex-column">
          <Form.Group controlId="endDate">
            <Form.Label className="fw-bold">End Date</Form.Label>
            <input
              className="form-control"
              type="date"
              required
              value={newTask.endDate}
              onChange={(e) => {
                const selectedEndDate = e.target.value;
                // Check if selectedEndDate is less than StartDate
                if (selectedEndDate < newTask.startDate) {
                  setEndDateError(true);
                } else {
                  setEndDateError(false);
                  setNewTask({ ...newTask, endDate: selectedEndDate });
                }
              }}
            />
          </Form.Group>
        </div>
        <div className="col-12 col-md-3 mt-3 d-flex flex-column">
          <Form.Group className="fw-bold" controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              as="select"
              name="department"
              required
              value={newTask.department}
              onChange={(e) =>
                setNewTask({ ...newTask, department: e.target.value })
              }
              onBlur={ManagerDataHandler}
            >
              <option value="">Select your option</option>
              {departmentData.map((data, index) => (
                <option key={index} value={data.DepartmentName}>
                  {data.DepartmentName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
        <div className="col-12 col-md-9 mt-3 d-flex flex-column">
          <Form.Group className="fw-bold" controlId="department">
            <Form.Label>managerEmail</Form.Label>
            <Form.Control
              as="select"
              name="department"
              required
              value={newTask.managerEmail}
              onChange={(e) =>
                setNewTask({ ...newTask, managerEmail: e.target.value })
              }
            >
              <option value="">Select your option</option>
              {managerData &&
                managerData.map((data, index) => (
                  <option key={index} value={data.Email}>
                    {data.Email}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </div>
        <div>
          <Form.Group controlId="Attachments">
            <Form.Label className="fw-bold mt-3">Attachments</Form.Label>
            <input
              className="form-control"
              type="file"
              multiple
              required
              onChange={(e) =>
                setNewTask({ ...newTask, attachments: e.target.files[0] })
              }
            />
          </Form.Group>
        </div>
        <Button
          className="mt-4 w-100 fw-bold text-white"
          variant="info"
          onClick={addTask}
          disabled={!isFormValid()}
        >
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default TaskAssign;

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Button, Container, Form } from "react-bootstrap";
// import { AttendanceContext } from "../../../Context/AttendanceContext/AttendanceContext";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// const TaskAssign = () => {
//   const [departmentData, setDepartmentData] = useState([]);
//   const [endDateError, setEndDateError] = useState(false);
//   const [allImage, setAllImage] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);

//   const [newTask, setNewTask] = useState({
//     Taskname: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//     attachments: "",
//     managerEmail: "",
//     department: "",
//     comment: ""
//   });

//   const { socket } = useContext(AttendanceContext);

//   const [curentDate, setCurentDate] = useState();
//   useEffect(() => {
//     const day = new Date();
//     const date = day.getDate();
//     const month = day.getMonth() + 1; // Add 1 to get correct month
//     const year = day.getFullYear();

//     const completeDate = `${year}-${month.toString().padStart(2, "0")}-${date
//       .toString()
//       .padStart(2, "0")}`;
//     setCurentDate(completeDate);
//   });

//   // let completeDate = `${year}-${month}-${date}`;
//   // completeDate = completeDate.toString();
//   // console.log(typeof completeDate);

//   // useEffect(() => {
//   //   getPdf();
//   // }, []);
//   // const getPdf = async () => {
//   //   const result = await axios.get("http://localhost:4000/api/getTask");
//   //   console.log(result.data.data);
//   //   setAllImage(result.data.data);
//   // };
//   // const showPdf = (pdf) => {
//   //   window.open(`http://localhost:4000/${pdf}`, "_blank", "noreferrer");
//   // };
//   const isFormValid = () => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     return (
//       newTask.Taskname.trim() !== "" &&
//       newTask.description.trim() !== "" &&
//       newTask.startDate.trim() !== "" &&
//       newTask.endDate.trim() !== "" &&
//       newTask.managerEmail.trim() !== "" &&
//       emailPattern.test(newTask.managerEmail) &&
//       newTask.department.trim() !== ""
//     );
//   };

//   const addTask = async () => {
//     let formData = new FormData();
//     formData.append("Taskname", newTask.Taskname);
//     formData.append("description", newTask.description);
//     formData.append("startDate", newTask.startDate);
//     formData.append("endDate", newTask.endDate);
//     formData.append("file", newTask.attachments);
//     formData.append("managerEmail", newTask.managerEmail);
//     formData.append("department", newTask.department);
//     formData.append("comment", newTask.comment);

//     // console.log();
//     const id = localStorage.getItem("_id");
//     axios
//       .post("http://localhost:4000/api/tasks", formData)
//       .then((res) => {
//         console.log(res);
//         socket.emit("new_notification", { id });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const loadDepartmentInfo = () => {
//     axios
//       .get("http://localhost:4000/api/department", {
//         headers: {
//           authorization: localStorage.getItem("token") || ""
//         }
//       })
//       .then((response) => {
//         setDepartmentData(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     loadDepartmentInfo();
//   }, []); // Empty dependency array means this effect runs only once on mount

//   return (
//     <div style={{ zIndex: "1" }} className="p-4 d-flex flex-column ">
//       <form className="row p-0 p-md-3 m-auto">
//         <h2 className="fw-bold text-muted "> 🖋️Create New Task</h2>
//         <p className="text-muted">
//           You can Create New task and Assign to the manager for the process.
//         </p>
//         <div className="col-12 mt-5 d-flex flex-column">
//           <Form.Group controlId="Taskname">
//             <Form.Label className="fw-bold">Task Name</Form.Label>
//             <input
//               className="form-control"
//               type="text"
//               required
//               placeholder="Enter task name"
//               value={newTask.Taskname}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, Taskname: e.target.value })
//               }
//             />
//           </Form.Group>
//         </div>
//         <div className="col-12 mt-2 d-flex flex-column">
//           <Form.Group controlId="description">
//             <Form.Label className="fw-bold">Task Description</Form.Label>
//             <textarea
//               className="form-control"
//               required
//               placeholder="Enter task description"
//               value={newTask.description}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, description: e.target.value })
//               }
//             />
//           </Form.Group>
//         </div>
//         <div className="col-12 col-md-6 mt-3 d-flex flex-column">
//           <Form.Group controlId="startDate">
//             <Form.Label className="fw-bold">Start Date</Form.Label>
//             <input
//               className="form-control"
//               type="date"
//               required
//               value={newTask.startDate}
//               min={curentDate}
//               onChange={(e) => {
//                 setNewTask({ ...newTask, startDate: e.target.value });
//                 // Reset the endDateError when StartDate changes
//                 setEndDateError(false);
//               }}
//             />
//           </Form.Group>
//         </div>
//         <div className="col-12 col-md-6 mt-3 d-flex flex-column">
//           <Form.Group controlId="endDate">
//             <Form.Label className="fw-bold">End Date</Form.Label>
//             <input
//               className="form-control"
//               type="date"
//               required
//               value={newTask.endDate}
//               onChange={(e) => {
//                 const selectedEndDate = e.target.value;
//                 // Check if selectedEndDate is less than StartDate
//                 if (selectedEndDate < newTask.startDate) {
//                   setEndDateError(true);
//                 } else {
//                   setEndDateError(false);
//                   setNewTask({ ...newTask, endDate: selectedEndDate });
//                 }
//               }}
//             />
//           </Form.Group>
//         </div>
//         <div className="col-12 col-md-3 mt-3 d-flex flex-column">
//           <Form.Group className="fw-bold" controlId="department">
//             <Form.Label>Department</Form.Label>
//             <Form.Control
//               as="select"
//               name="department"
//               required
//               value={newTask.department}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, department: e.target.value })
//               }
//             >
//               <option value="">Select your option</option>
//               {departmentData.map((data, index) => (
//                 <option key={index} value={data.DepartmentName}>
//                   {data.DepartmentName}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>
//         </div>
//         <div className="col-12 col-md-9 mt-3 d-flex flex-column">
//           <Form.Group controlId="managerEmail">
//             <Form.Label className="fw-bold"> Manager's Email</Form.Label>
//             <input
//               className="form-control"
//               type="email"
//               required
//               placeholder="Enter manager's email"
//               value={newTask.managerEmail}
//               onChange={(e) =>
//                 setNewTask({ ...newTask, managerEmail: e.target.value })
//               }
//             />
//           </Form.Group>
//         </div>
//         <div>
//           <Form.Group controlId="Attachments">
//             <Form.Label className="fw-bold mt-3">Attachments</Form.Label>
//             <input
//               className="form-control"
//               type="file"
//               multiple
//               required
//               onChange={(e) =>
//                 setNewTask({ ...newTask, attachments: e.target.files[0] })
//               }
//             />
//           </Form.Group>
//         </div>
//         <Button
//           className="mt-4 w-100 fw-bold text-white"
//           variant="info"
//           onClick={addTask}
//           disabled={!isFormValid()}
//         >
//           Add Task
//         </Button>
//       </form>
//       {/* <div className="output-div">
//         {allImage && allImage.length > 0 && (
//           <div className="inner-div">
//             <button
//               className="btn btn-primary"
//               onClick={() => showPdf(allImage[0].pdf)}
//             >
//               Show Pdf
//             </button>
//           </div>
//         )}
//       </div> */}
//     </div>
//   );
// };

// export default TaskAssign;
