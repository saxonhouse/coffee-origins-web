import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setToken } from './reducer'
import { setProfile } from './reducer'
import axios from 'axios'
import './App.css'
import { Redirect } from 'react-router-dom'
import {
  Input,
  Button,
  ButtonTransparent,
  Text
} from 'rebass';

require('dotenv').config()

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }

  login = () => {
    let url = `${process.env.REACT_APP_API_URL}login/`
    if (this.props.staffLogin) {
      url = `${process.env.REACT_APP_API_URL}staff-login/`
    }
    axios.post(
      url,
      {
          username: this.state.username,
          password: this.state.password
      }
    ).then(res => {
      this.props.setToken(res.data.token, res.data.user_id, this.props.staffLogin)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user_id', res.data.user_id)
      console.log(this.props)
      this.setState({redirect: true})
    }
  ).catch(err => {
    this.handleError(err.response.data)
  })
  }

  register = () => {
    if (this.state.password != this.state.password2) {
      this.setState({mismatch: true})
    }
    else {
      this.setState({mismatch: false})
      axios.post(
        `${process.env.REACT_APP_API_URL}auth/registration/`,
        {
          username: this.state.username,
          password1: this.state.password,
          password2: this.state.password2,
          email: this.state.email
        }
      ).then(res => {
        console.log(res)
        this.setState({registered: true})
      }).catch(err => {
        this.handleError(err.response.data)
      })
    }
  }

  handleError(error) {
    if (error.non_field_errors) {
      this.setState({error: error.non_field_errors})
    }
    else {
      let errorMessage
      for(var field in error) {
        errorMessage = field + ": " + error[field] + '\n'
      }
      this.setState({error: errorMessage})
    }
  }

  changeType = () => {
    this.setState({error: ' '})
    let bool = !this.state.register;
    this.setState({register: bool})
  }

  handleChange(event) {
    this.setState({error: ' '})
    this.setState({[event.target.name] : event.target.value})
    if (this.state.password == this.state.password2) {
      this.setState({mismatch: false})
    }
  }

  render() {
    return(
      <div className='login'>
        {this.state.registered?
        <Text> Thanks! Check your email to verify your account </Text>
        :
        <div>
          <Input
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
            placeHolder='Username or Email'
          />
          <Input
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
            placeHolder='Password'
          />
          {this.state.register?
          <div>
            <Input
              name='password2'
              type='password'
              value={this.state.password2}
              onChange={this.handleChange}
              placeHolder='Confirm password'
            />
            {this.state.mismatch && <Text> passwords do not match! </Text> }
            <Input
              name='email'
              value={this.state.email}
              onChange={this.handleChange}
              placeHolder='Email address'
            />
            <Button onClick={this.register} children='Register' />
            <ButtonTransparent onClick={this.changeType} children='or Login' />
          </div>
          :
          <div>
            <Button onClick={this.login} children='Login' />
            {!this.props.staffLogin && !this.props.verified && <ButtonTransparent onClick={this.changeType} children='or Register' />}
          </div>
          }
          <Text>{this.state.error}</Text>
        </div>
      }
      {this.state.redirect && <Redirect to={this.props.redirect} />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    user_id: state.user_id,
    profile: state.profile,
    staff: state.staff
  };
};

function mapDispatchToProps(dispatch) {
  return (
      bindActionCreators({setToken: setToken}, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
