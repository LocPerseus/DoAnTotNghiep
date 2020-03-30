const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const isDevelopment = process.env.NODE_ENV === 'development';
const AppError = require('./utils/appError');
const apiRouter = require('./routes/index');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

// 1) MIDDLEWARES
// if (isDevelopment) {
//     app.use(morgan('dev'));
// }
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 2) ROUTES
app.use('/api', apiRouter);
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'Fail',
    //     message: `Can't find ${req.originalUrl} on this server!`
    // })
    // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    // err.status = 'fail';
    // err.statusCode = 404;

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app