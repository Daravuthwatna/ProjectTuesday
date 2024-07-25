const express = require('express');
const { db } = require('../utils/db');

const router = express.Router();

// router.post('/addItem', (req, res) => {
//   const sql = 'INSERT INTO tbitem (item_name, unit, quantity, price, description, status, category, reg_dtime) VALUES (?,?,?,?,?,?,?,?)';
//   const values = [
//     req.body.item_name,
//     req.body.unit,
//     req.body.quantity,
//     req.body.price,
//     req.body.description,
//     req.body.status_id,
//     req.body.category_id,
//     req.body.reg_dtime
//   ];
//   db.query(sql, values, (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error adding item', error: err });
//     }
//     return res.status(201).json({ success: 'Item added successfully', result });
//   });
// });

router.get('/statuses', (req, res) => {
  const sql = 'SELECT * FROM tbstatus WHERE del_dtime IS NULL';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching statuses', error: err });
    }
    return res.status(200).json({ result });
  });
});

router.get('/categories', (req, res) => {
  const sql = 'SELECT * FROM tbcategory WHERE del_dtime IS NULL';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching categories', error: err });
    }
    return res.status(200).json({ result });
  });
});

router.get('/allItem', (req, res) => {
  const sql = 'SELECT * FROM tbitem WHERE del_dtime IS NULL';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching Item', error: err });
    }
    return res.status(200).json({ result });
  });
});

router.get('/getItem/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM tbitem WHERE item_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error getting Item', err });
    }
    return res.status(200).json({ result });
  });
});

router.put('/updateItem/:id', (req, res) =>{
  const id = req.params.id;
  const sql = "UPDATE tbitem SET item_name=?, unit=?, quantity=?, price=?, description=?, status=?, category=?, reg_dtime=? WHERE item_id=?";
  const values = [
    req.body.item_name,
    req.body.unit,
    req.body.quantity,
    req.body.price,
    req.body.description,
    req.body.status,
    req.body.category,
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

router.put('/deleteItem/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'UPDATE tbitem SET del_dtime=? WHERE item_id=?'
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
