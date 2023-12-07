const { User } = require('../models')

const userController = {
	// GET all users
	async getUsers(req, res) {
		const userData = await User.find().select('-__v')
		try {
			res.json(userData)
		} catch (err) {
			console.error(err)
			res.status(500).json(err)
		}
	},

	// GET a single user by its _id
	async getUserById(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.id }).select('-__v')
			if (!user) {
				return res.status(404).json({ message: 'No user found with this id!' })
			}
			res.json(user)
		} catch (err) {
			console.error(err)
			res.status(400).json(err)
		}
	},

	// Create user
	async createUser(req, res) {
		try {
			const user = await User.create(req.body)
			return res.status(200).json(user)
		} catch (err) {
			console.log(err)
			return res.status(500).json(err)
		}
	},

	// Update user by its _id
	async updateUser(req, res) {
		try {
			const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
			if (!user) {
				return res.status(404).json({ message: 'No user found with this id!' })
			}
			res.json(user)
		} catch (err) {
			console.error(err)
			return res.status(400).json(err)
		}
	}
}

module.exports = userController
