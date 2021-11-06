import React from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap';
import "./Login.css";
import Axios from 'axios';


function Login() {

    return (
            <Col md={{ span: 6, offset: 3 }} className="login-align">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
     

    );
}

export default Login;