const express = require('express');
const { db } = require("../utils/db");

const router = express.Router();

router.post('/addStatus', (req, res) => {
  const sql = "INSERT INTO `tbstatus` (`status`, `reg_dtime`) VALUES (?, ?)";
  const values = [
    req.body.status,
    req.body.reg_dtime
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding status', error: err });
    }
    return res.status(201).json({ success: 'Status added successfully', result });
  });
});

router.get('/allStatus', (req, res) => {
  const sql = 'SELECT * FROM `tbstatus` WHERE `del_dtime` IS NULL';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching statuses', error: err });
    }
    return res.status(200).json({ result });
  });
});

router.get('/getStatus/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM `tbstatus` WHERE `status_id` = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching status', error: err });
    }
    return res.status(200).json({ result });
  });
});

router.put('/updateStatus/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'UPDATE `tbstatus` SET `status` = ?, `reg_dtime` = ? WHERE `status_id` = ?';
  const values = [
    req.body.status,
    req.body.reg_dtime,
    id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating status', error: err });
    }
    return res.status(200).json({ message: 'Status updated successfully', result });
  });
});

router.put('/deleteStatus/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE `tbstatus` SET `del_dtime` = ? WHERE `status_id` = ?";
  const values = [
    req.body.del_dtime,
    id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting status', error: err });
    }
    return res.status(200).json({ message: 'Status deleted successfully', result });
  });
});

module.exports = router;
