import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//import { Typeahead } from "react-bootstrap-typeahead";
import Axios from "axios";
import endPointObj from "../../endPointObj";
import "./search-form.css";

// import { connect } from 'react-redux';
// import './search-form.css';
// import 'react-bootstrap-typeahead/css/Typeahead.css';
// import { findFlights } from './../../actions';
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

const isDate = (date) => {
  return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
};

const ErrorLabel = (props) => {
  return <label style={{ color: "red" }}>{props.message}</label>;
};

export const SearchForm = (props) => {
  //let origin, destination;
  const [isReturn, setFlightType] = useState(false);
  const [status, setFormValid] = useState({ isValid: false });
  const [country, setCountry] = useState("");
  const [source, setRegionorg] = useState("");
  const [destination, setRegiondes] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [alert, setAlert] = useState("");
  const [flightArr, setFlightArr] = useState([]);
  const [noofpassengers, setnoofpassengers] = useState("");

  let invalidFields = {};

  const handleSubmit = (source, destination, startDate) => {
    sessionStorage.setItem("noofpassengers", noofpassengers);

    console.log(source);
    console.log(destination);
    console.log(startDate);

    console.log(source);
    Axios.post(endPointObj.url + "flightDetails", {
      startDate,
      source,
      destination,
    })
      .then((response) => {
        console.log(response.data);
        props.sendToParent(response.data);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          console.log(e.response.data.message);
          setAlert(e.response.data.message);
        }
      });
  };

  return (
    <Card className="cardbodyheight">
      <Card.Body>
        <Form className="search-form-container">
          <Form.Group>
            {/*<Form.Check
              inline
              checked={!isReturn}
              type="radio"
              label="One way"
              name="flightType"
              id="formHorizontalRadios1"
              onChange={(e) => setFlightType(false)}
            />
            <Form.Check
              inline
              checked={isReturn}
              type="radio"
              label="Return"
              name="flightType"
              id="formHorizontalRadios2"
              onChange={(e) => setFlightType(true)}
            />*/}
          </Form.Group>

          <Form.Group controlId="formGridOrigin">
            <RegionDropdown
              country="United States"
              value={source}
              defaultOptionLabel="Enter Origin"
              onChange={(val) => setRegionorg(val)}
              className="src-region"
            />
            {status.origin && (
              <ErrorLabel message="Please enter a valid airport"></ErrorLabel>
            )}
          </Form.Group>

          <Form.Group controlId="formGridDestination">
            <RegionDropdown
              country="United States"
              value={destination}
              className="dest-region"
              defaultOptionLabel="Enter Destination"
              onChange={(val) => setRegiondes(val)}
            />
            {status.origin && (
              <ErrorLabel message="Please enter a valid airport"></ErrorLabel>
            )}
            {status.destination && (
              <ErrorLabel message="Please enter a valid airport but not same as origin"></ErrorLabel>
            )}
          </Form.Group>

          <Form.Group controlId="formGridDateOfDep">
            <Form.Label className="margin-fields">Departure Date</Form.Label>
            <Form.Control
              type="date"
              name="dateOfDep"
              placeholder="yyyy-mm-dd"
              selected={startDate}
              onChange={(e) => {
                console.log(e.target.value);
                setStartDate(e.target.value);
              }}
              required
            />
            {status.departureDate && (
              <ErrorLabel message="Please enter a valid departure date"></ErrorLabel>
            )}
          </Form.Group>

          {isReturn && (
            <Form.Group controlId="formGridDateOfReturn">
              <Form.Label>Return Date</Form.Label>
              <Form.Control
                type="date"
                name="dateOfReturn"
                placeholder="yyyy-mm-dd"
                className="margin-fields"
                required
              />
              {status.returnDate && (
                <ErrorLabel message="Please enter a valid return date"></ErrorLabel>
              )}
            </Form.Group>
          )}

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control
              as="select"
              name="numOfPassengers"
              placeholder="Number of Passengers"
              className="margin-fields"
              onChange={(e) => setnoofpassengers(e.target.value)}
            >
              <option>Number of Passengers</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant="primary"
            className="margin-fields"
            onClick={() => {
              handleSubmit(source, destination, startDate);
            }}
          >
            Search
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SearchForm;
