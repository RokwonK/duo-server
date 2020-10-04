'use strict'

const express = require('express');
// 
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const sequelize = require('./models').sequelize;
const controllers = require('./controllers');
const createError = require('http-errors');

// 환경변수 접근에 가능
dotenv.config();
// mysql과 연동
sequelize.sync()
.then(() => console.log("sequelize connect!"))
.catch( err => console.log(`sequelize error : ${err}`) )

const app = express();
const PORT = process.env.PORT || 8000;
const develope = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';


// 기초 미들웨어 설정
app.use(morgan(develope));
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// 어떤 ip에서든 이곳으로 접근가능
app.use(cors());


// 라우트
app.use('/', controllers);




// 없는 경로가 없다 404 에러
app.use((req,res,next) => {
    next(createError(404));
})

// error_handler
app.use((err,req,res,next) => {
    res.send(`${err.status}`);
})

// 서버 연결
app.listen(PORT, () => {
    console.log('서버 작동중');
})