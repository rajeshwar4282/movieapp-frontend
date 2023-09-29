import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from 'axios';
const DeleteMovie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('JWT_TOKEN')}` 
    
     }
     };
     
      axios
        .get('http://moovieapp-backend-1584628557.us-east-1.elb.amazonaws.com:8080/api/v1.0/moviebooking/all',config,{maxRedirects:0})
        .then((response) => {
        console.log(response.data);
         setMovies(response.data);
        console.log(movies[0]);
        console.log(typeof movies[0]);
        console.log(typeof response.data)
    
      })
  };

  const deleteMovie = async (movieName) => {
    
    const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('JWT_TOKEN')}` 
    
     }
     };
     
      axios
      .delete(`http://moovieapp-backend-1584628557.us-east-1.elb.amazonaws.com:8080/api/v1.0/moviebooking/${movieName}/delete`,config,{maxRedirects:0})
        .then((response) => {
        
        alert(response.data);
        fetchMovies();
      })
  };
  const updateMovie = async (movieName) => {
    
    const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('JWT_TOKEN')}` 
    
     }
     };
     
      axios
      .get(`http://localhost:8082/api/v1.0/moviebooking/${movieName}/update`,config,{maxRedirects:0})
        .then((response) => {
        
        alert(response.data);
        fetchMovies();
      })
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

    <div className="container-fluid">
      <h1>Movie List</h1>
      <Table striped bordered hover>
      <thead>
          <tr>
            <th>movieName</th>
            <th>Theatre Name</th>
            <th>Tickets available</th>
            <th>Ticketsstatus</th>
            <th>Release date</th>
            <th>Delete</th>
            <th>Update ticket status</th>
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
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteMovie(movie.movieName)}
                >
                  Delete
                </Button>
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => updateMovie(movie.movieName)}
                >
                  Update
                </Button>
              </td>
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
      <h1>Movie List</h1>
      <Table striped bordered hover>
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
  }
};

export default DeleteMovie;
