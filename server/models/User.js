const mongoose = require('mongoose');
const geoSchema = require('./geoposition');
const moment = require('moment');
const now = moment();
const Order= require('./Order')

const options = {
	toJSON: {
		// versionKey: false,
		transform: function (doc, ret) {
			// ret is the object that will be returned as the result
			// (and then stringified before being sent)
			ret['id'] = ret._id;
			delete ret._id;
			delete ret.__v;
			return ret;
		}
	}
};

const Userschema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		prename: { type: String, required: true },
		profilepic: { type: String, default: '' },
		email: { type: String, required: true },
		password: { type: String, required: true },
		passwordResetToken: String,
		passwordResetExpires: Date,
		phone_number: { type: Number, require: true },
		isVerified: { type: Boolean, default: false },
		country_code: { type: Number },
		role: { type: Number, default: 0 }
	},
	options
);
const User = new mongoose.model('Users', Userschema)

const tokenSchema = new mongoose.Schema(
	{
		_userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
		token: { type: String, required: true },
		createdAt: { type: Date, required: true, default: Date.now, expires: 86400 }
	},
	options
);


const Driver = User.discriminator("Driver", new mongoose.Schema({
	CIN: { type: Number, min: 00000000, max: 99999999, required: true, unique: true },
	Adress: { type: String, min: 5, required: true },
/* 	iban: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'BankAccount' },
 */	geoposition: {
		type: {
			default: 'Point',
			type: String
		},
		coordinates: {
			type: [Number],
			index: '2dsphere',
			default: [0, 0]
		}
	},
	icon:{type:String},
	WorkAt: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
	Speciality: { type: String, required: true },
	isFree: { type: Boolean, default: true },
	Orders: {type:[mongoose.Schema.Types.ObjectId],ref:'Order'}
}))

//Admin AKA WORKER
const Admin = User.discriminator("Admin", new mongoose.Schema({
	CIN: { type: Number, min: 00000000, max: 99999999, required: true, unique: true },
	Adress: { type: String, min: 5, required: true },
	service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', unique: true },
}))
const Tokenmodel = mongoose.model('Tokens', tokenSchema);


module.exports = {
	User,
	Admin,
	Driver,
	Tokenmodel
}


