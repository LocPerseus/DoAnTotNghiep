const mongoose = require('mongoose');

const productDetalsSchema = mongoose.Schema({
    size: {
        type: String
    },
    color: {}
})

const Product = mongoose.model('ProductDetail', productDetalsSchema);

module.exports = Product;