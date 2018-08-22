import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap'; 
import {Doughnut, Line, Bar} from 'react-chartjs-2';
import './App.css';



class MonthChart extends Component {
    constructor(props) {
        super();
    }
    render() {
        //Based on data given, apply a random color to the dataset. Will need to make this better. 
        //Really not the best way to do this since it will re-render each time a component is updated.
        let arr = [];
        let arr2 = [];
        let colorArr = [];
        let string = '0123456789ABCDEF';
        let string2 = '';
        for(var key in this.props.myData){
            if(this.props.myData.hasOwnProperty(key)){
                arr.push(this.props.myData[key]);
                arr2.push(key);
                for(var i = 0; i < 6; i++){
                    string2 += string[Math.floor(Math.random()*16)];
                }
                colorArr.push('#' + string2);
                string2 = ''
            }
        }

        let myData = {
            datasets: [{
                data: arr,
                backgroundColor: colorArr,
                label: 'Contribution by Month'
            }],
            labels: arr2
        };

        let chartOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0
                    }
                }]
            }
        };

        return (
            <div className="InfoChart">
                <Container>
                    <Row>
                        <Col>
                            <Bar data={myData} options={chartOptions} width= {100} height={50}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default MonthChart;
