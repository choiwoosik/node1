const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const route = require('./routes/route.js');
const db = require('./db.js');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'www')));
app.use('/js', express.static(path.join(__dirname,  'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

db();

app.use('/', route);
app.use((req, res, next) => { // 404 처리 부분
  res.status(404).send('일치하는 주소가 없습니다!');
});
app.use((err, req, res, next) => { // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
});
app.listen(8080, () => {
  console.log('Express App on port 8080');
});
