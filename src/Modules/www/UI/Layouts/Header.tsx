import React, {FC} from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
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

              <NavDropdown title={'実験'} className={'px-2'}>
                <NavDropdown.Item as={Link} to={'/trpc'}>
                  tRPC
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={'/form'}>
                  Formパーツ
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
  );
}
