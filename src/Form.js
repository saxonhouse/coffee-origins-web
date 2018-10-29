import React, {Component} from 'react'
import {
  Input,
  Flex,
  Box
} from 'rebass';
import { Button, Modal } from 'react-bootstrap'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";
import axios from 'axios'
import DatePicker from 'react-date-picker'
import { Tasting } from './Tasting'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
var moment = require('moment')

require('dotenv').config()
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY)

const CustomField = (props) => {
  return (
    <div className='form-group-row field'>
      <label for={props.name} className='col-sm-3 col-form-label editor-label'>{props.label}</label>
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
      locationCheck: false,
      saving: false,
      saveError: '',
      saved: false
    }
    this.renderField = this.renderField.bind(this)
    this.goToPlace = this.goToPlace.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.tasting = this.tasting.bind(this)
  }

  componentDidMount() {
    if (this.props.coffee) {
      axios.get(`${process.env.REACT_APP_API_URL}${this.props.coffee}/`).then(
        res => {
          res.data.location = JSON.parse(res.data.location)
          res.data.tasting = JSON.parse(res.data.tasting)
          res.data.lastIn = new Date(res.data.last_in)
          res.data.nextIn = new Date(res.data.next_in)
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
    this.setState({gettingLocation: true})
    let term = places.join(',')
    Geocode.fromAddress(term).then(
      response => {
        this.setState({location: response.results[0].geometry.location, locationSet: true, locationCheck: false, gettingLocation: false})
      },
      error => {
        this.setState({gettingLocation: false, locationError: error})
        console.error(error)
      }
      )
  }

  tasting(tasting) {
    this.setState({tasting})
    console.log(tasting)
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.locationSet) {
      this.setState({locationCheck: true})
    }
    else {
      const url = this.props.coffee? `${process.env.REACT_APP_API_URLS}${this.props.coffee}/` : process.env.REACT_APP_API_URL
      const method = this.props.coffee? 'patch' : 'post'
      this.setState({saving: true, saveError: ''});
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
      }).then((res) => {
        this.setState({saving: false, saved: true, added_id: res.data.id})
        console.log(res)
      })
      .catch((err) => {
        console.error(err)
        this.setState({saveError: err.stack})
      })
    }
  }

  closeModal = () => {
    this.setState({showModal: false})
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
        <div className='editor'>
          <Modal show={this.state.saved || this.state.showModal}>
            <Modal.Header>
              <Modal.Title>Successfully Submitted</Modal.Title>
            </Modal.Header>

            <Modal.Body>The coffee is in the bag.</Modal.Body>

            <Modal.Footer>
              <Button onClick={this.closeModal}>Close</Button>
              <a href={`${process.env.REACT_APP_ROOT_URL}coffee/${this.state.added_id}`}>
                <Button bsStyle="primary">Go to it</Button>
              </a>
            </Modal.Footer>
          </Modal>
          <form>
            <Flex flexWrap width={[1, 2/3]} mx={'auto'} my={50}>
              <Box width={[1, 1/2]}>
                {this.renderField('name', 'Name')}
                {this.renderField('type', 'Type')}
                {this.renderField('roaster', 'Roaster')}
                {this.renderField('country', 'Country')}
                {this.renderField('region', 'Region')}
                <div className='button-wrap'>
                  <Button
                    bsStyle="primary"
                    type="button"
                    className={this.state.locationCheck? 'locator button-right' : 'locator red button-right'}
                    disabled={this.state.checkingLocation}
                    onClick={() => this.goToPlace(places)}
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Locate
                  </Button>
                </div>
                {this.state.locationCheck && <p> Check your location! </p>}
                {this.state.locationError && <p> {this.state.locationError} </p>}
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
                <div className='button-wrap'>
                  <Button
                    bsStyle="primary"
                    type="submit"
                    children={this.state.saving? "Submitting...":"Submit"}
                    onClick={this.handleSubmit}
                    disabled={this.state.saving}
                    />
                  </div>
              </Box>
            </Flex>
          </form>
        </div>
        <Map className='map'
            google={this.props.google}
            center={this.state.location}
            zoom={10}
        >
        <Marker position={this.state.location} />
        </Map>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY
})(Form)
