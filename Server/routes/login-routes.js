const express = require('express');
const { db } = require('../utils/db');

const router = express.Router();

router.post('/admin', (req, res) => {
  const { login_name, password } = req.body;
  const sql = 'SELECT * FROM `tbuser` WHERE `login_name` = ? AND `password` = ? AND `user_status` = 5 AND `level` = 2';

  db.query(sql, [login_name, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid Admin Name or Password' });
    }

    res.status(200).json({ message: 'Login Successful', user: result[0] });
  });
});

router.post('/user', (req, res) => {
  const { login_name, password } = req.body;
  const sql = 'SELECT * FROM `tbuser` WHERE `login_name` = ? AND `password` = ? AND `user_status` = 5 AND `level` = 3';

  db.query(sql, [login_name, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid Username or Password' });
    }

    res.status(200).json({ message: 'Login Successful', user: result[0] });
  });
});

module.exports = router;
