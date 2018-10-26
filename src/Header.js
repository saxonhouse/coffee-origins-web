import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Row, Navbar, Nav, NavItem, Grid} from 'react-bootstrap';


class Header extends Component {
  render() {
    return(
      <Row>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">
                <Image src='https://brewcross.co.uk/brewcross-web.svg' className='logo'/>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          {this.props.user_id > 0?
            <Nav pullRight>

              <NavItem eventKey={1} href="/my-coffee">
                My Coffees
              </NavItem>
              <NavItem eventKey={2} href="/logout">
                Logout
              </NavItem>
            </Nav>
              :
            <Nav pullRight>
              <NavItem eventKey={3} href="/login">
                Login / Signup
              </NavItem>
            </Nav>
          }
          </Navbar.Collapse>
        </Navbar>
      </Row>
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

export default connect(mapStateToProps)(Header)
