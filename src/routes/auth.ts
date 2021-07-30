import { Router } from 'express'
const router: Router = Router()
import * as AuthController from '../controllers/auth.controller'
router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)
router.get('/profile', AuthController.profile)
export default router