import React, { useState } from 'react';
import './App.css';
import { csv } from './utils/csv'
import expData from './dirTree.json'
import All from './components/All'

const expTypes = [
  '光照',
  '水印',
  '裁剪',
  '时间截取',
  '尺度变换',
]

function App() {
  const [ page, setPage ] = useState('total')
  const expCsvFiles = expData.children.filter(item => {
    return item.type === 'file'
  })

  // csv('/demo_videos/result_裁剪.csv').then(res => {
  //   console.log(res)
  // })

  return (
    <div className="app">
      <header>{page === 'total' ? '全部页面' : '分级页面'}</header>
      <div className="main">
        <nav className="exp-type-nav">
          <ul className="exp-type-list">
            <li>全部</li>
            {expTypes.map((type, i) => <li key={i}>{type}</li>)}
          </ul>
        </nav>
        <All />
      </div>
    </div>
  );
}

export default App;
