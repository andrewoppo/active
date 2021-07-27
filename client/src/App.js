import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Trainers from './Components/Trainers';
import TrainerBooking from './Components/TrainerBooking';
import NavBar from './Components/NavBar';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import AddTrainer from './Components/AddTrainer';
import 'bootstrap/dist/css/bootstrap.min.css';




class App extends React.Component {

  state = {
    user: this.props.user
  }
  notFound() {
    return <h4>Sorry, page not found...</h4>
  }

  setUser = user => {
    this.setState({
      user: user
    })
  }
  render() {
    return (
      <div className="App">
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
            <Route
              exact path='/trainers/:id'
              component={TrainerBooking}
            />
            <Route
              exact path='/trainers/addtrainer'
              component={AddTrainer}
            />
            <Route
              exact path='/signup'
              render={props => <Signup setUser={this.setUser} {...props}/>}
            />
            <Route
              exact path='/login'
              render={props => <Login setUser={this.setUser} {...props} />}
            /> 
            <Route component={this.notFound} />
          </Switch>
      </div>
    );
  }
}

export default App;
