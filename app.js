const express = require('express');
const path = require('path');
const creator = require('./src/controller/creator');
const painting = require('./src/controller/painting');

const port = 3001;

const app = express();

app.use('/', creator);
app.use('/painting', painting);
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`server nyala di localhost:${port}`);
});
