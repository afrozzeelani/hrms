// import React, { Component } from "react";
// import "./City.css";
// import axios from "axios";
// import CityTable from "./CityTable.jsx";
// import CityForm from "./CityForm.jsx";
// import CityFormEdit from "./CityFormEdit.jsx";


// class City extends Component {
//   state = {
//     table: true,
//     editForm: false,
//     editData: {}
//   };

//   render() {
//     return (
//       <React.Fragment>
//         {this.state.table ? (
//           this.state.editForm ? (
//             <CityFormEdit
//               onCityEditUpdate={this.handleCityEditUpdate}
//               onFormEditClose={this.handleEditFormClose}
//               editData={this.state.editData}
//             />
//           ) : (
//               <CityTable
//                 onAddCity={this.handleAddCity}
//                 onEditCity={this.handleEditCity}
//               />
//             )
//         ) : (
//             <CityForm
//               onCitySubmit={this.handleCitySubmit}
//               onFormClose={this.handleFormClose}
//             />
//           )}
//       </React.Fragment>
//     );
//   }
//   handleCitySubmit = event => {
//     event.preventDefault();
//     console.log("id", event.target[0].value, event.target[1].value);
//     this.setState({ table: true });

//     let body = {
//       StateID: event.target[1].value,
//       CityName: event.target[2].value
//     };
//     axios
//       .post("http://localhost:4000/api/city", body, {
//         headers: {
//           authorization: localStorage.getItem("token") || ""
//         }
//       })
//       .then(res => {
//         this.setState({ table: false });
//         this.setState({ table: true });
//       })
//       .catch(err => {
//         console.log(err);
//       });

//   };
//   handleAddCity = () => {
//     console.log("clicked1");
//     this.setState({ table: false });
//   };
//   handleEditCity = e => {
//     console.log(e);
//     console.log("clicked6");
//     this.setState({ editForm: true });
//     this.setState({ editData: e });
//   };
//   handleFormClose = () => {
//     console.log("clicked1");
//     this.setState({ table: true });
//   };
//   handleEditFormClose = () => {
//     console.log("clicked5");
//     this.setState({ editForm: false });
//   };
//   handleFormClose = () => {
//     console.log("clicked1");
//     this.setState({ table: true });
//   };
//   handleCityEditUpdate = (info, newInfo) => {
//     newInfo.preventDefault();
//     this.setState({ table: true });

//     let body = {
//       StateID: newInfo.target[1].value,
//       CityName: newInfo.target[2].value
//     };

//     axios
//       .put("http://localhost:4000/api/city/" + info["_id"], body, {
//         headers: {
//           authorization: localStorage.getItem("token") || ""
//         }
//       })
//       .then(res => {
//         console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
//         this.setState({ editForm: false });
//         this.setState({ table: true });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
// }

// export default City;

import React, { useState, useEffect } from "react";
import "./City.css";
import axios from "axios";
import CityTable from "./CityTable.jsx";
import CityForm from "./CityForm.jsx";
import CityFormEdit from "./CityFormEdit.jsx";

const City = () => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  const handleCitySubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    setTable(true);

    const body = {
      StateID: event.target[1].value,
      CityName: event.target[2].value,
    };

    axios
      .post(`${window.location.origin}/api/city`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        setTable(false);
        setTable(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddCity = () => {
    console.log("clicked1");
    setTable(false);
  };

  const handleEditCity = (e) => {
    console.log(e);
    console.log("clicked6");
    setEditForm(true);
    setEditData(e);
  };

  const handleFormClose = () => {
    console.log("clicked1");
    setTable(true);
  };

  const handleEditFormClose = () => {
    console.log("clicked5");
    setEditForm(false);
  };

  const handleCityEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    setTable(true);

    const body = {
      StateID: newInfo.target[1].value,
      CityName: newInfo.target[2].value,
    };

    axios
      .put(`${window.location.origin}/api/city/${info["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
        setEditForm(false);
        setTable(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      {table ? (
        editForm ? (
          <CityFormEdit
            onCityEditUpdate={handleCityEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <CityTable onAddCity={handleAddCity} onEditCity={handleEditCity} />
        )
      ) : (
        <CityForm onCitySubmit={handleCitySubmit} onFormClose={handleFormClose} />
      )}
    </React.Fragment>
  );
};

export default City;

