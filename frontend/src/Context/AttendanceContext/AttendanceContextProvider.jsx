import React, { useState } from 'react'
import { AttendanceContext } from './AttendanceContext'


const AttendanceContextProvider = ({children}) => {

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [attencenceID, setAttencenceID] = useState("");
    const [message, setMessage] = useState("");
    const [emailInput, setEmailInput] = useState("");




  return (
    <AttendanceContext.Provider value={{emailInput, setEmailInput, employees, setEmployees, selectedEmployee, setSelectedEmployee, attencenceID, setAttencenceID, message, setMessage}}>
        {children}
    </AttendanceContext.Provider>
      
  )
}

export default AttendanceContextProvider
