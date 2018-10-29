import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './App.css'
import { Heading, Text, Box} from 'rebass'
import { CoffeeCard } from './CoffeeCard'
import { Filters } from './Filters'
import {Grid, Row, Col} from 'react-bootstrap'
import posed, {PoseGroup} from 'react-pose'

require('dotenv').config()

const CoffeePose = posed.div({
  enter: { opacity: 1, y: 0, transition: ({i}) => ({delay: i*100}) },
  exit: { opacity: 0, y: 1000, transition: ({i}) => ({delay: i*100}) }
  })

const ContainerDiv = posed.div({
    enter: { staggerChildren: 50 },
    exit: { staggerChildren: 20}
  });


export class CoffeeList extends Component {
  constructor(props) {
    super(props)
    this.state = {coffees: [], favourites: []}
  }

  componentDidMount() {
    if (this.props.mainPage) {
      axios.get(`${process.env.REACT_APP_API_URL}/?format=json`).then(res => {
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
    axios.get(`${process.env.REACT_APP_API_URL}${id}/?format=json`).then(res => {
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
          <ContainerDiv>
            <Row className="justify-content-end">
              <Col className="align-self-end">
               {this.props.filters && <Filters ref={instance => { this.child = instance; }} coffees={this.state.coffees} filter={this.filter} /> }
              </Col>
            </Row>
            <Heading> {this.props.heading} </Heading>
            <Row>
              <PoseGroup flipMove={false}>
                {coffees.map((coffee, i) => {
                  return (
                    <CoffeePose key={i} i={i} >
                      <Col xs={12} md={6} lg={4}>
                          <CoffeeCard
                            key={coffee.id}
                            coffee={coffee}
                            admin={this.props.admin}
                            color={i%2? '#e98b23' : '#e95424'}
                            innerColor={i%2? '#e95424' : '#e98b23'}
                          />
                      </Col>
                    </CoffeePose>
                  )
                })
                }
              </PoseGroup>
            </Row>
          </ContainerDiv>
        </Grid>
      )
      }
}
