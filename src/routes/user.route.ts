import { RouteUser } from '../emuns'
import { Router } from 'express'
const router: Router = Router()
import * as UserController from '../controllers/user.controller'
import TokenValidation from '../middleware/verifyToken'

router.get(RouteUser.profile, TokenValidation, UserController.profile)

export default router