import React, { Component } from 'react';
import {Container, Row, Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import _ from 'lodash';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Username extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false, 
      items: [],
      id: '',
      modal: false,
      userName: '',
      txtboxValue:''
    }
  }

  toggle = () => {
    this.setState({modal: !this.state.modal})
  }

  handleChange = (e) => {
    this.setState({txtboxValue: e.target.value})
  }

  resetForm = () => {
    this.setState({
      error: null,
      isLoaded: false, 
      items: [],
      id: '',
      modal: false,
      userName: '',
    });
  }


  //KGalliher
  //public class fileds syntax to grab the context of 'this'
  //Get the user id then get the information from the user id {chaining fetch requests}
  getUserInfo = () => {
    this.toggle()
    this.resetForm()

    fetch(process.env.REACT_APP_PROXY + 'https://community.esri.com/api/core/v3/people/username/'+ _.trim(this.state.txtboxValue) + '-esristaff').then((response) => {
      if(response.ok){
        this.setState({
          modal: true
        })
        return response.json();
      } else {
        this.setState({
          error: new Error('Not a valid username'),
          modal: true
        });
      }
    }).then((data) => {
      console.log(data);
      this.setState({
        isLoaded: true,
        id: data.id,
        userName: data.displayName
      });
      return fetch(process.env.REACT_APP_PROXY + 'https://community.esri.com/api/core/v3/people/' + this.state.id + '/activities?fields=verb,url');
    },(error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }).then(function(response) {
      return response.json()
    }).then((data) => {
      console.log(data);
      this.setState({
        isLoaded: true, 
        items: data.list
      })
    },(error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  }

  render() {
    const {error, isLoaded, items, userName} = this.state; //object deconstruction
    if(error){
      return (
        <div>
          <Container>
            <Row>
               <InputGroup>
                    <InputGroupAddon addonType= 'prepend'>Find by Username</InputGroupAddon>
                    <Input placeholder='Username; ex: KGalliher' type='text' value={this.state.txtboxValue} onChange={this.handleChange}/>
                    <Input placeholder='Year'/>
                    <InputGroupAddon addonType='append'><Button onClick={this.getUserInfo} color= 'secondary'>Submit</Button></InputGroupAddon>
               </InputGroup> 
            </Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Results</ModalHeader>
          <ModalBody>
            <h5>Invalid Username</h5>
          </ModalBody>
        </Modal>
        </div>
      )  //Change this later
    }

    return (
      <div className='Username'>
        <Container>
            <Row>
               <InputGroup>
                    <InputGroupAddon addonType= 'prepend'>Find by Username</InputGroupAddon>
                    <Input placeholder='Username; ex: KGalliher' type='text' value={this.state.txtboxValue} onChange={this.handleChange}/>
                    <Input placeholder='Year'/>
                    <InputGroupAddon addonType='append'><Button onClick={this.getUserInfo} color= 'secondary'>Submit</Button></InputGroupAddon>
               </InputGroup> 
            </Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Results</ModalHeader>
          <ModalBody>
            <h5>{userName}</h5>
            <div>{items.map((item, i) => (<p key={i}>{item.url}</p>))}</div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Username;
