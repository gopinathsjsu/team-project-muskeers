import React, { useState } from 'react';
import { ButtonGroup, Button, Col, Row, Label, Form, FloatingLabel, Container, Card, Alert, InputGroup, FormControl } from 'react-bootstrap';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import "./AdminDash.css"
import DateTimePicker from 'react-datetime-picker';
import Axios from 'axios';
import endPointObj from '../../endPointObj'

function AdminDash(props) {

    const [country, setCountry] = useState('');
    const [alert, setAlert] = useState('')
    const [alertUpdate, setAlertUpdate] = useState('')
    const [srcRegion, setSrcRegion] = useState('');
    const [flightId, setFlightId] = useState('');
    const [flightStatus, setFlightStatus] = useState('');
    const [destRegion, setDestRegion] = useState('');
    const [startDate, onStartChange] = useState(new Date());
    const [endDate, onEndChange] = useState(new Date());
    const [updateDate, setUpdateDate] = useState(new Date());
    const [view, changeView] = useState('createFlight');
    const [variantCreate, setVariantCreate] = useState('primary')
    const [variantUpdate, setVariantUpdate] = useState('outline-primary')
    const [variantDelete, setVariantDelete] = useState('outline-primary')

    let createFlight = (source, destination, startT, endT) => {
        //console.log(src, dest, startT, endT);


        let startTime = startT.toLocaleTimeString()
        let startDate = startT.toLocaleDateString()
        let endDate = endT.toLocaleDateString()
        let endTime = endT.toLocaleTimeString()

        Axios.post(endPointObj.url + 'createFlight', { source, destination, startTime, endTime, startDate, endDate }).then((response) => {


            console.log("flight created sucessfully");
            setAlert(response.data.message);



        }).catch((e) => {
            // if (e.response && e.response.data) {
            //     console.log(e.response.data.message);
            //     setAlert(e.response.data.message);
            // }

        })


    }

    let updateFlight = (e) => {

        e.preventDefault()


        Axios.post(endPointObj.url + 'updateStatus', { flightId, flightStatus, updateDate }).then((response) => {


            console.log("flight updated sucessfully");
            setAlertUpdate(response.data.message);



        }).catch((e) => {
            // if (e.response && e.response.data) {
            //     console.log(e.response.data.message);
            //     setAlert(e.response.data.message);
            // }

        })



    }


    let changeColor = (buttonName) => {

        if (buttonName === "createFlight") {
            setVariantCreate("primary")
            setVariantUpdate("outline-primary")
            setVariantDelete("outline-primary")
        } else if (buttonName === "updateFlight") {
            setVariantCreate("outline-primary")
            setVariantUpdate("primary")
            setVariantDelete("outline-primary")
        } else {
            setVariantCreate("outline-primary")
            setVariantUpdate("outline-primary")
            setVariantDelete("primary")
        }

    }
    return (


        <Col md={{ span: 6, offset: 3 }} className="admin-dash-align">
            <Row>
                <ButtonGroup aria-label="Basic example" >
                    <Button variant={variantCreate} onClick={() => { changeView("createFlight"); changeColor("createFlight") }}>Create Flight</Button>
                    <Button variant={variantUpdate} onClick={() => { changeView("updateFlight"); changeColor("updateFlight") }}>Update Flight</Button>
                    {/* <Button variant={variantDelete} onClick={() => { changeView("deleteFlight"); changeColor("deleteFlight") }}>Delete Flight</Button> */}
                </ButtonGroup>
            </Row>
            {/* create flight */}
            <Row >

                {/* <CountryDropdown
                    value={country}
                    onChange={(val) => setCountry(val)} /> */}

                <Card className="admin-container">
                    {view == 'createFlight' && <Card.Body className="form-data">

                        <RegionDropdown
                            country="United States"
                            className="src-region"
                            value={srcRegion}
                            defaultOptionLabel="Source"
                            onChange={(val) => setSrcRegion(val)} />


                        <RegionDropdown
                            country="United States"
                            className="dest-region"
                            value={destRegion}
                            defaultOptionLabel="Destination"
                            onChange={(val) => setDestRegion(val)} />
                        <br></br>

                        <Form.Label>Start Time</Form.Label> &nbsp;&nbsp;
                        <DateTimePicker
                            className="start-time"
                            onChange={(val) => { onStartChange(val) }}
                            value={startDate}
                        />
                        <br></br>

                        <Form.Label>End Time</Form.Label>
                        <DateTimePicker
                            className="end-time"
                            onChange={(val) => { onEndChange(val) }}
                            value={endDate}
                        />
                        <br></br>
                        <Button variant="primary" onClick={() => { createFlight(srcRegion, destRegion, startDate, endDate) }}>Submit</Button>
                        {alert.length > 0 && (
                            <Alert className="admin-alert" key="0" variant="success">
                                {alert}
                            </Alert>
                        )}
                    </Card.Body>
                    }
                     {/* update flight */}

                    {view == 'updateFlight' && <Card.Body className="form-data">

                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Flight Id" onChange={(e)=>{setFlightId(e.target.value)}}/>

                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                               
                                <Form.Select placeholder="status" onChange={(e)=>{setFlightStatus(e.target.value)}}>
                                    <option>CANCEL</option>
                                    <option>DELAYED</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Label>End Time</Form.Label>
                            <DateTimePicker
                                className="end-time-update"
                                onChange={(val) => { setUpdateDate(val) }}
                                value={updateDate}
                            />
                            <br></br>

                            <Button variant="primary" onClick={(e)=>{updateFlight(e)}} className="submit-update" type="submit">
                                Submit
                            </Button>
                        </Form>

                        {alertUpdate.length > 0 && (
                            <Alert className="admin-alert" key="0" variant="success">
                                {alertUpdate}
                            </Alert>
                        )}


                    </Card.Body>}

                </Card>

               





                {/* delete flight */}
            </Row>

        </Col>







    );
}

export default AdminDash;