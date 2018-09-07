import React, { Component } from 'react';
import './App.css';
import { injectGlobal } from 'styled-components';
import { Provider } from 'react-redux'
import { Heading } from 'rebass';
import { Routes } from './Routes';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { userReducer } from './reducer'

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }
`

let user = localStorage.getItem('user')
user = JSON.parse(user)
let defaultStore = {}
if (user != null) {
  defaultStore= {
    loggedIn: true,
    user: user.user,
    token: user.token
  }
}

const store = createStore(userReducer, defaultStore)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
