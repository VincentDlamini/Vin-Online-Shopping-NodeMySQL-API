const Validator = require('fastest-validator');
const models = require('../models');
const { where } = require('sequelize');

// Post customer
function postCustomer (req, res) {
    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty."
        });
    }

    const customer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        country: req.body.country
    };

    const schema = {
        firstName: {type: "string", optional: false, max: "50"},
        lastName: {type: "string", optional: false, max: "50"},
        email: {type: "string", optional: false, max: "100"},
        password: {type: "string", optional: false, min: 6, max: "250"},
        address: {type: "string", optional: false, max: "250"},
        city: {type: "string", optional: false, max: "100"},
        province: {type: "string", optional: false, max: "100"},
        postalCode: {type: "number", optional: false},
        country: {type: "string", optional: false, max: "250"}
    };

    const v = new Validator();
    const validationResponse = v.validate(customer, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validationResponse
        });
    }

    // Check if email already exists
    models.Customer.findOne({where:{email: req.body.email}})
        .then(result => {
            if(result){
                return res.status(409).json({ 
                    message: "Email already exists!"
                });
            } else {
                models.Customer.create(customer).then(result => {
                    res.status(201).json({
                        message: "Customer created successfully.",
                        customer: result
                    });
                }).catch(error => {
                    res.status(500).json({ 
                        message: "Invalid request: Customer not created.",
                        error: error.message 
                    });
                });
            }
        })
        .catch(error => {
            res.status(500).json({ 
                message: "Error checking email existence.",
                error: error.message 
            });
        });
}


// Get All Customers
function allCustomers (req, res){
    models.Customer.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ 
            message: "Invalid request: Could not get customers.",
            error: error.message 
        });
    });
}

// Get by ID
function customerByID(req, res) {
    const id = req.params.id;

    // Fetch customer and include related orders
    models.Customer.findByPk(id, {
        include: [models.Order] 
    })
    .then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "Invalid request: Customer ID not found."
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


// Update Customer
function updateCustomer (req, res){
    const id = req.params.id;

    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty."
        });
    }

    const updateCust = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        country: req.body.country
    };

    const schema = {
        firstName: {type: "string", optional: false, max: "50"},
        lastName: {type: "string", optional: false, max: "50"},
        email: {type: "string", optional: false, max: "100"},
        password: {type: "string", optional: false, min: 6, max: "250"}, 
        address: {type: "string", optional: false, max: "250"},
        city: {type: "string", optional: false, max: "100"},
        province: {type: "string", optional: false, max: "100"},
        postalCode: {type: "number", optional: false},
        country: {type: "string", optional: false, max: "250"}
    };

    const v = new Validator();
    const validationResponse = v.validate(updateCust, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validationResponse
        });
    }

    models.Customer.findByPk(id).then(customer => {
        if(customer){
            return models.Customer.update(updateCust, {where: {id:id}});
        }else{
            res.status(404).json({
                message: "Customer ID not found."
            });
        }
    }).then(result => {
        if(result){
            res.status(201).json({
                message: "Customer updated successfully.",
                customer: updateCust
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "An error occurred.",
            error: error.message 
        });
    });
}

// Delete Customer
function deleteCustomer (req, res) {
    const id = req.params.id;

    models.Customer.findByPk(id) 
        .then(customer => {
            if(customer){
                return models.Customer.destroy({ where: {id:id} });
            }else{
                res.status(404).json({
                    message: "Customer ID not found."
                });
            }
        }).then(result => {
            if(result) {
                res.status(200).json({
                    message: "Customer deleted successfully."
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
    postCustomer: postCustomer,
    allCustomers: allCustomers,
    customerByID: customerByID,
    updateCustomer: updateCustomer,
    deleteCustomer: deleteCustomer
}