const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

// mysql
const app = express();
const PORT = 3000 || 80;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cors());


app.get('/', (req,res) => {
    console.log('ujiho babo');
    res.send('real');
});



app.listen(PORT, () => {
    console.log('서버 작동중');
})