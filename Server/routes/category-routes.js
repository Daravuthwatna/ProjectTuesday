const express = require('express');
const { db } = require('../utils/db');

const router = express.Router();

router.post('/addCategory', (req, res) => {
  const sql = "INSERT INTO `tbcategory` (`category_name`, `reg_dtime`) VALUES (?, ?)";
  const values = [
    req.body.category_name,
    req.body.reg_dtime
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding category', err });
    }
    return res.status(201).json({ success: 'Added Category Successfully', result });
  });
});

router.get('/allCategory', (req, res) => {
  const sql = 'SELECT * FROM `tbcategory` WHERE `del_dtime` IS NULL';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error getting category', err });
    }
    return res.status(200).json({ result });
  });
});

router.get('/getCategory/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM `tbcategory` WHERE `category_id` = ?";
  db.query(sql, [id] , (err, result) => {
    if(err) {
      return res.status(500).json({ message: 'Error geting category', err });
    }
    return res.status(200).json({result});
  });
})

router.post('/updateCategory/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE `tbcategory` SET `category_name`=?, `reg_dtime`=? WHERE `category_id`=?";
  const values = [
    req.body.category_name,
    req.body.reg_dtime,
    id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: 'Error update category', err });
    }
    return res.json({result});
  });
});

router.post('/deleteCategory/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE `tbcategory` SET `del_dtime` = ? WHERE `category_id`=?"
  const values = [
    req.body.del_dtime,
    id
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: 'Error deleting category', err });
    }
    return res.json({ result });
  });
});


module.exports = router;
