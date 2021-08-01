import { RouteAuth } from '../emuns'
import { Router } from 'express'
const router: Router = Router()
import * as AuthController from '../controllers/auth.controller'
import TokenValidation from '../middleware/verifyToken'
import SignInValidator from '../middleware/signInValidator'
import SignUpValidator from '../middleware/signupValidator'

router.post(RouteAuth.signup, SignUpValidator, AuthController.signup)
router.post(RouteAuth.signin, SignInValidator, AuthController.signin)
router.get(RouteAuth.profile, TokenValidation, AuthController.profile)

export default router