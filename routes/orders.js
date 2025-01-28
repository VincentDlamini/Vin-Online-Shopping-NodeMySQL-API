const express = require('express');
const orderController = require('../controllers/orderController');
const checkAuthMiddleware = require('../middlewear/authenticationCheck');

const route = express.Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Add a new order to the system
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: number
 *               orderDate:
 *                 type: string
 *                 format: date-time
 *               totalCost:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
route.post('/', checkAuthMiddleware.checkAuth, orderController.postOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve all orders
 *     description: Get a list of all orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
route.get('/', orderController.allOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieve an order by its ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Order ID not found
 *       500:
 *         description: Internal server error
 */
route.get('/:id', orderController.orderByID);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update order
 *     description: Update order details
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: number
 *               orderDate:
 *                 type: string
 *                 format: date-time
 *               totalCost:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Order ID not found
 *       500:
 *         description: Internal server error
 */
route.put('/:id', checkAuthMiddleware.checkAuth, orderController.updateOrder);
route.patch('/:id', checkAuthMiddleware.checkAuth, orderController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order
 *     description: Remove an order by ID
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order ID not found
 *       500:
 *         description: Internal server error
 */
route.delete('/:id', checkAuthMiddleware.checkAuth, orderController.deleteOrder);

module.exports = route;