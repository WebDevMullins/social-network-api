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

// /api/thoughts
router.route('/').post(createThought).get(getThoughts)

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router
