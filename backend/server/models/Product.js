const mongoose = require('mongoose')
const OBJECT_ID = mongoose.Schema.Types.ObjectId

const productSchema = mongoose.Schema({
    slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(val) {
                return val < this.price
            },
            message: 'Discount price {(VALUE)} should be below regular price'
        }
    },
    image: {
        type: String
    },
    creationDate: { type: Date, default: Date.now },
    currentRating: { type: Number, default: 0 },
    ratingPoints: { type: Number, default: 0 },
    ratedCount: { type: Number, default: 0 },
    ratedBy: [{ type: OBJECT_ID, ref: 'User' }],
    category: {
        type: OBJECT_ID,
        ref: 'Category',
        required: [true, 'Product must belong to a category']
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product