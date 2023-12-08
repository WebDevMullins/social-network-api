const router = require('express').Router()
const {
	createThought,
	getThoughts,
	getThoughtById,
	updateThought,
	deleteThought,
	createReaction,
	deleteReaction
} = require('../../controllers/thoughtController')

router.route('/').post(createThought).get(getThoughts)

router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions').post(createReaction)

router.route('/:thoughtId/reactions/:reactionsId').delete(deleteReaction)

module.exports = router
