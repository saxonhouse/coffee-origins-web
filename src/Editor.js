import React, {Component} from 'react'
import { connect } from 'react-redux'
import Form from './Form.js'
import { Redirect } from 'react-router-dom'


class Editor extends Component {

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <Form token={this.props.token} coffee={this.props.coffee} />
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

export default connect(mapStateToProps)(Editor)
