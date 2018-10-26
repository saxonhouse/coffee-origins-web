import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import './App.css'
import { Heading, Text } from 'rebass'
import { CoffeeList } from './CoffeeList'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {loaded: false, favourites: [], coffees: []}
  }

  componentDidMount() {
    this._getProfile()
  }

  _getProfile() {
    axios({
      type: 'get',
      url: 'http://localhost:8000/profile/' + this.props.user_id + '/',
      headers: {
        'Authorization' : 'Token ' + this.props.token
      }
    }).then(res => {
      this.setState({loaded: true, profile: res.data})
    }).catch(err => console.log(err.response.data))
  }

  render() {
    return (
      <div>
      {this.state.loaded?
        <div>
          <CoffeeList
            favourites = {this.state.profile.favourites}
            coffees={this.state.profile.coffees}
            filters
          />
        </div>
        : this.props.user_id?
        <Text> Loading </Text>
        :
        <Redirect to='/' />
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    user_id: state.user_id,
  };
};

export default connect(mapStateToProps)(Profile)
