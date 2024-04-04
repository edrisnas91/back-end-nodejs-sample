const express = require('express');
const { validate } = require('express-validation');

const router = express.Router();
// const uploader = require('../../middlewares/upload');
const { AuthController } = require('../../controllers');
const authValidation = require('../../validators/index').auth;

/**
 * @swagger
 * /auth/login-admin:
 *   post:
 *     summary: return login data and token
 *     description: it's available to login in the system as a manager.
 *     tags: [Login Admin]
 *     requestBody:
 *       content:
 *        application/json:
 *          name: user
 *          description: The user to create.
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/LoginAdminResponce'
 *
 */
router
  .route('/login-admin')
  .post(validate(authValidation.loginAdmin), AuthController.loginAdmin);

/**
 * @swagger
 * /auth/verify-code:
 *   post:
 *     summary: for send code via SMS
 *     description: it's available to login in the system as a manager.
 *     tags: [Login Client]
 *     requestBody:
 *       content:
 *        application/json:
 *          name: verify
 *          description: The verify code.
 *          schema:
 *            type: object
 *            required:
 *              - phone
 *            properties:
 *              phone:
 *                type: string
 *                example: "+1205223355"
 *     responses:
 *       "201":
 *         description: Created
 *
 */
router
  .route('/verify-code')
  .post(validate(authValidation.verifyCode), AuthController.verifyCode);

/**
 * @swagger
 * /auth/login-client:
 *   post:
 *     summary: return login data and token
 *     description: it's available to login in the system as a client.
 *     tags: [Login Client]
 *     requestBody:
 *       content:
 *        application/json:
 *          name: user
 *          description: The user to create.
 *          schema:
 *            type: object
 *            required:
 *              - phone
 *              - verifyCode
 *            properties:
 *              phone:
 *                type: string
 *                example: "+12055678955"
 *              verifyCode:
 *                type: integer
 *                example: 2024
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/LoginClientResponce'
 *
 */
router
  .route('/login-client')
  .post(validate(authValidation.loginClient), AuthController.loginClient);

module.exports = router;
