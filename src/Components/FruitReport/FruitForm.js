import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FruitForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="indent-left">
                <form className="report-form">
                    <label htmlFor="startdate">Select Start Date
                        <input type="date" id="startdate" name="startdate"
                            value={this.props.startDate} onChange={this.props.handleChangeStartDate}
                            min="2018-01-01" max={this.props.endDate} required />
                        <span className="validity"></span>
                    </label>

                    <label htmlFor="enddate">Select End Date
                        <input type="date" id="enddate" name="enddate"
                            value={this.props.endDate} onChange={this.props.handleChangeEndDate}
                            min={this.props.startDate} max="2030-12-31" />
                        <span className="validity"></span>
                    </label>

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