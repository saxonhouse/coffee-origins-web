import React, { Component } from 'react'
import Select from 'react-select'
import {FormGroup, ControlLabel, FormControl, Checkbox, Grid, Col, Row} from 'react-bootstrap'

function containsObject(obj, list) {
    for (const i of list) {
        if (JSON.stringify(i) === JSON.stringify(obj) ) {
            return true;
        }
    }
    return false;
}

export class Filters extends Component {
  state = {
    filters: ['type', 'country', 'tasting', 'grower'],
    values: [],
    selectedFilters: [],
    options: {type: [], country: [], tasting: [], grower: []},
  }

  getOptions = (filter) => {
    const { options } = this.state
    const { coffees } = this.props
    let newOptions = options
    for (const coffee of coffees) {
      let coffeeOption = {value: coffee[filter], label: coffee[filter]}
      if (!containsObject(coffeeOption,newOptions[filter])) {
        console.log(newOptions[filter])
        newOptions[filter].push(coffeeOption)
        }
      }
    console.log(newOptions)
    this.setState({options: newOptions})
  }

  toggleFilter = (event) => {
    const {selectedFilters} = this.state
    if (!event.target.checked) {
      this.setState({selectedFilters: selectedFilters.filter(item => item !== event.target.name)})
    }
    else {
      this.setState({selectedFilters: [...selectedFilters, event.target.name]});
      this.getOptions(event.target.name)
    }
  }

  render() {
    const { selectedFilters, selectedOptions, filters, values } = this.state;

    return (
      <Grid>
        <Row>
          {filters.map((filter) => {
            return (
              <Col xs={4} lg={1}>
                <Checkbox inline name={filter} onChange={this.toggleFilter}>
                   {filter}
                </Checkbox>
              </Col>
            )
          })
          }
        </Row>
        {selectedFilters.map((filter) => {
          return (
            <Row className='filter'>
              <Col xs={4} lg={1} >
                <label for={filter} className='filter-label'>{filter}</label>
              </Col>
              <Col xs={8} lg={3}>
                <Select
                  isMulti
                  name={filter}
                  options={this.state.options[filter.toLowerCase()]}
                  className="filter-select"
                  classNamePrefix="select"
                />
              </Col>
            </Row>

            )
          })
        }
      </Grid>
    );
  }
}
