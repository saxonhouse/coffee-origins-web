import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './App.css';
import {
  Heading,
  Text,
} from 'rebass';
import { Button, Glyphicon, Grid } from 'react-bootstrap';
import Login from './Login';
import CoffeePage from './CoffeePage'

require('dotenv').config()

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
      let url = `${process.env.REACT_APP_API_URL}profile/${this.props.user_id}/`
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
    axios.get(`${process.env.REACT_APP_API_URL}${id}/`).then(res => {
      this.setState({coffee: res.data, loaded: true})
      console.log(JSON.parse(res.data.location))
    }).catch(err => console.log(err))
  }

  addToFavourites = () => {
    this.setState({favouriting : true})
    let url = `${process.env.REACT_APP_API_URL}profile/${this.props.user_id}/`
    axios.get(url).then(res => {
      let favourites = res.data.favourites
      favourites.push(this.props.match.params.id)
        axios({
          method: 'patch',
          url: url,
          headers: {
         'Authorization': 'Token ' +this.props.token
          },
          data: {favourites: favourites}
        }).then(res => {
          console.log(res)
          this.setState({favouriting: false, favourite : true});
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
  }

  render() {
    const coffee = this.state.coffee;
    return (
      <Grid>
          <CoffeePage qr={this.props.qr} coffee={this.state.coffee} />
          {this.props.user_id > 0?
            <div className='favourite-btn'>
              <Button
                bsStyle="primary"
                children={this.state.favourite? <span><Glyphicon glyph='star' /> Added</span> : this.state.favouriting? 'Loading' : 'Add To Favourites'}
                disabled = {this.state.favouriting || this.state.favourite}
                onClick={this.addToFavourites}
              />
            </div>
            :
            <div className='login-to-add'>
              <span>
              {this.props.qr? 'Login to save this coffee' :  'Login to add to favourites'}
              </span>
              <Login />
            </div>
          }
      </Grid>
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
