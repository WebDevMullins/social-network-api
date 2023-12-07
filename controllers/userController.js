const { User } = require('../models')

const userController = {
	// GET all users
	async getUsers(req, res) {
		const users = await User.find().select('-__v')
		try {
			return res.status(200).json(users)
		} catch (err) {
			console.error(err)
			res.status(500).json(err)
		}
	},

	// GET a single user by its _id
	async getUserById(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.userId }).select('-__v')
			if (!user) {
				return res.status(404).json({ message: 'No user found with this id!' })
			}
			return res.status(200).json(user)
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
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				req.body,
				{ runValidators: true, new: true }
				)
			if (!user) {
				return res.status(404).json({ message: 'No user found with this id!' })
			}
			return res.status(200).json(user)
		} catch (err) {
			console.error(err)
			return res.status(400).json(err)
		}
	},

	// DELETE user by its _id
	async deleteUser(req, res) {
		try {
			const user = await User.findOneAndDelete({ _id: req.params.userId })
			if (!user) {
				return res.status(404).json({ message: 'No user found with this id!' })
			}
			// TODO: Delete associated thoughts when user is deleted.
			res.status(200).json({ message: 'User deleted!' })
		} catch (err) {
			console.error(err)
			return res.status(400).json(err)
		}
	},

	// Add friend to user's friend list
	async addFriend(req, res) {
		try {
			const friend = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ friends: req.params.friendId },
				{ runValidators: true, new: true }
			)
			if (!friend) {
				return res.status(404).json({ message: 'No user found with this id!' })
			}
			return res.status(200).json(friend)
		} catch (err) {
			console.error(err)
			return res.status(400).json(err)
		}
	},

	// Remove friend from user's friend list
	async deleteFriend(req, res) {
		try {
			const friend = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $pull: { friends: req.params.friendId } },
				{ runValidators: true, new: true }
			)
			if (!friend) {
				return res.status(404).json({ message: 'No user found with this id!' })
			}
			return res.status(200).json(friend)
		} catch (err) {
			console.error(err)
			return res.status(400).json(err)
		}
	}
}

module.exports = userController
