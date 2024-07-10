const express = require('express');
const { db } = require('../utils/db');

const router = express.Router();

router.post("/addPosition", (req, res) => {
  const sql = "INSERT INTO `tbposition` (`position_name`, `reg_dtime`) VALUES (?, ?)";
  const values = [
    req.body.position_name,
    req.body.reg_dtime
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding position', err });
    }
    return res.status(201).json({ success: 'Added position Successfully', result });
  });
});

router.get("/allPosition", (req, res) => {
  const sql = 'SELECT * FROM `tbposition` WHERE `del_dtime` IS NULL';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error getting position', err });
    }
    return res.status(200).json({ result });
  });
});

router.get("/getPosition/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `tbposition` WHERE `position_id` = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error getting position', err });
    }
    return res.status(200).json({ result });
  });
});

router.put("/updatePosition/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE `tbposition` SET `position_name`=?, `reg_dtime`=? WHERE `position_id`=?";
  const values = [
    req.body.position_name,
    req.body.reg_dtime,
    id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: 'Error updating position', err });
    }
    return res.json({ result });
  });
});

router.delete("/deletePosition/:id", (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE `tbposition` SET `del_dtime` = ? WHERE `position_id`=?";
  const values = [
    req.body.del_dtime,
    id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: 'Error deleting position', err });
    }
    return res.json({ result });
  });
});

module.exports = router;
