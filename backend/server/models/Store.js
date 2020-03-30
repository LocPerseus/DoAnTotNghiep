const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
        type: String,
        required: [true, 'A store must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    belongToUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]

});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;