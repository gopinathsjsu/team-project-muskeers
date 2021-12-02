import React, { useState } from "react";
import "./FlightBook.css";
import SearchForm from "./SearchForm.js";
import FlightInfo from "./FlightInfo.js";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

function FlightBook(props) {
  const [criteria, setCriteria] = useState([]);

  const handleCallback = (childData) => {
    setCriteria(childData);
  };

  console.log("In parent");
  console.log(criteria);
  console.log(criteria.source);
  console.log(criteria.destination);
  console.log(criteria.startDate);

  return (
    <div className="App">
      <section className="Main-container">
        <aside className="Search-section">
          <SearchForm sendToParent={handleCallback}></SearchForm>
        </aside>
        <section className="Results-section">
          <FlightInfo dataParentToChild={criteria} />
        </section>
      </section>
      <section></section>
    </div>
  );
}

export default FlightBook;
