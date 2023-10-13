import React, {FC} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Link} from "react-router-dom";


export const Header: FC = () => {
  return (
      <header className={'fixed-top'}>
        <Navbar bg="light" collapseOnSelect className={'small px-3'}>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Navbar.Brand as={Link} to='/'>
              <small>
                Leptosystem.com
              </small>
            </Navbar.Brand>

            <Nav className={'me-auto'} as={'ul'}>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
  );
}
