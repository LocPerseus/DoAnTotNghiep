const Category = require('../models/Category')
const Product = require('../models/Product')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.getAllProduct = catchAsync(async(req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
        status: 'success',
        result: products.length,
        data: {
            products
        }
    })
})

// return Products based on Category
exports.getProduct_Cat = catchAsync(async(req, res, next) => {
    await Product.find({ category: req.params.id })
        .populate('category')
        .exec((err, products) => {
            if (err) {
                return next(new AppError('No category found with that ID', 404))
            }
            res.status(200).json({
                status: 'success',
                result: products.length,
                data: {
                    products
                }
            })
        })
})

exports.getProduct = catchAsync(async(req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new AppError('No product found with that ID', 404))
    }
    res.status(201).json({
        status: 'Success',
        data: {
            product
        }
    })
})

exports.createProduct = catchAsync(async(req, res, next) => {
    const category = await Category.findById(req.params.id)

    if (!category) {
        return next(new AppError('No category found with that ID', 404))
    }
    const newProduct = await Product.create(req.body)
    newProduct.category = category._id
    newProduct.save((err) => {
        console.log(err)
    })

    res.status(201).json({
        status: 'Success',
        data: {
            product: newProduct
        }
    })
})

exports.deleteProduct = catchAsync(async(req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id, req.body)

    if (!product) {
        return next(new AppError('No product found with that ID', 404))
    }
    res.status(204).json({
        status: 'Success',
        product: null
    })
})

exports.updateProduct = catchAsync(async(req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!product) {
        return next(new AppError('No product found with that ID', 404))
    }
    res.status(200).json({
        status: 'Success',
        product: product
    })
})