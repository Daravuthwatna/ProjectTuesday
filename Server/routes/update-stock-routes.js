const express = require('express');
const { db } = require('../utils/db');

const router = express.Router();

router.post('/addItem', (req, res) => {
  const sql = 'INSERT INTO tbitem (item_name, unit, quantity, price, description, status, category, reg_dtime) VALUES (?,?,?,?,?,?,?,?)';
  const values = [
    req.body.item_name,
    req.body.unit,
    req.body.quantity,
    req.body.price,
    req.body.description,
    req.body.status_id,
    req.body.category_id,
    req.body.reg_dtime
  ];
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding item', error: err });
    }
    const item_id = result.insertId;
    return res.status(201).json({ success: 'Item added successfully', item_id });
  });
});

router.post('/addStock', (req, res) => {
  const getOldQtySql = 'SELECT quantity FROM tbitem WHERE item_id = ?';
  const updateItemQtySql = 'UPDATE tbitem SET quantity = ? WHERE item_id = ?';
  const insertStockSql = 'INSERT INTO tbupdate_stock (stock_date, item_id, old_qty, new_qty, reg_dtime) VALUES (?, ?, ?, ?, ?)';

  const { stock_date, item_id, new_qty, reg_dtime } = req.body;

  db.query(getOldQtySql, [item_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching old quantity', err });
    }

    const old_qty = result[0].quantity;
    const updated_qty = new_qty;

    db.query(updateItemQtySql, [updated_qty, item_id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating item quantity', err });
      }

      const values = [stock_date, item_id, old_qty, updated_qty, reg_dtime];
      db.query(insertStockSql, values, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error adding stock', err });
        }

        return res.status(201).json({ success: 'Stock added successfully', result });
      });
    });
  });
});

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
  const insertRequestDetailSql = "INSERT INTO `tbrequest_detial` (item_id, quantity, request_id) VALUES (?, ?, ?)";
  const getOldQtySql = 'SELECT quantity FROM tbitem WHERE item_id = ?';
  const updateItemQtySql = 'UPDATE tbitem SET quantity = ? WHERE item_id = ?';
  const insertStockSql = 'INSERT INTO tbupdate_stock (stock_date, item_id, old_qty, new_qty, reg_dtime) VALUES (?, ?, ?, ?, ?)';

  const { item_id, quantity, request_id, stock_date, reg_dtime } = req.body;

  db.query(insertRequestDetailSql, [item_id, quantity, request_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding request detail', err });
    }

    db.query(getOldQtySql, [item_id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching old quantity', err });
      }

      const old_qty = result[0].quantity;
      const updated_qty = old_qty - quantity;

      db.query(updateItemQtySql, [updated_qty, item_id], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating item quantity', err });
        }

        const values = [stock_date, item_id, old_qty, updated_qty, reg_dtime];
        db.query(insertStockSql, values, (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Error adding stock', err });
          }

          return res.status(201).json({ success: 'Request detail and stock added successfully', result });
        });
      });
    });
  });
});

module.exports = router;
