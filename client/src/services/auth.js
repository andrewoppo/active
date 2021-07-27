import axios from 'axios';

const signup = (username, password, type) => {
  return axios.post('/api/auth/signup', { username, password, type })
    .then(res => {
      console.log('res.data: ', res.data);
      return res.data
    })
    .catch(err => {
      return err.response.data
    })
}

const login = (username, password) => {
  return axios.post('/api/auth/login', { username, password })
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err.response.data
    })
}

const logout = () => {
  return axios.delete('/api/auth/logout')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response.data
    })
}

export { signup, login, logout };