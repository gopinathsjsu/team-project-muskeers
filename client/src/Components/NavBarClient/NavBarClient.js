import React, { useState } from 'react';
import NavBar from 'react-bootstrap/NavBar';
import { Container, Nav,Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import "./NavBarClient.css"
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";


const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function NavBarClient(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const history = useHistory();
    const myAccount = () => {
        history.push({
          pathname: "/UserProfile",
        });
      };

      const handleClose = () => {
        setAnchorEl(null);
      };
      

      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const logOut = () => {
        console.log("log out");
        sessionStorage.clear();
        localStorage.clear();
        history.push({
          pathname: "/",
        });
      };
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
                    <div>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            color="primary"
                            className="profile-menu"
                            onClick={handleClick}
                        
                        >
                            <div>
                                <Avatar
                                    variant="square"
                                    src="/static/images/avatar/1.jpg"
                                    //src = {profilelogo}
                                    className="profile-avatar"
                                ></Avatar>
                            </div>
                            &nbsp; &nbsp;
                            
                        </Button>

                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <StyledMenuItem
                                onClick={() => {
                                    myAccount();
                                }}
                            >
                                
                                <ListItemText primary="Account" />
                            </StyledMenuItem>

                            <StyledMenuItem
                                onClick={() => {
                                    logOut();
                                }}
                            >
                                
                                <ListItemText primary="Logout" />
                            </StyledMenuItem>
                           
                        </StyledMenu>

                    </div>
                    
                    </div>
                </Container>
            </NavBar>
        </div>
    );
}

export default NavBarClient;