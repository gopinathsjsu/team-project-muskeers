import React from "react";
import Card from "react-bootstrap/Card";
import { Alert } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { DetailLabel } from "./detail-label.js";
import { PriceInfo } from "./price-info";
import nonStopFlightLogo from "./../../assets/nonstop.png";

import "./FlightInfo.css";

import { Route, Switch, Link } from "react-router-dom";
const FlightLogo = (props) => {
  return <img src={nonStopFlightLogo} width="32" height="32"></img>;
};

function FlightInfo(props) {
  console.log({ props });

  const handlebookingpayment = (a) => {
    console.log(a);

    sessionStorage.setItem("selectFlight", JSON.stringify(a));
  };
  const isMultiMode = props.isMultiMode;

  return (
    <div>
      {(props.dataParentToChild.result == undefined ||
        props.dataParentToChild.result.length == 0) && (
        <Alert className="no-flights" variant="secondary">
          No flights available
        </Alert>
      )}
      {props.dataParentToChild.result &&
        props.dataParentToChild.result.map((a) => (
          <Card classname="card-width">
            <section
              className={`Flight-info ${isMultiMode ? "gray-background" : ""}`}
            >
              <FlightLogo></FlightLogo>
              <DetailLabel
                mainText="FlightId"
                subText={a.flight_id}
              ></DetailLabel>
              <br />
              <br />
              <DetailLabel
                mainText={a.start_time}
                subText={a.source_city}
              ></DetailLabel>
              <DetailLabel
                mainText={a.end_time}
                subText={a.destination_city}
              ></DetailLabel>
              <DetailLabel
                mainText={a.status}
                subText={a.availability + "(Availability)"}
              ></DetailLabel>

              <PriceInfo amount={a.price} />

              <Button
                variant="contained"
                color="primary"
                to={`/bookpayment`}
                component={(props) => <Link {...props} />}
                onClick={() => {
                  handlebookingpayment(a);
                }}
              >
                Book
              </Button>
            </section>
          </Card>
        ))}
    </div>
  );
}

export default FlightInfo;
