import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import './MainCSS.css';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';



const AllMovie = () => {

 const [movies, setMovies] = useState([]);
  const [SearchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);
   
   
     
  const fetchMovies = async () => {
    
    const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('JWT_TOKEN')}` 
    
     }
     };
     
      axios
        .get('http://localhost:8082/api/v1.0/moviebooking/all',config,{maxRedirects:0})
        .then((response) => {
        console.log(response.data);
         setMovies(response.data);
        console.log(movies[0]);
        console.log(typeof movies[0]);
        console.log(typeof response.data)
    
      })
     
      // Handle error, e.g., show an error message
    
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
                <Link className="nav-link" to="/AllMovie">Movies List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/DeleteMovie">Delete Movie</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/AllTicket">Bookings</Link>
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
      <h1>All Movies</h1>
      <input type="text" placeholder="search..."  onChange={(e)=>{
      console.log("ok")
      const movies1=movies.filter((movie)=>{movie.movieName.includes(e)});
      console.log(movies1);
      }}/>
      
      <Table striped bordered hover data={movies}>
        <thead>
          <tr>
            <th>movieName</th>
            <th>Theatre Name</th>
            <th>Tickets available</th>
            <th>Ticketsstatus</th>
            <th>Release date</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr >
              <td>{movie.movieName}</td>
              <td>{movie.theatreName}</td>
              <td>{movie.noOfTicketsAvailable}</td>
              <td>{movie.ticketsStatus}</td>
              <td>{movie._id.date.substring(10,0)}</td>
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
};

export default AllMovie;
