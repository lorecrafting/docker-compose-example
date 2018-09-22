const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const Items = require('./db/models/Items.js')

app.use(express.static('public'));
app.use(morgan('dev'));

app.use(bp.urlencoded({ extended: true }));
app.engine('.hbs', exphbs({ layout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// render all items
app.get('/', (req, res) => {
  Items
    .fetchAll()
    .then( results => {
      const items = results.models.map( item => {
        return item.attributes
      })
      console.log('items', items)
      res.render('home', { items });
    })
});

// render out the form
app.get('/item/new', (req, res) => {
  res.render('form');
});

// render out detail
app.get('/item/:id', (req, res) => {
  const { id } = req.params;
  Items
  .where({ id })
  .fetch()
  .then( data => {
    const item = data.attributes;
    res.render('detail', item)
  })
});

// add item
app.post('/item/new', (req, res) => {
  console.log('req.body', req.body);
  const item = req.body;
  console.log('item',item)
  Items.forge(item)
  .save()
  .then( data => {
    console.log('data from forging')
    res.redirect('/')
  })
});

app.listen(process.env.EXPRESS_CONTAINER_PORT, () => {
  console.log(`Started app on port: ${process.env.EXPRESS_CONTAINER_PORT}`);
});
