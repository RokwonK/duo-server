'use strict'

// helmat 등 보안 모듈 추가하기

const express = require('express'); 
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const sequelize = require('./models').sequelize;
const routes = require('./routes');
const createError = require('http-errors');

// 환경변수 접근에 가능
dotenv.config();
// mysql과 연동
sequelize.sync()
.then(() => console.log("sequelize connect!"))
.catch( err => console.log(`sequelize error : ${err}`) )

const app = express();
const PORT = process.env.PORT || 3000;
const develope = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';


// 기초 미들웨어 설정
// 로그 찍히게, req.body(string => json으로 인코딩)
app.use(morgan(develope));
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// 어떤 ip에서든 이곳으로 접근가능
app.use(cors());


// 어떤 url이든 routes에서 차리
app.use('/', routes);

// 경로가 없다 404 에러
app.use((req,res,next) => {
    next(createError(404));
})

// 모든 에러 이쪽으로 던지기
// error_handler
app.use((err,req,res,next) => {
    console.log(err);
    res.send(`${err.status}`);
})

// 서버 연결
app.listen(PORT, () => {
    console.log('서버 작동중');
})