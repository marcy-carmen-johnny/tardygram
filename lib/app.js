const express = require('express');
const app = express();
//middlewars get executed in order. 
const connection = require('./middleware/connect');
const { handler } = require('./middleWare/error');
const notFound = require('./middleware/notFound');
const { bearerToken } = require('./middleware/ensureAuth');

app.use(require('morgan')('dev', {
    skip() {
        return process.env.NODE_ENV === 'test';
    }
}));

app.use(express.json());

app.use(bearerToken);
app.use('/auth', connection, require('./routes/auth'));
app.use('/posts', connection, require('./routes/posts'));

app.use(notFound);
app.use(handler);



module.exports = app;
