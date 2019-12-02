import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";

function App(props) {
    return (
        <div className="App container">
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
              <LinkContainer to="/">
                <Navbar.Brand>Scratch</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#features">Features</Nav.Link>
                  <Nav.Link href="#pricing">Pricing</Nav.Link>
                  <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                 <LinkContainer to="/signup">
                  <Nav.Link>Sign up </Nav.Link>
                 </LinkContainer>
                 <LinkContainer to="/login">
                  <Nav.Link>Log in</Nav.Link>
                 </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Routes />
         </div>
    );
}

export default App;
