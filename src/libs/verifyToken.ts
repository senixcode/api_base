import { Request as Req, Response as Res, NextFunction as Next } from 'express'
import { Payload } from '../types'
import { getPayload } from '../help/jwt'

export default function TokenValidation(req: Req, res: Res, next: Next) {
    const headerToken = req.header('auth-token')
    if (!headerToken) return res.status(401).json('Access denied')
    const payload = getPayload(headerToken) as Payload
    req.userId = payload._id
    next()
}