import React, { Component } from 'react';
import {Container, Row, Button, InputGroup, InputGroupAddon, Input, Modal, ModalHeader, ModalBody, Col} from 'reactstrap';
import _ from 'lodash';
import Month from './Month'
import Infochart from './InfoChart';
import MonthChart from './MonthChart';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Username extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      modal: false,
      showChart: false,
      id: '',
      userName: '',
      txtUsername:'',
      txtYear: '',
      items: [],
      groupData: [],
      monthData: []
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
      items: [],
      id: '',
      modal: false,
      userName: '',
    });
  }

  //Report all activity on geoNet
  reportAllActivity = () => {
    let group = _.countBy(this.state.items,(obj) => {
      return obj.verb.replace('jive:', '');
    });

    this.setState({
      groupData: group
    });
  }

  //Report all activity on geoNet by year
  reportYearActivity = () => {
    let arr = [];
    let arr2 = [];
    for(let key in this.state.items){
      if(this.state.items.hasOwnProperty(key)){
        var val = this.state.items[key];
        var year = new Date(val.published).getFullYear();
        if(this.state.txtYear === year.toString()){
          arr.push(val);
          arr2.push(val.published);
        }
      }
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let monthGroup = _.countBy(arr, (obj) => {
      return monthNames[new Date(obj.published).getMonth()]
    });

    let group = _.countBy(arr, (obj) => {
      return obj.verb.replace('jive:', '');
    }) 

    this.setState({
      groupData: group,
      monthData: monthGroup
    });
  }

  // reportGraphData = (arr) => {
  //   const monthNames = ["January", "February", "March", "April", "May", "June",
  //     "July", "August", "September", "October", "November", "December"
  //   ];
  //   var temp = [];
  //   arr.forEach((element) => {
  //     temp.push(monthNames[new Date(element).getMonth()]);
  //   });

  //   let groupMonths = _.countBy(temp, (obj) => {
  //     return obj;
  //   });

  //   console.log(groupMonths);

  //   this.setState({chartData: groupMonths})
  // }

  //public class fileds syntax to grab the context of 'this'
  //Get the user id then get the information from the user id {chaining fetch requests}
  getUserInfo = (e) => {
    e.preventDefault();
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
      this.setState({
        id: data.id,
        userName: data.displayName
      });
      return fetch(process.env.REACT_APP_PROXY + 'https://community.esri.com/api/core/v3/people/' + this.state.id + '/activities?fields=verb,url');
    }).then(function(response) {
      return response.json()
    }).then((data) => {
      this.setState({
        showChart: true,
        items: data.list
      })

      if(!this.state.txtYear){
        this.reportAllActivity();
      } else {
        this.reportYearActivity();
      }
    },(error) => {
      this.setState({
        modal: true,
        error: "Invalid username"
      });
    });
  }

  render() {
    const {error, items, userName, groupData, monthData} = this.state; //object deconstruction
    if(error){
      return (
        <div>
          <Container>
          <form onSubmit={this.getUserInfo}>
            <Row>
               <InputGroup>
                    <InputGroupAddon addonType= 'prepend'>Find by Username</InputGroupAddon>
                    <Input placeholder='Username; ex: KGalliher' type='text' value={this.state.txtUsername} onChange={this.userHandler}/>
                    <Input placeholder='Year {optional}' type='number' value={this.state.txtYear} onChange={this.yearHandler}/>
                    <InputGroupAddon addonType='append'><Button type= 'submit' onClick={this.getUserInfo} outline color= 'primary'>Submit</Button></InputGroupAddon>
               </InputGroup> 
            </Row>
          </form>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Results</ModalHeader>
          <ModalBody>
            <h5>Error: {error}</h5>
          </ModalBody>
        </Modal>
        <Month/>
        </div>
      )  
    } else {
      return (
        <div className='Username'>
          <Container>
            <form onSubmit={this.getUserInfo}>
              <Row>
                 <InputGroup>
                      <InputGroupAddon addonType= 'prepend'>Find by Username</InputGroupAddon>
                      <Input placeholder='Username; ex: KGalliher' type='text' value={this.state.txtUsername} onChange={this.userHandler}/>
                      <Input placeholder='Year {optional}' type='number' value={this.state.txtYear} onChange={this.yearHandler}/>
                      <InputGroupAddon addonType='append'><Button type= 'submit' onClick={this.getUserInfo} outline color= 'primary'>Submit</Button></InputGroupAddon>
                 </InputGroup> 
              </Row>
            </form>
          </Container>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Results</ModalHeader>
            <ModalBody>
              <h5>{userName}</h5>
              <h6>Year Total</h6>
              <div>{Object.keys(groupData).map((keyName, keyIndex) => (<p key = {keyIndex}> {keyName}: {groupData[keyName]}</p>))}</div>
              <h6>Month Total</h6>
              <div>{Object.keys(monthData).map((keyName, keyIndex) => (<p key = {keyIndex}> {keyName}: {monthData[keyName]}</p>))}</div>
            </ModalBody>
          </Modal>
          <Month userName={this.state.txtUsername}/>
          <Container>
            <Row>
              <Col>
                {this.state.showChart ? <Infochart myData={this.state.groupData}/> : null}
              </Col>
              <Col>
                {this.state.showChart ? <MonthChart myData={this.state.monthData}/> : null}
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}

export default Username;
