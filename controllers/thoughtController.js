const { Thought, User } = require('../models')

const thoughtController = {
	// GET all thoughts
	async getThoughts(req, res) {
		try {
			const thoughts = await Thought.find().select('-__v')
			res.json(thoughts)
		} catch (err) {
			console.error(err)
			res.status(500).json(err)
		}
	},

	// GET a single thought by its _id
	async getThoughtById(req, res) {
		try {
			const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v')
			if (!thought) {
				return res.status(404).json({ message: 'No thought found with this ID!' })
			}
			res.json(thought)
		} catch (err) {
			console.error(err)
			res.status(500).json(err)
		}
	},

	// Create a thought
	async createThought(req, res) {
		try {
			const thought = await Thought.create(req.body)
			// Find the user and push the thought's _id
			// to the user's `thoughts` array
			await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $addToSet: { thoughts: thought } },
				{ runValidators: true, new: true }
			)
			res.json(thought)
		} catch (err) {
			console.error(err)
			res.status(500).json(err)
		}
	},

	// Update a thought by its _id
	async updateThought(req, res) {
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			)
			if (!thought) {
				return res.status(404).json({ message: 'No thought found with this ID!' })
			}
			res.json(thought)
		} catch (err) {
			console.error(err)
			res.status(500).json(err)
		}
	},

	// DELETE a thought by its _id
	async deleteThought(req, res) {
		try {
			const thought = await Thought.findOne({ _id: req.params.thoughtId })

			if (!thought) {
				return res.status(404).json({ message: 'No thought found with this ID!' })
			}
			// Envoke the pre('deleteOne') middleware
			await thought.deleteOne()

			res.json({ message: 'Thought deleted!' })
		} catch (err) {
			console.error(err)
			res.status(500).json(err)
		}
	},

	// POST to create a reaction stored in a single thought's reactions array field
	async createReaction(req, res) {
		try {
			const reaction = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $addToSet: { reactions: req.body } },
				{ runValidators: true, new: true }
			)
			if (!reaction) {
				return res.status(404).json({ message: 'No thought found with this ID!' })
			}
			res.json(reaction)
		} catch (err) {
			console.error(err)
			res.status(500).json(err)
		}
	},

	// DELETE to pull and remove a reaction by the reaction's reactionId value
	async deleteReaction(req, res) {
		try {
			const reaction = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $pull: { reactions: { reactionId: req.params.reactionId } } },
				{ runValidators: true, new: true }
			)
			if (!reaction) {
				return res.status(404).json({ message: 'Check thought and reaction ID!' })
			}
			res.json(reaction)
		} catch (err) {
			console.error(err)
			return res.status(500).json(err)
		}
	}
}

module.exports = thoughtController
