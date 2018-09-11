import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './App.css';
import {
  Heading,
  Text,
  Button
} from 'rebass';
import Login from './Login';


class Coffee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    this.loadCoffee();
    if (this.props.user_id && this.props.qr) {
      let url = 'http://localhost:8000/profile/' + this.props.user_id +'/'
      axios.get(url).then(res => {
        let history = res.data.coffees
        history.push(this.props.match.params.id)
        axios({
          method: 'patch',
          url: url,
          headers: {
         'Authorization': 'Token ' +this.props.token
          },
          data: {coffees: history}
        }).then(res => console.log(res)
      ).catch(err => console.log(err))
    }).catch(err => console.log(err))
    }
  }

  loadCoffee = () => {
    let id = this.props.match.params.id;
    axios.get('http://localhost:8000/' + id).then(res => {
      this.setState({coffee: res.data, loaded: true})
    }).catch(err => console.log(err))
  }

  addToFavourites = () => {
    this.setState({favouriting : true})
    axios({
      method: 'patch',
      url: 'http://localhost:8000/profile/' + this.props.user_id +'/',
      headers: {
     'Authorization': 'Token ' +this.props.token
      },
      data: {favourites: [this.props.match.params.id]}
    }).then(res => {
      console.log(res)
      this.setState({favouriting: false, favourite : true});
  })
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
          {this.props.user_id?
            <div>
            <Text> Add to Favourites </Text>
            <Button
              children={this.state.favourite? 'Done' : this.state.favouriting? 'Loading' : 'Please'}
              onClick={this.addToFavourites}
            />
            </div>
            :
            <Login />
          }
        </div>
        :
        <Heading> Not </Heading>
      }
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

export default connect(mapStateToProps)(Coffee)
