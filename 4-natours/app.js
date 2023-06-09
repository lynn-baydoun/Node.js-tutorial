const express = require('express');
const fs = require('fs');
const { send } = require('process');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

//1) MIDDLEWARE
//console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//middleware (the data of the body is added to it)
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

//defining the next function means that we are declaring this as middleware
app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3) ROUTES
//sub-application
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
