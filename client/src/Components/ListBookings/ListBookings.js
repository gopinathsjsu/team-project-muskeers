import React, { useEffect, useState } from "react";
import { ListGroup, Button, Row, Col } from "react-bootstrap";
import Axios from "axios";
import endPointObj from "../../endPointObj";
const ListBookings = () => {
  const [flights, setFlights] = useState([]);

  const getFlights = () => {
    var userId = localStorage.getItem("userId");
    return new Promise((resolve, reject) => {
      Axios.post(endPointObj.url + "userBookings", { userId })
        .then((response) => {
          resolve(response.data);
        })
        .catch((e) => {});
    });
  };

  const cancelBooking = (bookingId, flightId, flightDate, bookingDate, price) => {
    console.log(bookingId, flightId, userId, flightDate, bookingDate, price)
    var userId = localStorage.getItem("userId");
    Axios.post(endPointObj.url + "cancelBooking", { bookingId, flightId, userId, flightDate, bookingDate, price })
      .then((response) => {
        console.log("cancelled booking");
        getFlights();
      })
      .catch((e) => {});
  };

  useEffect(() => {
    getFlights().then((data) => {
      setFlights(data.result);
    });
  }, []);

  return (
    <div>
      <ListGroup>

        {flights.map((a) => (
          <ListGroup.Item key={a.flight_id} value={a.flight_id}>
            <Row>
              <Col xs={11}>
                bookingDate: {a.booking_date.substring(0, 10)} &nbsp;
                flightDate: {a.flight_date.substring(0, 10)}
              </Col>
              <Col xs={1}>
                {a.status == "1" && <Button variant="danger" onClick={()=>cancelBooking(a.booking_id, a.flight_id, a.flight_date, a.booking_date, a.price)}>Cancel</Button>}
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
