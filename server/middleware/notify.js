const { User, Driver } = require('../models/User');
const Vonage = require('@vonage/server-sdk');

const vonage = new Vonage({
	apiKey: '43d7532e',
	apiSecret: 'veWv6XPPDcaGhI2n'
});

function deg2rad(deg) {
	return deg * (Math.PI / 180);
}
function distance(driver, order) {
	// Radius of the earth in km
	const R = 6371;
	const dLat = deg2rad(driver[0] - order[0]);
	const dLon = deg2rad(driver[1] - order[1]);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(order[0])) *
			Math.cos(deg2rad(driver[0])) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c;

	return d;
}
module.exports.Notify = async function(order, services) {
	try {
	let i = 1;
		console.log(order);

		 const Drivers = await Driver.find({ service: services._id, isFree: true }); 
		 if (!Drivers) return false
		
		
		while (i <= 20) {
			const result = Drivers.filter(({ geoposition }) => {
				return distance(geoposition.coordinates, order.localisation.coordinates) <= i;
			});
			if (result===undefined || result.length == 0) {
				i = i + 1;
				if (i > 20){
				return false;}
			} else {
				console.log(result)
				
				const small = result[0];
		for (let j = 1; j < result.length; j++) {
			const a = distance(small.geoposition.coordinates, order.localisation.coordinates);
            const b = distance(result[j].geoposition.coordinates, order.localisation.coordinates);

			if (a > b) {
				small = result[j];
			}
		}
		console.log(small)
		const user = await Driver.findById(small._id);
		

		const from = 'Vonage APIs';
		const to = user.phone_number;
		const text = `this message was sent to you`;
		vonage.message.sendSms(from, to, text, (err, responseData) => {
			if (err) {
				console.log(err);
			} else {
				if (responseData.messages[0]['status'] === '0') {
					console.log('Message sent successfully.');
				} else {
					console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
				}
			}
		});
		return true;
				
			}
		}
		
		
	} catch (err) {
		return console.log(err);
	}
};
