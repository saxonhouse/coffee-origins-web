import React, {Component} from 'react'
import {
  Input,
  Button,
  Flex,
  Box
} from 'rebass';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";
import axios from 'axios'
import DatePicker from 'react-date-picker'
import { Tasting } from './Tasting'
var moment = require('moment')

require('dotenv').config()
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY)

const CustomField = (props) => {
  return (
    <div className='form-group-row field'>
      <label for={props.name} className='col-sm-3 col-form-label'>{props.label}</label>
      <div class="col-sm-9">
        {props.children}
      </div>
    </div>
  )
}

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      roaster: '',
      country: '',
      region: '',
      grower: '',
      process: '',
      tasting: [],
      url: '',
      lastIn: new Date(),
      nextIn: new Date(),
      locationSet: false,
      locationCheck: false
    }
    this.renderField = this.renderField.bind(this)
    this.goToPlace = this.goToPlace.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.tasting = this.tasting.bind(this)
  }

  componentDidMount() {
    console.log(this.props.coffee)
    if (this.props.coffee) {
      axios.get(`http://localhost:8000/${this.props.coffee}/`).then(
        res => {
          res.data.location = JSON.parse(res.data.location)
          res.data.tasting = JSON.parse(res.data.tasting)
          this.setState(res.data)
        }
      )
    }
  }

  handleChange = (event) => {
    this.setState({error: ' '})
    this.setState({[event.target.name] : event.target.value})
  }

  handleLast = date => this.setState({lastIn: date})
  handleNext = date => this.setState({nextIn: date})

  goToPlace(places) {
    let term = places.join(',')
    Geocode.fromAddress(term).then(
      response => {
        this.setState({location: response.results[0].geometry.location, locationSet: true, locationCheck: false})
      },
      error => {
        console.error(error)
      }
      )
  }

  tasting(tasting) {
    this.setState({tasting: tasting})
    console.log(tasting)
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.locationSet) {
      this.setState({locationCheck: true})
    }
    else {
      const url = this.props.coffee? `http://localhost:8000/${this.props.coffee}/` : 'http://localhost:8000/'
      const method = this.props.coffee? 'patch' : 'post'
      axios({
        method: method,
        url: url,
        headers: {
       'Authorization' : 'Token ' + this.props.token
        },
        data: {
          name: this.state.name,
          type: this.state.type,
          roaster: this.state.roaster,
          country: this.state.country,
          region: this.state.region,
          location: JSON.stringify(this.state.location),
          grower: this.state.grower,
          process: this.state.process,
          tasting: JSON.stringify(this.state.tasting),
          shopURL: this.state.shopURL,
          last_in: this.state.lastIn,
          next_in: this.state.nextIn,
        }
        }).then(res=> console.log(res))
        .catch(err => console.error(err))
    }
  }

  renderField(name, label) {
    return(
    <CustomField name={name} label={label}>
        <input
          className='form-control'
          name={name}
          onChange={this.handleChange}
          value={this.state[name]}
        />
    </CustomField>
    )
  }


  render() {
    const places = [this.state.region, this.state.country]
    return (
      <div>
        <form>
          <Flex flexWrap width={[1, 2/3]} mx={'auto'} my={50}>
            <Box width={[1, 1/2]}>
              {this.renderField('name', 'Name')}
              {this.renderField('type', 'Type')}
              {this.renderField('roaster', 'Roaster')}
              {this.renderField('country', 'Country')}
              {this.renderField('region', 'Region')}
              <Button type="button" className={this.state.locationCheck? 'locator' : 'locator red'} children="Locate" onClick={() => this.goToPlace(places)} />
              {this.state.locationCheck && <p> Check your location! </p>}
            </Box>
            <Box width={[1, 1/2]}>
              {this.renderField('grower', 'Grower')}
              {this.renderField('process', 'Process')}
              <CustomField name='tasting' label='Tasting'>
                <Tasting tasting={this.tasting} preset={this.state.tasting} />
              </CustomField>
              {this.renderField('shopURL', 'Buy')}
              <CustomField name='lastIn' label='Last In'>
                <DatePicker id="lastIn" style={{width: '90%'}} onChange={this.handleLast} value={this.state.lastIn} />
              </CustomField>
              <CustomField name='nextIn' label='Next In'>
                <DatePicker id="nextIn" onChange={this.handleNext} value={this.state.nextIn} />
              </CustomField>
              <Button type="submit" children="Submit" onClick={this.handleSubmit} />
            </Box>
          </Flex>
        </form>
        <Box width={[1]}>
          <div>
            <Map className='map'
                google={this.props.google}
                center={this.state.location}
                zoom={10}
            >
            <Marker position={this.state.location} />
            </Map>
          </div>
          </Box>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY
})(Form)
