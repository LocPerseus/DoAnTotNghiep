const Category = require('../models/Category');
const catchAsync = require('./catchAsync');
const AppError = require('../utils/appError');
// exports.checkID = (req, res, next, val) => {
//     console.log(`Category id is: ${val}`);
//     if (req.params.id * 1 > )
// }

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name) {
//         return res.status(400).json({
//             status: 'Fail',
//             message: 'Missing name'
//         })
//     }
//     next();
// }

exports.getAllCategories = catchAsync(async(req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({
        status: 'Success',
        result: categories.length,
        data: {
            categories
        }
    })
})

exports.getCategory = catchAsync(async(req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return next(new AppError('No category found with that ID', 404));
    }
    res.status(201).json({
        status: 'Success',
        data: {
            category
        }
    })
})


exports.createCategory = catchAsync(async(req, res, next) => {
    // const newCategory = new Category({});
    // newCategory.save();
    const newCategory = await Category.create(req.body);
    res.status(201).json({
        status: 'Success',
        data: {
            category: newCategory
        }
    })
});

exports.deleteCategory = catchAsync(async(req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id, req.body);
    if (!category) {
        return next(new AppError('No category found with that ID', 404));
    }
    res.status(204).json({
        status: 'Success',
        category: null
    })
});

exports.updateCategory = catchAsync(async(req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!category) {
        return next(new AppError('No category found with that ID', 404));
    }
    res.status(200).json({
        status: 'Success',
        category: category
    })
});