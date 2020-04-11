const Order = require('../models/Order')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllOrders = catchAsync(async(req, res, next) => {})

exports.getOrders