import Papa from 'papaparse'

export const csv = (url) => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      encoding: 'gb2312',
      complete (res) {
        resolve(res)
      }
    })
  })
}
