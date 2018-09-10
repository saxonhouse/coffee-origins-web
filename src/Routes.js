import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coffee from './Coffee';
import Verify from './Verify';
import Header from './Header';
import Login from './Login';
import Logout from './Logout';
import { Profile } from './Profile';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { setProfile } from './reducer'
import { connect } from 'react-redux'


class Routes extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    axios({
      type: 'get',
      url: 'http://localhost:8000/profile/' + this.props.user_id + '/',
      headers: {
        'Authorization' : 'Token ' + this.props.token
      }
    }).then(res => {
      this.props.setProfile(res.data)
      console.log(this.props)
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={({match}) => (
              <div> Main Page </div>
            )}/>
            <Route exact path='/coffee/:id' render={({match}) => (
              <Coffee match={match} {...this.props} />
            )}/>
            <Route path='/verify/:key' render={({match}) => (
              <Verify match={match} {...this.props} />
            )}/>
            <Route path='/my-coffee' component={Profile} />
            <Route path='/login' render={() => (
              <Login redirect='/' />
            )}/>
            <Route path='/logout' component={Logout} />
          </Switch>
        </BrowserRouter>
      </div>
    )
    }

  }

  function mapStateToProps(state) {
    return {
      token: state.token,
      user_id: state.user_id,
      profile: state.profile
    };
  };

  function mapDispatchToProps(dispatch) {
    return (
      bindActionCreators({setProfile: setProfile}, dispatch)
    );
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Routes)
