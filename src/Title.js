import React, { Component } from 'react';
import {Container, Row} from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Title extends Component {
  render() {
    return (
      <div className="Title">
        <Container>
            <Row>
               <h2>GeoNet "Big Brother"</h2>
            </Row>
        </Container>
      </div>
    );
  }
}

export default Title;
