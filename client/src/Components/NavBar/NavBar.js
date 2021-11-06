import React from 'react';
import NavBar from 'react-bootstrap/NavBar';
import {Container, Nav} from 'react-bootstrap';

function Navigation(props) {
    return (
        <div>
            <NavBar bg="dark" variant="dark">
                <Container>
                    <NavBar.Brand href="#home">Airline Booking</NavBar.Brand>
                   
                </Container>
            </NavBar>

        </div>
    );
}

export default Navigation;