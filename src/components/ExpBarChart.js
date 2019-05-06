import React from 'react'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

export default function ExpBarChart({ data }) {
    const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>
            {`${(value / data.sum * 100).toFixed(2)}%`}
        </text>
    }

    return (
        <div className="exp-bar-chart">
            <div>{data.title}</div>
            <BarChart width={600} margin={{top: 20}} height={300} data={data.barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar type="monotone" dataKey="value" barSize={30} fill="#8884d8"
                label={renderCustomBarLabel}/>
            </BarChart>
        </div>
    )
}
