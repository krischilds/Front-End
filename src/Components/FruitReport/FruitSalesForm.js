import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { min } from 'moment';
import "./fruit-sales.css";

export default class FruitSalesForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fruit: null,
            salesDate: null
        };

        this.handleChangeSalesDate.bind(this);
    }

    handleChangeSalesDate = (event) => {
        this.setState({ salesDate: event.target.value });
    }

    render() {
        return (
            <div style={{ margin: "20px" }}>
                <h4 className="page-title">Fruit Sales</h4>
                <form>

                    <div className="sales-grid">

                        <div className="sales-date"><label htmlFor="salesdate">Sales Date</label>
                            <div><input type="date" id="salesdate" name="salesdate"
                                value={this.state.salesDate}
                                onChange={this.handleChangeSalesDate}
                                required />
                            </div>
                        </div>

                        <div className="sales-item"><label htmlFor="bananaSales">Bananas</label>
                            <div><input type="number" min="0" id="bananaSales" name="bananaSales"
                                value={this.state.bananaSales}
                                onChange={this.handleChangeBananaSales}
                                required />
                            </div>
                        </div>

                        <div className="sales-item"><label htmlFor="appleSales">Apples</label>
                            <div><input type="number" min="0" id="appleSales" name="appleSales"
                                value={this.state.applesSales}
                                onChange={this.handleChangeAppleSales}
                                required />
                            </div>
                        </div>

                        <div className="sales-item"><label htmlFor="orangeSales">Oranges</label>
                            <div><input type="number" min="0" id="orangeSales" name="orangeSales"
                                value={this.state.orangeSales}
                                onChange={this.handleChangeOrangeSales}
                                required />
                            </div>
                        </div>

                        <div className="sales-item"><label htmlFor="strawberrySales">Oranges</label>
                            <div><input type="number" min="0" id="strawberrySales" name="strawberrySales"
                                value={this.state.strawberrySales}
                                onChange={this.handleChangeStrawberrySales}
                                required />
                            </div>
                        </div>

                    </div>

                </form>

            </div>
        )
    }
}


FruitSalesForm.propTypes = {
};