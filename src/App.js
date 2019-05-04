import React from 'react';
import './App.css';
import Papa from 'papaparse'

function App() {
  fetch('/csv/result_裁剪.csv', {
    headers: {
      'Content-Type': 'charset=utf-8'
    }
  }).then(res => console.log(res))
  Papa.parse('/csv/result_裁剪.csv', {
    download: true,
    encoding: 'gb2312',
    complete (res) {
      console.log(res)
    }
  })
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
