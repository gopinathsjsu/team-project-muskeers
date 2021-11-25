import React from 'react';
import './flight-search-info.css';

export const FlightSearchInfo = (props) => {
  const { source, destination, startDate } = props.dataToChild;
  console.log(props);
  return (
    <section className="flight-search-info">
      <h3>{`${source} to ${destination}`}</h3>
      <p>{props.count} flights found, {startDate}</p>
    </section>
  )
}


export default FlightSearchInfo;