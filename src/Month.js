import React, { Component } from 'react';
import {Container, Row, Button, InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Month.css'

class Month extends Component {
  render() {
    return (
      <div className="Month">
        <Container>
            <Row>
                <InputGroupAddon addonType= "prepend">Find Replies by Month</InputGroupAddon>
                <select className = "Select">
                    <option value="1" defaultValue>January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <InputGroupAddon addonType="append"><Button color= "secondary">Submit</Button></InputGroupAddon>
            </Row>
        </Container>
      </div>
    );
  }
}

export default Month;
