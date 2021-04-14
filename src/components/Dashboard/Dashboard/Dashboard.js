import React, { useContext, useEffect, useState } from 'react';
import AppointmentsByDate from '../AppointmentsByDate/AppointmentsByDate';
import Sidebar from '../Sidebar/Sidebar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { UserContext } from '../../../App';

const containerStyle = {
    position: 'absolute',
    backgroundColor: "#F4FDFB",
    height:"100%"
}

const Dashboard = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    const handleDateChange = date => {
        setSelectedDate(date);
    }

    useEffect( () => {
        fetch('http://localhost:5000/appointmentsByDate', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({date: selectedDate, email: loggedInUser.email})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setAppointments(data)
        })
    }, [selectedDate])
    
    return (
        <div>
            <div style={containerStyle} className="container-fluid row">
                <div className="col-md-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10">
                    <h3 className="p-4">Appointments</h3>
                    <div className="row">
                        <div className="col-md-5 d-flex justify-content-center">
                            <Calendar onChange={handleDateChange} value={new Date()} />
                        </div>
                        <div className="col-md-7">
                            <AppointmentsByDate appointments={appointments}></AppointmentsByDate>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;