const router = require('express').Router();
const productRouter = require('./Product');
const categoryRouter = require('./Category');
const tagsRouter = require('./Tags');
const userRouter = require('./Users');

router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/users', userRouter);
// router.use('/api/v1/tags', tagsRouter);

module.exports = router;