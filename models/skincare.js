// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

const commentSchema = require('./comment.js')
// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const skincareSchema = new Schema(
	{
		name: String,
		imageUrl: String,
		sensitiveSkin: Boolean,
		day: Boolean,  
		night: Boolean, 
		skinType: String, 
		skinConcern: String,
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Skincare = model('Skincare', skincareSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Skincare
