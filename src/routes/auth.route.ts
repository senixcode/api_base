import { RouteAuth } from '../emuns'
import { Router } from 'express'
const router: Router = Router()
import * as AuthController from '../controllers/auth.controller'
import TokenValidation from '../middleware/verifyToken'
import SignInValidator from '../middleware/signInValidator'
import SignUpValidator from '../middleware/signupValidator'

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *        type: object
 *        properties:
 *           _id: 
 *             type: string
 *             description: the user ID
 *           username:
 *              type: string
 *           email: 
 *              type: string
 *           password:
 *              type: string
 *        required:
 *          - username
 *          - email
 *          - password
 *        example :
 *          username: "only register"
 *          email: "senix@gmail.com"
 *          password: "password"                               
 */

/**
 * @swagger
 * tags:
 *  name: Auths
 *  description: Auth endpoint
 */

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *    summary: Register User, Returns the User and Token.
 *    description: The Token in the headers as 'auth-token'.
 *    tags: [Auths]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *    responses:
 *       200:
 *         description: the registered user and token as header
 *         content:
 *           application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       401:
 *        description: this email is already registered
 *       500:
 *        description: Some server error                         
 */
router.post(RouteAuth.signup, SignUpValidator, AuthController.signup)


/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *    summary: Authenticate User, Returns the User and Token.
 *    description: The Token in the headers as 'auth-token'.
 *    tags: [Auths]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/User'
 *    responses:
 *       200:
 *         description: the registered user and token as header
 *         content:
 *           application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       400:
 *        description: email or password is wrong or invalid password'
 *       500:
 *        description: Some server error                         
 */
router.post(RouteAuth.signin, SignInValidator, AuthController.signin)

router.get(RouteAuth.profile, TokenValidation, AuthController.profile)

export default router
