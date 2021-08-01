import { RouteUser } from '../emuns'
import { Router } from 'express'
const router: Router = Router()
import * as UserController from '../controllers/user.controller'
import TokenValidation from '../middleware/verifyToken'

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
 *  securitySchemes:
 *     ApiKeyAuth:
 *        type: apiKey
 *        in: header
 *        name: auth-token                           
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Auth endpoint
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Auth endpoint
 */

/**
 * @swagger
 * /api/user/profile:
 *  get:
 *    summary: Info User, Require token key 'auth-token',
 *    tags: [Users]
 *    security:
 *      - ApiKeyAuth:
 *              ref: '#/components/securitySchemes/ApiKeyAuth'
 *    responses:
 *       200:
 *         description: Return User information
 *         content:
 *           application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       401:
 *        description: this email is already registered
 *       500:
 *        description: Some server error                         
 */
router.get(RouteUser.profile, TokenValidation, UserController.profile)

export default router