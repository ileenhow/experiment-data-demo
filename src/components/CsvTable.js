import React from 'react'

export default function CsvTable({ csv }) {
    function getFirstLine() {
        return <tr>{csv.data[0].map(value => <th>{value}</th>)}</tr>
    }

    function getOtherLines() {
        const otherData = csv.data.slice(1)
        return otherData.map(data => (
            data.length && data.length > 1
                ? <tr>{data.map(value => <td>{value}</td>)}</tr>
                : null
        ))
    }

    if (csv && csv.data) {
        return (
            <table className="csv-table">
                <thead>
                    {getFirstLine()}
                </thead>
                <tbody>
                    {getOtherLines()}
                </tbody>
            </table>
        )
    } else {
        return null
    }
}
