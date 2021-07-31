import { Router } from 'express'
const router: Router = Router()
import * as AuthController from '../controllers/auth.controller'
import TokenValidation from '../libs/verifyToken'
router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)
router.get('/profile', TokenValidation, AuthController.profile)
export default router