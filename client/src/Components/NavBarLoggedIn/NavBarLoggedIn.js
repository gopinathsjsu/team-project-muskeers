import React from 'react';
import NavBar from 'react-bootstrap/NavBar';
import { Container } from 'react-bootstrap';

function NavBarLoggedIn(props) {
    return (
        <div>
            <NavBar bg="dark" variant="dark">
                <Container>
                    <NavBar.Brand href="#home">Airline Booking</NavBar.Brand>
                    <div>
                        
                    </div>
                </Container>
            </NavBar>
        </div>
    );
}

export default NavBarLoggedIn;