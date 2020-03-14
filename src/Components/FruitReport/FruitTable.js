import React from 'react'
import PropTypes from 'prop-types'

export default function FruitTable(props) {
    let tableSection = (<section className="indent-left">
        <p className='warning-text'>Unable to display data table.</p>
        <p>There is no data available between {props.startDate} and {props.endDate}</p>
    </section>);
    if (props.fruitData && props.fruitData.length) {

        const headers = ["date", "bananas", "strawberries", "apples", "oranges"];
        const headerTags = headers.map((item, i) => {
            return <th key={i}>{item}</th>
        })
        const header = <thead><tr>{headerTags}</tr></thead>;
        const table = buildTableRows(props.fruitData);
        tableSection = (<section className="indent-left">
            <div style={{ padding: "4px" }}>Sales data from {props.startDate} to {props.endDate}</div>
            <table className='greyGridTable'>{header}{table}</table></section>);
    }

    return (
        tableSection
    )
}

const buildTableRows = (rows) => {
    const tableRows = rows.map((row) => {
        const d = row.date.slice(0, 10);
        return (
            <tr key={d}>
                <td>{row.date.slice(0, 10)}</td>
                <td>{row.bananas}</td>
                <td>{row.strawberries}</td>
                <td>{row.apples}</td>
                <td>{row.oranges}</td>
            </tr>
        )
    });
    return <tbody>{tableRows}</tbody>;
}

FruitTable.propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    fruitData: PropTypes.array
};