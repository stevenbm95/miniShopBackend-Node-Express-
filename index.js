const express = require('express');

const app = express();
const RoutesCustomer = require('./routes/routesCustomer');
const RoutesProducts = require('./routes/routesProducts');
const RoutesEmail = require('./routes/routesEmail');
const RoutesUsers = require('./routes/routesUsers');
const bodyParser = require('body-parser');

require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',RoutesCustomer);
app.use('/api',RoutesProducts);
app.use('/api',RoutesEmail);
app.use('/api',RoutesUsers);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;