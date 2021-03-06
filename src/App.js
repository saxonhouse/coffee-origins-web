import React, { Component } from 'react'
import './App.css'
import { injectGlobal } from 'styled-components'
import { Provider } from 'react-redux'
import { Heading } from 'rebass'
import Routes  from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { user } from './reducer'
import Header from './Header'

let token = localStorage.getItem('token')
let user_id = localStorage.getItem('user_id')
let profile = localStorage.getItem('profile')
let defaultStore = {}
if (token != null) {
  defaultStore = {
    token: token,
    user_id: user_id,
    staff: false
  }
}

const store = createStore(user, defaultStore)

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
