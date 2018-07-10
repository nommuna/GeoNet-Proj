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
      modal: false,
      id: '',
      userName: '',
      txtUsername:'',
      txtYear: '',
      items: [],
      groupData: []
    }
  }

  toggle = () => {
    this.setState({modal: !this.state.modal})
  }

  userHandler = (e) => {
    this.setState({txtUsername: e.target.value})
  }

  yearHandler = (e) => {
    this.setState({txtYear: e.target.value})
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

  reportAllActivity = () => {
    let group = _.countBy(this.state.items,(obj) => {
      return obj.verb.replace('jive:', '');
    });

    this.setState({
      groupData: group
    });
    //console.log(this.state.items);
  }

  reportYearActivity = () => {
    let arr = [];
    for(let key in this.state.items){
      if(this.state.items.hasOwnProperty(key)){
        var val = this.state.items[key];
        var year = new Date(val.published).getFullYear();
        if(this.state.txtYear === year.toString()){
          arr.push(val);
        }
      }
    }

    let group = _.countBy(arr, (obj) => {
      return obj.verb.replace('jive:', '');
    }) 

    this.setState({
      groupData: group
    });
  }


  //KGalliher
  //public class fileds syntax to grab the context of 'this'
  //Get the user id then get the information from the user id {chaining fetch requests}
  getUserInfo = () => {
    this.toggle()
    this.resetForm()

    fetch(process.env.REACT_APP_PROXY + 'https://community.esri.com/api/core/v3/people/username/'+ _.trim(this.state.txtUsername) + '-esristaff').then((response) => {
      if(response.ok){
        this.setState({
          modal: true
        })
        return response.json();
      } 
    }).then((data) => {
      console.log(data);
      this.setState({
        isLoaded: true,
        id: data.id,
        userName: data.displayName
      });
      return fetch(process.env.REACT_APP_PROXY + 'https://community.esri.com/api/core/v3/people/' + this.state.id + '/activities?fields=verb,url');
    }).then(function(response) {
      return response.json()
    }).then((data) => {
      console.log(data);
      this.setState({
        isLoaded: true, 
        items: data.list
      })

      if(!this.state.txtYear){
        this.reportAllActivity();
      } else {
        this.reportYearActivity();
      }
    },(error) => {
      this.setState({
        isLoaded: true,
        modal: true,
        error
      });
    });
  }

  render() {
    const {error, isLoaded, items, userName, groupData} = this.state; //object deconstruction
    if(error){
      return (
        <div>
          <Container>
            <Row>
               <InputGroup>
                    <InputGroupAddon addonType= 'prepend'>Find by Username</InputGroupAddon>
                    <Input placeholder='Username; ex: KGalliher' type='text' value={this.state.txtUsername} onChange={this.userHandler}/>
                    <Input placeholder='Year {optional}' type='number' value={this.state.txtYear} onChange={this.yearHandler}/>
                    <InputGroupAddon addonType='append'><Button onClick={this.getUserInfo} color= 'secondary'>Submit</Button></InputGroupAddon>
               </InputGroup> 
            </Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Results</ModalHeader>
          <ModalBody>
            <h5>Error: {error.message}</h5>
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
                    <Input placeholder='Username; ex: KGalliher' type='text' value={this.state.txtUsername} onChange={this.userHandler}/>
                    <Input placeholder='Year {optional}' type='number' value={this.state.txtYear} onChange={this.yearHandler}/>
                    <InputGroupAddon addonType='append'><Button onClick={this.getUserInfo} color= 'secondary'>Submit</Button></InputGroupAddon>
               </InputGroup> 
            </Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Results</ModalHeader>
          <ModalBody>
            {/* <h5>{userName}</h5>
            <div>{items.map((item, i) => (<p key={i}>{item.url}</p>))}</div> */}
            <h5>{userName}</h5>
            <div>{Object.keys(groupData).map((keyName, keyIndex) => (<p key = {keyIndex}> {keyName}: {groupData[keyName]}</p>))}</div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Username;
