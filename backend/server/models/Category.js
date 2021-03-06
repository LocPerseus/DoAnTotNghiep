const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const slugify = require('slugify')

const categorySchema = mongoose.Schema({
    slug: {
        type: String
    },
    name: {
        type: String,
        unique: true,
        required: [true, 'A category must have a name']
    }
}, {
    timestamps: true
})

categorySchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true })
    this.name = this.name.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase()
    next()
})

categorySchema.pre('find', function(next) {
    next()
})

const Category = mongoose.model('Category', categorySchema)
    // const testCategory = new Category({
    //     slug: "ao-phong",
    //     name: "Áo quần"
    // })
    // testCategory
    //     .save()
    //     .then(doc => {
    //         console.log(doc);
    //     })
    //     .catch((err) => {
    //         console.log('ERROR:', err);
    //     });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()

module.exports = Category