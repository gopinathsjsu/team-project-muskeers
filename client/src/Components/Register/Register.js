import React, { useState } from 'react';
import { Col, Button, Form, Alert } from 'react-bootstrap';
import "./Register.css"
import endPointObj from '../../endPointObj'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';


function Register(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');
    const [role, setRole] = useState('');

    const history = useHistory();


    const registerUser = (e) => {
        console.log(name, email, password);

        const redirect = (path) => {
            history.push({
                pathname: path,
            });
        };

        e.preventDefault();
        return new Promise((resolve, reject) => {
            console.log(name, email, password);
            Axios.post(endPointObj.url + 'signup', { name, email, password, role }).then((response) => {
                console.log(response)

                if (response.data.role === 'admin') {
                    redirect("/adminDash");
                }
                else {
                    console.log(response);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('email_current', response.data.email);
                    console.log("Zing Zing Amazing");
                    redirect("/FlightBook");
                }


            }).catch((e) => {
                if (e.response && e.response.data) {
                    console.log(e.response.data.message);
                    setAlert(e.response.data.message);
                }

            })
        })
    }
    return (
        <Col md={{ span: 6, offset: 3 }} className="register-align">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="text" placeholder="User Name" onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => {
                        setEmail(e.target.value);
                    }} />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </Form.Group>
               
                <Form.Check
                    inline
                    label="user"
                    name="group1"
                    type="radio"
                    id="user"
                    onClick={()=>{setRole("user")}}
                />
                <Form.Check
                    inline
                    label="admin"
                    name="group1"
                    type="radio"
                    id="admin"
                    onClick={()=>{setRole("admin")}}
                />
                <br/>
              
               
                
                <Button variant="primary" type="submit" onClick={registerUser} className="register-submit-button">
                    Submit
                </Button>
                {alert.length > 0 && (
                    <Alert className="alert" key="0" variant="danger">
                        {alert}
                    </Alert>
                )}
            </Form>
        </Col>

    );
}

export default Register;