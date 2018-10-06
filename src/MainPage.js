import React, { Component } from 'react'
import './App.css'
import { CoffeeList } from './CoffeeList'

export class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {coffees: []}
  }

  render() {
    return (
      <CoffeeList mainPage admin={this.props.admin} heading='' />
    )
  }
}
