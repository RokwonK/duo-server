'use strict'

const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./models').sequelize;
const controller = require('./controller');
const createError = require('http-errors');

dotenv.config();
// sequelize 잘 연동 되었나 확인
const f = async() => {
    try {
        await sequelize.authenticate();
        console.log("good");
    }
    catch(err) {
        console.log("bad");
    }
}


const app = express();
// mysql과 연동
sequelize.sync().then(() => f());

const PORT = 80 || 8080;
const develope = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';

app.use(morgan(develope));
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
// 어떤 ip에서든 이곳으로 접근가능하게
app.use(cors());

app.use('/', controller);

// 위를 전부 거쳐왔는데도 경로가 없다 404 에러
app.use((req,res,next) => {
    next(createError(404));
})

// 에러가 일어나면 처리해주는 error_handler
app.use((err,req,res,next) => {
    //res.status(err.status);
    res.send(`${err.status}`);
    // res.render('404');
})

app.listen(PORT, () => {
    console.log('서버 작동중');
})