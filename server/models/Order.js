const mongoose = require('mongoose');
const geoSchema = require('./geoposition');
const moment = require('moment');
const now = moment();

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
		title: { type: String },
		description: { type: String },
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users'
		},
		package: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Packages',
			required: true
		},
		addon: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Addon',
	},
	service:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Service'
	},
    localisation: 	{type: {
		default: 'Point',
		type: String
	},
	coordinates: {
		type: [ Number ],
		index: '2dsphere',
		default:[0,0]
	}},
	Before:{type: String , default:''},
	Pending:{type:Boolean,default:true},
	After:{type:String,default:''},
    start:{type:Date,},
	end: {type:Date},
	driver: {type:mongoose.Schema.Types.ObjectId,ref:'Driver'},
    bill: {type : Number, required: true}
	},
	options
);
module.exports.Order = mongoose.model('Order', Ordreschema);
