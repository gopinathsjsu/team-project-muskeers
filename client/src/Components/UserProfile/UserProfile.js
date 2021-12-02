import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Alert } from "react-bootstrap";
import "./MyAccount.css";
import endPointObj from "../../endPointObj";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import mainLogo from "../resources/flight2.png";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

function UserProfile(props) {
  const useStyles = makeStyles({
    root: {
      minWidth: 30,
    },
    bullet: {
      display: "inline-block",

      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
      backgroundColor: "#0079D3",
      height: "6vh",
      color: "white",
      textAlign: "center",
      paddingTop: "7px",
    },
    pos: {
      marginBottom: 12,
    },
  });

  const useStylesDropDown = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const useStylesForm = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "32vw",
      },
    },
  }));

  const useStylesProfile = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
  }));
  //const email = useSelector((state) => state.login.username);
  const [name, setName] = useState("");
  const [flyingcredit, setflyingcredit] = useState("");
  //const [email, setEmail] = useState("");
  const classes = useStyles();
  const profileClasses = useStylesProfile();
  const formStyles = useStylesForm();
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [url, setURL] = React.useState(mainLogo);

  const [alert, setAlert] = useState("");

  const history = useHistory();

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const addressChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  const changePhoneHandler = (e) => {
    setAddress(e.target.value);
  };

  const getAccountDetails = () => {
    return new Promise((resolve, reject) => {
      var email = localStorage.getItem("email_current");
      console.log(email);
      Axios.post(endPointObj.url + "getProfile", {
        email,
      }).then((response) => {
        resolve(response);
      });
    });
  };

  useEffect(() => {
    getAccountDetails().then((result) => {
      console.log(result);
      setName(result.data.name);
      setAddress(result.data.address);
      setflyingcredit(result.data.flyingCredits);
      setPhone(result.data.phone);
    });
  }, []);

  return (
    <div className="myaccount-bg">
      <div >
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div className="myaccount-parent">
              <div className="myaccount-blue"></div>
              <div className="myaccount-white">
                <div className="myaccount-form-div">
                  <Grid container spacing={0}>
                    <Grid item xs={6}>
                      <form
                        className={formStyles.root}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="standard-basic"
                          label="Name"
                          value={name}
                          onChange={(e) => changeNameHandler(e.target.value)}
                        />
                      </form>
                    </Grid>
                    <Grid item xs={6}>
                      <form
                        className={formStyles.root}
                        noValidate
                        autoComplete="off"
                        onChange={(e) => {
                          addressChangeHandler(e);
                        }}
                      >
                        <TextField
                          value={address}
                          id="standard-basic"
                          label="Address"
                        />
                      </form>
                    </Grid>
                    <Grid item xs={6}>
                      <form
                        className={formStyles.root}
                        noValidate
                        autoComplete="off"
                      ></form>
                    </Grid>
                    <Grid item xs={6}>
                      <form
                        className={formStyles.root}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          value={phone}
                          id="standard-basic"
                          label="Phone"
                          onChange={(e) => changePhoneHandler(e)}
                        />
                      </form>
                    </Grid>

                    <Grid item xs={6}></Grid>
                    <Grid item xs={6} className="upload-button"></Grid>
                  </Grid>
                </div>
              </div>
              <div className="profile-image">
                <Avatar
                  variant="square"
                  alt="Remy Sharp"
                  className={profileClasses.large}
                  src={url}
                />
              </div>
              <div className="profile-image2">
                <Card className={classes.root}>
                  <CardContent className="about-comm-card">
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Flying credits:
                    </Typography>
                    <div className="row">
                      <div className="col-sm-12 description">
                        <b>Flying:{flyingcredit}</b>
                        <i></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default UserProfile;
