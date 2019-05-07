import React from 'react'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

export default function ExpBarChart({ data, barSize = 30, width = 600, height = 300 }) {
    const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>
            {value > 0 ? `${(value / data.sum * 100).toFixed(2)}%` : '0%'}
        </text>
    }

    return (
        <div className="exp-bar-chart">
            <div>{data.title}</div>
            <BarChart width={width} margin={{top: 20}} height={height} data={data.barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar type="monotone" dataKey="value" barSize={barSize} fill="#8884d8"
                label={renderCustomBarLabel}/>
            </BarChart>
        </div>
    )
}
