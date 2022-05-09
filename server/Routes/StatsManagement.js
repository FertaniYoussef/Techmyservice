const Router = require('express').Router();
const httpCodes = require('../constants/httpCodes');
const verify = require('../middleware/tokenverif');

const { User, Driver, Admin } = require('../models/User');
const { Service } = require('../models/Services');
const { Order } = require('../models/Order')
Router.get('/earnings', verify, async (req, res) => {
    try {
        let orders_day=[]
        const user = await User.findById(req.user._id)
        if (user.role==process.env.Admin){
        const admin = await Admin.findById(req.user._id)
        if (!admin) return res.status(httpCodes.UNAUTHORIZED).send('Unauthorized access')
        orders_day = await Order.aggregate([
            { $match: { service: admin.service } } ,
               { $group: {
                    _id: { $dateToString: { format: "%d-%m-%Y", date:'$start'} },
                
                totalUnitsSold: {
                    $sum: "$bill"
                }
            }
        }
        
        ])}
        if (user.role==process.env.SuperAdmin) {   orders_day = await Order.aggregate([
            { $match: { } } ,
               { $group: {
                    _id: { $dateToString: { format: "%d-%m-%Y", date:'$start'} },
                
                totalUnitsSold: {
                    $sum: "$bill"
                }
            }
        }
        
        ])}
        if (!orders_day) return res.status(httpCodes.NO_CONTENT).send('no orders yet')
      
        
        return res.status(httpCodes.OK).send(orders_day)
    } catch (err) {
        console.log(err)
        res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
    }


})


module.exports = Router