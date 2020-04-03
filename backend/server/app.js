const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const AppError = require('./utils/appError');
const apiRouter = require('./routes/index');
const globalErrorHandler = require('./controllers/errorController');
const app = express();

// 1) MIDDLEWARES
// Security HTTP headers
app.use(helmet());

app.use(morgan('dev'));

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});


app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// app.use((req, res, next) => {
//     console.log(req.headers);
//     next();
// });

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