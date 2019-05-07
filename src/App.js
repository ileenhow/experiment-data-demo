import React, { useState } from 'react';
import './App.css';
import All from './components/All'
import Single from './components/Single'

const expTypes = [
  '光照',
  '水印',
  '裁剪',
  '时间截取',
  '尺度变换',
]

function App() {
  const [ page, setPage ] = useState('全部')
  function handleClickAll() {
    setPage('全部')
  }

  function handleClickType(type) {
    return () => {
      setPage(type)
    }
  }

  return (
    <div className="app">
      <header>{page === '全部' ? '全部页面' : `分级页面（${page}）`}</header>
      <div className="main">
        <nav className="exp-type-nav">
          <ul className="exp-type-list">
            <li onClick={handleClickAll}>全部</li>
            {expTypes.map((type, i) => (
              <li key={i} onClick={handleClickType(type)}>{type}</li>
            ))}
          </ul>
        </nav>
        {page === '全部'
          ? <All />
          : <Single type={page} />
        }
      </div>
    </div>
  );
}

export default App;
