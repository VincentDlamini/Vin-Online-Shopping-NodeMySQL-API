const Validator = require('fastest-validator');
const models = require('../models');
const { where } = require('sequelize');

// Post Payment
function postPayment (req, res) {
    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty."
        });
    }

    const payment = {
        orderId: req.body.orderId,
        paymentMethod: req.body.paymentMethod,
        paymentDate: new Date(req.body.paymentDate),
        amount: req.body.amount
    };

    const schema = {
        orderId: {type: "number", optional: false},
        paymentMethod: {type: "string", optional: false},
        paymentDate: {type: "date", optional: false},
        amount: {type: "number", optional: false}
    };

    const v = new Validator();
    const validationResponse = v.validate(payment, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validationResponse
        });
    }

    models.Payment.create(payment).then(result => {
        res.status(201).json({
            message: "Payment created successfully.",
            payment: result
        });
    }).catch(error => {
        res.status(500).json({ 
            message: "Invalid request: Payment not created.",
            error: error.message 
        });
    });
}

// Get All Payments
function allPayments (req, res) {
    models.Payment.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ 
            message: "Invalid request: Could not get payments.",
            error: error.message 
        });
    });
}

// Get by ID
function paymentByID (req, res) {
    const id = req.params.id;

    models.Payment.findByPk(id).then(result => { 
        if(result){
            res.status(200).json(result);
        }else {
            res.status(404).json({ 
                message: "Invalid request: Payment ID not found."
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong. Please contact your administrator.",
            error: error.message 
        });
    });
}

// Update Payment
function updatePayment (req, res) {
    const id = req.params.id;

    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty."
        });
    }

    const payment = {
        orderId: req.body.orderId,
        paymentMethod: req.body.paymentMethod,
        paymentDate: new Date(req.body.paymentDate),
        amount: req.body.amount
    };

    const schema = {
        orderId: {type: "number", optional: false},
        paymentMethod: {type: "string", optional: false},
        paymentDate: {type: "date", optional: false},
        amount: {type: "number", optional: false}
    };

    const v = new Validator();
    const validationResponse = v.validate(payment, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validationResponse
        });
    }

    models.Payment.findByPk(id).then(foundPayment => { 
        if(foundPayment){
            return models.Payment.update(payment, {where: {id:id}});
        }else{
            res.status(404).json({
                message: "Payment ID not found."
            });
        }
    }).then(result => {
        if(result){
            res.status(200).json({
                message: "Payment updated successfully.",
                payment: payment
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "An error occurred.",
            error: error.message 
        });
    });
}

// Delete Payment
function deletePayment (req, res) {
    const id = req.params.id;

    models.Payment.findByPk(id) 
        .then(foundPayment => {
            if(foundPayment){
                return models.Payment.destroy({ where: {id:id} });
            }else{
                res.status(404).json({
                    message: "Payment ID not found."
                });
            }
        }).then(result => {
            if(result) {
                res.status(200).json({
                    message: "Payment deleted successfully."
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
    postPayment: postPayment,
    allPayments: allPayments,
    paymentByID: paymentByID,
    updatePayment: updatePayment,
    deletePayment: deletePayment
}