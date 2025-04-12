const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000

const XLSX = require('xlsx');
const fs = require('fs');
const cors = require('cors');
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'http://localhost:5000' 
    : 'http://localhost:3000'
}));
app.use(express.json());

const csvPath = process.env.NODE_ENV === 'production'
  ? path.join(process.resourcesPath, 'server', 'data.csv')
  : path.join(__dirname, 'data.csv'); 


if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/build')
  app.use(express.static(clientBuildPath))
}


app.get('/csv-data', (req, res) => {
  try {
    const workbook = XLSX.readFile(csvPath, { type: 'file' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    res.json({
      status: 'success',
      total: jsonData.length,
      sheetName: sheetName,
      data: jsonData
    });
  } catch (err) {
    console.error('Failed to read CSV file:', err);
    res.status(500).json({
      status: 'error',
      message: 'Failed to read or parse CSV file.'
    });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
}

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
  console.log('CSV Path:', csvPath);
  if (process.send) process.send('ready') 
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
