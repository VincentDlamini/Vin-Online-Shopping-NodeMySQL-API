const Validator = require('fastest-validator');
const models = require('../models');
const { where } = require('sequelize');

// Post Ordered Items
function postOrderedItems (req, res) {
    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty."
        });
    }

    const orderedItem = {
        orderId: req.body.orderId,
        productId: req.body.productId,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice
    };

    const schema = {
        orderId: {type: "number", optional: false},
        productId: {type: "number", optional: false},
        quantity: {type: "number", optional: false},
        unitPrice: {type: "number", optional: false}
    };

    const v = new Validator();
    const validationResponse = v.validate(orderedItem, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validationResponse
        });
    }

    models.OrderedItem.create(orderedItem).then(result => { 
        res.status(201).json({
            message: "Ordered item created successfully.",
            orderedItem: result
        });
    }).catch(error => {
        res.status(500).json({ 
            message: "Invalid request: Ordered item not created.",
            error: error.message 
        });
    });
}

// Get All Ordered Items
function allOrderedItems (req, res){
    models.OrderedItem.findAll().then(result => { 
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ 
            message: "Invalid request: Could not get ordered items.",
            error: error.message 
        });
    });
}

// Get by ID
function orderedItemsByID (req, res){
    const id = req.params.id;

    models.OrderedItem.findByPk(id).then(result => { 
        if(result){
            res.status(200).json(result);
        }else {
            res.status(404).json({ 
                message: "Invalid request: Ordered item ID not found."
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong. Please contact your administrator.",
            error: error.message 
        });
    });
}

// Update Ordered Items
function updateOrderedItems (req, res){
    const id = req.params.id;

    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty."
        });
    }

    const updateOrderedItems = {
        orderId: req.body.orderId,
        productId: req.body.productId,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice
    };

    const schema = {
        orderId: {type: "number", optional: false},
        productId: {type: "number", optional: false},
        quantity: {type: "number", optional: false},
        unitPrice: {type: "number", optional: false}
    };

    const v = new Validator();
    const validationResponse = v.validate(updateOrderedItems, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validationResponse
        });
    }

    models.OrderedItem.findByPk(id).then(orderedItem => { 
        if(orderedItem){
            return models.OrderedItem.update(updateOrderedItems, {where: {id:id}}); 
        }else{
            res.status(404).json({
                message: "Ordered item ID not found."
            });
        }
    }).then(result => {
        if(result){
            res.status(200).json({
                message: "Ordered item updated successfully.",
                orderedItems: updateOrderedItems
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "An error occurred.",
            error: error.message 
        });
    });
}

// Delete Ordered Items
function deleteOrderedItems (req, res) {
    const id = req.params.id;

    models.OrderedItem.findByPk(id) 
        .then(orderedItem => {
            if(orderedItem){
                return models.OrderedItem.destroy({ where: {id:id} }); 
            }else{
                res.status(404).json({
                    message: "Ordered item ID not found."
                });
            }
        }).then(result => {
            if(result) {
                res.status(200).json({
                    message: "Ordered item deleted successfully."
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
    postOrderedItems: postOrderedItems,
    allOrderedItems: allOrderedItems,
    orderedItemsByID: orderedItemsByID, 
    updateOrderedItems: updateOrderedItems, 
    deleteOrderedItems: deleteOrderedItems 
}
