import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
function ResetPassword() {
  const [loginId, setLoginId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLoginIdChange = (event) => {
    setLoginId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
 const headers1 = {
    'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}` ,
    'Content-Type': 'application/json'
    
     };
     const config = {
    'loginId': loginId ,
    'password': newPassword
    
     };
    axios
      .put(`http://moovieapp-backend-1584628557.us-east-1.elb.amazonaws.com:8080/api/v1.0/moviebooking/${loginId}/forgot`,config,{headers:headers1})
      .then((response) => {
        console.log(response);
        setMessage('Password reset successfully.');
      })
      .catch((error) => {
        console.log(error);
        setMessage('User not found.');
      });
  };

  return (
   <div>
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">MovieBook App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/User">Home</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/AddTicket">Add Ticket</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/DeleteMovie">ALL Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AllTicket">all Tickets</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ResetPassword">reset password</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Logout</Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className="resetPassword-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loginId">Login ID:</label>
          <input
            type="text"
            id="loginId"
            value={loginId}
            onChange={handleLoginIdChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
      <p className="message">{message}</p>
    </div>
    </div>
  );
}

export default ResetPassword;
