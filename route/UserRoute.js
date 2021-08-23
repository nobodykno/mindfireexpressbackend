/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */

const router = require('express').Router();

const userController = require('../controller/UserController');

const auth = require('../controller/AuthController');

/**
* @swagger
* /v1/api/user:
*   post:
*     tags:
*       - Users
*     name: Register
*     summary: Register a user
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             firstname:
*               type: string
*             lastname:
*               type: string
*             email:
*               type: string
*             gender:
*               type: string
*             phone:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - username
*           - password
*           - firstname
*           - lastname
*           - phone
*           - email
*           - gender

*     responses:
*       201:
*         description: User register  successfully
*       401:
*         description: User not register sucessfully

*/

router.post('/', userController.register);
/**
* @swagger
* /v1/api/user/:id:
*   delete:
*     tags:
*       - Users
*     name: Delete API
*     summary: To delete a particular User
*     consumes:
*       - application/json
*     parameters:
*       - id: id
*         in: query
*         schema:
*           type: string
*         required:
*           - id
*     produces:
*       - application/json
*
*     responses:
*       201:
*         description: User deleted Successfully
*       401:
*         description: User not deleted Successfully
*/
router.delete('/:id', auth.AuthorizeRequest, userController.deleteUser);
/**
* @swagger
* /v1/api/user:
*   put:
*     tags:
*       - Users
*     name: Edit User
*     summary: Edit a register user
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*       - id: id
*         in: query
*         schema:
*           type: object
*           properties:
*             firstname:
*               type: string
*             lastname:
*               type: string
*             email:
*               type: string
*             gender:
*               type: string
*             phone:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - username
*           - password
*           - firstname
*           - lastname
*           - phone
*           - email
*           - gender
*           - id
*     responses:
*       201:
*         description: User updated  successfully
*       401:
*         description: Bad request

*/
router.put('/:id', userController.editUser);
/**
* @swagger
* /v1/api/user/:id:
*   get:
*     tags:
*       - Users
*     name: Detail API
*     summary: To get the detail of a User
*     consumes:
*       - application/json
*     parameters:
*       - id: id
*         in: query
*         schema:
*           type: string
*         required:
*           - id
*     produces:
*       - application/json
*
*     responses:
*       201:
*         description: User detail fetched successfully
*       401:
*         description: User not fetched
*/

router.get('/:id', auth.AuthorizeRequest, userController.detailUser);
/**
* @swagger
* /v1/api/user:
*   get:
*     tags:
*       - Users
*     name: List of Users
*     summary: To get the list of users
*     consumes:
*       - application/json
*     produces:
*       - application/json
*
*     responses:
*       201:
*         description: Users list fetched Successfully
*       401:
*         description: Users not fetchd successfully
*/

router.get('/', auth.AuthorizeRequest, userController.allUser);
module.exports = router;
