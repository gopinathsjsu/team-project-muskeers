import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//import { Typeahead } from "react-bootstrap-typeahead";
import Axios from "axios";
import endPointObj from "../../endPointObj";

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
  const [alert, setAlert] = useState('');
  const [flightArr, setFlightArr] = useState([]);
  const [noofpassengers,setnoofpassengers] = useState('');
  //const [destination, setRegiondes] = useState('');
  let invalidFields = {};
  //const isReturn = true;
  const handleSubmit = (source, destination, startDate) => {
    //event.preventDefault();
    // const { flights } = props;
    // invalidFields = {};
    // // const criteria = {
    // //  // origin: origin.state.text,
    // //  // destination: destination.state.text,
    // //  // departureDate: event.target.dateOfDep.value,
    // //  // numOfPassengers: event.target.numOfPassengers.value,
    // // };

    sessionStorage.setItem('noofpassengers',noofpassengers);


    // if (event.target.flightType[1].checked) {
    //   //criteria.returnDate = event.target.dateOfReturn.value;
    //   if (!isDate(event.target.dateOfReturn.value)) {
    //     invalidFields.returnDate = true;
    //   }
    // } else {
    //   console.log(event.target.dateOfDep.value);
    //   setStartDate(event.target.dateOfDep.value);
    // }
     console.log(source);
     console.log(destination);
     console.log(startDate);
     
    // if (!airports.includes(criteria.destination) || criteria.origin === criteria.destination) {
    //   invalidFields.destination = true;
    // }
    // if (!isDate(criteria.departureDate)) {
    //   invalidFields.departureDate = true;
    // }
    // if (!isDate(criteria.departureDate)) {
    //   invalidFields.departureDate = true;
    // }
    // if (Object.keys(invalidFields).length > 0) {
    //   setFormValid({ isValid: false, ...invalidFields });
    //   return;
    // }

    // setFormValid({ isValid: true });
    // props.findFlights({flights, criteria});
    
    console.log(source);
    Axios.post(endPointObj.url + "flightDetails", {
      startDate,
      source,
      destination,
      
    })
      .then((response) => {
        console.log(response.data);
        //setFlightArr(response.data);
        props.sendToParent(response.data);

       
        // const criteria = {
        //   source: response.data.source,
        //   destination: response.data.destination,
        //   startDate: event.target.dateOfDep.value,
        //   numOfPassengers: event.target.numOfPassengers.value,
        //   flight_id: response.data.flight_id,
        //  end_time: response.data.end_time,
        //   availability: response.data.availability,
        //     price: response.data.price,
        //     status: response.data.status
        //  };
        //  sessionStorage.setItem(criteria);
        //  props.sendToParent(criteria);
        
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          console.log(e.response.data.message);
          setAlert(e.response.data.message);
        }
      });
  };


  return (
    <Card>
      <Card.Body className ="cardbodyheight">
        <Form className="search-form-container">
          <Form.Group>
            <Form.Check
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
            />
          </Form.Group>

          <Form.Group controlId="formGridOrigin">
            {/* <Typeahead
            labelKey="origin"
            options={airports}
            placeholder="Enter Origin"
            ref={(ref) => origin = ref}
          /> */}
            <RegionDropdown
              country="United States"
              value={source}
              defaultOptionLabel="Enter Origin"
              onChange={(val) => setRegionorg(val)}
            />
            {status.origin && (
              <ErrorLabel message="Please enter a valid airport"></ErrorLabel>
            )}
          </Form.Group>

          <Form.Group controlId="formGridDestination">
            {/* <Typeahead
            labelKey="destination"
            options={airports}
            placeholder="Enter Destination"
            ref={(ref) => destination = ref}
          /> */}
            <RegionDropdown
              country="United States"
              value={destination}
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
            <Form.Label>Departure Date</Form.Label>
            <Form.Control
              type="date"
              name="dateOfDep"
              placeholder="yyyy-mm-dd"
              selected={startDate}
              onChange={(e) => {console.log(e.target.value);setStartDate(e.target.value)}}
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

          <Button variant="primary" onClick={()=>{handleSubmit(source, destination, startDate)}}>
            Search
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SearchForm;
