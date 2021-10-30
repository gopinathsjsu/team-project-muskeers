import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';



const LoginContainer = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Container >
    <Route component={Login} />
  </Container>
);


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={LoginContainer} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
