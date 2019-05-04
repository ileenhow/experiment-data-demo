import Papa from 'papaparse'

export const csv = (url) => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
    })
  })
}
