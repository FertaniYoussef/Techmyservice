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
			ref: 'Users'
		},
		package: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Packages',
			required: true
		},
		addon: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Addon',
	},
    localisation: 	{type: {
		default: 'Point',
		type: String
	},
	coordinates: {
		type: [ Number ],
		index: '2dsphere'
	}},
	Before:{type: String , default:''},
	After:{type:String,default:''},
    Date:{type:Date, default:Date.now},
	hasPackage: {type:Boolean, default:true},
    bill: {type : Number, required: true}
	},
	options
);
module.exports.Order = mongoose.model('Order', Ordreschema);
