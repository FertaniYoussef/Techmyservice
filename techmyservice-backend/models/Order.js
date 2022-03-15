const mongoose = require('mongoose');
const geoSchema = require('./geoposition');

const options = {
	toJSON: {
		// versionKey: false,
		transform: function(doc, ret) {
			// ret is the object that will be returned as the result
			// (and then stringified before being sent)
			ret['id'] = ret._id;
			delete ret._id;
			delete ret.__v;
			return ret;
		}
	}
};

const Ordreschema = new mongoose.Schema(
	{
		name: { type: String },
		description: { type: String },
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users'
		},
		package: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'packages',
			required: true
		},
		addon: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Addon',
			default:null
	},
    localisation: 	{type: {
		default: 'Point',
		type: String
	},
	coordinates: {
		type: [ Number ],
		index: '2dsphere'
	}},
    Date:{type:Date, default:Date.now},

    bill: {type : Number, required: true}
	},
	options
);
module.exports.Order = mongoose.model('Order', Ordreschema);
