const Router = require('express').Router();
const { Package, Addon } = require('../models/Package');
const { Service } = require('../models/Services');
const { Notify } = require('../middleware/notify');
const { Order } = require('../models/Order');
const { User, Driver } = require('../models/User');
const httpCodes = require('../constants/httpCodes');
const verify = require('../middleware/tokenverif');
const faker=require('faker')

Router.post('/addorder/:service/:name?', verify, async (req, res) => {
	try {
		const service_name = await Service.findOne({ name: req.params.service });
		if (!service_name) return res.status(httpCodes.NO_CONTENT).send("Service doesn't exist");
		const pack_name = await Package.findOne({ name: req.params.name });
		if (!pack_name) return res.status(httpCodes.NO_CONTENT).send("Package doesn't exist");
		let addon_price = 0;
		let addon_name = [];

		if (req.body.addon) {
			const addons = req.body.addon;
			addons.forEach(async (addon) => {
				const temp = await Addon.findOne({ name: addon.name });
				addon_name.append(temp._id);
				addon_price = addon_price + temp.supplement;
			});
		}

		const order = new Order({
			title: pack_name.name,
			description: pack_name.description,
			addon: addon_name,
			client: req.query.user,
			adress: req.body.adress,
			package: pack_name._id,
			localisation: { coordinates: req.body.coordinates },
			bill: pack_name.price + addon_price,
			start: req.body.start,
			end: req.body.end,
			service: pack_name.service
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
		let orders = [];
		if (req.user.role == process.env.User) {
			orders = await Order.find({ client: req.user._id }).populate({
				path: 'package',
				select: 'name service',
				populate: { path: 'service', select: 'name' }
			});
		} else if (req.user.role == process.env.Driver) {
			orders = await Order.find({ hasPackage: true, driver: req.user._id })
				.populate('client', 'name prename email')
				.populate({ path: 'package', select: 'name' });
		} else if (req.user.role == process.env.Admin) {
			orders = await Order.find({ hasPackage: true, service: req.user.service })
				.populate('client', 'name prename phone_number email')
				.populate('package', 'icon price name')
				.populate('driver', 'name prename')
				.populate('addon', 'name supplement');
		} else {
			orders = await Order.find({ hasPackage: true })
				.populate('client', 'name prename phone_number email')
				.populate('package', 'icon price name')
				.populate('driver', 'name prename')
				.populate('service', 'name icon')
				.populate('addon', 'name supplement');
		}

		if (!orders) return res.status(httpCodes.NO_CONTENT).send('no order exist yet');

		return res.status(httpCodes.OK).send(orders);
	} catch (err) {
		console.log(err);
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
});
Router.get('/getorder/:id', verify, async (req, res) => {
	try {
		let orders = [];
		if (req.user.role == process.env.User) {
			orders = await Order.find({ _id: req.params.id, client: req.user._id }).populate({
				path: 'package',
				select: 'name service',
				populate: { path: 'service', select: 'name' }
			});
		} else if (req.user.role == process.env.Driver) {
			orders = await Order.find({ _id: req.params.id, hasPackage: true, driver: req.user._id })
				.populate('client', 'name prename')
				.populate({ path: 'package', select: 'name' });
		} else if (req.user.role == process.env.Admin) {
			orders = await Order.find({ _id: req.params.id, hasPackage: true, service: req.user.service })
				.populate('client', 'name prename')
				.populate({ path: 'package', select: 'name' });
		} else {
			orders = await Order.find({ _id: req.params.id, hasPackage: true })
				.populate('client', 'name prename')
				.populate({ path: 'package', select: 'name' })
				.populate({ path: 'service', select: 'name' });
		}

		if (!orders) return res.status(httpCodes.NO_CONTENT).send('no order exist yet');

		return res.status(httpCodes.OK).send(orders);
	} catch (err) {
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
});

Router.delete('/deleteorder?', verify, async (req, res) => {
	try {
		const order = await Order.findOneAndDelete({ _id: req.query.id });
		if (!order) return res.status(httpCodes.NO_CONTENT).send("the package doesn't exist");
		return res.status(httpCodes.OK).send('The order has been cancelled');
	} catch (err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
	}
});
Router.put('/modifyorder/:name', verify, async (req, res) => {
	try {
		console.log(req.body, req.params);
		const pack_name = await Package.findOne({ name: req.body.package });
		let order = [];
		if (!pack_name) return res.status(httpCodes.NO_CONTENT).send("Package doesn't exist");
		if (req.body.addon === []) {
			order = await Order.findOneAndUpdate(
				{ title: req.params.name },
				{
					title: pack_name.name,
					description: pack_name.description,
					adress: req.body.adress,
					package: pack_name,
					bill: pack_name.price,
					start: req.body.start,
					end: req.body.end
				}
			);
		} else {
			let addon_name = [];
			let addon_price = 0;
			const addons = req.body.addon;

			for (addon of addons) {
				const temp = await Addon.findOne({ name: addon });
				if (temp) {
					addon_name.push(temp._id);
					addon_price = addon_price + temp.supplement;
				}
			}
			console.log(addon_name);

			order = await Order.findOneAndUpdate(
				{ title: req.params.name },
				{
					title: pack_name.name,
					description: pack_name.description,
					adress: req.body.adress,
					package: pack_name,
					addon: addon_name,
					bill: pack_name.price + addon_price,
					start: req.body.start,
					end: req.body.end
				}
			);
		}

		if (!order) return res.status(httpCodes.NO_CONTENT).send("the order doesn't exist");
		console.log(order);

		return res.status(httpCodes.OK).send('the order has been updated');
	} catch (err) {
		console.log(err.message);

		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
});
Router.put('/assignOrder?', verify, async (req, res) => {
	try {
		// if (req.user.role!= process.env.Admin || req.user.role!= process.env.SuperAdmin) return res.status(httpCodes.UNAUTHORIZED).send('DENIED ACCESS')
		const driver = await Driver.findByIdAndUpdate(req.query.id_driver, { $push: { Orders: req.query.id_order } });
		if (!driver) return res.status(httpCodes.NO_CONTENT).send("the driver doesn't exist");
		const order = await Order.findByIdAndUpdate(req.query.id_order, { driver: driver._id });
		if (!order) return res.status(httpCodes.NO_CONTENT).send("the order doesn't exist");
		return res.status(httpCodes.OK).send('the order has been assigned');
	} catch (err) {
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
});

Router.get('/getagendaorder?', verify, async (req, res) => {
	try {
		if (req.user.role == process.env.User) return res.status(401).send('DENIED ACCESS');
		const order = await Order.find({ hasPackage: true, driver: req.query.id })
			.populate('client', 'name prename phone_number email')
			.populate('package', 'icon price name')
			.populate('driver', 'name prename')
			.populate('service', 'name icon')
			.populate('addon', 'name supplement');
		if (!order) return res.status(httpCodes.NO_CONTENT).send('No order exist');
		return res.status(httpCodes.OK).send(order);
	} catch (err) {
		console.log(err);
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
});

Router.post('/testAddOrder',async(req,res)=> {
	try {
		let addon_name=[]
		for (let i=0;i<10;i++)
		
		{
			const tempdate=faker.date.recent()
		const tempend= tempdate
		tempend.setHours(tempend.getHours()+1)
			const order = new Order({
			title: 'Youssef',
			description: 'Handsome Package',
			addon: addon_name,
			client: '62502be0ea78f9cc3b478afe',
			adress: faker.address.streetAddress(), 
			package: '6259a55e4265437bcf9dbea2',
			bill: '69',
			start: tempdate ,
			end: tempend,
			service: '6267f3e9c9ecf4dc1c64abaa'
		})
		order.save();
	}
		
		res.status(httpCodes.OK).send('test succesful')
	}catch(err) {
		console.log(err);
		res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
	}
})


module.exports = Router;
