const { model, Schema } = require('mongoose')
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
	thoughtText: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 280
	},
	createdAt: {
		type: Date,
		default: Date.now
		// TODO: Use a getter method to format the timestamp on query
	},
	username: {
		type: String,
		required: true
	},
	reactions: [reactionSchema]
})

// TODO: Create a virtual called reactionCount that retrieves
// the length of the thought's reactions array field on query.

const Thought = model('thought', thoughtSchema)

module.exports = Thought
