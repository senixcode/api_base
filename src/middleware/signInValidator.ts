import { Request as Req, Response as Res, NextFunction as Next } from 'express'
import siginSchema from "../validations/SignIn.scheme"

const SignInValidator = async (req: Req, res: Res, next: Next) => {
    try {
        await siginSchema.validateAsync(req.body)
    } catch (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next();
}
export default SignInValidator