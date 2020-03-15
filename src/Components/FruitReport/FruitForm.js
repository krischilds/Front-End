import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FruitForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: props.startDate,
            endDate: props.endDate
        };

        this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate.bind(this);
    }

    handleChangeStartDate = event => {
        // having a handler allows the date value to be changed without reloaded other components
        // onBlur will update parent
        this.setState({ startDate: event.target.value });
    };

    handleChangeEndDate = event => {
        // having a handler allows the date value to be changed without reloaded other components
        // onBlur will update parent
        this.setState({ endDate: event.target.value });
    };

    render() {
        return (
            <div className="indent-left">
                <form className="report-form">
                    <label htmlFor="startdate">Select Start Date
                        <input type="date" id="startdate" name="startdate"
                            value={this.state.startDate}
                            onChange={this.handleChangeStartDate}
                            onBlur={this.props.handleChangeStartDate}
                            min="2018-01-01" max={this.state.endDate} required />
                        <span className="validity"></span>
                    </label>

                    <label htmlFor="enddate">Select End Date
                        <input type="date" id="enddate" name="enddate"
                            value={this.state.endDate}
                            onChange={this.handleChangeEndDate}
                            onBlur={this.props.handleChangeEndDate}
                            min={this.state.startDate} max="2030-12-31" />
                        <span className="validity"></span>
                    </label>

                    <div style={{ marginTop: "4px" }}>
                        <button style={{ padding: "6px", borderRadius: "4px", cursor: "pointer" }} type="button">View Sales</button>
                    </div>
                </form>

            </div>
        )
    }
}

FruitForm.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    handleChangeStartDate: PropTypes.func,
    handleChangeEndDate: PropTypes.func
};