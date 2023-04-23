import { memo } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBarMenu() {
  return (
    <Navbar bg="light" expand="sm">
      <Container fluid>
        <Navbar.Brand href="/">Todo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="/Tasks">Tasks</Nav.Link>
            <Nav.Link href="/About">About</Nav.Link>
            <Nav.Link href="/ContactUs">Contact us</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default memo(NavBarMenu);