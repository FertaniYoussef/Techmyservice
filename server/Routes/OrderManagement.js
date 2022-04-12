const Router = require('express').Router();
const { Package, Addon } = require('../models/Package');
const { Service } = require('../models/Services');
const { Notify } = require('../middleware/notify');
const { Order } = require('../models/Order');
const { User } = require('../models/User');
const httpCodes = require('../constants/httpCodes');
const verify = require('../middleware/tokenverif');

Router.post('/addorder/:service/:name', verify, async (req, res) => {
	try {
		const service_name = await Service.findOne({ name: req.params.service });
		if (!service_name) return res.status(httpCodes.NO_CONTENT).send("Service doesn't exist");
		const pack_name = await Package.findOne({ name: req.params.name });
		if (!pack_name) return res.status(httpCodes.NO_CONTENT).send("Package doesn't exist");
		let addon=0
		if (req.body.addon) {
			const addon_name= await Addon.findOne({name:req.body.addon})
			addon= addon_name.supplement
		}
		const order = new Order({
			name: pack_name.name,
			description: pack_name.description,
			client: req.user._id,
			package: pack_name._id,
			localisation: { coordinates: req.body.coordinates },
			bill: pack_name.price+addon,
			service:pack_name.service
		});

		order.save();
		resultat = await Notify(order, service_name);
		if (resultat) console.log("we notifed a driver , he'll be with you soon");
		else console.log('your order has been passed , but no driver are availabe please wait');
		return res.status(httpCodes.CREATED).send('Order passed Succesfully');
	} catch (err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
	}
});
Router.get('/getorders', verify, async (req, res) => {
	try {
		
		let orders= []
		const user = await User.findById(req.user._id);
		if (user.role == process.env.User) {
		orders = await Order.find({ client: req.user._id }).populate({path:'package' ,select:'name service',populate:{path:'service',select:'name'}});
		
		} else {
		orders = await Order.find({hasPackage:true}).populate('client','username').populate({path:'package' ,select:'name service' ,populate:{path:'service',select:'name'}});
		
		
		}
		
		if (!orders) return res.status(httpCodes.NO_CONTENT).send('no order exist yet');
		
		console.log(orders)
		return res.status(httpCodes.OK).send(orders);
	} catch (err) {
		console.log(err)
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
});

Router.delete('/deleteorder?', verify, async (req, res) => {
	try {
		console.log(req.query)
		const order = await Order.findOneAndDelete({ name: req.query.name });
		if (!order) return res.status(httpCodes.NO_CONTENT).send("the package doesn't exist");
		return res.status(httpCodes.OK).send('The order has been cancelled');
	} catch (err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
	}
});
Router.put('/modifyorder/:name', verify, async (req, res) => {
	try {
		const pack_name = await Package.findOne({ name: req.body.package });
	
		if (!pack_name) return res.status(httpCodes.NO_CONTENT).send("Package doesn't exist");
		const order = await Order.findOneAndUpdate(
			{ name: req.params.name },
			{ name: req.body.name_2, description: pack_name.description, package: pack_name }
		);
		console.log(order)
		if (!order) return res.status(httpCodes.NO_CONTENT).send("the order doesn't exist");
		return res.status(httpCodes.OK).send('the order has been updated');
	} catch (err) {
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
});

module.exports = Router;
