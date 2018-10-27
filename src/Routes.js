import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Coffee from './Coffee'
import Verify from './Verify'
import Header from './Header'
import Login from './Login'
import Logout from './Logout'
import Profile from './Profile'
import Editor from './Editor'
import Admin from './Admin'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { setProfile } from './reducer'
import { connect } from 'react-redux'
import { MainPage } from './MainPage'
import { Grid } from 'react-bootstrap'



class Routes extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <Grid fluid>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={({match}) => (
              <MainPage />
            )}/>
            <Route path='/coffee/:id' render={({match}) => (
              <Coffee match={match} {...this.props} />
            )}/>
            <Route path='/qr-coffee/:id' render={({match}) => (
              <Coffee match={match} qr={true} {...this.props} />
            )}/>
            <Route path='/verify/:key' render={({match}) => (
              <Verify match={match} {...this.props} />
            )}/>
            <Route path='/my-coffee' component={Profile} />
            <Route path='/login' render={() => (
              <div className='login-wrap'>
                <Login redirect='/' />
              </div>
            )}/>
            <Route path='/captains-log' render={() => (
              <div className='login-wrap'>
                <Login staffLogin redirect='/mission-control/' />
              </div>
            )}/>
            <Route exact path='/mission-control/' render={({match}) => (
              <Admin />
            )}/>
            <Route path='/mission-control/coffee/:id' render={({match}) => (
              <Coffee match={match} admin {...this.props} />
            )}/>
            <Route path='/mission-control/new/' component={Editor} />
            <Route path='/mission-control/edit/:id' render={(match) => (
              <Editor coffee={match.match.params.id} {...this.props} />
            )}/>
            <Route path='/logout' component={Logout} />
          </Switch>
        </BrowserRouter>
      </Grid>
    )
    }

  }

  function mapStateToProps(state) {
    return {
      token: state.token,
      user_id: state.user_id,
      staff: state.staff
    };
  };

  function mapDispatchToProps(dispatch) {
    return (
      bindActionCreators({setProfile: setProfile}, dispatch)
    );
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Routes)
