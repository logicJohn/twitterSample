const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const appDir = path.dirname(require.main.filename);
const index = require('./router/index.js');
require('dotenv').config({path: appDir+'/config/.env'  });


const twit = require('twitter');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

app.use('/api', index);

const port = (process.env.PORT || 3000);
const myhost = '0.0.0.0';
app.listen(port, myhost, () => {
    console.log(`Website is listening at http://${myhost};${port}...`);
    
});