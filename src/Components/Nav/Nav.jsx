import { useState, memo } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Modal,Button } from "react-bootstrap";

import WelcomeModal from "../WelcomeModal/WelcomeModal";

function NavBarMenu() {
  const [showModal, setShowModal] = useState(true);
  const handleCloseModal = () => {
    setShowModal(false); // function to hide modal
  };

  return (
<div>
{/* {showModal && <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome to My Site</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>This is the welcome modal content.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>} */}

        



   <Navbar bg="light" expand="sm">
      <Container fluid>
        <Navbar.Brand href="/">Todo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link href="/About">About</Nav.Link>
            <Nav.Link href="/ContactUs">Contact us</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
       
      </Container>
    </Navbar>
    </div>
  );
}

export default memo(NavBarMenu);