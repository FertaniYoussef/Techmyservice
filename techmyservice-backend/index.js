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
const PORT = process.env.PORT || 5000;

//Database connection
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, (err) => console.log('connected to db!', err));

//Middleware
app.use(cors());
app.use(express.json());

//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/verification', token);
app.use('/api',packageRoute)
app.use('/api',orderRoute)

app.listen(PORT, () => console.log(`up and running on port : ${PORT}`));
