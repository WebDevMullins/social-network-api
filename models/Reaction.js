const { Schema } = require('mongoose')

const reactionSchema = new Schema({
	reatctionId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId()
	},
	reactionsBody: {
		type: String,
		required: true,
		maxLength: 280
	},
	username: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
		// TODO: Use a getter method to format the timestamp on query
	}
})

module.exports = reactionSchema
