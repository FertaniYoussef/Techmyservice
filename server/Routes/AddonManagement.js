const Router = require('express').Router();
const { Addon } = require('../models/Package');
const { User } = require('../models/User');
const { Service } = require('../models/Services');
const {Order}=require('../models/Order')
const httpCodes = require('../constants/httpCodes');
const verify = require('../middleware/tokenverif');
const mongocodes = require('../constants/mongodbCodes');



Router.post('/:service/addaddon', verify, async (req, res) => {
	try {
		
		
		const user = await User.findById(req.user._id);
		if (user.role == process.env.User || user.role == process.env.Driver)
			return res.status(httpCodes.UNAUTHORIZED).send('Access Denied');
		const service = await Service.findOne({ name: req.params.service });
		if (!service) return res.status(httpCodes.NO_CONTENT).send("the service doesn't exist");
		const addon_name = await addon_name.findOne({ name: req.body.name });
		if (pack_name) return res.status(mongocodes.DUPLICATE_KEY).send('Addon already exist');
		const addon = new Addon({
			name: req.body.name,
			description: req.body.description,
			supplement: req.body.price,
			service: service._id
		});

		addon.save();

		return res.status(httpCodes.OK).send('Addon added Succesfuly');
	} catch (err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
	}
});

Router.get('/getaddons',verify,async(req,res)=> {
	try {
		const Addon =  await Addon.find({}).populate('service', ['name']);
		return res.status(httpCodes.OK).send(addons);
	}catch(err) {
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
})
Router.get('/getaddonlist',verify, async (req, res) => {
	try {
		let addons=[]
		if (req.user.role==process.env.SuperAdmin) {addons = await Addon.find({}).populate('service', ['name']);}
		if (req.user.role==process.env.Admin) {addons = await Addon.find({service:req.user.service}).populate('service', ['name']);}
		if (!addons) return res.status(httpCodes.NO_CONTENT).send('no addon exist yet');
		return res.status(httpCodes.OK).send(addons);
	} catch (err) {
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
});