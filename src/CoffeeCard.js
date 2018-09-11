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
        width={[ 1, 1, 1/2 ]}
        p={5}
        my={5}
        bg='#f6f6ff'
        borderRadius={8}
        boxShadow='0 2px 16px rgba(0, 0, 0, 0.25)'
      >
        <Flex>
          <Box width={1/2}>
            <Image src={this.props.image} />
          </Box>
          <Box width={1/2}>
            <a href={`/coffee/${this.props.id}`}><Heading>{this.props.name}</Heading></a>
          </Box>
        </Flex>
      </Card>
    )
  }
}
