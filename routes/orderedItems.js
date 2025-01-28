const express = require('express');
const orederedItemController = require('../controllers/orderedItemController');
const checkAuthMiddleware = require('../middlewear/authenticationCheck');

const route = express.Router();

/**
 * @swagger
 * /orderedItems:
 *   post:
 *     summary: Create a new ordered item
 *     description: Add a new ordered item to the system
 *     tags: [OrderedItems]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: number
 *               productId:
 *                 type: number
 *               quantity:
 *                 type: number
 *               unitPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Ordered item created successfully
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Invalid request
 */
route.post('/', checkAuthMiddleware.checkAuth, orederedItemController.postOrderedItems);

/**
 * @swagger
 * /orderedItems:
 *   get:
 *     summary: Get all ordered items
 *     description: Retrieve a list of all ordered items
 *     tags: [OrderedItems]
 *     responses:
 *       200:
 *         description: A list of ordered items
 *       500:
 *         description: Invalid request
 */
route.get('/', orederedItemController.allOrderedItems);

/**
 * @swagger
 * /orderedItems/{id}:
 *   get:
 *     summary: Get ordered item by ID
 *     description: Retrieve an ordered item by its ID
 *     tags: [OrderedItems]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the ordered item to fetch
 *     responses:
 *       200:
 *         description: Ordered item found
 *       404:
 *         description: Ordered item ID not found
 *       500:
 *         description: Something went wrong
 */
route.get('/:id', orederedItemController.orderedItemsByID);

/**
 * @swagger
 * /orderedItems/{id}:
 *   put:
 *     summary: Update an existing ordered item
 *     description: Update the details of an existing ordered item
 *     tags: [OrderedItems]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the ordered item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: number
 *               productId:
 *                 type: number
 *               quantity:
 *                 type: number
 *               unitPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ordered item updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Ordered item ID not found
 *       500:
 *         description: An error occurred
 */
route.put('/:id', checkAuthMiddleware.checkAuth, orederedItemController.updateOrderedItems);
route.patch('/:id', checkAuthMiddleware.checkAuth, orederedItemController.updateOrderedItems);

/**
 * @swagger
 * /orderedItems/{id}:
 *   delete:
 *     summary: Delete an ordered item
 *     description: Remove an ordered item from the system
 *     tags: [OrderedItems]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the ordered item to delete
 *     responses:
 *       200:
 *         description: Ordered item deleted successfully
 *       404:
 *         description: Ordered item ID not found
 *       500:
 *         description: An error occurred
 */
route.delete('/:id', checkAuthMiddleware.checkAuth, orederedItemController.deleteOrderedItems);

module.exports = route;