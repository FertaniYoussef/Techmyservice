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
                    _id: { $dateToString: { format: "%m-%d-%Y", date:'$start'} },
                
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
        res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
    }


})
Router.get('/ordersnumber', verify, async (req, res) => {
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
                    
                
                count: {
                    $sum: 1
                }
            }
        }
        
        ])}
        if (user.role==process.env.SuperAdmin) {   orders_day = await Order.aggregate([
            { $match: { } } ,
               { $group: {
                    _id: { $dateToString: { format: "%d-%m-%Y", date:'$start'} },
                
                count: {
                    $sum: 1
                }
            }
        }
        
        ])}
        if (!orders_day) return res.status(httpCodes.NO_CONTENT).send('no orders yet')
      
        
        return res.status(httpCodes.OK).send(orders_day)
    } catch (err) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
    }


})
Router.get('/orderscompleted', verify, async (req, res) => {
    try {
        let orders_day=[]
        const user = await User.findById(req.user._id)
        if (user.role==process.env.Admin){
        const admin = await Admin.findById(req.user._id)
        if (!admin) return res.status(httpCodes.UNAUTHORIZED).send('Unauthorized access')
        orders_day = await Order.aggregate([
            { $match: { service: admin.service,Pending:false } } ,
               { $group: {
                    _id: { $dateToString: { format: "%d-%m-%Y", date:'$start'} },
                    
                
                count: {
                    $sum: 0
                }
            }
        }
        
        ])}
        if (user.role==process.env.SuperAdmin) {   orders_day = await Order.aggregate([
            { $match: { Pending:false} } ,
               { $group: {
                    _id: { $dateToString: { format: "%d-%m-%Y", date:'$start'} },
                
                count: {
                    $sum: 0
                }
            }
        }
        
        ])}
        if (!orders_day) return res.status(httpCodes.NO_CONTENT).send('no orders yet')
      
        
        return res.status(httpCodes.OK).send(orders_day)
    } catch (err) {
       
        res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
    }


})

Router.get('/topPackages',verify,async(req,res)=> {
    try {
        const user = await User.findById(req.user._id)
        let packages=[]
        if (user.role==process.env.Admin) {
            const admin = await Admin.findById(req.user._id)
            if (!admin) return res.status(httpCodes.UNAUTHORIZED).send('Unauthorized access')
            packages = await Order.aggregate([
                { $match: { service: admin.service} } ,
                   { $group: {
                        _id: "$package",
                        
                    
                    count: {
                        $sum: 0
                    }
                }
            }
            
               ])   }
               if (user.role==process.env.SuperAdmin) {   packages = await Order.aggregate([
                
                   { $group: {
                    _id: "$title",
                    
                    count: {
                        $sum: 1
                    }
                }
            }
        
            
            ])}
            if (!packages) return res.status(httpCodes.NO_CONTENT).send('no orders yet')
            
            
            return res.status(httpCodes.OK).send(packages)
    }catch (err) {
        console.log(err);
        
        res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
    }
})


module.exports = Router