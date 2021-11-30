import React, { useState } from 'react';
import NavBar from 'react-bootstrap/NavBar';
import { Container, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import "./NavBarClient.css"


function NavBarClient(props) {

    const history = useHistory();

    const redirect = (path) => {
        history.push({
            pathname: path,
        });

    };


    
    return (
        <div>
            <NavBar bg="dark" variant="dark">
                <Container>
                    <NavBar.Brand href="#home">Airline Booking</NavBar.Brand>

                    <Nav className="me-auto">
                        <Nav.Link  onClick={() => { redirect("/FlightBook") }}>Book Flight</Nav.Link>
                        <Nav.Link  onClick={() => { redirect("/listBookings") }}>List Bookings</Nav.Link>
                        
                    </Nav>
                    <div>


                    </div>
                </Container>
            </NavBar>
        </div>
    );
}

export default NavBarClient;