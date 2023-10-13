import React, {FC} from 'react';
import {Nav, NavDropdown, Navbar} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";


export const Header: FC = () => {
  return (
      <header className={'fixed-top'}>
        <Navbar bg="light" collapseOnSelect className={'small px-3'}>
          <Navbar.Brand as={Link} to='/'>
            <small>
              <FontAwesomeIcon icon={faHouse}/>
            </small>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className={'me-auto'} as={'ul'}>

              <NavDropdown.Item as={Link} to={'/trpc'}>
                tRPC
              </NavDropdown.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
  );
}
