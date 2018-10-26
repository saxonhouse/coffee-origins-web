import React, {Component} from 'react'
import { Row, Col, Glyphicon } from 'react-bootstrap'
import {
  Card,
  Heading,
  Text,
  Flex,
  Box,
  Image,
  Link
} from 'rebass';

var moment = require('moment')

export class CoffeeCard extends Component {
  render() {
    const { coffee } = this.props
    const tasting = JSON.parse(this.props.coffee.tasting)
    return (
      <div className='coffee-card'>
            <a href={this.props.admin? `/mission-control/coffee/${coffee.id}`:`/coffee/${coffee.id}`}>
              <h1>
              <span style={{backgroundColor: this.props.color}}>{coffee.name}</span>
              {coffee.favourite && <span style={{fontSize: '50%'}}> <Glyphicon glyph='star' /> </span>}
              </h1>
            </a>
            {this.props.admin && <a href={`/mission-control/edit/${coffee.id}`}>Edit</a>}

            <p> <span>{coffee.type}</span> </p>
            <h3> <span>{coffee.country}</span> </h3>
            <Row xs={12}>
              <Col xs={4} className='field-label'> Last In: </Col>
              <Col xs={8}> {moment(this.props.coffee.last_in).format("DD-MM-YY")} </Col>
            </Row>
            <Row>
              <Col xs={4} className='field-label'> Next In: </Col>
              <Col xs={8}> {moment(this.props.coffee.next_in).format("DD-MM-YY")} </Col>
            </Row>
      </div>
    )
  }
}
