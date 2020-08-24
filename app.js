const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./models').sequelize;
const e = require('express');

dotenv.config();
// sequelize 잘 연동 되었나 확인
const f = async() => {
    try {
        await db.sequlize.authenticate();
        console.log("good");
    }
    catch(err) {
        console.log("bad");
    }
}

const app = express();
// mysql과 연동
sequelize.sync();
f();

const PORT = 80 || 8080;
const develope = process.env.NODE_ENV === 'development' ? 'dev' : 'combined';

app.use(morgan(develope));
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