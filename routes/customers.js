const express = require('express');
const customerController = require ('../controllers/customerControllers');
const checkAuthMiddleware = require('../middlewear/authenticationCheck');

const router = express.Router();

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     description: Add a new customer to the system
 *     tags: [Customer]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               province:
 *                 type: string
 *               postalCode:
 *                 type: number
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Invalid request
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.post('/', checkAuthMiddleware.checkAuth, customerController.postCustomer);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Retrieve all customers
 *     description: Get a list of all customers
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
router.get('/', customerController.allCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     description: Retrieve a customer by its ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Customer ID not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', customerController.customerByID);


router.patch('/:id', checkAuthMiddleware.checkAuth, customerController.updateCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update customer
 *     description: Update customer details
 *     tags: [Customer]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               province:
 *                 type: string
 *               postalCode:
 *                 type: number
 *               country:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Customer ID not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', checkAuthMiddleware.checkAuth, customerController.updateCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     description: Remove a customer by ID
 *     tags: [Customer]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer ID not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', checkAuthMiddleware.checkAuth, customerController.deleteCustomer);

module.exports = router;