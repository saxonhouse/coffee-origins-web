import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { setToken } from './reducer'
import axios from 'axios';
import './App.css';
import Login from './Login.js'
import {Grid} from 'react-bootstrap';
import {
  Text
} from 'rebass';

require('dotenv').config()

export default class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    if (this.props.match.params.key) {
      axios.post(
        `${process.env.REACT_APP_API_URL}auth/registration/verify-email/`,
        {key: this.props.match.params.key}
      ).then(res => {
        console.log(res)
        this.setState({verified: true})
      }).catch(err => {
      console.log(err)
      this.setState({keyError: true})
    })
    }
    else {
      this.setState({noKey: true})
    }
  }

  render() {
    return (
      <Grid>
        <div className='verify'>
          {this.state.noKey && <Text> Sorry, no verification key provided </Text>}
          {this.state.keyError && <Text>Sorry, there was an error with your verification key </Text>}
          {this.state.verified && <div>
            <Text> Successfully registered! You can now login </Text>
            <Login redirect='/' verified />
          </div>}
        </div>
      </Grid>
    )
  }

}
