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

  const Ordreschema = new mongoose.Schema(
    {
      name: { type: String },
      description: { type: String },
      client : {
        type:mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "packages",
      },
    },
    options
  );
  module.exports.Order = mongoose.model('Order', Ordreschema);