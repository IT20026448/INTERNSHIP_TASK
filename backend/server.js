const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

//import route
const VehicleRoutes = require('./routes/vehiclePosts');

//middleware of the app
app.use(bodyParser.json());
//use cors as middleware
app.use(cors());

//middleware of the route
app.use(VehicleRoutes);

const port = 3000;

const DB_URL = 'mongodb+srv://admin:admin@cluster0.vxadeim.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.log('DB connected');
})
.catch((err) => console.log('DB connection error', err));

app.listen(port, () => {
    console.log('App is running on port %d', port);
});