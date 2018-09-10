import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setToken } from './reducer'

class Logout extends Component {
  componentWillMount() {
    this.props.setToken()
    localStorage.setItem('token', null)
    localStorage.setItem('user_id', null)
    console.log(this.props)
  }

  render() {
    return (
    <Redirect to='/' />
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

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
