import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contex/AuthContext';

function Menu() {
  const {isLoggedIn, logout} = useAuth();
  const navigate = useNavigate();

   const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>TODO project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn?(
              <>
              <Nav.Link as={Link} to={"/dashboard"}>Dashboard</Nav.Link>
              </>
            ):(
              <>
              </>
            )}
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={"/"}>Action</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        <Nav>
          {isLoggedIn ? (
            <>
              <Nav.Link as={Link} to="/profile-page">Profiil</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ):(
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;