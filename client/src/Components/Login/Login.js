import React, {useState} from 'react';
import { Col, Button, Form, Alert} from 'react-bootstrap';
import "./Login.css";
import Axios from 'axios';
import endPointObj from '../../endPointObj'
import { useHistory } from 'react-router-dom';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('')

    const history = useHistory();

    const logIn = (e) => {
        console.log(email, password);

        const redirect = (path) => {
            history.push({
                pathname: path,
            });
        };

        e.preventDefault();
        return new Promise((resolve, reject) => {
            console.log(email, password);
            Axios.post(endPointObj.url + 'login', { email, password }).then((response) => {

                if (response.data.success.role === 'admin') {
                    redirect("/adminDash");
                }
                else {
                    console.log(response);
                    localStorage.setItem('userId', response.data.success.userId);
                    localStorage.setItem('email_current', response.data.success.email);
                    
                    redirect("/FlightBook");
                }


            }).catch((e) => {
                if (e.response && e.response.data) {
                    setAlert(e.response.data.message);
                }

            })
        })
    }

    return (
            <Col md={{ span: 6, offset: 3 }} className="login-align">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={logIn}>
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

export default Login;