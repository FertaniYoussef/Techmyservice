const Router = require('express').Router();
const { Package } = require('../models/Package');
const { User } = require('../models/User');
const { Service } = require('../models/Services');
const httpCodes = require('../constants/httpCodes');
const verify = require('../middleware/tokenverif');
const mongocodes = require('../constants/mongodbCodes');

Router.post('/:service/addpackage', verify, async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (user.role == process.env.User || user.role == process.env.Driver)
			return res.status(httpCodes.UNAUTHORIZED).send('Access Denied');
		const service = await Service.findOne({ name: req.params.service });
		if (!service) return res.status(httpCodes.NO_CONTENT).send("the service doesn't exist");
		const pack_name = await Package.findOne({ name: req.body.name });
		if (pack_name) return res.status(mongocodes.DUPLICATE_KEY).send('Package already exist');

		const package = new Package({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			service: service._id
		});

		package.save();

		return res.status(httpCodes.OK).send('Package added Succesfuly');
	} catch (err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
	}
});
Router.get('/getpackages',async (req,res)=> {
	try {
			const packages= await Package.find({}).populate('service','name')
			console.log(packages)
			if (!packages) return res.status(httpCodes.NO_CONTENT).send("no package exist yet");
			return res.status(httpCodes.OK).send(packages);

	}catch(err) {
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });

	}
})
Router.delete('/deletepackage', verify, async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (user.role == process.env.User || user.role == process.env.Driver)
			return res.status(httpCodes.UNAUTHORIZED).send('Access Denied');
		const pack_name = await Package.findOneAndDelete({ name: req.body.name });
		if (!pack_name) return res.status(httpCodes.NO_CONTENT).send("the package doesn't exist");
		return res.status(httpCodes.OK).send('the package has been deleted');
	} catch (err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
	}
});
Router.put('/updatepackage', verify, async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (user.role == process.env.User || user.role == process.env.Driver)
			return res.status(httpCodes.UNAUTHORIZED).send('Access Denied');
		const pack_name = await Package.findOneAndUpdate(
			{ name: req.body.name },
			{ name: req.body.name_2, description: req.body.description, price: req.body.price }
		);
		if (!pack_name) return res.status(httpCodes.NO_CONTENT).send("the package doesn't exist");
		return res.status(httpCodes.OK).send('the package has been updated');
	} catch (err) {
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
});

module.exports = Router;
