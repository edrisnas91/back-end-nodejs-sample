const express = require('express');
const passport = require('passport');
const { validate } = require('express-validation');

const router = express.Router();
const { AdminController } = require('../../../controllers');
const adminValidator = require('../../../validators').admin;
// const uploader = require('../../../middlewares/upload');
/** this is test get route */

/**
 * @swagger
 * /admins:
 *   get:
 *     security:
 *      - bearerAuth: [admin]
 *     summary: return admins list
 *     description: it's available to get list of addmins in admin panel.
 *     tags: [Admin Management]
 *     parameters:
 *      - in: query
 *        name: skip
 *        schema:
 *          type: integer
 *        description: The number of items to skip before starting to collect the result set
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: The numbers of items to return
 *      - in: query
 *        name: search
 *        schema:
 *          type: string
 *        description: The search in list
 *      - in: query
 *        name: order
 *        schema:
 *          type: string
 *        description: The value is 'ASC' or 'DESC' to set order of result
 *      - in: query
 *        name: orderField
 *        schema:
 *          type: string
 *        description: The field need to sort by
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminsCollectionForAdminUserResponce'
 *
 */
router
  .route('/')
  .get(
    passport.authenticate('adminUser', { session: false }),
    validate(adminValidator.index),
    AdminController.find
  );

/**
 * @swagger
 * /admins/count:
 *   get:
 *     security:
 *      - bearerAuth: [admin]
 *     summary: return total admin count
 *     description: it's available to get count list of addmins in admin panel.
 *     tags: [Admin Management]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CountResponce'
 *
 */
router
  .route('/count')
  .get(
    passport.authenticate('adminUser', { session: false }),
    validate(adminValidator.index),
    AdminController.count
  );
/**
 * @swagger
 * /admins/me:
 *   get:
 *     security:
 *      - bearerAuth: [admin]
 *     summary: return admin profile
 *     description: it's available to get list of addmins in admin panel.
 *     tags: [Admin Management]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminsSingleForAdminUserResponce'
 *
 */
router
  .route('/me')
  .get(
    passport.authenticate('adminOrOperatorUser', { session: false }),
    AdminController.findMe
  );

/**
 * @swagger
 * /admins/{userId}:
 *   get:
 *     security:
 *      - bearerAuth: [admin]
 *     summary: return admin
 *     description: it's available to get list of addmins in admin panel.
 *     tags: [Admin Management]
 *     parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: integer
 *            required: true
 *            description: Numeric ID of the user to get
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminsSingleForAdminUserResponce'
 *
 */
router
  .route('/:id')
  .get(
    passport.authenticate('adminUser', { session: false }),
    AdminController.findOne
  );

// router
//   .route('/:id')
//   .delete(passport.authenticate('adminUser', { session: false }),AdminController.deleteById);

/**
 * @swagger
 * /admins/me:
 *   put:
 *     security:
 *      - bearerAuth: [admin]
 *     summary: return admin profile
 *     description: it's available to get list of addmins in admin panel.
 *     tags: [Admin Management]
 *     requestBody:
 *       content:
 *        application/json:
 *          name: user
 *          description: The user to update.
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              accessType:
 *                type: string
 *                enum: [admin, operator]
 *              status:
 *                type: string
 *                enum: [active, block]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminsSingleForAdminUserResponce'
 *
 */

router.route('/me').put(
  validate(adminValidator.update),
  passport.authenticate('adminOrOperatorUser', { session: false }),
  // uploader,
  AdminController.updateMe
);

/**
 * @swagger
 * /admins/{userId}:
 *   put:
 *     security:
 *      - bearerAuth: [admin]
 *     summary: return admin
 *     description: it's available to get list of addmins in admin panel.
 *     tags: [Admin Management]
 *     parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: integer
 *            required: true
 *            description: Numeric ID of the user to get
 *     requestBody:
 *       content:
 *        application/json:
 *          name: user
 *          description: The user to update.
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              accessType:
 *                type: string
 *                enum: [admin, operator]
 *              status:
 *                type: string
 *                enum: [active, block]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminsSingleForAdminUserResponce'
 *
 */
router.route('/:id').put(
  validate(adminValidator.update),
  passport.authenticate('adminUser', { session: false }),
  // uploader,
  AdminController.update
);
/**
 * @swagger
 * /admins:
 *   post:
 *     security:
 *      - bearerAuth: [admin]
 *     summary: return created admins
 *     description: it's available to get list of addmins in admin panel.
 *     tags: [Admin Management]
 *     requestBody:
 *       content:
 *        application/json:
 *          name: user
 *          description: The user to update.
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *              - firstName
 *              - lastName
 *              - email
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              username:
 *                type: string
 *              password:
 *                type: string
 *              accessType:
 *                type: string
 *                enum: [admin, operator]
 *              status:
 *                type: string
 *                enum: [active, block]
 *     responses:
 *       "201":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminsSingleForAdminUserResponce'
 *
 */
router.route('/').post(
  passport.authenticate('adminUser', { session: false }),
  validate(adminValidator.create),
  // uploader,
  AdminController.create
);

module.exports = router;
