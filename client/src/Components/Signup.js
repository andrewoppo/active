import React, { Component } from 'react'
import { signup } from '../services/auth';

export default class Signup extends Component {

  state = {
    username: '',
    password: '',
    message: '',
    role: ''
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, password, role } = this.state;
    signup(username, password, role)
      .then(user => {
        if (user.message) {
          this.setState({
            message: user.message,
            username: '',
            password: '',
            role: ''
          })
        } else {
          console.log('User added: ', user)
          this.props.setUser(user);
          this.props.history.push('/trainers');
        }
      })
      .catch( err => console.log(err))
  }

  render() {
    return (
      <div>
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
            <select 
                name="role" 
                onChange={this.handleChange}
                value={this.state.role}
                >
                <option value="" selected disabled hidden>Account type...</option>
                <option value="user">User</option>
                <option value="trainer">Trainer</option>
            </select>
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                id="username"
            />
            <label htmlFor="password">Password: </label>
            <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                id="password"
            />
            <button type="submit">Sign Up</button>
            {this.state.message && (
                <h3>{this.state.message}</h3>
          )}
        </form>
      </div>
    )
  }
}