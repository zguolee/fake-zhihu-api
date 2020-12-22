const Koa = require('koa')
const bodyBody = require('koa-body');
const koaError = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const path = require('path');
const koaStatic = require('koa-static');
const app = new Koa();
const routes = require('./routes');
const { DB_URL } = require('./config');

// 创建连接
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 连接成功
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to ' + DB_URL);
})

// 连接异常
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
})

app.use(koaStatic(path.join(__dirname, 'public')));

app.use(koaError({
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : {
    stack, ...rest
  }
}));

app.use(bodyBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true
  }
}));
app.use(parameter(app));
routes(app);
app.listen(3000, () => {
  console.log('启动在3000端口');
});