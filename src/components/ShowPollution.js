import React  from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Pie, Doughnut } from 'react-chartjs-2';

const state2 = {
    labels: ['No2', 'So2', 'O3',
        'PM10', 'PM2.5'],
    datasets: [
        {
            label: 'Rainfall',
            backgroundColor: [
                '#B21F00',
                '#C9DE00',
                '#2FDE00',
                '#00A6B4',
                '#6800B4'
            ],
            hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000',
                '#003350',
                '#35014F'
            ],
            data: [65, 59, 80, 81, 56]
        }
    ]
}
const state = {
    labels: ['No2', 'So2', 'O3',
        'PM10', 'PM2.5'],
    datasets: [
        {
            label: 'Pollution',
            backgroundColor: 'rgba(75,192,192,1)',
            fill: false,
            lineTension: 0.5,
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
        }
    ]
}
class ShowPollution extends React.Component {


    constructor(props) {
        super(props)
        this.info = {

            "pm25": {
                "normalizer": 100 / 71,
                "name": "PM 2.5",
                "norms": [
                    [
                        35, 'bar-green'
                    ],
                    [
                        53, 'bar-orange'
                    ],
                    [71, 'bar-red']
                ]
            },
            "pm10": {
                "normalizer": 100 / 101,
                "name": "PM 10",
                "norms": [
                    [
                        40, 'bar-green'
                    ],
                    [
                        75, 'bar-orange'
                    ],
                    [101, 'bar-red']
                ]
            },
            "no2": {
                "normalizer": 100 / 601,
                "name": "No2",
                "norms": [
                    [
                        200, 'bar-green'
                    ],
                    [
                        400, 'bar-orange'
                    ],
                    [601, 'bar-red']
                ]
            },
            "so2": {
                "normalizer": 100 / 1065,
                "name": "So2",
                "norms": [
                    [
                        266, 'bar-green'
                    ],
                    [
                        532, 'bar-orange'
                    ],
                    [1065, 'bar-red']
                ]
            },
            "o3": {
                "normalizer": 100 / 241,
                "name": "o3",
                "norms": [
                    [
                        100, 'bar-green'
                    ],
                    [
                        160, 'bar-orange'
                    ],
                    [241, 'bar-red']
                ]
            }
        }
    }
   

    render() {
        if (this.props.stationStatus) {
            this.stationStatus = this.props.stationStatus;
        }
        if (this.props.stationName) {
            this.stationName = this.props.stationName;
        } else {
            this.stationName = null;
        }
        if (this.props.stationPollution) {
            this.stationPollution = this.props.stationPollution;
        } else {
            this.stationPollution = null;
        }
        if (this.props.loadingTownList) {
            return (
                <div></div>
            )
        } else if (this.props.loadingStation) {
            return (
                <div className="row mt-3">
                    <div className="col-md-12 d-flex justify-content-center">
                        <img src={"rings.svg"} alt="loading" /></div>
                </div>
            )
        } else {
            return (
                <div>
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionAppear={true}
                        transitionEnter={false}
                        transitionLeave={false}
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        transitionAppearTimeout={1000}>
                        <div id="ShowPollution" className="row mt-4 mb-5">
                            <div className="col-md-12 d-flex justify-content-center">
                                {this.stationName && <h2 id="CityTitle">
                                    <b>{this.stationName}</b>
                                </h2>}
                            </div>
                            <div className="col-md-12 d-flex justify-content-center pr-0 pl-0">
                                {this.stationPollution && <div className="col-md-10">
                                    {Object
                                        .keys(this.stationPollution)
                                        .map((pollution, i) => {
                                            let pollutionValue = this.stationPollution[pollution]['v'];
                                            let info = this.info[pollution];
                                            let colorBar;
                                            let colorLegendBarGreen;
                                            let colorLegendBarOrange;
                                            let colorLegendBarRed;
                                            let widthBar = pollutionValue;

                                            if (pollution === "pm25" || pollution === "pm10" || pollution === "no2" || pollution === "so2" || pollution === "o3") {
                                                widthBar = pollutionValue * info['normalizer'];
                                                colorLegendBarGreen = info['norms'][0][0] * info['normalizer'];
                                                colorLegendBarOrange = info['norms'][1][0] * info['normalizer'] - colorLegendBarGreen;
                                                colorLegendBarRed = info['norms'][2][0] * info['normalizer'] - colorLegendBarOrange - colorLegendBarGreen;

                                                if (pollutionValue <= info['norms'][0][0]) {
                                                    colorBar = info['norms'][0][1];
                                                } else if (pollutionValue <= info['norms'][1][0]) {
                                                    colorBar = info['norms'][1][1]
                                                } else {
                                                    colorBar = info['norms'][2][1]
                                                };

                                                return (
                                                    <div key={i} className="row mt-2">
                                                        <div className="col-md-2 d-flex align-items-center justify-content-center">
                                                            <h4 className="mb-0">{this.info[pollution]['name']}</h4>
                                                        </div>
                                                        <div className="col-md-10">
                                                            <div
                                                                className="progress legend"
                                                                style={{
                                                                    height: '3px'
                                                                }}>
                                                                <div
                                                                    className="progress-bar bar-green-info"
                                                                    role="progressbar"
                                                                    style={{
                                                                        width: colorLegendBarGreen + "%"
                                                                    }}
                                                                    aria-valuenow="15"
                                                                    aria-valuemin="0"
                                                                    aria-valuemax="100"></div>
                                                                <div
                                                                    className="progress-bar bar-orange-info"
                                                                    role="progressbar"
                                                                    style={{
                                                                        width: colorLegendBarOrange + "%"
                                                                    }}
                                                                    aria-valuenow="30"
                                                                    aria-valuemin="0"
                                                                    aria-valuemax="100"></div>
                                                                <div
                                                                    className="progress-bar bar-red-info"
                                                                    role="progressbar"
                                                                    style={{
                                                                        width: colorLegendBarRed + "%"
                                                                    }}
                                                                    aria-valuenow="20"
                                                                    aria-valuemin="0"
                                                                    aria-valuemax="100"></div>
                                                            </div>
                                                            <div
                                                                className="progress"
                                                                style={{
                                                                    height: '30px'
                                                                }}>
                                                                <div
                                                                    className={"progress-bar " + colorBar}
                                                                    role="progressbar"
                                                                    style={{
                                                                        width: widthBar + '%'
                                                                    }}
                                                                    aria-valuenow={this.stationPollution[pollution]['v']}
                                                                    aria-valuemax="10"><span className="ml-2">{this.stationPollution[pollution]['v']}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                </div>}
                            </div>
                        </div>
                    </ReactCSSTransitionGroup>
                 <div>
                        <div className="col-md-12 d-flex justify-content-center">
                            {this.stationName && <h2 id="CityTitle">
                                <b>{this.stationName}</b>
                            </h2>}
                        </div>
                        <div className="col-md-12 d-flex justify-content-center pr-0 pl-0">
                            {this.stationPollution && <div className="col-md-10">
                                <Bar
                                    data={state}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Stats',
                                            fontSize: 20
                                        },
                                        legend: {
                                            display: true,
                                            position: 'right'
                                        }
                                    }}
                                />
                            </div>}
                        </div>

                 </div>                
                 <div>
                        <div className="col-md-12 d-flex justify-content-center">
                            {this.stationName && <h2 id="CityTitle">
                                <b>{this.stationName}</b>
                            </h2>}
                        </div>
                        <div className="col-md-12 d-flex justify-content-center pr-0 pl-0">
                            {this.stationPollution && <div className="col-md-10">
                                <Line
                                    data={state}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Pollution',
                                            fontSize: 20
                                        },
                                        legend: {
                                            display: true,
                                            position: 'right'
                                        }
                                    }}
                                />
                            </div>}
                        </div>

                 </div>                
                 <div>
                        <div className="col-md-12 d-flex justify-content-center">
                            {this.stationName && <h2 id="CityTitle">
                                <b>{this.stationName}</b>
                            </h2>}
                        </div>
                        <div className="col-md-12 d-flex justify-content-center pr-0 pl-0">
                            {this.stationPollution && <div className="col-md-10">
                                <Pie
                                    data={state2}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Pollution During Day',
                                            fontSize: 20
                                        },
                                        legend: {
                                            display: true,
                                            position: 'right'
                                        }
                                    }}
                                />

                                <Doughnut
                                    data={state2}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Pollution During Day',
                                            fontSize: 20
                                        },
                                        legend: {
                                            display: true,
                                            position: 'right'
                                        }
                                    }}
                                />
                                />
                            </div>}
                        </div>

                 </div>                
                </div>
                
            )
        }
    }
}

export default ShowPollution;