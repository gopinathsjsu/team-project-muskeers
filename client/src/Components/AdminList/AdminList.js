import React, { useState, useEffect } from 'react';
import { ListGroup, Row, Col, Alert } from 'react-bootstrap';
import Axios from 'axios';
import endPointObj from '../../endPointObj'
import "./AdminList.css"

function AdminList(props) {

    const [flights, setFlights] = useState([]);


    useEffect(() => {
        getFlights().then((data) => {
            //console.log(data.flight_id)
            setFlights(data.details);

        })
    }, []);


    const getFlights = () => {


        return new Promise((reslove, reject) => {
            Axios.get(endPointObj.url + 'filghtDetailsAdmin').then((response) => {



                reslove(response.data);


            }).catch((e) => {

            })
        })
    }


    return (
        <div>
            <ListGroup>
                {flights.map((a) => (
                    <ListGroup.Item key={a.flight_id} value={a.flight_id}>
                        <Row>
                            <Col xs={10}>
                                flightId: {a.flight_id} &nbsp;
                                source: {a.source_city} &nbsp;
                                destination: {a.source_city} &nbsp;
                                time: {a.start_time} &nbsp;
                            </Col>
                            <Col xs={2}>

                                {a.status == "SCHEDULED" && <Alert variant="success" className="alert-list">
                                    {a.status}
                                </Alert>}


                                {a.status != "SCHEDULED" && <Alert variant="danger" className="alert-list">
                                    {a.status}
                                </Alert>}

                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}

            </ListGroup>
        </div>
    );
}

export default AdminList;