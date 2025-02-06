const Validator = require('fastest-validator');
const models = require('../models');
const { where } = require('sequelize');

// Post Category
function postCategory (req, res) {
    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty."
        });
    }

    const category = {
        categoryName: req.body.categoryName
    };

    const schema = {
        categoryName: {type: "string", optional: false, max: "50"}
    };

    const v = new Validator();
    const validationResponse = v.validate(category, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validationResponse
        });
    }

    models.Category.create(category).then(result => {
        res.status(201).json({
            message: "Category created successfully.",
            category: result
        });
    }).catch(error => {
        res.status(500).json({ 
            message: "Invalid request: Category not created.",
            error: error.message 
        });
    });
}

// Get All Categories
function allCategories (req, res){
    models.Category.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ 
            message: "Invalid request: Could not get Category items.",
            error: error.message 
        });
    });
}

// Get by ID
function categoryByID (req, res) {
    const id = req.params.id;

    models.Category.findByPk(id, {
        include: [{ 
            model: models.Product,
            as: 'Products'
        }]
    }).then(result => { 
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ 
                message: "Invalid request: Category ID not found."
            });
        }
    }).catch(error => {
        res.status(500).json({ 
            message: "Something went wrong. Please contact your administrator.", 
            error: error.message 
        });
    });
}

// Update Category
function updateCategory (req, res){
    const id = req.params.id;

    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty."
        });
    }

    const UpdateCat = {
        categoryName: req.body.categoryName
    };

    const schema = {
        categoryName: {type: "string", optional: false, max: "50"}
    };

    const v = new Validator();
    const validationResponse = v.validate(UpdateCat, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            error: validationResponse
        });
    }

    models.Category.findByPk(id).then(category => { 
        if(category){
            return models.Category.update(UpdateCat, {where: {id: id}}); 
        }else{
            res.status(404).json({
                message: "Category ID not found."
            });
        }
    }).then(result => {
        if(result){
            res.status(200).json({
                message: "Category updated successfully.",
                category: UpdateCat
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "An error occurred.",
            error: error.message 
        });
    });
}

// Delete Category
function deleteCategory (req, res) {
    const id = req.params.id;

    models.Category.findByPk(id) 
        .then(category => {
            if(category){
                return models.Category.destroy({ where: {id: id} }); 
            }else{
                res.status(404).json({
                    message: "Category ID not found."
                });
            }
        }).then(result => {
            if(result) {
                res.status(200).json({
                    message: "Category deleted successfully."
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
    postCategory: postCategory,
    allCategories: allCategories,
    categoryByID: categoryByID,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}