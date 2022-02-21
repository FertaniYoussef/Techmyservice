const mongoose=require('mongoose')

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


const Packageschema= new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: {type: Number,required: true,min:1}
},options)

module.exports.Package = mongoose.model('Packages', Packageschema);