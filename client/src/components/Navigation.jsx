import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <Navbar bg="primary" expand="sm" variant="dark" fixed="top" className="navbar-padding justify-content-between">
      <Link to="/">
        <Navbar.Brand>
          {/* <i className="bi bi-collection-play icon-size"/> */}CMS
        </Navbar.Brand>
      </Link>
      {/* <Form className="my-2 my-lg-0 mx-auto d-sm-block" action="#" role="search" aria-label="Quick search" onSubmit={handleSubmit}>
        <Form.Control className="mr-sm-2" type="search" placeholder="Search" aria-label="Search query" />
      </Form> */}
      <Nav className="ml-md-auto">
        <Nav.Item>
          <Nav.Link href="#">
            <Link to={"/page/" + 1} state={{nextpage: location.pathname}}>
            <i className="bi bi-person-circle icon-size"/>
            </Link>
            <Link to={"/admin"} state={{nextpage: location.pathname}}>
            <i className="bi bi-person-circle icon-size"/>
            </Link>
          </Nav.Link>
          
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export { Navigation }; 