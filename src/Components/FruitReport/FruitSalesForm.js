import React, { Component } from 'react'
import FruitTable from './FruitTable';
import moment from 'moment';
import { config } from "../../config";
import "./fruit-sales.css";
import Mock from "./Mock";

export default class FruitSalesForm extends Component {

    constructor(props) {
        super(props);

        // NOTE: only use this if there is no backend running
        this.mock = new Mock();

        const dateStr = moment().format('YYYY-MM-DD');

        this.state = {
            date: dateStr,
            fruitData: null,
            salesDate: dateStr,
            bananaSales: 0,
            strawberrySales: 0,
            orangeSales: 0,
            appleSales: 0,
            message: "",
            useMock: false
        };

        this.handleChangeSalesDate.bind(this);
        this.handleChangeBananaSales.bind(this);
        this.handleChangeAppleSales.bind(this);
        this.handleChangeOrangeSales.bind(this);
        this.handleChangeStrawberrySales.bind(this);
        this.postFruitData.bind(this);
    }

    componentDidMount() {
        this.loadFruitData();
    }

    loadFruitData = () => {
        fetch(`${config.apiUrl}/api/fruit`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && data.data.length) {
                    this.setState({
                        fruitData: data.data
                    });
                }
            })
            .catch(err => {
                console.log(err);
                // fallback to mock data if API fails
                if (!this.state.fruitData) {
                    this.setState({ fruitData: this.mock.getData(), useMock: true });
                }
            });
    }

    postFruitData = () => {

        // new salse data added in form
        const newSalesData = {
            date: this.state.salesDate || this.state.date,
            bananas: this.state.bananaSales,
            apples: this.state.appleSales,
            oranges: this.state.orangeSales,
            strawberries: this.state.strawberrySales
        }

        console.log(newSalesData);

        // if no backend API, add to mock data to demo this feature
        if (this.state.useMock) {
            this.mock.addData(newSalesData);
            this.setState({ fruitData: this.mock.getData(), message: JSON.stringify(newSalesData) });
        } else {

            fetch(`${config.apiUrl}/api/fruit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSalesData),
            })
                .then((response) => response.json())
                .then((data) => {
                    let m = '';
                    try {
                        m = JSON.stringify(data);
                    } catch (err) {
                        m = "New fruit added."
                    }

                    this.setState({ message: m });
                    this.loadFruitData();
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

    }


    handleChangeSalesDate = (event) => {
        this.setState({ salesDate: event.target.value, message: '' });
    }

    handleChangeBananaSales = (event) => {
        this.setState({ bananaSales: event.target.value, message: '' });
    }

    handleChangeAppleSales = (event) => {
        this.setState({ appleSales: event.target.value, message: '' });
    }

    handleChangeOrangeSales = (event) => {
        this.setState({ orangeSales: event.target.value, message: '' });
    }

    handleChangeStrawberrySales = (event) => {
        this.setState({ strawberrySales: event.target.value, message: '' });
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h4 className="page-title">Fruit Sales Form</h4>
                </div>
                <form>
                    <div className="indent-left">
                        <div className="sales-grid">

                            <div className="sales-date"><label htmlFor="salesdate">Sales Date</label>
                                <div><input type="date" id="salesdate" name="salesdate"
                                    value={this.state.salesDate}
                                    onChange={this.handleChangeSalesDate}
                                    required />
                                </div>
                            </div>

                        </div>
                        <div className="sales-grid">

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

                            <div className="sales-item"><label htmlFor="strawberrySales">Strawberries</label>
                                <div><input type="number" min="0" id="strawberrySales" name="strawberrySales"
                                    value={this.state.strawberrySales}
                                    onChange={this.handleChangeStrawberrySales}
                                    required />
                                </div>
                            </div>

                        </div>

                        <div className="sales-grid">
                            <div style={{ marginTop: "4px" }}>
                                <button onClick={this.postFruitData} className="report-form-button" type="button">Add Sales</button>
                            </div>

                        </div>
                    </div>

                    <div style={{ fontWeight: "bold", padding: "10px" }}>{this.state.message}</div>
                    <hr />

                    <FruitTable fruitData={this.state.fruitData} />

                </form>

            </div>
        )
    }
}