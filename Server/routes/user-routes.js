const express = require('express');
const { db } = require('../utils/db');

const router = express.Router();

router.post('/addUser', (req, res) => {
  const sql = `INSERT INTO tbuser (user_name, login_name, password, level, user_status, reg_dtime) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    req.body.user_name,
    req.body.login_name,
    req.body.password,
    req.body.level,
    req.body.user_status,
    req.body.reg_dtime,
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding User', error: err });
    }
    return res.status(201).json({ success: 'User added successfully', result });
  });
});

router.get('/statuses', (req, res) => {
  const sql = 'SELECT * FROM `tbstatus` WHERE `del_dtime` IS NULL';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching statuses', error: err });
    }
    return res.status(200).json({ result });
  });
});

router.get('/positions', (req, res) => {
  const sql = 'SELECT * FROM `tbposition` WHERE `del_dtime` IS NULL';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching statuses', error: err });
    }
    return res.status(200).json({ result });
  });
});

router.get('/allUser', (req, res) => {
  const sql = 'SELECT * FROM tbuser WHERE `del_dtime` IS NULL';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching User', error: err });
    }
    return res.status(200).json({ result });
  });
});

router.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM tbuser WHERE user_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error getting User', err });
    }
    return res.status(200).json({ result });
  });
});

router.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE tbuser SET user_name=?, login_name=?, password=?, level=?, user_status=?, reg_dtime=? WHERE user_id=?";
  const values = [
    req.body.user_name,
    req.body.login_name,
    req.body.password,
    req.body.level,
    req.body.user_status,
    req.body.reg_dtime,
    id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating user', err });
    }
    return res.status(200).json({ success: 'User updated successfully', result });
  });
});

router.put('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE tbuser SET del_dtime=? WHERE user_id=?";
  const values = [
    req.body.del_dtime,
    id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting user', err });
    }
    return res.status(200).json({ success: 'User deleted successfully', result });
  });
});

module.exports = router;
