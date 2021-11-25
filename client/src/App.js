import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Components/NavBar/NavBar';
import NavBarLoggedIn from './Components/NavBarLoggedIn/NavBarLoggedIn';
import Register from './Components/Register/Register';
import AdminDashboard from './Components/AdminDashboard/AdminDash';
import FlightBook from './Components/FlightBook/FlightBook';
import UserProfile from './Components/UserProfile/UserProfile';


const LoginContainer = () => (
  <div >
    <Navigation />
    <Route component={Login} />
  </div>
);

const RegisterConatiner = () => (
  <div >
    <Navigation />
    <Route component={Register} />
  </div>
);


const AdminDashboardContainer = () => (
  <div >
    <NavBarLoggedIn />
    <Route component={AdminDashboard} />
  </div>
);


const FlightBookContainer = () => (
  <div >
    <NavBarLoggedIn />
    <Route component={FlightBook} />
  </div>
);

const UserProfileContainer = () => (
  <div >
    <NavBarLoggedIn />
    <Route component={UserProfile} />
  </div>
);



function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/UserProfile" component={UserProfileContainer} />
          <Route path="/FlightBook" component={FlightBookContainer} />

          <Route path="/register" component={RegisterConatiner} />
          <Route path="/adminDash" component={AdminDashboardContainer} />
          <Route path="/" component={LoginContainer} />
         
        </Switch>
      </div>
    </Router>
  );
}

export default App;
