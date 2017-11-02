const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();
const fs = require('fs');

app.use(serve('.'));

// app.use(async ctx => {
//   ctx.type = 'html';
//   ctx.body = fs.createReadStream('index.html');
// });

app.listen(3000);