// Set Express and router
const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')
const { check, validationResult } = require('express-validator')

// Set category icons
const CATEGORY = {
  家居物業: 'fa-home',
  交通出行: 'fa-shuttle-van',
  休閒娛樂: 'fa-grin-beam',
  餐飲食品: 'fa-utensils',
  其他: 'fa-pen',
}

// Home
router.get('/', (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.categoryId
  let query = { userId }

  if (categoryId) {
    query.categoryId = categoryId
  }

  Promise.all([
    Category.find({}).lean(),
    Record.find(query).populate('categoryId').lean(),
  ])
    .then(([categories, records]) => {
      let totalAmount = 0
      records.forEach((record) => {
        let date = new Date(record.date)
        let year = date.getFullYear()
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let day = date.getDate().toString().padStart(2, '0')
        record.date = `${year}-${month}-${day}`
        record.categoryIcon = CATEGORY[record.categoryId.name]
        totalAmount += record.amount
      })
      res.render('index', { categories, records, totalAmount })
    })
    .catch((error) => console.log(error))
})

// Show the new expense input form
router.get('/new', (req, res) => {
  Category.find({})
    .lean()
    .then((categories) => res.render('new', { categories }))
    .catch((error) => console.log(error))
})

// Show the edit expense input form
router.get('/edit/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Promise.all([
    Category.find({}).lean(),
    Record.findOne({ _id, userId }).populate('categoryId').lean(),
  ])
    .then(([categories, record]) => {
      let date = new Date(record.date)
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, '0')
      let day = date.getDate().toString().padStart(2, '0')
      record.date = `${year}-${month}-${day}`
      res.render('edit', { categories, record, _id })
    })
    .catch((error) => console.log(error))
})

// Add new expense
router.post(
  '/',
  [
    check('name').notEmpty().withMessage('請輸入名稱'),
    check('date').notEmpty().withMessage('請輸入日期'),
    check('categoryId').notEmpty().withMessage('請選擇類別'),
    check('amount').notEmpty().withMessage('請輸入金額'),
  ],
  (req, res) => {
    const { name, amount, date, categoryId } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((e) => e.msg)
      req.flash('warning_msg', errorMessages)
      Category.find({})
        .lean()
        .then((categories) => {
          res.render('new', {
            name,
            amount,
            date,
            categoryId,
            errors: errors.array(),
            categories,
          })
        })
        .catch((error) => console.log(error))
    }

    const userId = req.user._id
    const newRecord = new Record({
      name,
      amount,
      date,
      categoryId,
      userId,
    })
    newRecord
      .save()
      .then(() => res.redirect('/'))
      .catch((error) => console.log(error))
  }
)

// Edit expense
router.put(
  '/:id',
  [
    check('name').notEmpty().withMessage('請輸入名稱'),
    check('date').notEmpty().withMessage('請輸入日期'),
    check('categoryId').notEmpty().withMessage('請選擇類別'),
    check('amount').notEmpty().withMessage('請輸入金額'),
  ],
  (req, res) => {
    const { name, amount, date, categoryId } = req.body
    const _id = req.params.id
    const userId = req.user._id
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((e) => e.msg)
      req.flash('warning_msg', errorMessages)
      return Promise.all([
        Category.find({}).lean(),
        Record.findOne({ _id, userId }).populate('categoryId').lean(),
      ])
        .then(([categories, record]) => {
          record.date = record.date.toISOString().split('T')[0]
          res.render('edit', {
            record,
            errors: errors.array(),
            categories,
          })
        })
        .catch((error) => console.log(error))
    }

    Record.findOneAndUpdate(
      { _id, userId },
      { $set: { name, amount, date, categoryId } }
    )
      .then(() => res.redirect('/'))
      .catch((error) => console.log(error))
  }
)

// Delete expense
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id

  Record.findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Export
module.exports = router
