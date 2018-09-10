import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setToken } from './reducer'
import axios from 'axios'
import './App.css'
import { Redirect } from 'react-router-dom'
import {
  Input,
  Button,
  ButtonTransparent,
  Text
} from 'rebass';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
  }

  login = () => {
    axios.post(
      'http://localhost:8000/login/',
      {
        username: this.state.username,
        password: this.state.password
      }
    ).then(res => {
      console.log(res)
      this.props.setToken(res.data.token, res.data.user_id)
      console.log(this.props)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user_id', res.data.user_id)
      this.setState({badCredentials: false})
      if (this.props.redirect) {
        this.setState({redirected: true})
      }
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
        'http://localhost:8000/auth/registration/',
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
      <div>
        {this.state.registered?
        <Text> Thanks! Check your email to verify your account </Text>
        :
        <div>
          <Input
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
            placeHolder='Username'
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
            <ButtonTransparent onClick={this.changeType} children='or Register' />
          </div>
          }
          <Text>{this.state.error}</Text>
        </div>
      }
      {this.state.redirect && <Redirect to={this.props.redirect} />}
      {this.props.user_id  > 0 && <Redirect to='/' />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    user_id: state.user_id,
    profile: state.profile
  };
};

function mapDispatchToProps(dispatch) {
  return (
    bindActionCreators({setToken: setToken}, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
