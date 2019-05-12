import React from 'react'

export default function CsvTable({ csv, onCellClick }) {
    function getFirstLine() {
        return <tr>{csv.data[0].map(value => <th>{value}</th>)}</tr>
    }

    function handleTdClick(v, row, col) {
        return () => {
            onCellClick && onCellClick({
                value: v,
                row: csv.data[row + 1][0],
                col: csv.data[0][col],
            })
        }
    }

    function getOtherLines() {
        const otherData = csv.data.slice(1)
        return otherData.map((data, i) => (
            data.length && data.length > 1
                ? <tr>{data.map((value, j) => (
                    <td onClick={handleTdClick(value, i, j)}>{value}</td>
                ))}</tr>
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
