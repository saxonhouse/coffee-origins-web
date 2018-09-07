import React, { Component } from 'react';
import './App.css';
import {
  Heading
} from 'rebass';
import axios from 'axios';

export class Coffee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.loadCoffee();
  }

  loadCoffee = () => {
    console.log(this.props.match.params.id)
    let id = this.props.match.params.id;
    axios.get('http://localhost:8000/' + id).then(res => {
      this.setState({coffee: res.data, loaded: true})
    }).catch(err => console.log(err))
  }

  render() {
    const coffee = this.state.coffee;
    return (
      <div>
      {this.state.loaded?
        <div>
          <Heading> Coffee </Heading>
          <p> {coffee.name} </p>
          <p> {coffee.location} </p>
        </div>
        :
        <Heading> Not </Heading>
      }
      </div>
    )
  }
}
