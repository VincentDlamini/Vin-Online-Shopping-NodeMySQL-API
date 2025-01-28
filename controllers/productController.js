const Validator = require('fastest-validator');
const models = require('../models');
const { where } = require('sequelize');

// Post product
function products(req, res){
    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty."
        });
    }

    const product = {
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        price: req.body.price,
        quantityOnHand: req.body.quantityOnHand,
        categoryId: req.body.categoryId
    };

    const schema = {
        productName: {type: "string", optional: false},
        productDescription: {type: "string", optional: false},
        price: {type: "number", optional: false},
        quantityOnHand: {type: "number", optional: false},
        categoryId: {type: "number", optional: false}
    };

    const v = new Validator();
    const validationResponse = v.validate(product, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validationResponse
        });
    }

    models.Product.create(product).then(result => {
        res.status(201).json({
            message: "Product item created successfully.",
            product: result
        });
    }).catch(error => {
        res.status(500).json({ 
            message: "Invalid request: Product item not created.",
            error: error.message 
        });
    });
}

// Get All Products
function allProducts(req, res){
    models.Product.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ 
            message: "Invalid request: Could not get list of products.",
            error: error.message 
        });
    });
}

// Get by ID
function productByID(req, res){
    const id = req.params.id;

    models.Product.findByPk(id, {
        include: [
            {
                model: models.Category,
                attributes: ["categoryName"]
            },
            {
                model: models.OrderedItem,
                attributes: ["orderId", "quantity", "unitPrice"]
            }
        ]
    }).then(result => { 
        if(result){
            res.status(200).json(result);
        }else {
            res.status(404).json({ 
                message: "Invalid request: Product ID not found."
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong. Please contact your administrator.",
            error: error.message 
        });
    });
}


// Update Product
function updateProduct(req, res){
    const id = req.params.id;

    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty."
        });
    }

    const product = {
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        price: req.body.price,
        quantityOnHand: req.body.quantityOnHand,
        categoryId: req.body.categoryId
    };

    const schema = {
        productName: {type: "string", optional: false},
        productDescription: {type: "string", optional: false},
        price: {type: "number", optional: false},
        quantityOnHand: {type: "number", optional: false},
        categoryId: {type: "number", optional: false}
    };

    const v = new Validator();
    const validationResponse = v.validate(product, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validationResponse
        });
    }

    models.Product.findByPk(id).then(foundProduct => { 
        if(foundProduct){
            return models.Product.update(product, {where: {id:id}});
        }else{
            res.status(404).json({
                message: "Product ID not found."
            });
        }
    }).then(result => {
        if(result){
            res.status(200).json({
                message: "Product updated successfully.",
                product: product
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "An error occurred.",
            error: error.message 
        });
    });
}

// Delete Product
function deleteProduct(req, res){
    const id = req.params.id;

    models.Product.findByPk(id)  
        .then(foundProduct => {
            if(foundProduct){
                return models.Product.destroy({ where: {id:id} });
            }else{
                res.status(404).json({
                    message: "Product ID not found."
                });
            }
        }).then(result => {
            if(result) {
                res.status(200).json({
                    message: "Product item deleted successfully."
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
    products: products,
    allProducts: allProducts,
    productByID: productByID,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}