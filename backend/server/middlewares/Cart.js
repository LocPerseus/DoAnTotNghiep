const Cart = require('../models/Cart')

const catchAsync = require('../utils/catchAsync')

exports.isEmptyCart = catchAsync(async(req, res, next) => {
    const cartDetails = await Cart.find({
            _userID: req.user.id,
            status: 'YET_TO_CHECKOUT'
        })
        .populate('_productIDArray')
        .exec()
})