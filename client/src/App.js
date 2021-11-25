import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Components/NavBar/NavBar';
import NavBarLoggedIn from './Components/NavBarLoggedIn/NavBarLoggedIn';
import Register from './Components/Register/Register';
import AdminDashboard from './Components/AdminDashboard/AdminDash'
import AdminList from './Components/AdminList/AdminList'



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

const AdminListContainer = () => (
  <div >
    <NavBarLoggedIn />
    <Route component={AdminList} />
  </div>
);






function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register" component={RegisterConatiner} />
          <Route path="/adminDash" component={AdminDashboardContainer} />
          <Route path="/adminList" component={AdminListContainer} />
          <Route path="/" component={LoginContainer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
