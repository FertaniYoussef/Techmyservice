const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
//Import Routes
const token = require('./Routes/Token');
const authRoute = require('./Routes/auth');
const packageRoute=require('./Routes/PackageManagement')
const orderRoute=require('./Routes/OrderManagement')
const serviceRoute=require('./Routes/ServiceManagement')
const driverRoute=require('./Routes/DriverManagement')
const PORT = process.env.PORT || 5000;
const statRoute=require('./Routes/StatsManagement')
const adminRoute=require('./Routes/AdminManagement')
const addonRoute= require('./Routes/AddonManagement')
//Database connection
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, (err) => console.log('connected to db!', err));

//Middleware
app.use(express.static('img'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/verification', token);
app.use('/api',packageRoute)
app.use('/api',orderRoute)
app.use('/api',serviceRoute)
app.use('/api',driverRoute)
app.use('/api',statRoute)
app.use('/api',adminRoute)
app.use('/api',addonRoute)

app.listen(PORT, () => console.log(`up and running on port : ${PORT}`));
