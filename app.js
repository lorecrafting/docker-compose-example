const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const Inventory = require('./db/DS_Inventory.js');
const DS_Inv = new Inventory();

app.use(express.static('public'));

app.use(bp.urlencoded({ extended: true }));

app.engine('.hbs', exphbs({ layout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// render all items
app.get('/', (req, res) => {
  const items = DS_Inv.all();
  console.log('items', items);
  res.render('home', { items });
});

// render out the form
app.get('/item/new', (req, res) => {
  res.render('form');
});

// render out detail
app.get('/item/:id', (req, res) => {
  console.log('did it call');
  const { id } = req.params;
  const item = DS_Inv.getItemById(id);
  console.log('item', item);
  res.render('detail', item);
});

// add item
app.post('/item/new', (req, res) => {
  console.log('req.body', req.body);
  const item = req.body;
  DS_Inv.add(item);
  res.redirect('/');
});

app.listen(process.env.PORT, () => {
  console.log(`Started app on port: ${process.env.PORT}`);
});
