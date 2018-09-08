import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coffee from './Coffee';
import { Profile } from './Profile';
import { Link } from 'react-router-dom'


export class Routes extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={({match}) => (
            <div> Main Page </div>
          )}/>
          <Route path='/:id' render={({match}) => (
            <Coffee match={match} {...this.props} />
          )}/>
          <Route path='/verify/:key' render={({match}) => (
            <div> Verify </div>
          )}/>
          <Route path='/my-coffees' component={Profile} />
        </Switch>
      </BrowserRouter>
    )
    }

  }
