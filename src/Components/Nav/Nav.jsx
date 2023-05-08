import { memo } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

const activeLinkClass = ({ isActive }) => {
  console.log(isActive)
  const classes = [styles.linkStyle];

  if (isActive) {
    classes.push(styles.active);
  }

  return classes.join(" ");
};

function NavBarMenu() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <NavLink to="/" className={activeLinkClass}>
          ToDo
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/about" className={activeLinkClass}>
              About
            </NavLink>
            <NavLink to="/contactus" className={activeLinkClass}>
              Contact Us
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default memo(NavBarMenu);
