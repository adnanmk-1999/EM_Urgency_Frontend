import { Navbar, Container, Nav } from 'react-bootstrap'
import React from 'react';
import { NavLink } from "react-router-dom";
import { useContext } from "react"
import UserContext from '../../../context/userContext';
import roleController from '../../../helpers/roleLogin';
import Logo from "../../../images/logo1.png"

import './navBar.css'

function NavBar() {

  const userContext = useContext(UserContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="light" className="topnav">

      <Container className="container">
        <img className="logo1" src={Logo} alt="logo"></img>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="me-auto">
            <NavLink to="/" className="newLink">Home</NavLink>
            {roleController.isAdmin() && <NavLink to="/admindashboard" className="newLink">Alert</NavLink>}
            {roleController.isUser() && <NavLink to="/userdashboard" className="newLink">Inbox</NavLink>}
            {roleController.isAdmin() && <>
              <NavLink className="newLink" to="/piechart"> Alert Chart</NavLink>
              <NavLink className="newLink" to="/barchart"> Response Chart</NavLink></>
            }
            <NavLink to="/aboutus" className="newLink">About</NavLink>
            <NavLink to="/contactus" className="newLink">Contact</NavLink>
          </Nav>

          <Nav>
            {!localStorage.getItem('accessToken') &&
              <NavLink to="/login" className="authBtn">Sign In</NavLink>
            }
            {userContext.userDetails &&
              <NavLink
                onClick={() => {
                  userContext.logout();
                  window.location = "/login";
                }}
                to="/login"
                className="authBtn logoutBtn"
              >
                Sign Out
              </NavLink>
            }
          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>
  );
}

export default NavBar;