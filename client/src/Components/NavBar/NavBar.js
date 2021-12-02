import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import { Container, Button } from 'react-bootstrap';
import "./NavBar.css"
import { useHistory } from 'react-router-dom';

function Navigation(props) {

    const history = useHistory();

    const redirectLogin = () => {
        history.push({
            pathname: '/',
        });
    };

    const redirectRegister = () => {
        history.push({
            pathname: '/register',
        });
    };

    return (
        <div>
            <NavBar bg="dark" variant="dark">
                <Container>
                    <NavBar.Brand href="#home">Airline Booking</NavBar.Brand>
                    <div className="login-signup-div">
                        <Button variant="primary" onClick={()=>{redirectLogin()}}>LogIn</Button> &nbsp;
                        <Button variant="primary" onClick={()=>{redirectRegister()}}>Sign up</Button>
                    </div>
                </Container>
            </NavBar>

        </div>
    );
}

export default Navigation;