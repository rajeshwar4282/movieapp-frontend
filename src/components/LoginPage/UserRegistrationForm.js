import React, { useState } from 'react';
import axios from 'axios';
import './UserRegistrationForm.css';
const UserRegistrationForm = () => {
  
   const userrole = new Set(['user']);
   const userrole1=Array.from(userrole);
  const [user, setUser] = useState({
    loginId: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    roles: userrole1,
    password: ''
    
  });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const headers1 = {
  'Content-Type': 'application/json'
}
    axios
      .post('http://moovieapp-backend-1584628557.us-east-1.elb.amazonaws.com:8080/api/v1.0/moviebooking/register/', user,{headers:headers1})
      .then((response) => {
        console.log(response.data);
        alert("LoginId created");
        // Handle success response here
        window.location.href = '/';
        
      })
      .catch((error) => {
        console.error(error);
        // Handle error here
        alert("Login ID is already taken");
      });
  };

  return (
    <form className="user-registration-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="loginId">Login ID:</label>
        <input
          type="text"
          className="form-control"
          id="loginId"
          name="loginId"
          value={user.loginId}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
<div className="form-group">
        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="text"
          className="form-control"
          id="contactNumber"
          name="contactNumber"
          value={user.contactNumber}
          onChange={handleChange}
        />
      </div>
   
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      
      
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default UserRegistrationForm;
