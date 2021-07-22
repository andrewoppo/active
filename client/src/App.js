import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Trainers from './Components/Trainers';
import TrainerBooking from './Components/TrainerBooking';
import NavBar from './Components/NavBar';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';



function NotFound() {
  return <h4>Sorry, page not found...</h4>
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route 
            exact path='/'
            component={Home}
          />
          <Route
            exact path='/trainers'
            component={Trainers}
          />
          {/* 
          <>
          <Route
            exact path='/trainers/:id'
            component={TrainerBooking}
          />
          <Route
            exact path='/about'
            component={About}
          /> 
          <Route
            exact path='/signup'
            component={Signup}
          />
          <Route
            exact path='/login'
            component={Login}
          /> 
          </> */}
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
