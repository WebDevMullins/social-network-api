const { model, Schema } = require('mongoose')

// User schema
const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
	},
	thoughts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'thought'
		}
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: 'user'
		}
	]
})

// TODO: Virtual called friendCount that retrieves the length
// of the user's friends array field on query.

// Create the User model using the userSchema
const User = model('user', userSchema)

module.exports = User
