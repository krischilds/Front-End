import React, { Component } from 'react'
import FruitReport from "./FruitReport";
import moment from 'moment';
import { config } from "../../config";
import "./fruit-report.css";
import getMockData from "./Mock";

export default class FruitContainer extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        console.log(props.match.params);

        // initialize startDate and endDate with today's date
        const dateStr = moment().format('YYYY-MM-DD');

        this.state = {
            fruitData: null,
            startDate: dateStr,
            endDate: dateStr,
            loadedFruitData: false
        };


        // this.handleChangeStartDate.bind(this);
        // this.handleChangeEndDate.bind(this);
        this.updateDateFilter.bind(this);
    }

    updateDateFilter = (startDate, endDate) => {
        this.setState({ startDate, endDate });
    }

    /*
    handleChangeStartDate = event => {
        this.setState({ startDate: event.target.value });
    };

    handleChangeEndDate = event => {
        this.setState({ endDate: event.target.value });
    };
*/

    loadFruitData = () => {
        fetch(`${config.apiUrl}/api/fruit`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && data.data.length) {
                    this.setState({
                        fruitData: data.data,
                        loadedFruitData: true
                    });
                }
            })
            .catch(err => {
                console.log(err);
                // fallback to mock data if API fails
                const mock = getMockData();
                this.setState({ fruitData: mock, loadedFruitData: true });
            });
    }

    componentDidMount() {
        // load fruit from API
        this.loadFruitData();
    }

    render() {
        const filteredData = this.filterDataByDateRange(this.state.startDate, this.state.endDate, this.state.fruitData);
        return (
            <FruitReport
                fruitData={filteredData}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                updateDateFilter={this.updateDateFilter} />
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