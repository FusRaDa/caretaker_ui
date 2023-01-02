import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'

//components
import AuthContext from '../context/AuthContext'
import Login from './Login'

//style
import Container from "react-bootstrap/Container"
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col'

import logo from '../images/caregiver_logo.png'


const Header = () => {

  let {user, logoutUser} = useContext(AuthContext)

  const navigate = useNavigate()

  return (
    <Navbar bg="light" expand="lg" collapseOnSelect>
      <Container fluid>
       
        {!user ? 
        <Navbar.Brand href='#home'>Caregiver Timestamps Project by Matthew Rada</Navbar.Brand> 
        : 
        <Row>
          <Col>
            <img style={{height: '30px'}} alt='caregiver logo' src={logo} onClick={() => navigate('/')}/>
          </Col>
          <Col>
          <Navbar.Brand href='#home'>{`Logged in as: ${user.username}`}</Navbar.Brand>
          </Col>
        </Row>
        }

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
           
            {user ? (
              <Nav>
                <Nav.Link eventKey='1' onClick={() => navigate('/')}>Home</Nav.Link>
                <Nav.Link eventKey='2' onClick={() => navigate('/caregivers')}>Caregivers</Nav.Link>
                <Nav.Link eventKey='3' onClick={() => navigate('/clients')}>Clients</Nav.Link>
                <Nav.Link eventKey='4' onClick={() => navigate('/timestamps')}>Timestamps</Nav.Link>
                <Nav.Link eventKey='5' onClick={() => navigate('/records')}>Records</Nav.Link>
                <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
              </Nav>
        
            ): (
              <Nav>
                <Login/>
              </Nav>
            )}

          </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}

export default Header