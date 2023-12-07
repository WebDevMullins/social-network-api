const router = require('express').Router()
const { createThought, getThoughts, getThoughtById } = require('../../controllers/thoughtController')

router.route('/').post(createThought).get(getThoughts)
router.route('/:thoughtId').get(getThoughtById)

module.exports = router
