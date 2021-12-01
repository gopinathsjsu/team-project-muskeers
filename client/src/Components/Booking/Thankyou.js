import React, { useState } from "react";
import { Col, Button, Form, Alert } from "react-bootstrap";
import Axios from "axios";
import endPointObj from "../../endPointObj";
import { useHistory } from "react-router-dom";
//import {connect} from "react-redux"

//import './bootstrap.min.css'
//import './style.css'
// import {logOnDivHover} from "../../api/user/API_Logging";
// import * as LogAPI from "../../api/user/API_Logging";
//needed
const flightNoofPassengers = sessionStorage.getItem("noofpassengers");
let parsedInfo = JSON.parse(sessionStorage.getItem("selectFlight"));

if(parsedInfo == undefined){
  parsedInfo = {}
}

const source = parsedInfo.source_city;
const destination = parsedInfo.destination_city;
const flightOperator = "Quatar";
const startTime = sessionStorage.getItem("start_time");
const end_time =  sessionStorage.getItem("end_time");
const flightDate = parsedInfo.start_date;
const day= new Date(flightDate).getUTCDate();
const month =new Date(flightDate).getUTCMonth();
const year = new Date(flightDate).getUTCFullYear();
const newDate  = year + "-" + month + "-" + day;
const price = sessionStorage.getItem("price");

//for cancel api
//bookingId
//flightId
//userId
//flightDate-- startDate
//bookingDate
//price
const bookingId = "4";
const flightId = "24";
const userId = "38";
const bookingDate = "2021-10-11";



// const parsedInfo = JSON.parse(sessionStorage.getItem("selectFlight"));
//    const [cardName,setcardname] =  useState("");
//    const [expiryDate,setexpiryDate] = useState("");
//    const [cvv,setcvv] = useState("");
//    const history = useHistory();
//   //-----------------------------const flightId = req.body.flightId;
//   //gonna pass to booking api
//   //const userId = localStorage.getItem('userId');
//   const userId = 34;
//   const useremail = localStorage.getItem('email_current');
//   const flightDate = parsedInfo.start_date;
//   const day= new Date(flightDate).getUTCDate();
//   const month =new Date(flightDate).getUTCMonth();
//   const year = new Date(flightDate).getUTCFullYear();
//   const newDate  = year + "-" + month + "-" + day;
//   const bookingDate = new Date();
//   const day1= new Date(bookingDate).getUTCDate();
//   const month1 =new Date(bookingDate).getUTCMonth();
//   const year1 = new Date(bookingDate).getUTCFullYear();
//   const newDate1  = year1 + "-" + month1 + "-" + day1;
//   const price = parsedInfo.price;
//   const flightId = parsedInfo.flight_id;
//   const paymentId = "4";

function Thankyou() {
  const [alert, setAlert] = useState("");
  const handlecancel = (e) => {
    e.preventDefault();
    const startDate = newDate;
    return new Promise((resolve, reject) => {
      //console.log(email, password);
      Axios.post(endPointObj.url + "cancelBooking", {
        bookingId,
        flightId,
        userId,
        startDate,
        bookingDate,
        price,
      })
        .then((response) => {
          resolve(response);
          setAlert(" Booking cancelled successfully");
          console.log(response);
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            console.log(e.response.data.message);
            setAlert(e.response.data.message);
          }
        });
    });
  };

  const showBooking = () => {
    return (
      <div>
        <h5>
          <strong className="color-red-3">{flightOperator}</strong>
        </h5>
        <h4>
          <b>
            {source}
            to {destination}
          </b>
        </h4>
        <h5>
          {flightOperator} -{" "}
          <span className="color-red-3">
            {" "}
            One Way - Economy - Adults : {flightNoofPassengers}
          </span>
        </h5>

        <div className="fi_block">
          <div className="flight-icon col-xs-4 col10">
            <img
              className="fi_icon"
              src="https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/444/aiga_departingflights-512.png"
              height="25"
              width="25"
              alt=""
            />
            <div className="fi_content">
              <div className="fi_title color-dark-2">
                <h5>Depart</h5>
              </div>
              <div className="fi_title color-dark-2">
                {startTime}
                <br />
                {newDate}
              </div>
            </div>
          </div>

          <div className="flight-icon col-xs-4 col10">
            <img
              className="fi_icon"
              src="https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/444/aiga_departingflights-512.png"
              height="25"
              width="25"
              alt=""
            />
            <div className="fi_content">
              <div className="fi_title color-dark-2">
                <h5>Arrive</h5>
              </div>
              <div className="fi_title color-dark-2">
                {end_time}
                <br />
              </div>
            </div>
          </div>
          <div className="flight-icon col-xs-4 col10"></div>
        </div>

        <div className="col-sm-12">
          <h4>
            <strong className="color-red-3">FARE DETAILS</strong>
          </h4>
          <br />

          <div className="col-sm-2">
            <h6>Adults</h6>
          </div>

          <div className="col-sm-2">
            <h6>Base</h6>
          </div>

          <div className="col-sm-2">
            <h6>Taxes & Fees</h6>
          </div>

          <div className="col-sm-4">
            <h6>Per Traveller</h6>
          </div>

          <div className="2">
            <h6>Total</h6>
          </div>
        </div>

        <div className="col-sm-12">
          <div className="col-sm-2">
            <h6>
              <span className="color-red-3">{flightNoofPassengers}</span>
            </h6>
          </div>

          <div className="col-sm-2">
            <h6>
              <span className="color-red-3">{price}</span>
            </h6>
          </div>

          <div className="col-sm-2">
            <h6>
              <span className="color-red-3">{(price * 0.09).toFixed(2)}</span>
            </h6>
          </div>

          <div className="col-sm-4">
            <h6>
              <span className="color-red-3">{(price * 1.09).toFixed(2)}</span>
            </h6>
          </div>

          <div className="col-sm-2">
            <h4>
              <strong>
                <span className="color-red-3">
                  {(price * flightNoofPassengers * 1.09).toFixed(2)}
                </span>
              </strong>
            </h4>
          </div>
        </div>
      </div>
    );
  };

  // componentWillMount() {
  //     let click = {
  //         pageClick: {
  //             userId: "anonymous",
  //             pageName: "SuccesfulPayment",
  //             date: new Date().getDate(),
  //             month: new Date().getMonth(),
  //             year: 1900 + new Date().getYear(),
  //             timeStamp: new Date().toLocaleTimeString()
  //         }
  //     };
  //     console.log(click);
  //     // LogAPI.logClicksPerPage(click)
  //     //     .then(res => {
  //     //         console.log(`Logged ${click} status: ${res.status}`);
  //     //     })
  //     //     .catch(err => console.log(err));
  //     console.log("In Thankyou component will mount");
  // };

  //can

  return (
    <div className="container">
      <hr />
      <div>
        <div className="container">
          <div className="row list-wrapper  bg-grey-2">
            <div className="col-md-12">
              <div className="list-content clearfix">
                <div className="list-item-entry">
                  <div className="hotel-item style-10 bg-white">
                    <div className="table-view">
                      <div className="title hotel-middle cell-view">
                        <h3>Thank you ! Your payment is successful :)</h3>

                        <br />

                        <h4>The booking details are</h4>

                        {showBooking()}
                        {/* calling cancel flight booking  */}
                        {/* <div className="col-sm-12">
                          <button
                            className="btn-block btn-success btn-group-sm"
                            type="button"
                            onClick={handlecancel}
                          >
                            CANCEL BOOKING
                          </button>

                          {alert.length > 0 && (
                            <Alert className="alert" key="0" variant="danger">
                              {alert}
                            </Alert>
                          )}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// //if you need anything from state to use here
// function mapStateToProps(state) {
//     return {
//         booking_state: state.booking_state,

//         flightId: state.flightId,
//         flightClass: state.flightClass,
//         flightTripType: state.flightTripType,
//         flightNoofPassengers: state.flightNoOfPassengers,
//         flightFromDate: state.flightFromDate,
//         flightToDate: state.flightToDate
//     };
// }

export default Thankyou;
