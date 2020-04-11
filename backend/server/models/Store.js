const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const OBJECT_ID = mongoose.Schema.Types.ObjectId

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'A store must have a name'],
        trim: true,
        maxlength: [40, 'A store name must have less or equal then 40 characters'],
        minlength: [5, 'A store name must have more or equal then 5 characters']
    },
    ratingsStore: {
        type: Number,
        default: 4.0,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String
    },
    images: [String],
    belongToUser: { type: OBJECT_ID, ref: 'User', require: true },
    categories: [{ type: OBJECT_ID, ref: 'Category' }],
    comments: [{ type: OBJECT_ID, ref: 'Comment' }]
}, {
    timestamps: true
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store