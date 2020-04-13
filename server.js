const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));
app.use('/', routes());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
