//import React, { useEffect } from 'react';
import React, { useState } from "react";
import './FlightBook.css';
//import { connect } from 'react-redux';
import SearchForm from './SearchForm.js';
import FlightInfo from './FlightInfo.js';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
//import Footer from './Footer';
function FlightBook(props) {
  
  // const [source, setRegionorg] = useState("");
  // const [destination, setRegiondes] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [startDate, setStartDate] = useState("");
  const [criteria, setCriteria] = useState("");

  
  const handleCallback = (childData) =>{
    setCriteria(childData);
}


console.log("In parent");
  console.log(criteria.source);
  console.log(criteria.destination);
  console.log(criteria.startDate);


//   useEffect(() => {
//     props.getFlights()
//   }, [(props.flights || []).legnth]);

  //const { origin, destination, departureDate, returnDate } = props.filters || {};
  return (
    <div className="App">
      <header className="App-header">
        <h2>Airline Booking</h2>
      </header>
      <section className="Main-container">
        <aside className="Search-section">
          <SearchForm sendToParent={handleCallback}></SearchForm>
        </aside>
        <section className="Results-section">
        <FlightInfo dataParentToChild = {criteria}/>             
        </section>
      </section>
      <section>
        {/* <Footer/> */}
      </section>








            
    </div>
  );
}




export default FlightBook;

