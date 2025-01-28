const Validator = require('fastest-validator');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

function signUp(req, res){
    // Validation schema 
    const schema = { 
        name: { type: "string", optional: false, max: "100"},
        email: { type: "string", optional: false, max: "500"}, 
        password: { type: "string", optional: false, min: 6, max: "100"},
        role: {type: "string", optional: false, max: "500"},
        status: {type: "string", optional: false}
    }; 
    
    // Initialize validator 
    const v = new Validator(); 
    
    // Validate request body 
    const validationResponse = v.validate(req.body, schema); 
    
    if (validationResponse !== true) { 
        return res.status(400).json({ 
            message: "Validation failed", error: validationResponse 
        });
    }

    models.Administrator.findOne({where:{email: req.body.email}}).then(result => {
        if(result){
            res.status(409).json({
                message: "Email already exists!",
            });
        }else {
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const admin = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        role: req.body.role,
                        status: req.body.status
                    }
                
                    models.Administrator.create(admin).then(result => {
                        res.status(201).json({
                            message: "User created successfully.",
                            administrator: result
                        });
                    }).catch(error => {
                        res.status(400).json({
                            message: "Invalid request: User not created.",
                            error: error.message
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong with your request.",
            error: error.message
        });
    });
}

function login(req, res){
    // Validation schema 
    const schema = { 
        email: { type: "string", optional: false, max: "500" }, 
        password: { type: "string", optional: false, min: 6 } 
    }; 
    
    // Initialize validator 
    const v = new Validator(); 
    
    // Validate request body 
    const validationResponse = v.validate(req.body, schema); 
    
    if (validationResponse !== true) { 
        return res.status(400).json({ 
            message: "Validation failed", error: validationResponse 
        });
    }

    models.Administrator.findOne({where:{email:req.body.email}}).then(admin => {
        if(admin === null){
            res.status(401).json({ 
                message: "Invalid credentials entered."
            });
        }else {
            bcryptjs.compare(req.body.password, admin.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: admin.email,
                        role: admin.role
                    }, 'secret', function(err, token){
                        res.status(200).json({
                            message: "Authentication Successful",
                            token:token
                        });
                    });
                }else {
                    res.status(401).json({ 
                        message: "Invalid credentials"
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({ 
            message: "Something went wrong", 
            error: error.message
        });
    });
}

function deleteAdmin(req, res) {
    const id = req.params.id;

    models.Administrator.findByPk(id)
        .then(admin => {
            if(admin){
                return models.Administrator.destroy({ where: {id:id} });
            }else{
                res.status(404).json({
                    message: "Administrator ID not found"
                });
            }
        }).then(result => {
            if(result) {
                res.status(200).json({
                    message: "Administrator deleted successfully."
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
    signUp:signUp,
    login:login,
    deleteAdmin:deleteAdmin
}