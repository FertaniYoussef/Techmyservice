const mongoose = require('mongoose');
const options = {
	toJSON: {
	  // versionKey: false,
	  transform: function (doc, ret) {
		// ret is the object that will be returned as the result
		// (and then stringified before being sent)
		ret["id"] = ret._id;
		delete ret._id;
		delete ret.__v;
		return ret;
	  },
	},
  };

const Userschema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	passwordResetToken: String,
	passwordResetExpires: Date,
	phone_number: { type: Number, require: true },
	isVerified: { type: Boolean, default: false },
	country_code: { type: Number },
	role: { type: Number, default: 0 }
},
options);
const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
}, options);
module.exports.User = mongoose.model('Users', Userschema);
module.exports.Tokenmodel=mongoose.model('Tokens',tokenSchema)

/* const Driver= User.discriminator('Admin',new mongoose.Schema({
    
  }) )
 */