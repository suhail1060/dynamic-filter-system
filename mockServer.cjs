const path = require('path');
const express = require('express');
const cors = require('cors');
const employees = require(path.join(__dirname, 'src/data/employees.json'));

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/employees', (req, res) => {
  res.json(employees);
});

app.listen(3001, () => {
  console.log('Mock API running at http://localhost:3001');
});