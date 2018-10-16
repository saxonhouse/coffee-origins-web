import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './App.css'
import { Heading, Text } from 'rebass'
import { CoffeeCard } from './CoffeeCard'
import { Filters } from './Filters'
import {Grid, Row, Col} from 'react-bootstrap'

export class CoffeeList extends Component {
  constructor(props) {
    super(props)
    this.state = {coffees: []}
  }

  componentDidMount() {
    if (this.props.mainPage) {
      axios.get('http://localhost:8000/').then(res => {
        this.setState({coffees: res.data})
        this.child.getFilters();
      }).catch(err => console.log(err))
    }
    else {
      for (const coffee_id of this.props.coffees) {
        this._renderCoffee(coffee_id)
      }
      this.child.getFilters();
    }
  }

  _renderCoffee(id) {
    axios.get('http://localhost:8000/' + id).then(res => {
      this.setState(prevState => ({
        coffees: [...prevState.coffees, res.data]
      }))
    }).catch(err => console.log(err))
  }

  filter = (coffees) => {
    this.setState({filtered: coffees})
  }

  render() {
    const coffees = this.state.filtered || this.state.coffees
    return (
        <div>
          <Row className="justify-content-end">
            <Col className="align-self-end">
             <Filters ref={instance => { this.child = instance; }} coffees={this.state.coffees} filter={this.filter} />
            </Col>
          </Row>
          <Heading> {this.props.heading} </Heading>
          {coffees.map((coffee) => {
            return (
              <Col xs={12} md={6} lg={4}>
              <CoffeeCard
                id={coffee.id}
                key={coffee.id}
                name={coffee.name}
                admin={this.props.admin}
              />
              </Col>
            )
          })
          }
        </div>
      )
      }
}
