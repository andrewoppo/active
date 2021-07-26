import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

axios.get('/api/auth/loggedin')
  .then(res => {
    console.log('User: ', res.data);
    const user = res.data;
    ReactDOM.render(
      <BrowserRouter>
        <App user={ user }/>
      </BrowserRouter>,
      document.getElementById('root')
    );
  })


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
