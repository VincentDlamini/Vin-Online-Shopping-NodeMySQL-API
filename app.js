const express = require('express');
const bodyParser = require('body-parser');
const setupSwaggerDocs = require('./swagger');

const app = express();

const customerRoute = require('./routes/customers');
const productRoute = require('./routes/products');
const categoryRoute = require('./routes/categories');
const orderRoute = require('./routes/orders');
const orderedItemRoute = require('./routes/orderedItems');
const paymentRoute = require('./routes/payments');
const adminRoute = require('./routes/administrators');

app.use(bodyParser.json());

app.use("/customers", customerRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.use("/orders", orderRoute);
app.use("/orderedItems", orderedItemRoute);
app.use("/payments", paymentRoute);
app.use("/administrators", adminRoute);

// Setup Swagger
setupSwaggerDocs(app);

// Base route
app.get('/', (req, res) => {
    res.send('Hello World! This is a NodeJS API with MySQL!');
});

module.exports = app