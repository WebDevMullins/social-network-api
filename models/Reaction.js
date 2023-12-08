// Importing required modules
const { Schema, Types } = require('mongoose')
const dayjs = require('dayjs')

// Creating the reaction schema
const reactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId()
	},
	reactionBody: {
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
		default: dayjs(),
		get: (createdAtVal) => dayjs(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
	}
},
{
	toJSON: {
		getters: true
	},
	id: false
}
)

// Exporting the reaction schema
module.exports = reactionSchema
