const express = require('express');
const { db } = require('../utils/db');

const router = express.Router();

router.post('/addDepartment', (req, res) => {
  const sql = "INSERT INTO tbdepartment (`department_name`,`room_no`,`reg_dtime`) VALUES (?,?,?)";
  const values = [
    req.body.department_name,
    req.body.room_no,
    req.body.reg_dtime
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: 'Error adding department', err });
    }
    return res.json({ success: 'Added department successfully' });
  });
});

router.get('/allDepartment', (req, res) => {
  const sql = "SELECT * FROM `tbdepartment` WHERE `del_dtime` IS NULL";
  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ message: 'Error geting department', err });
    }
    return res.json({result});
  });
});

router.get('/getDepartment/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `tbdepartment` WHERE `department_id` = ?";
  db.query(sql, [id] , (err, result) => {
    if (err) {
      return res.json({ message: 'Error geting department', err });
    }
    return res.json({result});
  });
});

router.post('/updateDepartment/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE `tbdepartment` SET `department_name`=?, `room_no`=?, `reg_dtime`=? WHERE `department_id`=?";
  const values = [
    req.body.department_name,
    req.body.room_no,
    req.body.reg_dtime,
    id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: 'Error update department', err });
    }
    return res.json({result});
  });
});

router.post('/deleteDepartment/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE `tbdepartment` SET `del_dtime` = ? WHERE `department_id` = ?";
  const values = [
    req.body.del_dtime,
    id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: 'Error deleting department', err });
    }
    return res.json({ result });
  });
});


module.exports = router;
