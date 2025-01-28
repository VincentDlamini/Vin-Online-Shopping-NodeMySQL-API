const express = require('express');
const productController = require('../controllers/productController');
const checkAuthMiddleware = require('../middlewear/authenticationCheck');

const router = express.Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the system
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               price:
 *                 type: number
 *               quantityOnHand:
 *                 type: number
 *               categoryId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product item created successfully
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Invalid request
 */
router.post('/', checkAuthMiddleware.checkAuth, productController.products);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Invalid request
 */
router.get('/', productController.allProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve a product by its ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to fetch
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product ID not found
 *       500:
 *         description: Something went wrong
 */
router.get('/:id', productController.productByID);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: Update the details of an existing product
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *               productDescription:
 *                 type: string
 *               price:
 *                 type: number
 *               quantityOnHand:
 *                 type: number
 *               categoryId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Product ID not found
 *       500:
 *         description: An error occurred
 */
router.put('/:id', checkAuthMiddleware.checkAuth, productController.updateProduct);
router.patch('/:id', checkAuthMiddleware.checkAuth, productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Remove a product from the system
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product item deleted successfully
 *       404:
 *         description: Product ID not found
 *       500:
 *         description: An error occurred
 */
router.delete('/:id', checkAuthMiddleware.checkAuth, productController.deleteProduct);

module.exports = router;