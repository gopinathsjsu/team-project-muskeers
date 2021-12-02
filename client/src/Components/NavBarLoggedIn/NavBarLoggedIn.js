import React, { useState } from 'react';
// import NavBar from 'react-bootstrap/NavBar';
import { Container, Nav, Dropdown } from 'react-bootstrap';
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

    const logout = () => {
        console.log("log out");
        sessionStorage.clear();
        localStorage.clear();
        history.push({
          pathname: "/",
        });
    }

    return (
        <div>
            
        </div>
    );
}

export default NavBarLoggedIn;