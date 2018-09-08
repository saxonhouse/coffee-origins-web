import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { setUser } from './reducer'
import axios from 'axios';
import './App.css';
import {
  Input,
  Button,
  ButtonTransparent
} from 'rebass';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }

  login = () => {

  }

  register = () => {

  }

  changeType = () => {
    let bool = !this.state.register;
    this.setState({register: bool})
  }

  handleChange(event) {
    this.setState({[event.target.name] : event.target.value})
  }

  render() {
    return(
      <div>
        <Input
          name='username'
          value={this.state.username}
          onChange={this.handleChange}
          placeHolder='Username'
        />
        <Input
          name='password'
          value={this.state.password}
          onChange={this.handleChange}
          placeHolder='Password'
        />
        {this.state.register?
        <div>
          <Input
            name='password2'
            value={this.state.password2}
            onChange={this.handleChange}
            placeHolder='Confirm password'
          />
          <Input
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
            placeHolder='Email address'
          />
          <Button children='Register' />
          <ButtonTransparent onClick={this.changeType} children='or Login' />
        </div>
        :
        <div>
          <Button children='Login' />
          <ButtonTransparent onClick={this.changeType} children='or Register' />
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    user: state.user
  };
};

function mapDispatchToProps(dispatch) {
  return (
    bindActionCreators({setUser: setUser}, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
