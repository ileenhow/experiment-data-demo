import React, { useState, useEffect } from 'react'
import dirTree from '../dirTree.json'
import { csv } from '../utils/csv'
import CsvTable from '../components/CsvTable'
import ExpBarChart from '../components/ExpBarChart'
import VideoPair from '../components/VideoPair'

export default function Single({ type }) {
    const csvFileInfo = dirTree.children.find(item => {
        return item.name === `result_${type}.csv`
    })
    const [csvResult, setCsvResult] = useState({})
    const [videos, setVideos] = useState([])

    useEffect(() => {
        if (csvResult.data) {
            return
        }
        csv(csvFileInfo.path.replace('./public', ''))
            .then(res => {
                setCsvResult(res)
            })
    })

    function getBarChartData() {
        let csv = csvResult.data
        if (csv[csv.length - 1].length <= 1) {
            csv = csv.slice(0, csv.length - 1)
        }
        return csv[0].reduce((result, data, i) => {
            if (data) {
                const newData = csv.slice(1).reduce((res, line) => {
                    res.sum += parseInt(line[i], 10)
                    res.barData.push({
                        name: line[0],
                        value: parseInt(line[i], 10)
                    })
                    return res
                }, {
                    title: data,
                    sum: 0,
                    barData: []
                })
                result.push(newData)
            }
            return result
        }, [])
    }

    function handleCellClick({ value, row, col }) {
        if (value === '0') {
            return
        }
        const videos = dirTree.children
            .find(item => item.name === row).children
            .find(item => item.name === type).children
            .find(item => item.name === col).children
        setVideos(videos)
    }

    return (
        <div className="single-type-page">
            <div className="table-part">
                <div className="title">{`${type}结果分析`}</div>
                <CsvTable csv={csvResult} onCellClick={handleCellClick}/>
                {videos.length > 0 && videos.map(data => (
                    <VideoPair data={data} />
                ))}
            </div>
            <ul className="barchart-part">
                {csvResult.data && getBarChartData().map(data => (
                    <ExpBarChart key={data.title} barSize={15} data={data} width={300} height={200} />
                ))}
            </ul>
        </div>
    )
}
