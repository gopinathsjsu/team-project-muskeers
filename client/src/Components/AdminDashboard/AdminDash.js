import React, { useState, useEffect } from 'react';
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
    const [source, setSrcRegion] = useState('');
    const [flightId, setflightId] = useState('');
    const [flightStatus, setFlightStatus] = useState('');
    const [destination, setDestRegion] = useState('');
    const [startDate, onStartChange] = useState(new Date());
    const [endDate, onEndChange] = useState(new Date());
    const [startTime, onStartTimeChange] = useState(null);
    const [endTime, onEndTimeChange] = useState(null);
    const [flightIds, setflightIds] = useState([]);

    const [updateDate, setUpdateDate] = useState(new Date());
    const [view, changeView] = useState('createFlight');
    const [variantCreate, setVariantCreate] = useState('primary')
    const [variantUpdate, setVariantUpdate] = useState('outline-primary')
    const [variantDelete, setVariantDelete] = useState('outline-primary')

    const getFlightIds = () => {


        return new Promise((reslove, reject) => {
            Axios.get(endPointObj.url + 'flightId').then((response) => {



                reslove(response.data);


            }).catch((e) => {

            })
        })
    }

    useEffect(() => {
        getFlightIds().then((data) => {
            //console.log(data.flight_id)
            setflightIds(data.flight_id);

        })
    }, []);



    let createFlight = () => {
        //console.log(src, dest, startT, endT);

        console.log("creating flight")

        console.log(source, destination, startTime, endTime, startDate, endDate)




        Axios.post(endPointObj.url + 'createFlight', { source, destination, startTime, endTime, startDate, endDate }).then((response) => {


            console.log("flight created sucessfully");
            setAlert(response.data.message);



        }).catch((e) => {
            // if (e.response && e.response.data) {
            //     console.log(e.response.data.message);
            //     setAlert(e.response.data.message);
            // }
            console.log("error");

        })


    }

    let updateFlight = (e) => {

        e.preventDefault()

        console.log(flightId, flightStatus, updateDate);


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
                            value={source}
                            defaultOptionLabel="Source"
                            onChange={(val) => setSrcRegion(val)} />


                        <RegionDropdown
                            country="United States"
                            className="dest-region"
                            value={destination}
                            defaultOptionLabel="Destination"
                            onChange={(val) => setDestRegion(val)} />
                        <br></br>

                        {/* <Form.Label>Start Time</Form.Label> &nbsp;&nbsp;
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
                        <br></br> */}
                        <Row>
                            <Col sm={2} className="dateLabel">Start Date</Col>
                            <Col sm={10}> <Form.Control type="date" className="date" selected={startDate} onChange={(e) => { onStartChange(e.target.value) }} placeholder="Date of Birth" /></Col>
                        </Row>

                        <Row>
                            <Col sm={2} className="dateLabel">End Date</Col>
                            <Col sm={10}> <Form.Control type="date" className="date" selected={startDate} onChange={(e) => { onEndChange(e.target.value) }} placeholder="Date of Birth" /></Col>
                        </Row>

                        <Row>
                            <Col sm={2} className="dateLabel">Start Time</Col>
                            <Col sm={10}><Form.Control type="time" className="date" name="dob" placeholder="Date of Birth" selected={startTime} onChange={(e) => { onStartTimeChange(e.target.value) }} /></Col>
                        </Row>

                        <Row>
                            <Col sm={2} className="dateLabel">End Time</Col>
                            <Col sm={10}><Form.Control type="time" className="date" name="dob" placeholder="Date of Birth" selected={endTime} onChange={(e) => { onEndTimeChange(e.target.value) }} /></Col>
                        </Row>






                        <Button variant="primary" className="create-submit" onClick={() => { createFlight() }}>Submit</Button>
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
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Select aria-label="Default select example" onChange={(e)=>{setflightId(e.target.value)}}>
                                    {flightIds.map((a) => (
                                        <option key={a.flight_id} value={a.flight_id}>
                                            {a.flight_id}
                                        </option>
                                         ))}
                                    
                                </Form.Select>
                                
                               
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">

                                <Form.Select placeholder="status" className="status" onChange={(e) => { setFlightStatus(e.target.value) }}>
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

                            <Button variant="primary" onClick={(e) => { updateFlight(e) }} className="submit-update" type="submit">
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