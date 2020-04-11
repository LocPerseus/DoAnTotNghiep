const mongoose = require('mongoose')
const OBJECT_ID = mongoose.Schema.Types.ObjectId

const cartSchema = mongoose.Schema({
    _userID: {
        type: OBJECT_ID,
        ref: 'User',
        require: [true, 'Cart must belong to a User']
    },
    _productIDArray: [{
        type: OBJECT_ID,
        ref: 'Product'
    }],
    quantityArray: {
        type: [Number],
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    numberOfItem: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', cartSchema)