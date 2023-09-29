import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './MainCSS.css';
const AddTicket = () => {
    
  const [ticket, setTicket] = useState({
    _id: null,
    movieName:'',
    theatreName: '',
    noOfTickets: 0,
    seatNumber: []
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "seatNumber") {
      const seatNumber = value.split(",").map((num) => num.trim()); // Split the input string and trim whitespace
      setTicket((prevTicket) => ({ ...prevTicket, [name]: seatNumber }));
    } else {
      setTicket((prevTicket) => ({ ...prevTicket, [name]: value }));
    }
  };
 /* 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({ ...prevTicket, [name]: value }));
  };*/

  const handleSubmit = (e) => {
    e.preventDefault();
    const headers1 = {
    'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}` ,
    'Content-Type': 'application/json'
    
     };
    axios
      .post(`http://moovieapp-backend-1584628557.us-east-1.elb.amazonaws.com:8080/api/v1.0/moviebooking/${ticket.movieName}/add`, ticket,{headers:headers1}) 
      .then((response) => {
        console.log(response.data);
        alert("Ticket booked!!!");
        // Handle success, e.g., show a success message or redirect to another page
      })
      .catch((error) => {
        console.error(error);
        // Handle error, e.g., show an error message
        alert(error);
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

    <div className="container-fluid">
      <h1>Add Ticket</h1>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="movieId">Movie Name:</label>
          <input
            type="text"
            className="form-control"
            id="movieName"
            name="movieName"
            value={ticket.movieName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="theatreName">Theatre Name:</label>
          <input
            type="text"
            className="form-control"
            id="theatreName"
            name="theatreName"
            value={ticket.theatreName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="noOfTickets">Number of Tickets:</label>
          <input
            type="number"
            className="form-control"
            id="noOfTickets"
            name="noOfTickets"
            value={ticket.noOfTickets}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="seatNumbers">Seat Number:</label>
          <input
            type="text"
            className="form-control"
            id="seatNumber"
            name="seatNumber"
            value={ticket.seatNumber}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Add Ticket</button>
      </form>
      <footer>
            <p>&copy; {new Date().getFullYear()} Movie Booking App</p>
          </footer>
    </div>
    </div>
  );
};

export default AddTicket;
