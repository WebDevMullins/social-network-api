const { Thought, User } = require('../models')

const thoughtController = {
	// GET all thoughts
	async getThoughts(req, res) {
		try {
			const thoughts = await Thought.find().select('-__v')
			return res.status(200).json(thoughts)
		} catch (err) {
			console.error(err)
			return res.status(500).json(err)
		}
	},

	// GET a single thought by its _id
	async getThoughtById(req, res) {
		try {
			const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v')
			if (!thought) {
				return res.status(404).json({ message: 'No thought found with this ID!' })
			}
			return res.status(200).json(thought)
		} catch (err) {
			console.error(err)
			return res.status(500).json(err)
		}
	},

	// Create a thought
	async createThought(req, res) {
		try {
			const thought = await Thought.create(req.body)
			await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $push: { thoughts: thought } },
				{ runValidators: true, new: true }
			)
			return res.status(200).json({ message: 'Thought created and added to user!' })
		} catch (err) {
			console.error(err)
			return res.status(500).json(err)
		}
	}
}

module.exports = thoughtController