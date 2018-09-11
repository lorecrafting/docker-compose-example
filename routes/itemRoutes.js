const express = require('express');
const Router = express.Router();
const Inventory = require('..//db/DS_Inventory.js');
const DS_Inv = new Inventory();


Router.get('/', (req, res) => {
  const items = DS_Inv.all();
  console.log('items', items);
  res.render('home', { items });
});

// render out the form
Router.get('/new', (req, res) => {
  res.render('form');
});

// render out detail
Router.get('/:id', (req, res) => {
  console.log('did it call');
  const { id } = req.params;
  const item = DS_Inv.getItemById(id);
  console.log('item', item);
  res.render('detail', item);
});

// add item
Router.post('/new', (req, res) => {
  console.log('req.body', req.body);
  const item = req.body;
  DS_Inv.add(item);
  res.redirect('/');
});

module.exports = Router