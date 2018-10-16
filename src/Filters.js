import React, { Component } from 'react'
import Select from 'react-select'
import {Checkbox,
        Grid,
        Col,
        Row,
        ButtonToolbar,
        Button,
        ToggleButton,
        ListGroup,
        ListGroupItem,
        Glyphicon} from 'react-bootstrap'



export class Filters extends Component {
  state = {
    types: ['type', 'country', 'tasting', 'grower'],
    filters: {},
    selectedOptions: [],
    selectedTypes: [],
    filtered: []
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
    this.setState({filters: filters})
  }

  toggleFilter = (type) => (event) => {
    const {filters, selectedTypes} = this.state
    filters[type].selected = !filters[type].selected
    selectedTypes.includes(type)? selectedTypes.splice(selectedTypes.findIndex(i => i === type),1) : selectedTypes.push(type)
    this.setState({filters: filters, selectedTypes: selectedTypes})
  }

  toggleOption = (type, option) => {
    let coffees = this.props.coffees.slice(0)
    console.log(coffees)
    const { selectedOptions } = this.state
    let out = []
    selectedOptions.includes(option)? selectedOptions.splice(selectedOptions.findIndex(i => i === option),1) : selectedOptions.push(option)
    for (const option of selectedOptions) {
      for (const coffee of coffees) {
        if (type == 'tasting') {
          if (!JSON.parse(coffee[type]).includes(option)) {
            out.push(coffee)
          }
        }
        else if (coffee[type] !== option) {
          out.push(coffee)
        }
      }
    }
    for (const coffee of out) {
      coffees.splice(coffees.findIndex(i => i === coffee),1)
    }
    this.setState({selectedOptions: selectedOptions})
    this.props.filter(coffees)
  }

  render() {
    const { types, filters, selectedTypes } = this.state;
    return (
              <ListGroup>
                <ListGroupItem className='filter-section'>
                  <ButtonToolbar>
                  <ul className='filter-list'>
                  {types.map((type, i) => {
                    return (
                      <li onClick={this.toggleFilter(type)}>
                          <Glyphicon className='filter-glyph' bsSize='xsmall' glyph={selectedTypes.includes(type)? 'chevron-down' : 'chevron-right' } />
                          <span className='filter-type'> {type}</span>
                      </li>)
                    }
                  )}
                  </ul>
                  </ButtonToolbar>
                </ListGroupItem>
                {Object.keys(filters).map((name, i) => {
                  const filter = filters[name]
                  if (filter.selected) {
                  return (
                      <ListGroupItem bsSize="xsmall" className='filter-section'>
                      <ul className='option-list'>
                      {filter.options.map((option, j) => {
                        return (
                          <li>
                            <input type='checkbox' id={option} name='option' onChange={() => {this.toggleOption(name, option)}} />
                            <label for={option}>  {option} </label>
                          </li>
                        )}
                      )}
                      </ul>
                      </ListGroupItem>
                  )}}
                )}
              </ListGroup>
    );
  }
}
