import React, { useEffect, useState } from 'react';
import Doctor from '../Doctor/Doctor';
const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/doctors')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setDoctors(data)
        })
    }, [])
    console.log(doctors);
    return (
        <section className="doctors">
            <div className="container">
                <h5 className="text-center  text-primary mb-5">Our Doctors</h5>
                <div className="row">
                    {
                        doctors.map(doctor =><Doctor doctor={doctor} key={doctor._id}></Doctor>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Doctors;