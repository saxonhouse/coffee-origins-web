import React, {Component} from 'react'
import {
  Card,
  Heading,
  Text,
  Flex,
  Box,
  Image,
  Link
} from 'rebass';

export class CoffeeCard extends Component {
  render() {
    return (
      <Card
        fontSize={6}
        fontWeight='bold'
        width={[ 1, 1/3, 1/4 ]}
        p={5}
        my={5}
        bg='#f6f6ff'
        borderRadius={8}
        boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'
      >
        <Flex>
          <Box width={1/2}>
            <a href={this.props.admin? `/mission-control/coffee/${this.props.id}`:`/coffee/${this.props.id}`}><h4>{this.props.name}</h4></a>
            {this.props.admin && <a href={`/mission-control/edit/${this.props.id}`}>Edit</a>}
          </Box>
        </Flex>
      </Card>
    )
  }
}
