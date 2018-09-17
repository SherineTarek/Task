const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

db.connect
    .then(() => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(express.static(__dirname + '/client'));
        app.set('view engine', 'ejs');
        require('./routes/route')(app);
        app.listen(8000);
    })
    .catch(err => console.log(err));
