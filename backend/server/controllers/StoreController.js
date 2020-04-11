const Store = require('../models/Store')
const User = require('../models/User')
const Category = require('../models/Category')
const Comment = require('../models/Comment')

const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllStores = catchAsync(async(req, res, next) => {
    const stores = await Store.find()
    res.status(200).json({
        status: 'success',
        result: stores.length,
        data: {
            stores
        }
    })
})

exports.getStore = catchAsync(async(req, res, next) => {
    await Store.findById(req.params.id)
        .populate({ path: 'comment', populate: { path: 'userID' } })
        .populate('category')
        .exec((err, store) => {
            if (err) {
                return next(new AppError('No category found that ID ', 404))
            }
            res.status(200).json({
                status: 'success',
                data: {
                    store
                }
            })
        })
})

exports.createStore = catchAsync(async(req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user.id, { role: 'store' }, {
            new: true,
            runValidators: true
        }
    )

    if (!user) {
        return next(new AppError('No user found with that ID', 404))
    }
    const newStore = await Store.create(req.body)
    newStore.belongToUser = user
    newStore.save()
    res.status(201).json({
        status: 'success',
        data: {
            store: newStore
        }
    })
})

exports.updateStore = catchAsync(async(req, res, next) => {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!store) {
        return next(new AppError('No store found with that ID', 404))
    }
    res.status(200).json({
        status: 'Success',
        store: store
    })
})

exports.deleteStore = catchAsync(async(req, res, next) => {
    const store = await Store.findByIdAndDelete(req.params.id, req.body)

    if (!store) {
        return next(new AppError('No store found with that ID', 404))
    }
    res.status(204).json({
        status: 'Success',
        store: null
    })
})

exports.addComment = catchAsync(async(req, res, next) => {
    const store = await Store.findOne(req.params.storeID)
    console.log(store)
    if (!store) {
        return next(new AppError('No store found with that ID', 404))
    }
    const newComment = await Comment.create(req.body)
    store.comments.push(newComment._id)
    store.save()

    return res.status(201).json({
        status: 'success',
        data: {
            comment: newComment
        },
        belongToStore: req.params.storeID
    })
})

exports.getAllComments = catchAsync(async(req, res, next) => {
    await Store.findById(req.params.storeId)
        .populate('comments')
        .exec((err, comments) => {
            if (err) {
                return next(new AppError('No store found that id', 404))
            }
            res.status(200).json({
                status: 'success',
                data: comments
            })
        })
})

// exports.deleteComment = catchAsync(async(req,res,next) => {

// })