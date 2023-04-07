import { React, useContext } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { LoginContext, ManagersContext } from './App.js';
import './App.css';

function NavBar() {
  const { loggedIn } = useContext(LoginContext);
  const { managers } = useContext(ManagersContext);
  const navigate = useNavigate();

  // console.log('managers from NavBar:\n', managers);

  return (
    <>
      {!loggedIn &&
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href='/'>Home</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
              <Navbar.Text>
                <span className='login' onClick={() => {navigate('/login')}}>Login</span> | <span className='login' onClick={() => {navigate('/signup')}}>Signup</span>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      }
      {loggedIn &&
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => {navigate('/')}}>Home</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => {navigate('/myinventory')}}>My Inventory</Nav.Link>
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              {managers.map((manager,index) => (
                <NavDropdown.Item key={index} onClick={() => {navigate(`/${manager}`)}}>
                {manager}
              </NavDropdown.Item>
              ))}

            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      }

    </>
  )
}

export default NavBar;