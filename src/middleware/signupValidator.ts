import { Request as Req, Response as Res, NextFunction as Next } from 'express'
import signupSchema from "../validations/SignUp.scheme"

const SignUpValidator = async (req: Req, res: Res, next: Next) => {
    try {
        await signupSchema.validateAsync(req.body)
    } catch (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next();
}
export default SignUpValidator