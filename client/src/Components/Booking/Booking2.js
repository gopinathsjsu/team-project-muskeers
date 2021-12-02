import React, { useState, useEffect } from "react";
import { Col, Form, Alert, Row } from "react-bootstrap";
import Axios from "axios";
import endPointObj from "../../endPointObj";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./booking2.css";


function Booking2(props) {
  const [alert, setAlert] = useState("");
  const [payment, setPayment] = useState("CARD")
  const handleSubmit = (userdata) => { };
  const parsedInfo = JSON.parse(sessionStorage.getItem("selectFlight"));
  const [cardName, setcardname] = useState("");
  const [expiryDate, setexpiryDate] = useState("");
  const [cvv, setcvv] = useState("");
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const useremail = localStorage.getItem("email_current");
  const flightDate = parsedInfo.start_date;
  const day = new Date(flightDate).getUTCDate();
  const month = new Date(flightDate).getUTCMonth() + 1;
  const year = new Date(flightDate).getUTCFullYear();
  const newDate = year + "-" + month + "-" + day;
  const bookingDate = new Date();
  console.log(bookingDate);
  console.log(bookingDate.toISOString().slice(0, 10))
  const day1 = new Date(bookingDate).getUTCDate();
  console.log(day1);
  const month1 = new Date(bookingDate).getUTCMonth() + 1;
  console.log(month1);
  const year1 = new Date(bookingDate).getUTCFullYear();
  const newDate1 = year1 + "-" + month1 + "-" + day1;
  console.log(newDate1);
  const price = parsedInfo.price;
  const flightId = parsedInfo.flight_id;

  const flightNoofPassengers = sessionStorage.getItem("noofpassengers");
  const source = parsedInfo.source_city;
  const destination = parsedInfo.destination_city;
  const flightOperator = "Quatar";
  const startTime = parsedInfo.start_time;
  const end_time = parsedInfo.end_time;
  //const startDate = parsedInfo.start_date;

  const redirect = () => {
    history.push({
      pathname: "/thankyou",
    });
  };



  const state = {
    operation: "flight",
    flightObject: "",
    userDetails: "",
    paymentDetails: "",
    billingAddress: "",



    baseprice: 0,
  };

  const flight_payment = {
    flightId: "",
    noOfPassengers: "",
    flightClass: "",
    tripType: "",
    fromDate: "",
    toDate: "",
    ticketPrice: "",
    totalAmount: "",
    username: "",
    hostId: "",
  };

  const base_price = 0;

  const visit_flag = false;

  const travelers = [];

  const traveler_details = [];

  const billing_address = {
    username: "",
    street1: "",
    street2: "",
    postalcode: "",
    city: "",
    state: "",
    country: "",
  };

  const payment_details = {
    username: "",
    nameoncard: "",
    creditCardnumber: "",
    validThrough: "",
    cvv: "",
  };

  const validate_creditcardnumber = (inputNum) => {
    var digit, digits, flag, sum, _i, _len;
    flag = true;
    sum = 0;
    digits = (inputNum + "").split("").reverse();
    for (_i = 0, _len = digits.length; _i < _len; _i++) {
      digit = digits[_i];
      digit = parseInt(digit, 10);
      if ((flag = !flag)) {
        digit *= 2;
      }
      if (digit > 9) {
        digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  const add_travelers = () => {
    for (let i = 0; i < flightNoofPassengers; i++) {
      console.log("I --- " + i);

      // if (this.visit_flag === true) {

      traveler_details.push({
        first_name: "",
        last_name: "",
        email: "",
        phonenumber: "",
      });

      travelers.push(
        <div>
          <div className="col-sm-12">
            <hr />

            <h5>
              <strong className="color-red-3">Traveler</strong>
              <small>(primary contact must be an adult)</small>
            </h5>
            <br />

            <div className="col-sm-6">
              <h6>First Name</h6>
              <input
                type="text"
                className="form-control input-sm"
                id=""
                onChange={(event) => {
                  this.traveler_details[i].first_name = event.target.value;
                }}
              />
            </div>
            <div className="col-sm-6">
              <h6>Lastname</h6>
              <input
                type="text"
                className="form-control input-sm"
                id=""
                onChange={(event) => {
                  this.traveler_details[i].last_name = event.target.value;
                }}
              />
            </div>
          </div>

          <div className="col-sm-12">
            <div className="col-sm-6">
              <h6>Email Address</h6>
              <input
                type="text"
                className="form-control input-sm"
                id=""
                onChange={(event) => {
                  this.traveler_details[i].email = event.target.value;
                }}
              />
            </div>
            <div className="col-sm-6">
              <h6>Phone Number</h6>
              <input
                type="text"
                className="form-control input-sm"
                id=""
                onChange={(event) => {
                  this.traveler_details[i].phonenumber = event.target.value;
                }}
              />
            </div>
          </div>
        </div>
      );
      // }
    }

    return <div>{travelers}</div>;
  };



  const handleAddPayment = (flag) => {

    if (flag === "card") {
      var payingFromPoints = "0"
      return new Promise((resolve, reject) => {
        Axios.post(endPointObj.url + "addPayment", {
          userId,
          cardName,
          cvv,
          expiryDate,
          payingFromPoints,
          price
        })
          .then((response) => {
            console.log(response);
            setAlert("Payment added successfully");
            sessionStorage.setItem("paymentId", response.data.paymentId)
          })
          .catch((e) => {
            if (e.response && e.response.data) {
              console.log(e.response.data.message);
              setAlert(e.response.data.message);
            }
          });
      });
    } else {
      var payingFromPoints = "1"
      return new Promise((resolve, reject) => {

        Axios.post(endPointObj.url + "addPayment", {
          userId,
          cardName,
          cvv,
          expiryDate,
          payingFromPoints,
          price
        })
          .then((response) => {
            //console.log(response);
            setAlert(response.data.message);
            sessionStorage.setItem("paymentId", response.data.paymentId)
          })
          .catch((e) => {
            if (e.response && e.response.data) {
              console.log(e.response.data.message);
              setAlert(e.response.data.message);
            }
          });
      });
    }
  };
  const handleFlightBooking = (userdata) => {
    console.log("In handleFlightBooking");

    // console.log(userdata);

    // console.log("State");
    // console.log(this.state);

    //let ccpattern = /^4\d{12}$|^4\d{15}$|^5[1-5]\d{14}$/;

    let ccPattern = /^(?=.{16}$)(?=.*[0-9])/;
    //let ccEntry = parseInt(this.payment_details.creditCardnumber);

    let emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let mobilePattern = /^[1-9]\d{9}$/;

    let emailFlag = false;
    let mobileFlag = false;

    for (let i = 0; i < flightNoofPassengers; i++) {
      //   if (emailPattern.test(this.traveler_details[i].email)) {
      //     emailFlag = true;
      //   } else {
      //     emailFlag = false;
      //     break;
      //   }
    }

    for (let i = 0; i < flightNoofPassengers; i++) {
      //   if (mobilePattern.test(this.traveler_details[i].phonenumber)) {
      //     mobileFlag = true;
      //   } else {
      //     mobileFlag = false;
      //     break;
      //   }
    }

    console.log("Email Flag : " + emailFlag);
    console.log("Mobile Flag : " + mobileFlag);

    let postalPattern = /^[1-9]\d{4}$/;
    //let postalEntry = parseInt(this.billing_address.postalcode);

    let statePattern =
      /^(AL|Alabama|alabama|AK|Alaska|alaska|AZ|Arizona|arizona|AR|Arkansas|arkansas|CA|California|california|CO|Colorado|colorado|CT|Connecticut|connecticut|DE|Delaware|delaware|FL|Florida|florida|GA|Georgia|georgia|HI|Hawaii|hawaii|ID|Idaho|idaho|IL|Illinois|illinois|IN|Indiana|indiana|IA|Iowa|iowa|KS|Kansas|kansas|KY|Kentucky|kentucky|LA|Louisiana|louisiana|ME|Maine|maine|MD|Maryland|maryland|MA|Massachusetts|massachusetts|MI|Michigan|michigan|MN|Minnesota|minnesota|MS|Mississippi|mississippi|MO|Missouri|missouri|MT|Montana|montana|NE|Nebraska|nebraska|NV|Nevada|nevada|NH|New Hampshire|new hampshire|NJ|New Jersey|new jersey|NM|New Mexico|new mexico|NY|New York|new york|NC|North Carolina|new carolina|ND|North Dakota|north dakota|OH|Ohio|ohio|OK|Oklahoma|oklahoma|OR|Oregon|oregon|PA|Pennsylvania|pennsylvania|RI|Rhode Island|rhode island|SC|South Carolina|south carolina|SD|South Dakota|south dakota|TN|Tennessee|tennessee|TX|Texas|texas|UT|Utah|utah|VT|Vermont|vermont|VA|Virginia|virginia|WA|Washington|washington|WV|West Virginia|west virginia|WI|Wisconsin|wisconsin|WY|Wyoming|wyoming)$/;
    //let stateEntry = this.billing_address.state;

    // if (statePattern.test(stateEntry)) {
    //   if (postalPattern.test(postalEntry)) {
    //     if (mobileFlag) {
    //       if (emailFlag) {
    //         if (ccPattern.test(ccEntry)) {
    //           if (this.validate_creditcardnumber(ccEntry)) {
    // bookFlight(userdata)
    //     .then((res) => {
    //         console.log(res.status);
    //         console.log(userdata.username);
    //         if (res.status === 200) {
    //             console.log("success");
    //             let payload = {
    //                 bookingType: "flight",
    //                 userdata: userdata,
    //                 traveler_details: this.traveler_details,
    //                 billing_address: this.billing_address,
    //                 payment_details: this.payment_details
    //             };
    //             //independent API to insert traveler details, billing address, and payment details
    //             insertTravelerDetails(payload)
    //                 .then((res) => {
    //                     if (res.status === 200) {
    //                         console.log("success");
    //                         this.props.bookingSuccess(this.state, "booking_success");
    //                         this.props.history.push("/payment/thankyou");
    //                     }
    //                     else {
    //                         console.log("validation");
    //                     }
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                 });
    //         }
    //         else {
    //             console.log("validation");
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    return new Promise((resolve, reject) => {
      var flightDate = newDate;
      var bookingDate = newDate1;
      var paymentId = sessionStorage.getItem("paymentId")
      Axios.post(endPointObj.url + "bookFlight", {
        flightId,
        userId,
        flightDate,
        bookingDate,
        price,
        paymentId,
      })
        .then((response) => {
          console.log(response);
          setAlert("Booking made successfully");
          redirect();
        })
        .catch((e) => {
          if (e.response && e.response.data) {
            console.log(e.response.data.message);
            setAlert(e.response.data.message);
          }
        });
    });
    //           } else {
    //             //  showAlert("Enter a valid CC number", "error", this);
    //           }
    //         } else {
    //           //showAlert("Verify the length of the CC number", "error", this);
    //         }
    //       } else {
    //         //showAlert("Enter a valid email address", "error", this);
    //       }
    //     } else {
    //       // showAlert("Enter a valid phonenumber", "error", this);
    //     }
    //   } else {
    //     //  showAlert("Enter a valid postal code", "error", this);
    //   }
    // } else {
    //   // showAlert("Enter a valid state/region", "error", this);
    // }
  };

  return (
    <div className="container">
      <hr />

      <div>
        <div className="container">
          <div className="row list-wrapper  bg-grey-2">
            <div className="col-md-8">
              <div className="list-content clearfix">
                <div className="list-item-entry">
                  <div className="hotel-item style-10 bg-white">
                    <div className="table-view">
                      <div className="title hotel-middle cell-view">
                        <h5 className="color-grey-3">You are flying</h5>
                        <h5>
                          <strong className="color-red-3">Quatar</strong>
                        </h5>
                        <h4>
                          <b>
                            {source}&nbsp; to&nbsp;{destination}
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
                          <Row>
                          <Col>
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
                          </Col>
                          <Col>
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
                          </Col>
                          </Row>
                        </div>
                       
                        
                        <br />
                        <br />

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="list-content clearfix">
                <div className="list-item-entry">
                  <div className="bg-grey-2">
                    <div className="table-view">
                      <div className="title hotel-middle cell-view">
                      <h4>
                            <strong className="color-red-3">
                              FARE DETAILS
                            </strong>
                          </h4>
                          <Row>
                          <Col>
                        <div className="col-sm-12">
                         
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
                        </Col>
                        <br/>
                        <br/>
                        <Col>
                        <br/>
                        <div className="col-sm-12">
                          <div className="col-sm-2">
                            <h6>
                              <span className="color-red-3">
                                {flightNoofPassengers}
                              </span>
                            </h6>
                          </div>

                          <div className="col-sm-2">
                            <h6>
                              <span className="color-red-3">{price}</span>
                            </h6>
                          </div>
                          <br/>
                          <div className="col-sm-2">
                            <h6>
                              <span className="color-red-3">
                                {(price * 0.09).toFixed(2)}
                              </span>
                            </h6>
                          </div>
                         <br/>
                          <div className="col-sm-4">
                            <h6>
                              <span className="color-red-3">
                                {(price * 1.09).toFixed(2)}
                              </span>
                            </h6>
                          </div>

                          <div className="col-sm-2">
                            <h6>
                              <span className="color-red-3">
                                {(price * flightNoofPassengers * 1.09).toFixed(
                                  2
                                )}
                              </span>
                            </h6>
                          </div>
                        </div>
                        </Col>
                        </Row>
                        <div className="col-sm-12">

                          {payment == 'CARD' && <div>
                            <h5>
                              <strong className="color-red-3">
                                Card Details
                              </strong>
                            </h5>
                            <br />
                            <div className="col-sm-6">
                              <h6>Name on Card</h6>
                              <input
                                type="text"
                                name=""
                                className="form-control input-sm"
                                id=""
                                onChange={(e) => setcardname(e.target.value)}
                              />
                            </div>
                          </div>}
                          {payment == 'CARD' &&
                            <div className="col-sm-6">
                              <h6>Card Number</h6>
                              <input
                                type="text"
                                name=""
                                className="form-control input-sm"
                                id=""
                              />
                            </div>}
                        </div>
                        {payment == 'CARD' && <div className="col-sm-12">
                          <div className="col-sm-6">
                            <h6>Valid Through</h6>
                            <input
                              type="date"
                              name=""
                              className="form-control input-sm"
                              id="validThrough"
                              onChange={(e) => setexpiryDate(e.target.value)}
                            />
                          </div>
                          <div className="col-sm-2">
                            <h6>CVV</h6>
                            <input
                              type=""
                              name=""
                              className="form-control input-sm"
                              id=""
                              onChange={(e) => setcvv(e.target.value)}
                            />
                          </div>
                          <div className="col-sm-4">
                            <button
                              className="book add-payment"
                              type="button"
                              onClick={() => handleAddPayment("card")}
                            >
                              ADD PAYMENT
                            </button>

                            {alert.length > 0 && (
                              <Alert
                                className="alert-payment"
                                key="0"
                                variant="primary"
                              >
                                {alert}
                              </Alert>
                            )}
                          </div>
                        </div>}

                        {payment != 'CARD' && <div><div className="col-sm-12"> <button
                          className="book add-payment"
                          type="button"
                          onClick={() => handleAddPayment("miles")}
                        >PAY VIA MILES</button></div>

                        {alert.length > 0 && (
                          <Alert
                            className="alert-payment"
                            key="0"
                            variant="primary"
                          >
                            {alert}
                          </Alert>
                        )}</div>}

                        <br />
                        <br />
                        <div className="col-sm-12">
                          <div className="col-sm-6">
                            <Button
                              className="book"
                              type="button"
                              onClick={handleFlightBooking}
                            >
                              BOOK
                            </Button>
                          </div>

                          {/* <AlertContainer ref={a => this.msg = a} {...alertOptions}/> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="list-content clearfix">
                <div className="list-item-entry">
                  <div className="hotel-item style-10 bg-white">
                    <div className="table-view">
                      <div className="title hotel-middle cell-view">
                    

                        <br />
                        <br />
                        <h4>Costing</h4>
                        <hr />
                        <div className="col-md-12">
                          <div className="col-md-6">
                            <h6>
                              {flightNoofPassengers}&nbsp;
                              Adult/s, Economy
                            </h6>
                           
                            <hr />
                            <h5>
                              <strong>TOTAL</strong>
                            </h5>
                          </div>

                          <div className="col-md-6">
                            <h6>{(price * flightNoofPassengers).toFixed(2)}</h6>
                            <h6>
                              {(price * flightNoofPassengers * 0.09).toFixed(2)}
                            </h6>
                            <hr />
                            <h2>
                              <strong>
                                {(price * flightNoofPassengers * 1.09).toFixed(
                                  2
                                )}
                              </strong>
                            </h2>
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
      </div>
    </div>
  );
}

//if you need anything from state to use here

export default Booking2;
