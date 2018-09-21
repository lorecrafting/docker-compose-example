const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const Inventory = require('./db/DS_Inventory.js');
const DS_Inv = new Inventory();
const knex = require('./knex/knex.js')
const morgan = require('morgan');
const winston = require('winston')
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console()
  ]
})



app.use(express.static('public'));


app.use(morgan('dev'))

app.use(bp.urlencoded({ extended: true }));
app.engine('.hbs', exphbs({ layout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// render all items
app.get('/', (req, res) => {
  knex.raw('SELECT * FROM items')
  .then( result => {
    logger.info('SQL QUERY SUCCESSFUL')
    const items = result.rows
    res.render('home', { items })
  })
  .catch( err => {
    logger.error(err)
  })
});

// render out the form
app.get('/item/new', (req, res) => {
  res.render('form');
});

// render out detail
app.get('/item/:id', (req, res) => {
  console.log('did it call');
  const { id } = req.params;
  // const item = DS_Inv.getItemById(id);
  // console.log('item', item);
  knex.raw(`SELECT * FROM items WHERE id = ${id}`)
    .then( result => {
      const item = result.rows[0]
      res.render('detail', item);
    })
    .catch( err => {
      console.log('error', err)
    })
  
});

// add item
app.post('/item/new', (req, res) => {
  console.log('req.body', req.body);
  const item = req.body;
  // DS_Inv.add(item);
  knex.raw(`INSERT INTO items (name, description) VALUES ('${item.name}', '${item.description}')`)
    .then( result => {
      res.redirect('/');
    })
    .catch( err => {
      console.log('error', err)
      res.redirect('/')
    })
  
});

app.listen(process.env.EXPRESS_CONTAINER_PORT, () => {
  console.log(`Started app on port: ${process.env.EXPRESS_CONTAINER_PORT}`);
});
