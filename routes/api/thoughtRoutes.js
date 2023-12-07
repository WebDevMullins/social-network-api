const router = require('express').Router()
const {
	createThought,
	getThoughts,
	getThoughtById,
	updateThought,
	deleteThought
} = require('../../controllers/thoughtController')

router.route('/').post(createThought).get(getThoughts)

router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought)

module.exports = router
