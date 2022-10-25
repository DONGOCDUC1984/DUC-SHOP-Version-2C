import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHome } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../style/NavBar.css";

function NavBar({ setShow, cart, user, handleLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link text-white">
              <FontAwesomeIcon icon={faHome} /> Home
            </NavLink>

            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavLink to="/fruitandvegetable" className="nav-link text-dark">
                Fruit And Vegetable
              </NavLink>

              <NavLink to="/breadandcake" className="nav-link text-dark">
                Bread And Cake
              </NavLink>

              <NavLink to="/milk" className="nav-link text-dark">
                Milk
              </NavLink>
            </NavDropdown>
            <NavLink to="/about" className="nav-link text-white">
              About
            </NavLink>
            <NavLink to="/contact" className="nav-link text-white">
              Contact
            </NavLink>

            {user ? (
              <>
                <div className="logout text-white mt-2" onClick={handleLogout}>
                  Log out
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link text-white">
                  Login
                </NavLink>

                <NavLink to="/register" className="nav-link text-white">
                  Register
                </NavLink>
              </>
            )}
            {user && user.isAdmin && (
              <>
                <NavDropdown title="Admin Pages" id="basic-nav-dropdown">
                  <NavLink to="/admin" className="nav-link text-dark">
                    Admin
                  </NavLink>

                  <NavLink to="/createproduct" className="nav-link text-dark">
                    Create Product
                  </NavLink>

                  <NavLink to="/orders" className="nav-link text-dark">
                    Orders
                  </NavLink>

                  <NavLink to="/users" className="nav-link text-dark">
                    Users
                  </NavLink>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {user && (
        <div className="nav-item " style={{ width: "300px" }}>
          <NavLink to="/userprofile" className="nav-link text-white">
            <FontAwesomeIcon icon={faUserCircle} /> {user.name}
          </NavLink>
        </div>
      )}
      <div
        style={{ width: "200px" }}
        className="btn btn-primary rounded-pill  "
        onClick={() => {
          setShow(true);
        }}
      >
        <FontAwesomeIcon icon={faCartShopping} />{" "}
        <span className="badge bg-danger">{cart.length}</span> Show cart
      </div>
    </Navbar>
  );
}

export default NavBar;
