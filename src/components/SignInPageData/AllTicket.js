import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button,Table } from 'react-bootstrap';
import './MainCSS.css';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';



const AllTicket = () => {

 const [tickets, setTickets] = useState([]);
  useEffect(() => {
  updateticket();
  }, []);
  const [movieName, setMovieName] = useState('');

  const handleMovieNameChange = (event) => {
    setMovieName(event.target.value);
  };
   
   
     
  const updateticket = async() => {
    
    
     const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('JWT_TOKEN')}` 
    
     }
     };
      axios
        .get(`http://localhost:8082/api/v1.0/moviebooking/getallbookedtickets/${movieName}`,config,{maxRedirects:0})
        .then((response) => {
        console.log(response.data);
         setTickets(response.data);
      })
     
      // Handle error, e.g., show an error message
    
  };
  if(localStorage.getItem('ROLES').includes('ADMIN')){
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
    <form >
        
        <div className="form-group">
          <label htmlFor="moviename">Movie Name:</label>
          <input
            type="text"
            className="form-control"
            id="movieName"
            name="movieName"
            value={movieName}
            onChange={handleMovieNameChange}
          />
        </div>
        
        <Button
                  variant="warning"
                  onClick={() => updateticket(movieName)}
                >
                  Update
                </Button>
      </form>
    <div className="container-fluid">
      <h1>All tickets</h1>
      <input type="text" placeholder="search..."  onChange={(e)=>{
      console.log("ok")
      const tickets1=tickets.filter((movie)=>{movie.movieName.includes(e)});
      console.log(tickets1);
      }}/>
      
      <Table striped bordered hover data={tickets}>
        <thead>
          <tr>
            <th>movieName</th>
            <th>Theatre Name</th>
            <th>Tickets booked</th>
            <th>seatnumbers</th>
            <th>Release date</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr >
              <td>{ticket.movieName}</td>
              <td>{ticket.theatreName}</td>
              <td>{ticket.noOfTickets}</td>
              <td>{ticket.seatNumber}</td>
              <td>{ticket._id.date.substring(10,0)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <footer>
            <p>&copy; {new Date().getFullYear()} Movie Booking App</p>
          </footer>
    </div>
    </div>
  );
  }
  else{
  return(
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
                <Link className="nav-link" to="/" >Logout</Link>
              </li>
          </ul>
        </div>
      </div>
    </nav>
    <h2>only admin access</h2>
    </div>
  );
  }
};

export default AllTicket;
