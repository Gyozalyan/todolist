import { memo } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from './Nav.module.css'

const activeLinkClass = ({isActive}) =>  isActive? styles.active : '';

function NavBarMenu() {
  return (
    <Navbar bg="light" expand="lg">
      <NavLink to="/"  className={activeLinkClass }>
        ToDo
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/about" className={activeLinkClass }>About</NavLink>
          <NavLink to="/contactus" className={activeLinkClass }>Contact Us</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default memo(NavBarMenu);
