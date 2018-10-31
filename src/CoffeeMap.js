import React, { Component } from 'react'
import { CoffeeCard } from './CoffeeCard'
import {Row, Col} from 'react-bootstrap'
import posed, {PoseGroup} from 'react-pose'
import { Loading } from './Loading'

const CoffeePose = posed.div({
  enter: { opacity: 1, y: 0, transition: ({i}) => ({delay: i*100}) },
  exit: { opacity: 0, y: 1000, transition: ({i}) => ({delay: i*100}) }
  })

export const CoffeeMap = ({coffees, admin}) => {
  return(
    <div>
    {coffees?
    <Row>
      <PoseGroup flipMove={false}>
        {coffees.map((coffee, i) => {
          return (
            <CoffeePose key={i} i={i} >
              <Col xs={12} md={6} lg={4}>
                  <CoffeeCard
                    key={coffee.id}
                    coffee={coffee}
                    admin={admin}
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
    :
    <Loading color='#ededed' loading={coffees.length < 1} />
    }
    </div>
  )
}
