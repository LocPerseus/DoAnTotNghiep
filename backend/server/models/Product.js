const mongoose = require('mongoose')
const slugify = require('slugify')

const OBJECT_ID = mongoose.Schema.Types.ObjectId

const productSchema = mongoose.Schema({
    slug: {
        type: String,
        lowercase: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
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
        ref: 'Category'
    }
}, {
    timestamps: true
})

productSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true })
    this.name = this.name.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase()
    next()
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product