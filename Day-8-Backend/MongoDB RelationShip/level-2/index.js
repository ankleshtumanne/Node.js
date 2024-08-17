const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./models/employee');
const Sale = require('./models/sale');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/finance_sales', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Endpoint to find employees in the Finance department with sales on or after 2023-09-16
app.get('/finance-sales', async (req, res) => {
  try {
    const financeEmployeesWithSales = await Sale.find({ saleDate: { $gte: new Date('2023-09-16') } })
      .populate({
        path: 'employeeId',
        match: { department: 'Finance' },
        select: 'name',
      })
      .exec();

    const result = financeEmployeesWithSales
      .filter(sale => sale.employeeId) // Filter out nulls where match failed
      .map(sale => sale.employeeId.name);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
