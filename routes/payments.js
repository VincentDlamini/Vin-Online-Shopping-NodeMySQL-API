const express = require('express');
const paymentController = require('../controllers/paymentController');
const checkAuthMiddleware = require('../middlewear/authenticationCheck');

const route = express.Router();

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     description: Add a new payment to the system
 *     tags: [Payments]
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
 *               paymentMethod:
 *                 type: string
 *               paymentDate:
 *                 type: string
 *                 format: date
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Invalid request
 */
route.post("/", checkAuthMiddleware.checkAuth, paymentController.postPayment);

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     description: Retrieve a list of all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: A list of payments
 *       500:
 *         description: Invalid request
 */
route.get("/", paymentController.allPayments);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     description: Retrieve a payment by its ID
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the payment to fetch
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment ID not found
 *       500:
 *         description: Something went wrong
 */
route.get("/:id", paymentController.paymentByID);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update an existing payment
 *     description: Update the details of an existing payment
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the payment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *               paymentDate:
 *                 type: string
 *                 format: date
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Payment ID not found
 *       500:
 *         description: An error occurred
 */
route.put("/:id", checkAuthMiddleware.checkAuth, paymentController.updatePayment);
route.patch("/:id", checkAuthMiddleware.checkAuth, paymentController.updatePayment);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment
 *     description: Remove a payment from the system
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the payment to delete
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment ID not found
 *       500:
 *         description: An error occurred
 */
route.delete("/:id", checkAuthMiddleware.checkAuth, paymentController.deletePayment);

module.exports = route;