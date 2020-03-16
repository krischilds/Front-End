import React, { Component } from 'react'
import FruitForm from "./FruitForm";
import FruitTable from './FruitTable';
import FruitChart from './FruitChart';

export default class FruitReport extends Component {

    constructor(props) {
        super(props);
        console.log("FruitReport");
        console.log(props);

        // Note - I could use spread op but I prefer to explicitly show props
        /*
        this.state = {
            data: props.data,
            startDate: props.startDate,
            endDate: props.endDate,
            handleChangeStartDate: props.handleChangeStartDate,
            handleChangeEndDate: props.handleChangeEndDate
        };
        */
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h4 className="page-title">Fruit Report</h4>
                </div>
                <FruitForm
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    updateDateFilter={this.props.updateDateFilter}
                />
                <hr />
                <FruitTable
                    fruitData={this.props.fruitData}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate} />
                <hr />
                <FruitChart
                    fruitData={this.props.fruitData}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate} />
            </div>

        )
    }
}
