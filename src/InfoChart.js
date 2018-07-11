import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap'; 
import {Chart, Doughnut, Bar} from 'react-chartjs-2';
import './App.css';



class InfoChart extends Component {
    constructor(props) {
        super();
    }

    // componentWillMount = () => {
    //     Chart.pluginService.register({
    //         beforeInit: function (chart, easing) {
    //             // Plugin code.
    //             var data = chart.config.data;
    //             for (var key in this.props.infoChart2Items) {
    //                 if(this.props.infoChart2Items.hasOwnProperty(key)){
    //                     data.labels.push(key);
    //                     data.datasets[0].data.push(this.props.infoChart2Items[key]);
    //                 }
    //             }
    //         }
    //     });
    // }

    render() {
        let myData = {
            datasets: [{
                data: [this.props.myData.created,this.props.myData.helped,this.props.myData.replied],
                backgroundColor: ["#4286f4", "#41f4be", "#8b41f4"]
            }],
            labels: ['created', 'helped', 'replied']
        };

        let myData2 = {
            datasets: [{
                data: [],
                backgroundColor: ["#4286f4", "#41f4be", "#8b41f4", "#8b41f4", "#8b41f4"]
            }],
            labels: []
        };
        return (
            <div className="InfoChart">
                <Container>
                    <Row>
                        <Col>
                            <Doughnut data={myData} width= {100} height={50}/>
                        </Col>
                        <Col>
                            <Bar data={myData2} width={100} height={50}/>
                        </Col>
                        {/* {this.state.data? <Doughnut data={this.state.data} width= {100} height={50}/>: null} */}
                        {/* <Doughnut data={myData} width= {100} height={50}/> */}
                    </Row>
                </Container>
            </div>
        );
    }
}


export default InfoChart;
