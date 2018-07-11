import React, { Component } from 'react';
import {Container, Row, Button, InputGroup, InputGroupAddon, InputGroupText, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Month.css'

class Month extends Component {
    constructor(props) {
        super();
        this.state = {
            value: '',
            id: '',
            userName: '',
            items: [],
            monthItems: [],
            modal: false
        }
    }

  toggle = () => {
    this.setState({modal: !this.state.modal})
  }  

  handleMonth = (e) => {
    this.setState({value: e.target.value})
  }
  
  getActivityMonth = () => {
    var selectedMonth = this.state.value;
    let arr = [];

    for(let key in this.state.items){
      if(this.state.items.hasOwnProperty(key)){
        var val = this.state.items[key];
        var month = new Date(val.published).getMonth() + 1; 
        if(selectedMonth === month.toString() && val.url !== undefined){
            arr.push(val);
        }
      }
    }

    this.setState({monthItems: arr});
  }

  showActivityByDate = (e) => {
    //console.log(this.props.userName);
    fetch(process.env.REACT_APP_PROXY + 'https://community.esri.com/api/core/v3/people/username/' + _.trim(this.props.userName) + '-esristaff').then((response) => {
        if(response.ok){
        this.setState({
          modal: true
        })
        return response.json();
      } 
    }).then((data) => {
        //console.log(data);
        this.setState({
            id: data.id,
            userName: data.displayName
        });
        return fetch(process.env.REACT_APP_PROXY + 'https://community.esri.com/api/core/v3/people/' + this.state.id + '/activities?fields=verb,url');
    }).then((response) => {
        return response.json();
    }).then((data) => {
        //console.log(data);
        this.setState({
            items: data.list
        });
        this.getActivityMonth();
    }, (error) => {
        this.setState({
            modal: true,
            error
        });
    });
  }
    
  render() {
    const {error, items, userName, monthItems, value} = this.state;
    return (
      <div className='Month'>
        <Container>
            <Row>
                <InputGroupAddon addonType= 'prepend'>Find Replies by Month</InputGroupAddon>
                <select className = 'Select' value={value} onChange={this.handleMonth}>
                    <option value='1' defaultValue>January</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                </select>
                <InputGroupAddon addonType='append'><Button outline color= 'primary' onClick={this.showActivityByDate}>Submit</Button></InputGroupAddon>
            </Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Results</ModalHeader>
          <ModalBody>
            <h5>{userName}</h5>
            <div>{monthItems.map((item, i) => (<div key={i}><a key={i} href={item.url}><b>{item.verb}</b>: {item.url}</a></div>))}</div>
            <br/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Month;
