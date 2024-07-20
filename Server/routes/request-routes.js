const express = require('express');
const { db } = require('../utils/db');

const router = express.Router();

router.post('/addRequest', (req, res) => {
  const sql = "INSERT INTO tbrequest (request_date, department, requester, remark, request_form, user) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.request_date,
    req.body.department_id,
    req.body.requester,
    req.body.remark,
    req.body.request_form,
    req.body.user_id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding request', err });
    }
    const request_id = result.insertId;
    return res.status(201).json({ success: 'Request added successfully', request_id });
  });
});

router.post('/addRequestDetail', (req, res) => {
  const sql = "INSERT INTO `tbrequest_detial` (item_id, quantity, request_id) VALUES (?, ?, ?)";
  const values = [
    req.body.item_id,
    req.body.quantity,
    req.body.request_id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding request detail', err });
    }
    return res.status(201).json({ success: 'Request detail added successfully', result });
  });
});

router.put('/updateRequest/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE tbrequest SET request_date=?, department=?, requester=?, remark=?, request_form=?, user=? WHERE request_id=?";
  const values = [
    req.body.request_date,
    req.body.department,
    req.body.requester,
    req.body.remark,
    req.body.request_form,
    req.body.user,
    id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating request', err });
    }
    return res.status(200).json({ success: 'Request updated successfully', result });
  });
})

router.get('/getRequest/:id', (req, res) => {
  const id = req.params.id;;
  const sql = 'SELECT * FROM tbrequest WHERE request_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error getting request', err });
    }
    return res.status(200).json({ result });
  })
});

router.get('/allUserRequest', (req, res) => {
  const sql = "SELECT r.request_id, r.request_date, r.department, r.requester, r.user, d.request_detail_id, d.item_id, d.quantity FROM tbrequest r INNER JOIN tbrequest_detial d ON r.request_id = d.request_id WHERE del_dtime IS NULL";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error getting requests', err });
    }
    return res.status(200).json({ result });
  });
});

router.get('/department', (req, res) => {
  const sql = "SELECT * FROM tbdepartment WHERE del_dtime IS NULL";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error getting departments', err });
    }
    return res.status(200).json({ result });
  });
});

router.get('/user', (req, res) => {
  const sql = "SELECT * FROM tbuser WHERE del_dtime IS NULL AND level = 3";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching users', err });
    }
    return res.status(200).json({ result });
  });
});

router.get('/item', (req, res) => {
  const sql = 'SELECT * FROM tbitem WHERE del_dtime IS NULL';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching Item', err });
    }
    return res.status(200).json({ result });
  });
});

module.exports = router;
