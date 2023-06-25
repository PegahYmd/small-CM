import { React, useContext, useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { LoginForm } from './Auth';
import MessageContext from '../messageCtx';
import API from '../API';

 



function NotFoundLayout() {
    return(
        <>
          <h2>This is not the route you are looking for!</h2>
          <Link to="/">
            <Button variant="primary">Go Home!</Button>
          </Link>
        </>
    );
}

/**
 * This layout should be rendered while we are waiting a response from the server.
 */
function LoadingLayout(props) {
  return (
    <Row className="vh-100">
      <Col md={4} bg="light" className="below-nav" id="left-sidebar">
      </Col>
      <Col md={8} className="below-nav">
        <h1>page Library ...</h1>
      </Col>
    </Row>
  )
}

function LoginLayout(props) {
  return (
    <Row className="vh-100">
      <Col md={12} className="below-nav">
        <LoginForm login={props.login} />
      </Col>
    </Row>
  );
}

export {NotFoundLayout, LoadingLayout ,LoginLayout}; 
