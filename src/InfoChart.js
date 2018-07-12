import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap'; 
import {Doughnut} from 'react-chartjs-2';
import './App.css';



class InfoChart extends Component {
    constructor(props) {
        super();
    }

    render() {
        let myData = {
            datasets: [{
                data: [this.props.myData.created,this.props.myData.helped,this.props.myData.replied],
                backgroundColor: ["#4286f4", "#41f4be", "#8b41f4"]
            }],
            labels: ['created', 'helped', 'replied']
        };

        return (
            <div className="InfoChart">
                <Container>
                    <Row>
                        <Col>
                            <Doughnut data={myData} width= {100} height={50}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default InfoChart;
