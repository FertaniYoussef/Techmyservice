const Router = require('express').Router();
const { Package } = require('../models/Package');
const { User } = require('../models/User');
const { Order } = require('../models/Order');
const httpCodes = require('../constants/httpCodes');
const verify = require('../middleware/tokenverif');

Router.post('/addorder/:name', verify, async (req, res) => {
	try {
		const pack_name = await Package.findOne({ name: req.params.name });
		if (!pack_name) return res.status(httpCodes.NO_CONTENT).send("Package doesn't exist");
		const user = await User.findById(req.user._id);

		const order = new Order({
			name: pack_name.name,
			description: pack_name.description,
			client: user,
			package: pack_name
		});

		order.save();
		return res.status(httpCodes.CREATED).send('Order passed Succesfuly');
	} catch (err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
	}
});
Router.delete('/deleteorder/:name', verify, async (req, res) => {
	try {
		const order = await Order.findOneAndDelete({ name: req.params.name });
		if (!order) return res.status(httpCodes.NO_CONTENT).send("the package doesn't exist");
		return res.status(httpCodes.OK).send('The order has been cancelled');
	} catch (err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
	}
});
Router.put('/modifyorder/:name', verify, async (req, res) => {
	try {
		const pack_name = await Package.findOne({ name: req.body.name });
		if (!pack_name) return res.status(httpCodes.NO_CONTENT).send("Package doesn't exist");
		const order = await Order.findOneAndUpdate(
			{ name: req.params.name },
			{ name: pack_name.name, description: pack_name.description, package:pack_name }
		);
		if (!order) return res.status(httpCodes.NO_CONTENT).send("the order doesn't exist");
		return res.status(httpCodes.OK).send('the order has been updated');
	} catch (err) {
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
});

module.exports=Router