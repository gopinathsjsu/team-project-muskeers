import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Alert } from "react-bootstrap";
import "./MyAccount.css";
import endPointObj from "../../endPointObj";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import mainLogo from "../resources/flight2.png";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

//<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" media="screen" />

//import { useDispatch, useSelector } from "react-redux";

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

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     flexGrow: 1,
  //   },
  // }));

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
      var email = localStorage.getItem('email_current');
      console.log(email);
      Axios.post(
        endPointObj.url + "getProfile",
        {
           email,
        }
      ).then((response) => {
        resolve(response);
      });
    });
  };
  // const updateAccountDetails = (email, name, gender, address, phone, file) => {
  //   return new Promise((resolve, reject) => {
  //     Axios.post(
  //       endPointObj.url + "api/updateProfile",
  //       {
  //         email,
  //         name,
  //         gender,
  //         address,
  //         phone,
  //         file,
  //       },
  //       {
  //         headers: {
  //           Authorization: "jwt " + sessionStorage.getItem("token"),
  //         },
  //       }
  //     ).then((response) => {
  //       getAccountDetails().then((result) => {
  //         setEmail(result.data.email);
  //         setURL(result.data[0].profile_picture);
  //         setName(result.data[0].name);
  //         setAddress(result.data[0].address);
  //         setGender(result.data[0].gender);
  //         setPhone(result.data[0].phone);
  //       });

  //       if (file) {
  //         //   fileUpload(file);
  //       }

  //       resolve(response);
  //     });
  //   });
  // };

  // function fileChangehandler(event) {
  //   console.log(event.target.files[0]);
  //   setFile(event.target.files[0]);
  //   setURL(URL.createObjectURL(event.target.files[0]));
  // }

  // function fileUpload(file) {
  //   const data = new FormData();
  //   data.append("name", "file_name.jpg");
  //   console.log(file);
  //   data.append("file", file);
  //   console.log(data.file);

  // //   //Axios.post(endPointObj.url + "api/uploadImage/" + email, data)
  // //     .then((res) => {})
  // //     .catch((err) => {
  // //       getAccountDetails().then((result) => {
  // //         setEmail(result.data.email);
  // //         setURL(result.data[0].profile_picture);

  // //         setName(result.data[0].name);
  // //         setAddress(result.data[0].address);
  // //         setGender(result.data[0].gender);
  // //         setPhone(result.data[0].description);
  // //       });

  // //       console.log(err);
  // //     });
  // // }
  useEffect(() => {
    getAccountDetails().then((result) => {
      //setEmail(result.data.user_email);
      // if (result.data[0].profile_picture) {
      //   setURL(result.data[0].profile_picture);
      // }
      console.log(result);
      setName(result.data.name);
      setAddress(result.data.address);
      setflyingcredit(result.data.flyingCredits);
      setPhone(result.data.phone);
    });

    // };
  }, []);

  // const updateProfile = (email, name, gender, address, phone, file) => {
  //   updateAccountDetails(email, name, gender, address, phone, file);
  // };

  // const registerUser = (e) => {
  //     let role = "admin"
  //     console.log(name, email, password);

  //     const redirect = () => {
  //         history.push({
  //             pathname: '/adminDash',
  //         });
  //     };

  //     e.preventDefault();
  //     return new Promise((resolve, reject) => {
  //         console.log(name, email, password);
  //         Axios.post(endPointObj.url + 'signup', { name, email, password, role }).then((response) => {
  //             resolve(response);

  //             if(role === 'admin'){
  //                 redirect();
  //             }

  //         }).catch((e) => {
  //             if (e.response && e.response.data) {
  //                 console.log(e.response.data.message);
  //                 setAlert(e.response.data.message);
  //             }

  //         })
  //     })
  // }

  return (
    <div className="myaccount-bg">
      <div className={classes.root}>
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
                    {/* <Grid item xs={6}>
                              <form
                                className={formStyles.root}
                                noValidate
                                autoComplete="off"
                              >
                                <TextField
                                  id="standard-basic"
                                  label="topics"
                                  onChange={(e) => changeTopicsHandler(e)}
                                />
                              </form>
                            </Grid> */}

                    <Grid item xs={6}></Grid>
                    <Grid item xs={6} className="upload-button">
                      {/* <Button
                        variant="primary"
                        color="primary"
                        onClick={() => {
                          updateProfile(
                            //             email,
                            name,
                            gender,
                            address,
                            phone,
                            file
                          );
                        }}
                      >
                        Update Profile
                      </Button> */}
                    </Grid>
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
                  {/* <div className="profile-edit-button">
                    <label for="file">
                      <i class="fas fa-pen-square fa-lg" />
                    </label>
                    <input
                      //className="hide-button"
                      type="file"
                      id="file"
                      accept=".jpg"
                      onChange={(e) => fileChangehandler(e)}
                    />
                  </div> */}
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
