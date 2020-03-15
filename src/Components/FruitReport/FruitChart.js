import React from "react";
import Chart from "react-google-charts";
import PropTypes from 'prop-types'

export default function FruitChart(props) {

    let chartSection = (<div className="indent-left">
        <p className='warning-text'>Unable to display chart.</p>
        <p>There is no data available between {props.startDate} and {props.endDate}</p>
    </div>);

    if (props.fruitData && props.fruitData.length) {
        const chartData = mapDataToChartData(props.fruitData);
        chartSection = (
            <Chart
                chartType="ColumnChart"
                width="75%"
                height="300px"
                data={chartData}
            />
        );
    }

    return (
        <section>
            {chartSection}
        </section>
    )
}

/**
 * @param {*} data Fruit sales data
 * @returns converts input data to an array that is understood by the chart
 */
const mapDataToChartData = (data) => {
    const barColor = "rgb(59, 200, 255)";
    let bananas = ["Bananas", 0, barColor];
    let oranges = ["Oranges", 0, barColor];
    let apples = ["Apples", 0, barColor];
    let strawberries = ["Strawberries", 0, barColor];
    data.forEach(row => {
        bananas[1] = bananas[1] + row.bananas;
        oranges[1] = oranges[1] + row.oranges;
        apples[1] = apples[1] + row.apples;
        strawberries[1] = strawberries[1] + row.strawberries;
    });

    const chartData = [
        ["Fruit", "Sales", { role: "style" }],
        bananas, oranges, apples, strawberries
    ];

    return chartData
}


FruitChart.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    fruitData: PropTypes.array
};