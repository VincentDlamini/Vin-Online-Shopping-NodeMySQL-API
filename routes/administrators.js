const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

/**
 * @swagger
 * /administrators/signup:
 *   post:
 *     summary: Signup new administrator
 *     description: Create a new administrator account
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Administrator created successfully
 *       400:
 *         description: Invalid request
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.post('/signup', adminController.signUp);

/**
 * @swagger
 * /administrators/login:
 *   post:
 *     summary: Login administrator
 *     description: Authenticate an administrator account
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication Successful
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', adminController.login);

/**
 * @swagger
 * /administrators/{id}:
 *   delete:
 *     summary: Delete administrator
 *     description: Remove an administrator account by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Administrator ID
 *     responses:
 *       200:
 *         description: Administrator deleted successfully
 *       404:
 *         description: Administrator ID not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;