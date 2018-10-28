import React, { Component } from 'react';
import { connect } from 'react-redux';
import posed from 'react-pose';
import { Image, Row, Navbar, Nav, NavItem, Grid} from 'react-bootstrap';

const ContainerDiv = posed.div({
    enter: { staggerChildren: 100 },
    exit: { staggerChildren: 20}
  });

const Fade = posed.div({
  enter: {opacity: 1, duration: 500},
  exit: {opacity: 0, duration: 500}
})


class Header extends Component {
  render() {
    return(
      <Row>
        <ContainerDiv initialPose={'exit'} pose={'enter'}>
          <Navbar Fluid>
            <Navbar collapseOnSelect className='no-margin-bottom'>
              <Navbar.Header>
                <Navbar.Brand>
                <Fade>
                  <a href="/">
                    <Image src='https://brewcross.co.uk/brewcross-web.svg' className='logo'/>
                  </a>
                </Fade>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Fade>
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
                </Fade>
              </Navbar.Collapse>
            </Navbar>
          </Navbar>
        </ContainerDiv>
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
