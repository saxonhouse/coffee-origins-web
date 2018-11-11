import React, { Component } from 'react';
import './App.css';
import {
  Heading,
  Text,
} from 'rebass';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Loading } from './Loading'

class CoffeePage extends Component {
  render() {
    const {qr, coffee} = this.props
    return (
      <div>
        {coffee?
          <div>
            <Heading className='coffee-text'>
            <Text fontSize={[3,4,5]}>
              <span>
                {qr? `You've been drinking a ` : `A `}
                <span className='coffee-name'> {coffee.name} </span> {coffee.type}, grown in
                <span className='coffee-place'> {coffee.region && coffee.region+','} {coffee.country} </span>
                by <span className='coffee-grower'> {coffee.grower && coffee.grower}</span>
                {coffee.process && ` using a ${coffee.process} process`}.
              </span>
            </Text>
            <Text fontSize={[3,4,5]}>
              <span className='coffee-notes'>
                  Notes: {JSON.parse(coffee.tasting).map((note, i)=> {
                    return <span className={i%2? 'gold':'orange'}>{note.value}{i+1 < JSON.parse(coffee.tasting).length && ', '}</span>
                  })
                }
              </span>
            </Text>
            </Heading>
            <Map className='map'
                google={this.props.google}
                center={JSON.parse(coffee.location)}
                initialCenter={JSON.parse(coffee.location)}
                zoom={10}
            >
            <Marker position={JSON.parse(coffee.location)} />
            </Map>
          </div>
        :
          <Loading color={ '#142e39' } />
        }
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY
})(CoffeePage)
