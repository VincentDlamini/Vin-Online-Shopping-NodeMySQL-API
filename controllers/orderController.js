const Validator = require('fastest-validator');
const models = require('../models');
const { where } = require('sequelize');

// Post order
function postOrder (req, res) {
    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty."
        });
    }

    const order = {
        customerId: req.body.customerId,
        orderDate: new Date(req.body.orderDate),
        totalCost: parseFloat(req.body.totalCost)
    };

    const schema = {
        customerId: {type: "number", optional: false},
        orderDate: {type: "date", optional: false},
        totalCost: {type: "number", optional: false}
    };

    const v = new Validator();
    const validationResponse = v.validate(order, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validationResponse
        });
    }

    models.Order.create(order).then(result => {
        res.status(201).json({
            message: "Order created successfully.",
            order: result
        });
    }).catch(error => {
        res.status(500).json({ 
            message: "Invalid request: Order not created.",
            error: error.message 
        });
    });
}

// Get All Orders
function allOrders (req, res){
    models.Order.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ 
            message: "Invalid request: Could not get Ordered items.",
            error: error.message 
        });
    });
}

// Get by ID
function orderByID(req, res) {
    const id = req.params.id;

    // Fetch order and include related ordered items and payments
    models.Order.findByPk(id, {
        include: [
            { model: models.OrderedItem },
            { model: models.Payment }
        ] // Including associated ordered items and payments
    })
    .then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "Invalid request: Order ID not found."
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Something went wrong. Please contact your administrator.",
            error: error.message
        });
    });
}

// Update Order
function updateOrder (req, res){
    const id = req.params.id;

    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty."
        });
    }

    const updateOrders = {
        customerId: req.body.customerId,
        orderDate: new Date(req.body.orderDate),
        totalCost: parseFloat(req.body.totalCost)
    };

    const schema = {
        customerId: {type: "number", optional: false},
        orderDate: {type: "date", optional: false},
        totalCost: {type: "number", optional: false}
    };

    const v = new Validator();
    const validationResponse = v.validate(updateOrders, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validationResponse
        });
    }

    models.Order.findByPk(id).then(order => { 
        if(order){
            return models.Order.update(updateOrders, {where: {id:id}});
        }else{
            res.status(404).json({
                message: "Order ID not found."
            });
        }
    }).then(result => {
        if(result){
            res.status(200).json({
                message: "Order updated successfully.",
                order: updateOrders
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "An error occurred.",
            error: error.message 
        });
    });
}

// Delete Order
function deleteOrder (req, res) {
    const id = req.params.id;

    models.Order.findByPk(id) 
        .then(order => {
            if(order){
                return models.Order.destroy({ where: {id:id} });
            }else{
                res.status(404).json({
                    message: "Order ID not found."
                });
            }
        }).then(result => {
            if(result) {
                res.status(200).json({
                    message: "Order deleted successfully."
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: "An error occurred.",
                error: error.message 
            });
        });
}

module.exports = {
    postOrder: postOrder,
    allOrders: allOrders,
    orderByID: orderByID,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder
}