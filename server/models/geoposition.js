const mongoose= require('mongoose')

const geoSchema = new mongoose.Schema({
	type: {
		default: 'Point',
		type: String
	},
	coordinates: {
		type: [ Number ],
		index: '2dsphere'
	}
});
module.exports = geoSchema