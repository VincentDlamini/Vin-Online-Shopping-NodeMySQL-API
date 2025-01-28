const express = require('express');
const categoryController = require('../controllers/categoriesController');
const checkAuthMiddleware = require('../middlewear/authenticationCheck');

const route = express.Router();

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Add a new category to the system
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Internal server error
 */
route.post('/', checkAuthMiddleware.checkAuth, categoryController.postCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve all categories
 *     description: Get a list of all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Internal server error
 */
route.get('/', categoryController.allCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     description: Retrieve a category by its ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Category ID not found
 *       500:
 *         description: Internal server error
 */
route.get('/:id', categoryController.categoryByID);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     description: Update category details
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Category ID not found
 *       500:
 *         description: Internal server error
 */
route.put('/:id', checkAuthMiddleware.checkAuth, categoryController.updateCategory);
route.patch('/:id', checkAuthMiddleware.checkAuth, categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category
 *     description: Remove a category by ID
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category ID not found
 *       500:
 *         description: Internal server error
 */
route.delete('/:id', checkAuthMiddleware.checkAuth, categoryController.deleteCategory);

module.exports = route;