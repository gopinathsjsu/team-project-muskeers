import React, { useState } from 'react';
import NavBar from 'react-bootstrap/NavBar';
import { Container, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import "./NavBarLoggedIn.css"


function NavBarLoggedIn(props) {

    const history = useHistory();
    const [flagList, setFlagList] = useState(true);
    const [flagModify, setFlagModify] = useState(false);

    const redirect = (path) => {
        history.push({
            pathname: path,
        });


        // if(path == "/adminList"){
        //     setFlagList(true);
        //     setFlagModify(false);
        // }else{

        //     setFlagList(false);
        //     setFlagModify(true);



        // }
        // console.log(flagList, flagModify)

    };

    return (
        <div>
            <NavBar bg="dark" variant="dark">
                <Container>
                    <NavBar.Brand href="#home">Airline Booking</NavBar.Brand>

                    <Nav className="me-auto">
                        {/* <Nav.Link  className = {flagList? "white": "regular"} onClick={()=>{redirect("/adminList")}}>List</Nav.Link>
                        <Nav.Link  className = {flagModify? "white": "regular"} onClick={()=>{redirect("/adminDash")}}>Modify</Nav.Link> */}
                        <Nav.Link onClick={() => { redirect("/adminList") }}>List</Nav.Link>
                        <Nav.Link onClick={() => { redirect("/adminDash") }}>Modify</Nav.Link>
                        
                    </Nav>
                    <div>


                    </div>
                </Container>
            </NavBar>
        </div>
    );
}

export default NavBarLoggedIn;