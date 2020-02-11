const express = require('express');
const path = require('path');
const PORT = 5000;

const app = express();
app.use(express.urlencoded({ extended: false }))


app.set('view engine','ejs');

app.set('views',path.join(__dirname, 'views'));

app.use('/',require('./routes/index'));

app.listen(PORT, ()=> console.log(`server starts at port ${PORT}`));