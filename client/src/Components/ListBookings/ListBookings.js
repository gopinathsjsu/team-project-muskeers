import React, { useEffect, useState } from "react";
import { ListGroup, Button, Row, Col, Modal,Alert } from "react-bootstrap";
import Axios from "axios";
import endPointObj from "../../endPointObj";
import "./ListBookings.css"

const ListBookings = () => {
  const [flights, setFlights] = useState([]);
  const [show, setShow] = useState(false);
  const [alertOwe, setAlertOwe] = useState('');
  const [bookingId, setBookingId] = useState(0);
  const [flightId, setFlightId] = useState(0);
  const [flightDate, setflightDate] = useState(new Date());
  const [bookingDate, setBookingDate] = useState(new Date());
  const [price, setPrice] = useState(0);


  const handleClose = () => setShow(false);
  const handleShow = (bookingId, flightId, flightDate, bookingDate, price) => {
    console.log(bookingId, flightId, flightDate, bookingDate, price);
    setBookingId(bookingId)
    setFlightId(flightId)
    setflightDate(flightDate)
    setBookingDate(bookingDate)
    setPrice(price)

    setShow(true)
    
   
  };
  

  const getFlights = () => {
    var userId = localStorage.getItem("userId");
    return new Promise((resolve, reject) => {
      Axios.post(endPointObj.url + "userBookings", { userId })
        .then((response) => {
          resolve(response.data);
          setFlights(response.data.result);
        })
        .catch((e) => { });
    });
  };

  const cancelBooking = (bookingId, flightId, flightDate, bookingDate, price) => {


    console.log(bookingId, flightId, userId, flightDate, bookingDate, price)
    var userId = localStorage.getItem("userId");
    var flightDate = flightDate.substring(0,10)
    var bookingDate = bookingDate.substring(0,10)
    Axios.post(endPointObj.url + "cancelBooking", { bookingId, flightId, userId, flightDate, bookingDate, price })
      .then((response) => {
        console.log("cancelled booking");
        getFlights();
        
      })
      .catch((e) => { });

      setShow(false)
  };

  useEffect(() => {
    getFlights().then((data) => {
      // do nothin
    });
    if(flights.length==0)
    setAlertOwe("No bookings avialable");
  }, []);

  return (
    <div>
      {(flights.length == 0) && <Alert className="no-flights" variant="secondary">
    No Bookings made yet
  </Alert>}
      
                

<>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel flight</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{cancelBooking(bookingId, flightId, flightDate, bookingDate, price)}}>
            Cancel Flight
          </Button>
        </Modal.Footer>
      </Modal>
    </>


      <ListGroup>

        {flights.map((a) => (
          <ListGroup.Item key={a.flight_id} value={a.flight_id}>
            <Row>
              <Col xs={11}>
                source: {a.source_city} &nbsp;
                destination: {a.destination_city} &nbsp;
                bookingDate: {a.booking_date.substring(0, 10)} &nbsp;
                flightDate: {a.flight_date.substring(0, 10)} &nbsp;
                booking_id: {a.booking_id} &nbsp;

              </Col>
              <Col xs={1}>
                {a.status == "1" && <Button variant="danger" onClick={() => handleShow(a.booking_id, a.flight_id, a.flight_date, a.booking_date, a.price)}>Cancel</Button>}
                {a.status == "0" && <Button variant="secondary" disabled>Cancelled</Button>}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ListBookings;
