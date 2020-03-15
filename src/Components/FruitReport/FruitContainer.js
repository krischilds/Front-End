import React, { Component } from 'react'
import FruitForm from "./FruitForm";
import "./fruit-report.css";
import FruitTable from './FruitTable';
import FruitChart from './FruitChart';
import moment from 'moment';
import { config } from "../../config";

export default class FruitContainer extends Component {
    constructor(props) {
        super(props);

        // initialize startDate and endDate with today's date
        //const today = new Date();
        const dateStr = moment().format('YYYY-MM-DD');
        /*
        const m = today.getMonth() + 1; // m = month 1..12
        const month = m < 10 ? `0${m}` : m;
        const dateStr = today.getFullYear() + '-' + month + '-' + today.getDate();
        */

        this.state = {
            data: null,
            startDate: dateStr,
            endDate: dateStr,
            loadedFruitData: false
        };

        this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate.bind(this);
    }

    handleChangeStartDate = event => {
        this.setState({ startDate: event.target.value });
    };

    handleChangeEndDate = event => {
        this.setState({ endDate: event.target.value });
    };

    componentDidMount() {
        // load fruit from API
        fetch(`${config.apiUrl}/api/fruit`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && data.data.length) {
                    this.setState({
                        data: data.data,
                        loadedFruitData: true
                    });
                }
            })
            .catch(err => {
                console.log(err);
                // fallback to mock data
                const mock = getMockData();
                this.setState({ data: mock, loadedFruitData: true });
            });
    }

    render() {
        const filteredData = this.filterDataByDateRange(this.state.startDate, this.state.endDate, this.state.data);
        return (
            <div style={{ margin: "20px" }}>
                <h4 className="page-title">Fruit Report</h4>
                <FruitForm
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    handleChangeStartDate={this.handleChangeStartDate}
                    handleChangeEndDate={this.handleChangeEndDate}
                />
                <hr />
                <FruitTable
                    fruitData={filteredData}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate} />
                <hr />
                <FruitChart
                    fruitData={filteredData}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate} />
            </div>
        )
    }

    filterDataByDateRange = (startDate, endDate, data) => {
        if (!data || !startDate || !endDate) {
            return data;
        }

        const filteredData = data.filter((row) => {
            if (!row.date) {
                return true
            }

            let d = new Date(row.date);
            let sd = new Date(startDate);
            let ed = new Date(endDate);
            return this.verifyDateRange(d, sd, ed);
        });

        return filteredData;
    }


    /**
     * 
     * @param {*} d date to check
     * @param {*} sd start date
     * @param {*} ed end date
     */
    verifyDateRange = (d, sd, ed) => {
        return (d >= sd && d <= ed)
    }
}

const getMockData = () => {

    const dateStr = moment().format('YYYY-MM-DD');

    // NOTE: Only use mock data if the Back_End is not running or not returning data
    const mock =
        [
            { date: "2019-01-07", bananas: 401, strawberries: 58, apples: 290, oranges: 191 },
            { date: "2019-02-07", bananas: 354, strawberries: 98, apples: 132, oranges: 123 },
            { date: "2019-03-07", bananas: 512, strawberries: 120, apples: 321, oranges: 159 },
            { date: "2019-04-07", bananas: 287, strawberries: 75, apples: 214, oranges: 187 },
            { date: dateStr, bananas: 11, strawberries: 22, apples: 33, oranges: 44 }

        ];

    return mock;
}