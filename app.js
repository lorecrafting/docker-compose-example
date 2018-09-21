const express = require('express');
const app = express();
const bp = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');

2 



app.use(express.static('public'));


app.use(morgan('dev'))

app.use(bp.urlencoded({ extended: true }));
app.engine('.hbs', exphbs({ layout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// render all items
app.get('/', (req, res) => {
});

// render out the form
app.get('/item/new', (req, res) => {
  res.render('form');
});

// render out detail
app.get('/item/:id', (req, res) => {
  console.log('did it call');
  const { id } = req.params;
});

// add item
app.post('/item/new', (req, res) => {
  console.log('req.body', req.body);
  const item = req.body;
});

app.listen(process.env.EXPRESS_CONTAINER_PORT, () => {
  console.log(`Started app on port: ${process.env.EXPRESS_CONTAINER_PORT}`);
});
