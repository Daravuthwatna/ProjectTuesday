const express = require('express');
const cors = require('cors');
const { db } = require('./utils/db');
const departmentRouter = require('./routes/department-routes');
const categoryRouter = require('./routes/category-routes');
const statusRouter = require('./routes/status-routes');
const userRouter = require('./routes/user-routes');
const positionRouter = require('./routes/position-routes');
const loginRouter = require('./routes/login-routes');
const itemRouter = require('./routes/item-routes');
const requestRouter = require('./routes/request-routes');
const updateStockRouter = require('./routes/update-stock-routes')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const server = () => {
  db.connect((err) => {
    if (err) {
      console.log('Database connection error:', err);
      return;
    }
    console.log('Database connected...');
  });
  
  app.listen(PORT, () => {
    console.log("Express running on PORT", PORT);
  });

  app.get('/', (req, res) => {
    res.send('Running Express...');
  });

  app.use('/departments', departmentRouter);
  app.use('/categories', categoryRouter);
  app.use('/status', statusRouter);
  app.use('/users', userRouter);
  app.use('/positions', positionRouter);
  app.use('/login', loginRouter);
  app.use('/items', itemRouter);
  app.use('/requests', requestRouter);
  app.use('/stock', updateStockRouter)
};

server();
