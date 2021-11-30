import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from '@material-ui/core/Button'
import { DetailLabel } from './detail-label.js';
import { PriceInfo } from './price-info';
import nonStopFlightLogo from './../../assets/nonstop.png';
import { getTimeDifferece } from './../../lib/utils';
import './FlightInfo.css';
import { useHistory } from 'react-router-dom';
import Booking2 from './../Booking/Booking2.js';
import { Route, Switch,Link } from 'react-router-dom';
const FlightLogo = (props) => {
  return <img src={nonStopFlightLogo} width="32" height="32"></img>
}


function  FlightInfo (props){
console.log({props});
 //const {source,destination,startDate, numOfPassengers,flight_id,end_time,availability,price,status,start_time  } = props.dataParentToChild;


//console.log(destination);
// const source = "Dallas";
// const bookingdata = {
//   source: source
// }


const handlebookingpayment = (a) => {
  console.log(a)

  sessionStorage.setItem("selectFlight",JSON.stringify(a));

}
  const isMultiMode = props.isMultiMode;
  //const timeDiff = new Date(`${date} ${arrivalTime}`) - new Date(`${date} ${departureTime}`);



  const handlebooking = (e) => {
   
 

    window.location.href = '/bookpayment';

    e.preventDefault();
    // return new Promise((resolve, reject) => {
    //     console.log(email, password);
    //     Axios.post(endPointObj.url + 'login', { email, password }).then((response) => {
    //         resolve(response);

    //         if (role === 'admin') {
    //             redirect();
    //         }
    //         else {
    //             console.log(role);
    //             console.log(response);
    //             localStorage.setItem('userId', response.data.user_id);
    //         }


    //     }).catch((e) => {
    //         if (e.response && e.response.data) {
    //             console.log(e.response.data.message);
    //             setAlert(e.response.data.message);
    //         }

    //     })
    // })
}
  
  return (
  <div>
 {props.dataParentToChild.result && props.dataParentToChild.result.map((a) =>(
    <Card classname = "card-width"> 
      <section className={`Flight-info ${isMultiMode ? 'gray-background' : ''}`}>
        <FlightLogo></FlightLogo>
        <DetailLabel mainText={a.source_city} subText={a.flight_id} ></DetailLabel>
        <br/>
        <br/>
        <DetailLabel mainText={a.start_time} subText={a.source_city} ></DetailLabel>
        <DetailLabel mainText={a.end_time} subText={a.destination_city} ></DetailLabel>
        <DetailLabel mainText={a.status} subText={a.availability} ></DetailLabel>
        {/* <DetailLabel mainText={getTimeDifferece(timeDiff)} subText={isMultiMode ? '' : 'Non stop'} ></DetailLabel> */}
        <PriceInfo amount={a.price}/>
       {/* <Button variant="outline-danger" onClick={handlebooking}>Book</Button>  */}
       {/* <Link to={`/bookpayment:${bookingdata.toString()}`}> <span>Book</span></Link> */}
               

       {/* <Button type="submit" component={Booking2} to={{
        pathname: '/bookpayment',
        state: {bookingdata} }}
        variant="outline-danger"
        size="small">Book</Button> */}
        {/* <Button
    type="submit"
    variant="contained"
    color="primary"
    component={Link}
    to="/bookpayment"
  >
    Book
  </Button> */}

<Button
variant="contained"
  color="primary"
  to={`/bookpayment`}
  component={props=> <Link {...props}/>}
  onClick= {()=>{handlebookingpayment(a)}}
>Book</Button>
      {/* <Link to="/login"><FlatButton onTouchTap={this.clickHandler}>{l.l('no', 'Sign in')}</FlatButton></Link> */}

       {/* <Route path={`/bookpayment:${bookingdata}`} component={Booking2}/>  */}
      </section>
    </Card>
  ))}
</div>
  )
}


export default FlightInfo;