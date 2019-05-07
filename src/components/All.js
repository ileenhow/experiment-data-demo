import React, { useState, useEffect } from 'react'
import dirTree from '../dirTree.json'
import { csv } from '../utils/csv'
import CsvTable from '../components/CsvTable'
import ExpBarChart from '../components/ExpBarChart'

export default function All() {
    const expFolders = dirTree.children.filter(item => {
        return item.type === 'folder'
    })
    const [activeExpIndex, setActiceExpIndex] = useState(0)
    const [expCsvs, setExpCsvs] = useState([])

    function handleTabClick (i) {
        return () => {
            setActiceExpIndex(i)
        }
    }

    useEffect(() => {
        if (expCsvs.length) {
            return
        }
        const expCsvPaths = expFolders.map(folder => {
            const csvFile = folder.children.find(child => {
                return child.name === 'total_result.csv'
            })
            return csvFile.path
        })
        window.Promise.all(expCsvPaths.map(path=> {
            return csv(path.replace('./public', ''))
        })).then(res => {
            setExpCsvs(res)
        })
    })

    function getBarChartData() {
        const csv = expCsvs[activeExpIndex].data
        return csv.slice(1).reduce((result, data) => {
            if (data.length && data.length > 1) {
                const newData = data.slice(1).reduce((res, v, i) => {
                    res.sum += parseInt(v, 10)
                    res.barData.push({
                        name: csv[0][i + 1],
                        value: parseInt(v, 10)
                    })
                    return res
                }, {
                    title: data[0],
                    sum: 0,
                    barData: []
                })
                result.push(newData)
            }
            return result
        }, [])
    }

    return (
        <div className="all-data-page">
            <div className="title">总体数据分析</div>
            <ul className="exp-tabs">
                {expFolders.map((folder, i) => (
                    <li className={activeExpIndex === i ? 'active' : ''}
                        onClick={handleTabClick(i)}>
                        {folder.name}
                    </li>
                ))}
            </ul>
            <CsvTable csv={expCsvs[activeExpIndex]} />
            {expCsvs.length && getBarChartData().map(data => (
                <ExpBarChart key={data.title} data={data} />
            ))}
        </div>
    )
}
