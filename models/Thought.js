const { model, Schema } = require('mongoose')
const reactionSchema = require('./Reaction')
const User = require('./User')
const dayjs = require('dayjs')

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 280
		},
		createdAt: {
			type: Date,
			default: dayjs(),
			get: (createdAtVal) => dayjs(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
		},
		username: {
			type: String,
			required: true
		},
		reactions: [reactionSchema]
	},
	{
		toJSON: {
			virtuals: true,
			getters: true
		},
		id: false
	}
)

// Create a virtual called reactionCount that retrieves
// the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length
})

// Remove the thoughtId from the associated user's `thoughts` array
thoughtSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
	// 'this' will be the thought document
	try {
		await User.updateOne({ username: this.username }, { $pull: { thoughts: this._id } })
		next()
	} catch (error) {
		next(error)
	}
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought
