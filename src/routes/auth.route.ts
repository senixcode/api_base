import { RouteAuth } from '../emuns'
import { Router } from 'express'
const router: Router = Router()
import * as AuthController from '../controllers/auth.controller'
import TokenValidation from '../middleware/verifyToken'

router.post(RouteAuth.signup, AuthController.signup)
router.post(RouteAuth.signin, AuthController.signin)
router.get(RouteAuth.profile, TokenValidation, AuthController.profile)

export default router