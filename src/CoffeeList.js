import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './App.css'
import { Heading, Text, Box} from 'rebass'
import { CoffeeCard } from './CoffeeCard'
import { Filters } from './Filters'
import {Grid, Row, Col} from 'react-bootstrap'

export class CoffeeList extends Component {
  constructor(props) {
    super(props)
    this.state = {coffees: [], favourites: []}
  }

  componentDidMount() {
    if (this.props.mainPage) {
      axios.get('http://localhost:8000/').then(res => {
        this.setState({coffees: res.data})
        this.child.getFilters();
      }).catch(err => console.log(err))
    }
    else {
      if (this.props.favourites) {
        for(const coffee_id of this.props.favourites) {
        this._renderCoffee(coffee_id, true)
        }
      }
      for (const coffee_id of this.props.coffees) {
        this._renderCoffee(coffee_id)
      }

    }
  }

  _renderCoffee(id, favourite) {
    axios.get('http://localhost:8000/' + id).then(res => {
      res.data.favourite = favourite
      if (this.state.coffees.filter(c => c.id === id).length === 0) {
        this.setState(prevState => ({
          coffees: [...prevState.coffees, res.data]
        }))
        this.props.filters && this.child.getFilters();
      }
    }).catch(err => console.log(err))
  }

  filter = (coffees) => {
    this.setState({filtered: coffees})
  }

  render() {
    const coffees = this.state.filtered || this.state.coffees
    return (
        <Grid>
          <Row className="justify-content-end">
            <Col className="align-self-end">
             {this.props.filters && <Filters ref={instance => { this.child = instance; }} coffees={this.state.coffees} filter={this.filter} /> }
            </Col>
          </Row>
          <Heading> {this.props.heading} </Heading>
          {coffees.map((coffee, i) => {
            return (
              <Col xs={12} md={6} lg={4}>
              <CoffeeCard
                key={coffee.id}
                coffee={coffee}
                admin={this.props.admin}
                color={i%2? '#e98b23' : '#e95424'}
                innerColor={i%2? '#e95424' : '#e98b23'}
              />
              </Col>
            )
          })
          }
        </Grid>
      )
      }
}
