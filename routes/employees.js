const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all Employees
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

// GET An Employee
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM employee WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An Employee
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM employee WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ status: 'Employee Deleted' });
    } else {
      console.log(err);
    }
  });
});

// INSERT An Employee
router.post('/', (req, res) => {
  const { id, name, salary } = req.body;

  if (id === null || name === null || salary === null) {
    res.status(400).json({ message: 'Todos los campos son obligatorios' });
  } else {
    const query = `
    CALL employeeAddOrEdit(?, ?, ?);
  `;
    mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Employeed Saved' });
      } else {
        console.log(err);
        console.log('Error');
      }
    });
  }

});

router.put('/:id', (req, res) => {
  const { name, salary } = req.body;
  const { id } = req.params;

  if (id === undefined || id === null) {
    res.status(400).json({ message: 'Usuarios no encontrado' });

  } else {

    if (name === null || salary === null) {
      res.status(400).json({ message: 'Todos los campos son obligatorios' });
    } else {
      const query = `
    CALL employeeAddOrEdit(?, ?, ?);
  `;
      mysqlConnection.query(query, [id, name, salary], (err, rows, fields) => {
        if (!err) {
          res.json({ status: 'Employee Updated' });
        } else {
          console.log(err);
        }
      });
    }

  }

});

module.exports = router;
