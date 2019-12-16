import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Routes from './Routes';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';
import './App.css';


function App(props) {
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, userHasAuthenticated] = useState(false);

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        setIsAuthenticating(false);
    }

    async function handleLogout() {
        await Auth.signOut();
        userHasAuthenticated(false);
        props.history.push('/login');
    }

    return (
        !isAuthenticating &&
        <div className='App container'>
            <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
              <LinkContainer to='/'>
                <Navbar.Brand>Scratch</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                  <Nav.Link href='#features'>Features</Nav.Link>
                  <Nav.Link href='#pricing'>Pricing</Nav.Link>
                  <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
                    <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
                    <NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
                    <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Nav>
                  {isAuthenticated
                  ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  : <>
                    <LinkContainer to='/signup'>
                      <Nav.Link>Signup</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/login'>
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                  </>
                  }
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
         </div>
    );
}

export default withRouter(App);
