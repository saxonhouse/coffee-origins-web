import React, { Component } from 'react'
import Select from 'react-select'
import {Checkbox, Grid, Col, Row, ButtonToolbar, Button, ListGroup, ListGroupItem} from 'react-bootstrap'



export class Filters extends Component {
  state = {
    types: ['type', 'country', 'tasting', 'grower'],
    filters: {},
    selectedOptions: []
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.getFilters()
    }
  }

  getFilters = () => {
    const { types } = this.state
    const { coffees } = this.props
    const filters = {}
    for (const type of types) {
      filters[type] = {options: [], selected: false}
    }
    for (const coffee of coffees) {
      for (var filter in filters) {
        if (filter == 'tasting') {
          var arr = JSON.parse(coffee[filter])
          for (const taste of arr) {
            if (!filters[filter].options.includes(taste.value)) {
              filters[filter].options.push(taste.value)
            }
          }
        }
        else if (!filters[filter].options.includes(coffee[filter])) {
          filters[filter].options.push(coffee[filter])
          }
        }
      }
    console.log(filters)
    this.setState({filters: filters})
  }

  toggleFilter = (type) => (event) => {
    const {filters} = this.state
    filters[type].selected = !filters[type].selected
    this.setState({filters: filters})
  }

  toggleOption = () => {

  }

  render() {
    const { types, filters } = this.state;
    return (
      <Grid>
          <Row>
            <Col lg={6}>
              <ListGroup>
                <ListGroupItem>
                  <ButtonToolbar>
                  {types.map((type, i) => {
                    return (<Button type='button' onClick={this.toggleFilter(type)}>{type}</Button>)
                    }
                  )}
                  </ButtonToolbar>
                </ListGroupItem>
                {Object.keys(filters).map((name, i) => {
                  const filter = filters[name]
                  if (filter.selected) {
                  return (
                      <ListGroupItem bsSize="small">
                      {filter.options.map((option, j) => {
                        return (
                            <Checkbox eventKey={option} inline name={option} onChange={this.toggleOption}>
                               {option}
                            </Checkbox>
                        )}
                      )}
                    </ListGroupItem>
                  )}}
                )}
              </ListGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}
