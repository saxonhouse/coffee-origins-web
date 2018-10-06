import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { MainPage } from './MainPage'

class Admin extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        {this.props.staff?
          <div>
            <MainPage admin />
          </div>
        :
        <Redirect to='/captains-log' />
        }
      </div>
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

export default connect(mapStateToProps)(Admin)
