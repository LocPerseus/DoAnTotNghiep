const mongoose = require('mongoose')
const OBJECT_ID = mongoose.Schema.Types.ObjectId

const orderSchema = mongoose.Schema({
    store: {
        type: OBJECT_ID,
        ref: 'Store'
    },
    user: {
        type: OBJECT_ID,
        ref: 'User'
    },
    product: {
        type: OBJECT_ID,
        ref: 'Product'
    },
    cart: {
        type: OBJECT_ID,
        ref: 'Carts'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)