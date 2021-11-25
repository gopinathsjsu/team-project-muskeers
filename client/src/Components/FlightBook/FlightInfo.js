import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { DetailLabel } from './detail-label.js';
import { PriceInfo } from './price-info';
import nonStopFlightLogo from './../../assets/nonstop.png';
import { getTimeDifferece } from './../../lib/utils';
import './FlightInfo.css';


const FlightLogo = (props) => {
  return <img src={nonStopFlightLogo} width="32" height="32"></img>
}


export const  FlightInfo = (props) => {
console.log({props});

// const { name, flightNo, departureTime, origin, arrivalTime, destination, price, date  } = props.data;
 const {source,destination,startDate, numOfPassengers,flight_id,end_time,availability,price,status  } = props.dataParentToChild;
console.log(source);
console.log(destination);

  const isMultiMode = props.isMultiMode;
  //const timeDiff = new Date(`${date} ${arrivalTime}`) - new Date(`${date} ${departureTime}`);
  
  return (
    <Card>
      <section className={`Flight-info ${isMultiMode ? 'gray-background' : ''}`}>
        <FlightLogo></FlightLogo>
        <DetailLabel mainText={source} subText={flight_id} ></DetailLabel>
        <br/>
        <br/>
        <DetailLabel mainText={end_time} subText={source} ></DetailLabel>
        <DetailLabel mainText={end_time} subText={destination} ></DetailLabel>
        <DetailLabel mainText={status} subText={availability} ></DetailLabel>
        {/* <DetailLabel mainText={getTimeDifferece(timeDiff)} subText={isMultiMode ? '' : 'Non stop'} ></DetailLabel> */}
        <PriceInfo amount={price}/>
       <Button variant="outline-danger">Book</Button> 
      </section>
    </Card>
  )
}

export default FlightInfo;