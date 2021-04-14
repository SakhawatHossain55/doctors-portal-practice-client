import React, { useState } from 'react';
import Sidebar from '../Dashboard/Sidebar/Sidebar';

const AddDoctor = () => {

    const [info, setInfo] = useState({})
    const [file, setFile] = useState(null)
    const handleBlur = e => {
        const newInfo = {...info}
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo)
    }
    const handleFileChange = e => {
        const newFile = e.target.files[0];
        setFile(newFile)

    }
   
    const handleSubmit = () => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', info.name)
        formData.append('email', info.email)
      
        fetch('http://localhost:5000/addADoctor', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log('data', data)
        })
        .catch(error => {
          console.log(error)
        })
    }
    
    return (
        <section className="container-fluid row">
           <Sidebar></Sidebar>
            <div className="p-5 col-md-10" style={{position: "absolute", right: "0", background: "#F4FDFB"}}>
                <h3 className="text-brand">Add Doctor</h3>
                <form onSubmit={handleSubmit} style={{background: "#fff"}} className="p-4">
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input onBlur={handleBlur} type="email" className="form-control" name="email" placeholder="Your Email" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Name</label>
                        <input onBlur={handleBlur} type="text" className="form-control" name="name" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Upload a Image</label>
                        <input onChange={handleFileChange} type="file" className="form-control"  placeholder="Picture" />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default AddDoctor;